#!/usr/bin/env python3
"""
NEXUS LoRA Fine-Tuning Script
Uses Unsloth for efficient LoRA training on consumer hardware.

Usage:
    python train_lora.py --dataset data.jsonl --model model.gguf --output adapters/
    python train_lora.py --dataset data.jsonl --model model.gguf --output adapters/ --rank 16 --epochs 3 --gpu

Requirements:
    pip install -r train_requirements.txt
"""

import argparse
import json
import os
import sys
import time

# FIX: Windows terminal encoding — emojis cause UnicodeEncodeError on cp1252
# Force UTF-8 output on Windows
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        # Fallback: strip all non-ASCII from print
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='ascii', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='ascii', errors='replace')

def parse_args():
    parser = argparse.ArgumentParser(description='NEXUS LoRA Fine-Tuning')
    parser.add_argument('--dataset', required=True, help='Path to JSONL dataset file')
    parser.add_argument('--model', required=True, help='Path to base GGUF model')
    parser.add_argument('--output', required=True, help='Output directory for LoRA adapter')
    parser.add_argument('--rank', type=int, default=16, help='LoRA rank (8/16/32/64)')
    parser.add_argument('--epochs', type=int, default=3, help='Training epochs')
    parser.add_argument('--lr', type=float, default=2e-4, help='Learning rate')
    parser.add_argument('--batch-size', type=int, default=2, help='Batch size')
    parser.add_argument('--max-seq-len', type=int, default=2048, help='Max sequence length')
    parser.add_argument('--gpu', action='store_true', help='Use GPU acceleration')
    parser.add_argument('--cpu', action='store_true', help='Force CPU training')
    return parser.parse_args()

def load_dataset(dataset_path):
    """Load JSONL dataset in Alpaca/ShareGPT format."""
    records = []
    with open(dataset_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                record = json.loads(line)
                # Support both Alpaca and ShareGPT formats
                if 'instruction' in record and 'output' in record:
                    records.append({
                        'instruction': record['instruction'],
                        'input': record.get('input', ''),
                        'output': record['output']
                    })
                elif 'conversations' in record:
                    # ShareGPT format
                    convs = record['conversations']
                    if len(convs) >= 2:
                        records.append({
                            'instruction': convs[0].get('value', ''),
                            'input': '',
                            'output': convs[1].get('value', '')
                        })
            except json.JSONDecodeError:
                continue

    print(f"   📊 Loaded {len(records)} training records")
    return records

def format_prompt(record):
    """Format a record into a training prompt using ChatML format."""
    instruction = record['instruction']
    input_text = record.get('input', '')
    output = record['output']

    if input_text:
        return f"<|im_start|>user\n{instruction}\n\n{input_text}<|im_end|>\n<|im_start|>assistant\n{output}<|im_end|>"
    else:
        return f"<|im_start|>user\n{instruction}<|im_end|>\n<|im_start|>assistant\n{output}<|im_end|>"

def train_unsloth(args, records):
    """Train using Unsloth (most efficient for consumer GPUs)."""
    try:
        from unsloth import FastLanguageModel
        import torch
    except ImportError:
        raise ImportError("Unsloth not installed. Run: pip install -r train_requirements.txt")

    print(f"\n🔬 Starting LoRA Training with Unsloth...")
    print(f"   Model     : {args.model}")
    print(f"   Dataset   : {len(records)} records")
    print(f"   LoRA Rank : {args.rank}")
    print(f"   Epochs    : {args.epochs}")
    print(f"   Learning  : {args.lr}")
    print(f"   Batch Size: {args.batch_size}")
    print(f"   Device    : {'GPU' if args.gpu and not args.cpu else 'CPU'}")

    # Determine dtype based on hardware
    dtype = None  # Auto-detect
    if args.cpu:
        dtype = torch.float32

    # Load model with Unsloth
    print(f"\n   📥 Loading base model...")
    model_name_hf = resolve_hf_model(args.model)
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=model_name_hf,
        max_seq_length=args.max_seq_len,
        dtype=dtype,
        load_in_4bit=True if args.gpu and not args.cpu else False,
    )

    # Apply LoRA
    print(f"   🔧 Applying LoRA (rank={args.rank})...")
    model = FastLanguageModel.get_peft_model(
        model,
        r=args.rank,
        target_modules=[
            "q_proj", "k_proj", "v_proj", "o_proj",
            "gate_proj", "up_proj", "down_proj",
        ],
        lora_alpha=args.rank,
        lora_dropout=0.05,
        bias="none",
        use_gradient_checkpointing="unsloth" if args.gpu else False,
        random_state=42,
    )

    # Format dataset
    print(f"   📝 Formatting training data...")
    formatted_data = []
    for record in records:
        text = format_prompt(record)
        formatted_data.append({"text": text})

    # Create HuggingFace Dataset
    from datasets import Dataset
    dataset = Dataset.from_list(formatted_data)

    # Tokenize
    def tokenize_fn(examples):
        return tokenizer(
            examples["text"],
            truncation=True,
            max_length=args.max_seq_len,
            padding="max_length",
        )

    tokenized = dataset.map(tokenize_fn, batched=True, remove_columns=["text"])

    # Training arguments
    from transformers import TrainingArguments, DataCollatorForLanguageModeling, Trainer

    training_args = TrainingArguments(
        output_dir=args.output,
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch_size,
        gradient_accumulation_steps=4,
        learning_rate=args.lr,
        weight_decay=0.01,
        warmup_steps=10,
        logging_steps=5,
        save_strategy="epoch",
        save_total_limit=2,
        fp16=not args.cpu and args.gpu,
        bf16=False,
        optim="adamw_8bit" if args.gpu else "adamw_torch",
        seed=42,
        report_to="none",
    )

    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer,
        mlm=False,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized,
        data_collator=data_collator,
    )

    # Train!
    print(f"\n   🚀 Training started...")
    start_time = time.time()
    trainer.train()
    elapsed = time.time() - start_time

    print(f"\n   ✅ Training complete in {elapsed/60:.1f} minutes")

    # Save LoRA adapter
    print(f"   💾 Saving LoRA adapter to {args.output}...")
    model.save_pretrained(args.output)
    tokenizer.save_pretrained(args.output)

    # Save training metadata
    metadata = {
        "base_model": args.model,
        "lora_rank": args.rank,
        "epochs": args.epochs,
        "learning_rate": args.lr,
        "records": len(records),
        "training_time_seconds": elapsed,
        "max_seq_length": args.max_seq_len,
    }
    with open(os.path.join(args.output, "training_metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"   📋 Metadata saved to {args.output}/training_metadata.json")
    return True

def resolve_hf_model(model_path):
    """Convert a local GGUF file path to the corresponding HuggingFace repo ID.
    transformers cannot load GGUF files directly — it needs HF format.
    Returns the HuggingFace repo ID for download, or the local path if it's a HF directory.
    """
    import os

    # If it's a local .gguf file, extract the base model name
    basename = os.path.basename(model_path).lower()
    if basename.endswith('.gguf'):
        # Map known GGUF filenames to HuggingFace repo IDs
        GGUF_TO_HF = {
            'qwen2.5-coder-3b-instruct': 'Qwen/Qwen2.5-Coder-3B-Instruct',
            'qwen2.5-coder-1.5b-instruct': 'Qwen/Qwen2.5-Coder-1.5B-Instruct',
            'qwen2.5-coder-7b-instruct': 'Qwen/Qwen2.5-Coder-7B-Instruct',
            'qwen2.5-3b-instruct': 'Qwen/Qwen2.5-3B-Instruct',
            'qwen2.5-7b-instruct': 'Qwen/Qwen2.5-7B-Instruct',
            'llama-3.2-1b-instruct': 'meta-llama/Llama-3.2-1B-Instruct',
            'llama-3.2-3b-instruct': 'meta-llama/Llama-3.2-3B-Instruct',
            'tinyllama': 'TinyLlama/TinyLlama-1.1B-Chat-v1.0',
            'mistral-7b-instruct': 'mistralai/Mistral-7B-Instruct-v0.3',
        }

        # Strip quantization suffix (e.g. q4_k_m, q8_0, f16)
        name_parts = basename.replace('.gguf', '')
        for quant_suffix in ['-q4_k_m', '-q8_0', '-q4_0', '-q5_k_m', '-q6_k', '-f16', '-q2_k', '-q3_k_m']:
            name_parts = name_parts.replace(quant_suffix, '')

        hf_repo = GGUF_TO_HF.get(name_parts)
        if hf_repo:
            print(f"   ℹ️  GGUF file detected. Using HuggingFace repo: {hf_repo}")
            print(f"   ℹ️  (Model will be downloaded from HuggingFace Hub on first run)")
            return hf_repo
        else:
            raise ValueError(
                f"Cannot map GGUF file '{basename}' to a HuggingFace repo.\n"
                f"   Known models: {', '.join(GGUF_TO_HF.keys())}\n"
                f"   Please add a mapping in resolve_hf_model() or use --base-model with a HuggingFace repo ID."
            )

    # Not a .gguf file — assume it's a HF format directory or repo ID
    return model_path


def train_simple(args, records):
    """Fallback: Simple training without Unsloth (CPU-friendly)."""
    try:
        from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer
        from peft import LoraConfig, get_peft_model
        import torch
    except ImportError:
        raise ImportError("transformers/peft not installed. Run: pip install -r train_requirements.txt")

    print(f"\n🔬 Starting LoRA Training (Simple mode)...")

    # Load tokenizer and model
    model_name = resolve_hf_model(args.model)
    print(f"   📥 Loading model from {model_name}...")

    tokenizer = AutoTokenizer.from_pretrained(model_name)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float32 if args.cpu else torch.float16,
        device_map="cpu" if args.cpu else "auto",
    )

    # Apply LoRA
    print(f"   🔧 Applying LoRA (rank={args.rank})...")
    lora_config = LoraConfig(
        r=args.rank,
        lora_alpha=args.rank,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
    )
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()

    # Format and tokenize
    from datasets import Dataset
    formatted_data = [{"text": format_prompt(r)} for r in records]
    dataset = Dataset.from_list(formatted_data)

    def tokenize_fn(examples):
        return tokenizer(
            examples["text"],
            truncation=True,
            max_length=args.max_seq_len,
            padding="max_length",
        )

    tokenized = dataset.map(tokenize_fn, batched=True, remove_columns=["text"])

    # Train
    training_args = TrainingArguments(
        output_dir=args.output,
        num_train_epochs=args.epochs,
        per_device_train_batch_size=args.batch_size,
        gradient_accumulation_steps=4,
        learning_rate=args.lr,
        logging_steps=5,
        save_strategy="epoch",
        save_total_limit=2,
        fp16=False,
        optim="adamw_torch",
        seed=42,
        report_to="none",
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized,
    )

    print(f"\n   🚀 Training started...")
    start_time = time.time()
    trainer.train()
    elapsed = time.time() - start_time

    # Save
    print(f"\n   ✅ Training complete in {elapsed/60:.1f} minutes")
    model.save_pretrained(args.output)
    tokenizer.save_pretrained(args.output)

    metadata = {
        "base_model": args.model,
        "lora_rank": args.rank,
        "epochs": args.epochs,
        "records": len(records),
        "training_time_seconds": elapsed,
    }
    with open(os.path.join(args.output, "training_metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)

    return True

def main():
    args = parse_args()

    # Validate inputs
    if not os.path.exists(args.dataset):
        print(f"❌ Dataset not found: {args.dataset}")
        sys.exit(1)

    if not os.path.exists(args.model) and not os.path.exists(args.model.replace('.gguf', '')):
        print(f"❌ Model not found: {args.model}")
        sys.exit(1)

    # Load dataset
    records = load_dataset(args.dataset)
    if len(records) == 0:
        print("❌ No valid records found in dataset.")
        sys.exit(1)

    # Create output directory
    os.makedirs(args.output, exist_ok=True)

    # Try Unsloth first, fallback to simple training
    try:
        success = train_unsloth(args, records)
    except Exception as e:
        print(f"\n⚠️  Unsloth training failed: {e}")
        print("   Falling back to simple training mode...")
        try:
            success = train_simple(args, records)
        except Exception as e2:
            print(f"❌ Simple training also failed: {e2}")
            sys.exit(1)

    if success:
        print(f"\n🎉 LoRA adapter saved to: {args.output}")
        print(f"   Next step: Merge adapter and quantize to GGUF")

if __name__ == "__main__":
    main()
