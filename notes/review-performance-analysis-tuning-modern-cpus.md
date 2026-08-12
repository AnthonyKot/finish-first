# Editorial gate: *Performance Analysis and Tuning on Modern CPUs*

**Verdict: PASS, with a major edition warning.** Write one reverse-overview essay around Chapter 11's most useful surprise: adding workers can make a program slower, and even separate variables can force cores to exchange ownership when they occupy one cache line.

## Identity

- **Observed:** The rendered cover identifies *Performance Analysis and Tuning on Modern CPUs* by Denis Bakhvalov (PDF p. 1). Embedded title and author metadata agree.
- **Observed:** The copyright page records copyright 2020 by Denis Bakhvalov under CC BY 4.0 (PDF p. 2). The author's official release page dates the book to 2020-11-15: <https://easyperf.net/my_book/>.
- **Observed:** The Telegram source and ignored resource copy have identical SHA-256 `3bea1881a2d73f1b749835af61e5709f496cd19947f66a18cd59c1638d4bd92a`. The file has 175 physical PDF pages.

## Extraction and structure gate

- **Observed:** `pdftotext` produced 175 form-feed page boundaries, 174 nonempty text pages, and no Unicode replacement characters. PDF p. 1 is an image-only cover, not missing body text.
- **Observed:** Printed and PDF page numbers are identical from PDF p. 2 through p. 175. The table of contents on PDF pp. 5–8 matches the chapter openings: Chapter 1 at p. 9, Part 2 at p. 100, Chapter 11 at p. 147, the epilogue at p. 161, and appendices at pp. 168 and 172.
- **Observed:** Beginning (PDF p. 9), middle (PDF p. 88), selected late chapter (PDF pp. 147–160), and final page (PDF p. 175) preserve headings, prose order, listings, punctuation, and printed page numbers. A separate extraction of PDF p. 88 matched the corresponding full-file page chunk byte-for-byte.
- **Observed limitation:** Diagrams require the PDF. The selected claims are also stated in surrounding prose and listings, so receipts do not depend on recovering meaning from an image alone.

## Editorial gate

- **Observed:** Chapter 11's h264 example stops gaining much after four threads and shows extra instructions and core cycles beyond four workers (PDF pp. 147–149). The chapter frames contention and coherence as costs that can flatten or reverse scaling, then distinguishes effective work, waits, spinning, synchronization hot spots, and cache-line contention (PDF pp. 149–160).
- **Observed:** The late false-sharing example places two independently updated integers in one structure. Because coherence operates at cache-line granularity, writes by different cores can trigger ownership traffic even though the source-level variables differ. The book points backward to alignment and padding as a possible repair (PDF pp. 158–159; earlier setup and padding example at PDF pp. 115–117).
- **Inferred:** This is a substantial finish-first payoff because it changes the diagnostic question. A flat or declining scaling curve is not an invitation to optimize an arbitrary hot function. It asks whether the limit is serial work, synchronization, oversubscription, or cache-line movement—and which observation would distinguish them.
- **Inferred:** The payoff is distinct from every accepted essay. The existing shelf concerns ML failure handling, architecture decisions, staff leverage, migration seams, filesystem-index guarantees, distributed timeout ambiguity, and API-security coverage. None centers on CPU-level parallel scaling or coherence.

## Currency and accuracy

- **Observed:** The author says the first edition was released in 2020 and the second in 2024; both are free: <https://easyperf.net/about_me>. The second edition is therefore the better source for a new full read. Its added case study calls thread-count scaling especially valuable and tests newer heterogeneous hardware: <https://easyperf.net/blog/2024/05/10/Thread-Count-Scaling-Part1>.
- **Observed:** The selected mechanism has not disappeared. Current upstream `perf c2c` documentation still describes cache-line contention analysis and now spells out varying Intel, AMD, Arm64, and PowerPC support and limitations: <https://man7.org/linux/man-pages/man1/perf-c2c.1.html>. Intel also retains a current false-sharing analysis recipe: <https://www.intel.com/content/www/us/en/docs/vtune-profiler/cookbook/2023-0/false-sharing.html>.
- **Observed caution:** PDF p. 158 says true sharing implies data races. That is too broad: the shown unsynchronized increment races, but true sharing can occur through atomics or correctly synchronized access. Do not carry the generalization into the essay.
- **Inferred:** The 2020 file passes only as a conceptual edition. Exact event names, commands, screenshots, platform counts, links, and tool capabilities must be checked against current documentation and the target CPU. The essay should openly recommend the second edition for continued study.

## Selected essay

**Payoff:** learn to read a scaling curve as evidence, then recognize cache-line ownership as one reason more workers can do less useful work.

**Backward trail:** Chapter 11 (scaling, waits, contention, coherence) ← Chapter 8 (layout, alignment, and padding) ← Chapter 6 (identify a bottleneck, then locate it) ← Chapters 3–4 (cache lines, counters, and deceptive aggregate utilization) ← Chapter 2 (repeatable measurement under noise).

**One next action:** read PDF/printed pages 147–160 and produce a four-row thread-count autopsy for one fixed workload, using repeated runs at 1, 2, 4, and all logical CPUs, then name one evidence-gathering probe instead of guessing at a fix.
