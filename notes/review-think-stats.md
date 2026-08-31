# Editorial gate — *Think Stats*, 3rd edition

**Verdict: PASS.** No currency warning. One extraction warning (figures) and one
author-position flag.

## Identity

**Observed:** The file is *Think Stats: Exploratory Data Analysis*, third edition, by Allen B.
Downey. The title page carries "THIRD EDITION" (PDF p. 3) and the copyright page states
"Copyright © 2025 Allen B. Downey," published by O'Reilly Media, with the edition history
"July 2011: First Edition / October 2014: Second Edition / April 2025: Third Edition" and
"Revision History for the Third Edition — 2025-04-04: First Release." ISBN 978-1-098-19025-5
(PDF p. 4). Embedded PDF metadata agrees on title and author; producer is the Antenna House PDF
Output Library, creation 2025-04-03, modification 2025-04-04, 324 pages, untagged.

SHA-256 `9ed31061c1536e0ea04d109dddeb51120a2e0e35af8161105e6b7bd6f8dbdad9`, 20,786,292 bytes.
The task brief's guess of a 2025 third edition is confirmed from the rendered pages, not assumed
from metadata.

## Extraction gate

**Observed:** `pdftotext 24.02.0` recovered all 324 page boundaries; 317 pages carry text and seven
are intentional blanks before chapter openings (PDF pp. 30, 58, 100, 144, 178, 250, 306). Zero
U+FFFD replacement characters. The printed table of contents extracted completely, including
every level-2 section heading with its printed page number, which is what `structure.tsv` is built
from.

The printed-to-PDF offset is **14** and it is uniform: every one of the 301 numbered body pages
resolves at PDF = printed + 14 with no breaks, verified by parsing the running footer from each
page. Roman front matter runs at offset 2. Chapter openings were independently confirmed against
`CHAPTER n` headings at PDF pp. 15, 31, 45, 59, 77, 101, 123, 145, 163, 179, 199, 219, 251, 275,
matching the TOC exactly. Index begins PDF p. 307 (printed p. 293).

Spot checks passed at PDF pp. 3–4 (identity), 21 (Chapter 1 validation), 156 (Chapter 8 confidence
intervals), 275–305 (the whole payoff chapter), and 303 (final substantive page).

**Limitations, recorded honestly:**

1. **Figures do not extract, and there are no figure captions to fall back on.** The token "Figure"
   appears zero times in the extracted text. Downey introduces every plot as "the following figure"
   and the images carry no extractable caption or alt text. This matters more here than in a prose
   book, because Chapter 14's argument is largely visual — normal probability plots *are* the
   evidence. Mitigation: the surrounding prose states each result explicitly ("Even with n=100, the
   distribution of the sum is nothing like a normal distribution"), and every essay claim about a
   plot is sourced from that prose, not from the image. The essay says so, and the reading mission
   sends the reader to the runnable notebook to regenerate the plots.
2. **Rendered DataFrame/Hist output tables lose column alignment.** Observed at PDF p. 116 (printed
   p. 102) and PDF p. 300 (printed p. 286). Values survive; row/column association must be checked
   against the PDF. No essay claim depends on one of these tables.
3. **Section boundaries are page-granular.** They come from the printed TOC. Adjacent sections often
   share a page (e.g. "Sources of Error" and "Glossary" both start on printed p. 143), so an
   `end_pdf_page` is the last page a section *can* occupy.

**The usual risk for this genre did not materialise.** Downey states that the third edition has
"almost no mathematical notation left" (PDF p. 11; printed p. ix), and the extracted text bears this
out: no Greek letters, radicals, or superscript glyphs anywhere. Formulas appear as Python
expressions and extract cleanly with indentation intact. Equation mangling is not a problem for this
title.

## Currency gate

**Observed:** This is a sixteen-month-old third edition of a book whose subject — exploratory data
analysis and statistical inference — is not a fast-moving stack. It teaches NumPy, SciPy, Pandas,
StatsModels, the author's `empiricaldist`, and `lifelines`; all remain current tooling as of
2026-08. The load-bearing results (Central Limit Theorem, Student's t, chi-squared, permutation
testing, Kaplan-Meier) are foundational.

**Observed current check (2026-08-31):** the third-edition notebooks are public at
<https://github.com/AllenDowney/ThinkStats>, with a free online edition at
<https://allendowney.github.io/ThinkStats/>. This matters because the datasets are *not* bundled in
the PDF — each chapter instructs the reader to download them — so the notebook repository is a real
external dependency of the reading mission, and it is live.

No currency boundary is required for this essay. That is unusual on this shelf and is worth stating
plainly rather than manufacturing a caveat.

## One position to flag

**Observed:** On printed p. 142 (PDF p. 156) Downey argues explicitly against the standard textbook
prohibition on reading a 90% confidence interval as "a 90% chance the true value falls inside,"
calling the strict frequentist rule "unnecessarily strict." He names the disagreement himself, so
this is transparency rather than error. **Editorial judgment:** the reader should know it is a
stance, not consensus, before repeating the phrasing in a document a statistically trained reviewer
will read.

The book's own sharpest caution sits one page later (PDF p. 157; printed p. 143): confidence
intervals quantify sampling variability only, and sampling bias, self-selection, and measurement
error "often" dominate it. That warning bounds the entire payoff and is carried into the essay.

## Why it earns an essay

**Observed:** Chapter 14, "Analytic Methods," is the only chapter that reverses the book's method.
It derives the standard-error formula from an algebra of normal distributions rather than asserting
it (PDF pp. 280–287; printed pp. 266–273); it states the CLT with three explicit conditions and then
deliberately breaks them, showing that Pareto sums with infinite variance are "nothing like a normal
distribution" at n=100 and that serially correlated exponentials converge slowly or not at all
(PDF pp. 288–292; printed pp. 274–278); it redoes three earlier resampling tests analytically and
in every case plots the simulated null against the analytic model *before* trusting the formula
(PDF pp. 292–302; printed pp. 278–288); and it closes with a three-step process whose final step is
mutual validation between computational and analytic results (PDF pp. 302–303; printed pp. 288–289).

**Editorial judgment:** that sequence supports one genuinely useful reverse overview — **a
closed-form test is a simulation somebody stopped running, and you keep the simulation as the thing
that proves the shortcut still applies.** It reframes Chapters 4–9 as the reference implementation
the last chapter optimises, and the two conditions the chapter breaks (heavy tails, serial
correlation) are the two most common properties of data an engineer actually holds. It also gives a
reading mission with a real artifact: run both methods on your own column and record the gap.

**Duplication:** distinct. No statistics, inference, or EDA book is on the shelf. The nearest
neighbour, *Machine Learning Engineering*, covers operating an ML system and says nothing about the
validity conditions of a statistical test.

**Alternatives considered and set aside:** Chapter 13's expected-remaining-lifetime result — the
expected wait stops falling after week 39 (PDF pp. 268–271; printed pp. 254–257) — is memorable and
concrete but narrower, and it does not reframe the earlier chapters. Chapter 12's ARIMA build-up
(PDF pp. 219–249; printed pp. 205–235) is the longest late chapter but reads as a technique tour.
Chapter 11's "statistically significant but not very useful for prediction" (PDF p. 206; printed
p. 192) is a sharp idea, retained as a dependency node and a follow-on mission rather than the
headline.

**Scope decision:** PASS for the methodological argument and as a current, runnable introduction to
computational statistics in Python. Do not recommend it as a reference on causal inference, which
the book explicitly defers (PDF p. 140; printed p. 126), or as a Bayesian text.
