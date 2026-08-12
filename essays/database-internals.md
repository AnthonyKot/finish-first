# The Database Committed. Your Client Timed Out. Both Are True.

A client sends a write. The server begins coordinating it. Then the request times out.

What happened?

“It failed” is comforting because it turns uncertainty into a clean state. It is also an unsafe conclusion. The write may have been lost before reaching any server. It may be sitting on one replica. It may already be chosen by a quorum while the coordinator that received the request dies before returning the response. A replacement coordinator may even finish the old work after the original client has given up.

The reward waiting near the end of Alex Petrov's *Database Internals* is a vocabulary for holding those possibilities apart. Chapter 14 does not merely introduce Paxos and Raft. Read with the earlier chapters behind it, it teaches a more practical lesson: **the state of the distributed system and the client's knowledge of that state are different things**. The promise is not that you will memorize a consensus protocol. It is that the next time a payment, job submission, schema change, or metadata update times out, you can ask what the system knows, what the client knows, and what a retry is allowed to do. [Receipt: Chapter 14 introduction and “Failure Scenarios,” PDF pp. 299–310; printed pp. 279–290.]

## The idea: a timeout reports missing knowledge

Consensus is often described as “nodes agreeing.” That phrase hides the useful structure. The chapter gives consensus three properties: correct processes decide the same value; the value came from a participant; and correct processes eventually decide. Those are agreement, validity, and termination. The first two protect the meaning of a decision. The third says the protocol eventually gets somewhere. The distinction is the familiar safety/liveness split in a more concrete form: never decide incompatible values, but do not wait forever either. [Receipt: Chapter 14, PDF pp. 299–300; printed pp. 279–280.]

Now follow the book's proposer-failure example. A proposer, P1, starts a round for value V1, gets V1 accepted by one acceptor, and disappears before finishing. A second proposer, P2, starts with a higher proposal number. If the quorum answering P2 includes the acceptor that remembers V1, P2 carries V1 forward and can finish it. The client connected only to P1 may never receive the outcome, even though the protocol continues safely without P1. In another permitted execution, P2's quorum does not include that lone acceptor and P2 can choose a new value. The critical fact is not “one copy means success.” It is that every participant has only partial evidence, and later quorum intersections determine which evidence constrains the next decision. [Receipt: “Failure Scenarios,” PDF pp. 309–310; printed pp. 289–290; quorum rationale, PDF p. 308; printed p. 288.]

That gives one timeout at least three meanings:

- the operation never entered the protocol;
- some process recorded it, but no quorum chose it;
- the operation was or will be chosen, but the response path failed.

The timeout itself cannot distinguish them. This is why blindly retrying a non-idempotent request is dangerous. Chapter 8 builds this result from the link upward. Until an acknowledgment arrives, the sender cannot know whether a message is still in flight, lost, processed, or followed by a lost acknowledgment. Retransmission improves delivery but creates duplicates. Sequence numbers and deduplication can create an exactly-once *processing effect* even though the network may transmit the same request more than once. A credit-card charge is the book's deliberately uncomfortable example: repeating the transport action must not repeat the business effect. [Receipt: “Message retransmits” through “Exactly-once delivery,” PDF pp. 204–207; printed pp. 184–187.]

Consensus therefore solves less—and more—than its reputation suggests. It does not make networks reliable, detect crashes perfectly, or guarantee that a particular client sees the response. It can make replicas preserve one compatible decision history despite those problems. That smaller statement is exactly what makes it useful. When Multi-Paxos is viewed as an append-only log, replicas agree on the values and their order; applying the same ordered commands to the same state machine lets them converge on the same result. The protocol protects the history. Your API still has to protect the caller from replaying an uncertain request as a new command. [Receipt: “Multi-Paxos,” PDF pp. 311–312; printed pp. 291–292; Raft's replicated-state-machine framing, PDF p. 320; printed p. 300.]

Chapter 11 supplies a bridge from protocol safety to API safety. Its discussion of linearizable RPCs assigns each request a client identity and sequence number, then stores a durable completion object with the mutation. If a client retries after missing the response, the server returns the recorded result instead of executing the mutation again. The exact mechanism is one research design, not a universal recipe, but the responsibility boundary is durable: consensus can order a request; a retry identity and completion record can connect that ordered request back to the caller's intention. [Receipt: “Reusable Infrastructure for Linearizability,” PDF p. 247; printed p. 227.]

This changes a production question from “Did the timeout fail?” to a tractable set:

1. Did this attempt carry a stable operation ID?
2. Where is acceptance or completion recorded durably?
3. What evidence makes a retry a lookup rather than a second mutation?
4. Can the client query the final outcome after losing the original response?
5. Which failures stop progress, and which merely replace a coordinator?

Those questions are the operational payoff of the final chapter.

## Why the earlier chapters suddenly matter

Read backward from the failed proposer and the distributed-systems half of the book stops looking like a parade of named algorithms.

Chapter 11 tells you what agreement is *for*. A consistency model is a contract about which histories clients may observe. Linearizability makes each operation appear to take effect at one point between invocation and completion, respects real-time order, and prohibits later reads from retreating to older values. Consensus can provide the coordination and ordering behind that illusion for a replicated object. Without this chapter, “all replicas agree” is underspecified: agree on which order, with what visibility promise, and at what synchronization cost? [Receipt: “Ordering,” “Consistency Models,” and “Linearizability,” PDF pp. 241–247; printed pp. 221–227.]

Chapter 10 explains why the leader in a consensus diagram is not a permanent ruler or a magical source of truth. A stable leader reduces message traffic and coordinates progress, but leaders fail, can be suspected incorrectly, and may temporarily compete. Simple leader-election algorithms can even produce split brain under partition. Paxos and Raft preserve safety by using algorithm-specific terms, proposal numbers, and quorum rules to make stale or competing leadership lose—not by assuming the election was infallible. Leadership is largely machinery for efficient progress; the decision rules carry safety. [Receipt: Chapter 10 introduction and summary, PDF pp. 225–233; printed pp. 205–213; Chapter 14 on ZAB epochs and Multi-Paxos leadership, PDF pp. 303–305 and 311; printed pp. 283–285 and 291.]

Chapter 9 explains why replacing that leader cannot begin with certainty. A process that does not answer may be dead, slow, partitioned, or attached through a delayed link. A fast detector risks accusing a live node; a patient detector delays recovery. The detector supplies a suspicion that helps the protocol make progress, not proof that rewrites history. That is why a safe protocol must tolerate false suspicions while ensuring that an old leader cannot independently choose a conflicting value. [Receipt: Chapter 9 introduction, PDF pp. 215–216; printed pp. 195–196; Chapter 9 summary, PDF p. 222; printed p. 202.]

Chapter 8 reaches bedrock. Local and remote execution are not interchangeable. Messages can be delayed, duplicated, reordered, or lost. The Two Generals' Problem shows why another acknowledgment never produces final common knowledge, and FLP shows that a fully asynchronous system cannot guarantee consensus in bounded time after even one unannounced crash. Practical systems make timing assumptions and use timeouts, but when those assumptions are temporarily wrong, suspicion can be wrong too. [Receipt: “Local and Remote Execution,” PDF pp. 198–199; printed pp. 178–179; “Two Generals' Problem,” “FLP Impossibility,” and “System Synchrony,” PDF pp. 207–211; printed pp. 187–191.]

The dependency trail is now visible:

> Chapter 14's safe decision after coordinator failure depends on Chapter 11's definition of observable order, Chapter 10's temporary leadership, Chapter 9's fallible failure suspicion, and Chapter 8's model of messages and acknowledgments.

The earlier chapters are no longer prerequisites because the author placed them first. They answer questions raised by one disturbing late-book scene: the write may be real even when its success message is not.

## What has aged—and one sentence to distrust

This PDF is the first release of a first edition from 2019. The core results it teaches—FLP, quorum intersection, state-machine replication, Paxos, and Raft—are foundational rather than a 2019 product fashion. The book still earns a place as a map from storage mechanisms to distributed guarantees. Its survey is not a current catalog of consensus research or database implementations, however, and protocol details deserve comparison with the cited primary papers. [Receipt: edition statement, PDF p. 3; scope and structure, PDF pp. 16–18.]

There is also a specific trap in this local release. On PDF page 307 / printed page 287, one sentence glosses consensus as a value accepted by at least one acceptor. Do not carry that sentence into your model. The surrounding quorum section says majorities intersect, and the next failure scenarios show that a value held by only one acceptor may be replaced. Lamport's primary Paxos description states that a proposal is chosen when a majority accepts it. The useful reading move is to annotate the sentence, then let the quorum invariant—not the stray gloss—govern your trace. [Receipt: PDF pp. 307–310; printed pp. 287–290. Primary check: <https://www.microsoft.com/en-us/research/publication/paxos-made-simple/>.]

## Your one reading mission

Read **PDF pages 299–312 (printed pages 279–292)**, from the opening of Chapter 14 through the end of “Multi-Paxos.” Do not try to memorize every message name.

Before reading, write this scenario at the top of a page: “Client C sends operation V1 to proposer P1. P1 disappears before C receives a response. P2 takes over.” While reading, keep three questions beside it:

- What does the client know at this moment?
- What does one acceptor know, and what does a quorum know?
- Which rule protects agreement, and which mechanism restores progress?

You are finished when you produce a five-row **knowledge ledger** with columns `moment`, `client evidence`, `replica evidence`, and `safe next action`. Use these five moments: request sent; one acceptance; proposer disappears; new quorum forms; value chosen. Under the table, add one sentence defining the retry contract your own API would need: the stable request identifier, where completion is recorded, and how a duplicate returns the original result.

That page is enough. If you can explain why the client may be uncertain while the replicas remain safe, Chapter 14 has already paid off. The rest of the book becomes a route back through the mechanisms that make that apparently contradictory outcome possible—and a guide for deciding what your system must do when “no response” is the only fact you have.
