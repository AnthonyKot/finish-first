# Editorial gate — *Practical Systems Programming in Go*

**Verdict: PASS**, with implementation-quality cautions.

## Identity

**Observed:** The embedded title leaf identifies *Practical Systems Programming in Go: A hands-on
guide to designing and building real-world systems software in Go* by Mihalis Tsoukalos (PDF
p. 2). The copyright leaf says “First published: March 2026,” names Packt Publishing, and gives
ISBN 978-1-80611-219-7 (PDF p. 3). The preface explicitly calls it the first edition (PDF p. 18).
The manifest therefore does not infer identity from the local filename.

## Extraction gate

**Observed:** Poppler recovered 27,678 lines / 1,515,785 bytes and all 588 form-feed page
boundaries. Spot checks passed at the title leaf (PDF p. 2), Chapter 7 code and prose (PDF p. 300),
the final chapter's exercises (PDF p. 571), and the final populated index page (PDF p. 587). PDF
p. 588 is blank. Numbered body pages use a stable +25 PDF-page offset: printed p. 520 is PDF
p. 545, for example.

**Observed limitation:** Short hexadecimal-like watermark strings intrude into some margins and
code blocks, and a few code lines lose spacing. Prose, headings, printed page numbers, and the code
paths used for the essay remain readable. Receipts are therefore reliable enough for a conceptual
essay, but copied code should be checked against the publisher's source bundle.

## Currency and duplication gates

**Observed:** This is a March 2026 book that explicitly covers Go 1.26. The official Go 1.26
release notes confirm both language support for `new(expression)` and the addition of
`slog.NewMultiHandler`, features discussed in Chapter 14. Current fsnotify documentation also
confirms the chapter's important operational premise: subdirectories are not watched recursively,
each directory must be added, and Linux watch counts are bounded by inotify limits.

- [Official Go 1.26 release notes](https://go.dev/doc/go1.26)
- [Official `log/slog` package documentation](https://pkg.go.dev/log/slog)
- [fsnotify project documentation and FAQ](https://github.com/fsnotify/fsnotify)

**Editorial judgment:** No material currency problem blocks the essay. The existing selected shelf
focuses on ML engineering, software architecture, and staff engineering; none duplicates this
hands-on composition of filesystem events, TCP/JSON, synchronization, and a write-ahead log.

## Why it earns an essay

**Observed:** The final project turns a changing filesystem into a distributed search service. It
tokenizes paths into an in-memory trie, records mutations in an append-only JSONL journal before
updating memory, protects shared state with `sync.RWMutex`, exposes operations over persistent TCP
connections, and uses a client to scan and watch directory trees (PDF pp. 545–567). The chapter
also acknowledges a physical constraint that changes the design: recursive watching consumes one
kernel watch per directory and can silently become incomplete when limits are exhausted (PDF
p. 565).

**Editorial judgment:** The distinctive payoff is **a file indexer is a chain of promises, not a data
structure**. The project lets a reader trace one fact across observation, transport, persistence,
memory, and response, then ask where each claimed guarantee can break. That gives earlier chapters
on concurrency, append-mode file I/O, directory traversal, JSON streams, and TCP servers a visible
destination.

## Cautions that make the reading more valuable

**Observed:** The implementation shown in the book does not fully establish all of its prose claims:

- `HandleIndex` and `HandleDelete` call `Journal.WriteEvent` but ignore its returned error, then
  mutate memory; nevertheless the connection handler sends an `ok`/`deleted` response (PDF
  pp. 556–559). “Write first” is therefore present as an ordering intention, but durable
  acknowledgement is not guaranteed by the shown error path.
- The server holds its global exclusive mutex while the journal writes and calls `Sync`, so searches
  wait behind storage latency; the tradeoff is consistency versus concurrency, not cost-free
  “high-performance” operation (PDF pp. 548–549 and 555–557).
- Replay skips malformed JSON records and the journal only grows in the presented design (PDF
  pp. 550–551). Recovery policy, compaction, and partial-tail handling remain design work.
- Chapter 14 first teaches a compressed radix tree, but the index server inserts one character per
  node and is more accurately a trie. Search walks from the token root, so it supports token-prefix
  matching, not arbitrary substring matching (PDF pp. 538–545 and 552–557).
- The prose says the watcher keeps the index precisely mirrored, but the same page warns that watch
  registration can fail and leave the index silently incomplete (PDF p. 565). This tension is the
  right systems question, not a reason to discard the project.

**Scope decision:** PASS as a current, inspectable systems-programming project. Treat the code as a
design under review—not as proof of high availability, crash-proof durability, or production-scale
indexing.
