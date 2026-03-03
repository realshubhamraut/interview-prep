# Libraries Interview Prep Notebook — Build Instructions

## Overview
Building `libraries/libraries.ipynb` — a comprehensive interview prep notebook covering 30+ Python libraries.
Generated via Python scripts that write `.ipynb` JSON directly.

## Format Rules (MUST FOLLOW)
- **Cell structure**: Each section = one markdown cell with `source` as array of `"line\n"` strings
- **Anchors**: `<a id="section-id"></a>` as first line of each section cell
- **Headers**: `###` for library name, `####` for sub-sections
- **Separators**: `---` between sections
- **Tables**: `| Header | Header |` markdown format
- **Code cells**: `"cell_type": "code"` with `"execution_count": null, "outputs": []`
- **Questions format**: `| # | Question | Key Concepts | Answer |` with `<br>` for multi-line answers
- **Conceptual intros**: 2-3 sentence paragraph explaining concept BEFORE tables/code

## Notebook JSON Template
```json
{
 "cells": [ ... ],
 "metadata": {
  "kernelspec": { "display_name": "Python 3", "language": "python", "name": "python3" },
  "language_info": { "name": "python", "version": "3.10.0" }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
```

## Phase Execution Protocol

When user says "continue", follow this sequence:
1. Check `task.md` to identify the current phase
2. Read existing `libraries.ipynb` to get current cell count
3. Generate new cells for the next phase
4. Append cells to the notebook (insert before the closing `]` of cells array)
5. Update `task.md` to mark completed items

## Phase Map

| Phase | Libraries | Question Counts |
|-------|-----------|-----------------|
| 1 | NumPy, Pandas | 100 + 100 |
| 2 | Matplotlib, Seaborn | 30 + 30 |
| 3 | Scikit-learn | 100 |
| 4 | XGBoost, LightGBM, CatBoost | 30 + 30 + 30 |
| 5 | PyTorch | 100 |
| 6 | Transformers, HuggingFace, Sentence-Transformers, SpaCy, NLTK | 100 + 50 + 50 + 30 + 30 |
| 7 | MLflow, W&B, Optuna, Great Expectations | 25 + 25 + 25 + 25 |
| 8 | FastAPI, LangChain | 50 + 50 |
| 9 | SciPy, Statsmodels | 25 + 25 |
| 10 | SQLAlchemy, OpenCV, Dask, Polars, Pytest, Requests, Joblib, Pillow, Pinecone, Qdrant, PyArrow | 15-20 each |

## Section Template Per Library

```
<a id="library-name"></a>

---

### Library Name — Purpose & Overview

[2-3 sentence conceptual explanation]

---

#### Key Terminology

| Term | Meaning | Example |
|------|---------|---------|
| ... | ... | ... |

#### Core API Reference

| Function/Method | Purpose | Example |
|-----------------|---------|---------|
| ... | ... | ... |

[Code cell with practical examples]

#### Library Name — Interview Questions (N Questions)

| # | Question | Key Concepts | Answer |
|---|----------|-------------|--------|
| 1 | ... | ... | ...<br>... |
```

## Important Notes
- Do NOT reduce quality to fit more content
- Each phase is a separate user interaction (user says "continue")
- Phase 1 creates the full notebook file; later phases append
- Always update TOC in the final phase
- Reference existing content from DL/NLP/ML notebooks where relevant
- Focus: conceptual understanding + interview preparation
