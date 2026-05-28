> **VERSION**: v1 | **Last Updated**: 27/05/2026

---
bundle:
  name: superpowers
  version: 1.0.0
  description: Superpowers workflow system - disciplined software development with TDD, systematic debugging, and structured planning

includes:
  # Include foundation for core tools and agents
  - bundle: git+https://github.com/microsoft/amplifier-foundation@main
  # Include recipes bundle for workflow execution
  - bundle: git+https://github.com/microsoft/amplifier-recipes@main
  # Include our own behavior
  - bundle: git+https://github.com/ramparte/superpowers@main#subdirectory=behaviors/superpowers.yaml
---

# Superpowers Bundle

A disciplined approach to software development that enforces TDD, systematic debugging, structured planning, and human checkpoints at critical points.

## Philosophy

@superpowers:context/[philosophy.md](../ui-ux/NEXUS_PHILOSOPHY.MD)

---

## Instructions

@superpowers:context/[instructions.md](../tdd/NEXUS_INSTRUCTIONS.MD)

---

## Foundation Integration

@foundation:context/shared/common-system-base.md
