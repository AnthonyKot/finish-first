# Derived corpus schema

Use one directory per book slug. Never place the source PDF or its full extracted text
under `corpus/`.

```text
corpus/<book-slug>/
  manifest.yaml       # edition identity, hash, page count, extraction status
  structure.tsv       # section_id, title, level, printed_page, pdf_page, end_pdf_page
  payoffs.tsv          # payoff_id, label, rationale, source_sections, confidence, status
  dependencies.tsv    # payoff_id, prerequisite_id, relationship, source_sections
  missions.yaml       # purpose, page range, questions, expected evidence
```

## Required provenance

Every derived claim must resolve to the chosen edition through `manifest.yaml` and to a
page or section through the structure map. Use `unknown` where extraction or judgment
is unresolved; do not fill gaps with plausible values.

Suggested evidence labels: `observed`, `user-reported`, `inferred`, `hypothesis`.
Suggested editorial states: `candidate`, `selected`, `rejected`, `needs-check`.
