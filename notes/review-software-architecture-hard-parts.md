# Editorial gate: *Software Architecture: The Hard Parts*

**Verdict: PASS.** Write one reverse-overview essay around Chapter 15, “Build Your Own Trade-Off Analysis.”

## Identity

- **Observed:** *Software Architecture: The Hard Parts: Modern Trade-Off Analysis for Distributed Architectures*, by Neal Ford, Mark Richards, Pramod Sadalage, and Zhamak Dehghani.
- **Observed:** First Edition, October 2021; copyright 2022; O'Reilly Media; print ISBN 978-1-492-08689-5. These details appear on PDF page 6.
- **Observed:** 462 physical PDF pages; SHA-256 `5e1f286ed91a33c9af6cab35811aec9e6600c197dc6187d8dbefef7bb76c1359`.

## Extraction gate

- **Observed:** `pdftotext` produced 462 page chunks and no Unicode replacement characters. Of those, 451 contain text. The 11 empty chunks are separator pages at PDF pages 2, 18, 40, 98, 236, 266, 340, 416, 436, 438, and 442, not extraction failures.
- **Observed:** Beginning check, PDF page 19 (printed page 1): heading, paragraphs, punctuation, and printed page number are readable.
- **Observed:** Middle check, PDF page 231 (printed page 213): prose and the Figure 7-19 caption are readable.
- **Observed:** End check, PDF page 434 (printed page 416): the epilogue is complete and readable. PDF page 460 also cleanly extracts the author biographies.
- **Observed limitation:** captions survive extraction, but the information encoded only in diagrams does not. The companion should send the reader back to the PDF for figures rather than claim the text extraction captures them.

## Editorial gate

- **Observed:** Chapter 15 presents a three-part method: identify entangled dimensions, analyze how they are coupled, and assess the impact of change. It then demonstrates qualitative comparison, contextual scenario modeling, concise stakeholder framing, and safeguards against technology evangelism (PDF pages 417–434; printed pages 399–416).
- **Inferred:** This is a strong late-book payoff because it converts the earlier catalog of decomposition, data, workflow, transaction, and contract patterns into a method the reader can apply to a decision the book never discusses. It rewards finishing without requiring the reader to memorize every named pattern.
- **Inferred:** The method is more durable than the examples. References to Kafka, ESBs, service mesh, micro-frontends, and data mesh locate the book in 2021, but the selected essay does not depend on those products remaining fashionable.
- **Observed, current-edition check:** O'Reilly's official listing still identifies the book as an October 2021, 462-page title and exposes the same chapter structure: <https://www.oreilly.com/library/view/software-architecture-the/9781492086888/> (checked 2026-08-12). A targeted official-site search did not surface a second edition; that is not proof that none exists.
- **Editorial caution:** Do not use this edition as a current survey of distributed-systems products. Use it as a decision-making workbook, and validate technology-specific claims against current documentation before implementation.

## Selected essay

**Payoff:** turn “Which architecture is best?” into “Which consequence can this system and business afford?”

**Backward trail:** Chapter 15 (method) ← Chapter 12 (a worked comparison matrix) ← Chapter 7 (forces that split or recombine services) ← Chapter 2 (coupling vocabulary) ← Chapter 1 (ADRs and fitness functions).

**One next action:** read PDF pages 417–434 and produce a five-row trade-off table for one live architecture choice. The essay gives the exact questions and completion evidence.
