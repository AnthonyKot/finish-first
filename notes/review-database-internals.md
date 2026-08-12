# Editorial gate: *Database Internals*

**Verdict: PASS, with an edition warning.** Write one reverse-overview essay around the timeout ambiguity exposed by Chapter 14: a consensus decision can succeed even when the client never receives a success response.

## Identity

- **Observed:** *Database Internals: A Deep Dive into How Distributed Data Systems Work*, by Alex Petrov. The title page is PDF page 2.
- **Observed:** First Edition, October 2019; first release dated 2019-09-12; copyright 2019; O'Reilly Media; print ISBN 978-1-492-04034-7. These details appear on PDF page 3.
- **Observed:** 371 physical PDF pages; SHA-256 `c46a9f0c5c8da8b8cf7b8776a7f84482f553494381b37875fc68945051ee866c`.

## Extraction gate

- **Observed:** `pdftotext` produced 371 page chunks and no Unicode replacement characters. Of those, 358 contain text. The 13 empty chunks are separator pages at PDF pages 1, 5, 13, 44, 64, 98, 184, 190, 224, 234, 332, 336, and 371, not missing body text.
- **Observed:** The printed table of contents on PDF pages 6–12 matches the detected chapter openings. Numbered body pages use a stable `pdf_page = printed_page + 20` mapping: Chapter 1 begins at PDF page 27 / printed page 7, Chapter 8 at PDF page 191 / printed page 171, and Chapter 14 at PDF page 299 / printed page 279.
- **Observed:** Beginning (PDF p. 27), middle (PDF p. 191), ending (PDF p. 331), and author matter (PDF p. 370) retain headings, paragraph order, punctuation, and readable page numbers.
- **Observed limitation:** prose and captions extract cleanly, but diagrams must still be read in the PDF. The selected essay relies on prose plus the failure-scenario sequence described beside the diagrams, not on unextracted visual detail.

## Editorial gate

- **Observed:** Chapter 14 defines consensus as agreement, validity, and termination, then connects it to atomic broadcast, Paxos, Multi-Paxos, Raft, and Byzantine consensus (PDF pp. 299–331; printed pp. 279–311).
- **Observed:** Its most concrete failure scenario is operational rather than academic: the original proposer may fail before telling its client the result, while a later proposer can recover and commit the earlier value (PDF pp. 309–310; printed pp. 289–290). Chapter 8 had already shown why retransmission can duplicate non-idempotent work when acknowledgment state is unknown (PDF pp. 204–207; printed pp. 184–187), and Chapter 11 shows a completion-record approach to deduplicating retries (PDF p. 247; printed p. 227).
- **Inferred:** This is a strong late-book payoff because it changes how the reader interprets a timeout. “No response” is not a state transition; it is missing knowledge. That distinction informs API design, retry policy, incident debugging, and database selection without requiring the reader to implement Paxos.
- **Inferred:** The payoff is distinct from *Software Architecture: The Hard Parts*. That essay supplies a general decision method; this one supplies a mechanism-level model for one recurring distributed failure.

## Currency and accuracy

- **Observed, current-edition check:** O'Reilly's current listing still presents the English book as an October 2019 title with the same 14-chapter structure. A targeted official-site search did not surface a second English edition; that is not proof that none exists: <https://www.oreilly.com/library/view/database-internals/9781492040330/> (checked 2026-08-12).
- **Observed:** The local copyright page lists only the first release. O'Reilly's current copyright page records later releases through 2020-09-04, and its official errata page records corrections made after this local file, including technical corrections in Chapters 2, 5, 8, 11, and 13: <https://www.oreilly.com/library/view/database-internals/9781492040330/copyright-page01.html> and <https://oreilly.com/catalog/0636920174462/errata>.
- **Observed caution:** PDF p. 307 / printed p. 287 says consensus has been reached when a value is accepted by at least one acceptor. The adjacent text says a quorum is normally a majority and the following failure cases show that a value accepted by only one node may be displaced (PDF pp. 307–310; printed pp. 287–290). Lamport's primary description says a proposal is chosen when a majority of acceptors accept it: <https://www.microsoft.com/en-us/research/publication/paxos-made-simple/>. The essay must not repeat the local sentence as a rule.
- **Inferred:** The foundational results and selected operational problem have not expired, but the 2019 survey boundary has. Use this edition as a conceptual map, consult its errata, and verify protocol details against primary papers or current implementation documentation.

## Selected essay

**Payoff:** understand why “the database committed” and “the client timed out” can both be true, then turn that uncertainty into a safe retry contract.

**Backward trail:** Chapter 14 (consensus and proposer failure) ← Chapter 11 (ordering, linearizability, durable completion records) ← Chapter 10 (leaders as coordination and liveness machinery) ← Chapter 9 (failure suspicion is a trade-off) ← Chapter 8 (unreliable links, acknowledgments, retransmission, and idempotency).

**One next action:** read PDF pages 299–312 / printed pages 279–292, stopping after “Multi-Paxos,” and produce a five-row knowledge ledger for the proposer-failure scenario described in the essay.
