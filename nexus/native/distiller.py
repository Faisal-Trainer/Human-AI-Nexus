import os
import sys
import json
from llama_index.core import Document, SummaryIndex
from llama_index.llms.ollama import Ollama

def distill_content(content, filename):
    llm = Ollama(model="llama3", request_timeout=120.0)
    
    prompt = f"""
    You are the Nexus Distiller. Analyze the following document and extract:
    1. Core Insights: Technical findings and theoretical breakthroughs.
    2. Actionable Steps: Practical recommendations for a developer.
    
    Document Content:
    {content[:4000]}
    
    Output strictly in the following Markdown format:
    #### 🧐 Core Insights (Distilled):
    - [Insight 1]
    - [Insight 2]
    
    #### 🛠 Actionable Steps:
    - [Step 1]
    - [Step 2]
    """
    
    try:
        response = llm.complete(prompt)
        return str(response)
    except Exception as e:
        return f"Error during distillation: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python distiller.py <file_path>")
        sys.exit(1)
        
    file_path = sys.argv[1]
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        sys.exit(1)
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    result = distill_content(content, os.path.basename(file_path))
    print(result)
