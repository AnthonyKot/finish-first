# A File Indexer Is a Chain of Promises

A filename exists on disk. A moment later, another machine can search for it. Between those two
facts lies almost the whole of systems programming.

That is the payoff waiting in the final chapter of Mihalis Tsoukalos's *Practical Systems
Programming in Go*. Chapter 14 appears to culminate in a filesystem index: walk directories,
split paths into tokens, put those tokens in a tree, and answer queries. But the interesting system
is not the tree. It is the chain that must carry one changing fact across five different worlds:

**filesystem event → client message → durable intent → in-memory index → query response.**

Every arrow is a promise. Every promise has a failure mode. The reason to finish this book is to
learn how Go's small pieces—goroutines, locks, files, JSON, TCP, directory walking, and operating
system notifications—compose into behavior that can survive time and concurrency. The final
project is especially worthwhile because its code is concrete enough to challenge. It gives you
both an architecture and the seams where that architecture's claims need tests.

## The promise: keep a changing world searchable

The chapter separates the index into an active client and a passive server. The client discovers
files, watches for changes, and translates intent into protocol messages. The server accepts atomic
operations such as `index`, `delete`, `search`, and `stats`; it stores searchable tokens in memory
and records mutations in a write-ahead log (WAL) (PDF pp. 545–547).

That separation does useful work. A client close to the filesystem understands scans, local paths,
and OS events. A server understands state transitions and queries. A JSON protocol over a persistent
TCP connection lets them evolve on opposite sides of a clean boundary (PDF pp. 558–560). The
result is more than a command-line utility: one machine can scan `/var/log`, another can contribute
its paths, and the central service can answer across both identities (PDF pp. 567–568).

The in-memory index makes the search side legible. A path such as
`src/main/server_test.go` becomes tokens such as `src`, `main`, `server`, `test`, and `go`.
The server inserts each token character by character into a trie and associates the terminal node
with a host-and-path identifier (PDF pp. 545 and 552–553). A prefix query walks to one node, then
collects files below it while deduplicating and sorting results (PDF pp. 557–558). The data
structure is not merely an academic tree now. It defines what “find” means.

Then time enters the design. Memory is fast but forgetful. The server therefore appends each
mutation as a JSON line, calls `Sync`, and replays the journal before accepting queries after a
restart (PDF pp. 546–551). Searches take a read lock; mutations take a write lock around both the
journal operation and the memory update; statistics are copied before the lock is released so a
caller does not retain a reference to a map being changed elsewhere (PDF pp. 555–558).

This is the chapter's strongest idea: **correctness lives at the boundary between representations**.
The filesystem, wire, log, trie, and response are all different representations of “this file
exists.” A useful system must say when they agree, what happens while they disagree, and which
one wins after failure.

## The idea: turn every guarantee into a question

The book describes a strict write-ahead protocol: persist intent, then mutate memory. That order is
right, but order alone is not a guarantee. The shown `HandleIndex` and `HandleDelete` methods
call `WriteEvent` without checking its error, then update the trie. The connection handler
subsequently sends `ok` or `deleted` (PDF pp. 556–559). If the disk is full or `Sync` fails, what
exactly has the server promised the client?

That question is not a gotcha. It is where an example becomes systems education. “We use a WAL”
is a component claim. “After an acknowledged write, replay will restore the mutation” is a system
guarantee. To earn the second sentence, the error must cross the same boundaries as the data: from
the file operation to the handler and back across TCP. A failure-injection test should make the
promise observable.

Locks present another honest tradeoff. Holding the server's exclusive lock across journal append,
disk synchronization, and trie mutation makes those steps appear indivisible to readers. It also
places every search behind the latency of `Sync` whenever a write is in progress (PDF pp. 548–549
and 555–557). That may be a sensible first design. It is not free concurrency. The next design
question is whether to batch writes, separate commit from application, or accept a weaker read
model. Each option changes the promise.

Recovery deserves the same scrutiny. The replay loop reads the journal line by line and skips a
record that fails JSON decoding (PDF pp. 550–551). This favors partial recovery, but it does not
distinguish a torn final write from corruption in the middle, and the presented journal has no
compaction path. Ask what should happen after the millionth update, after a crash halfway through
a record, or after one bad line hides a delete. “Replay works” is only the beginning of the policy.

Even the meaning of search should be tested. Chapter 14 first teaches a compressed radix tree,
whose edges may contain prefixes (PDF pp. 538–544). The filesystem service that follows inserts
one character per node, which is a trie. It splits on punctuation, so `go.mod` becomes `go` and
`mod`; the final exercise explicitly asks the reader to add exact filename matching (PDF p. 571).
Because traversal starts at the token root, `serv` can match `server`, but an arbitrary interior
fragment need not. Naming the structure and contract accurately matters because users will build
expectations from those names.

The deepest constraint arrives from outside Go. fsnotify unifies OS-specific notification APIs,
but it does not make directory watching recursive. The client walks the tree and registers each
directory separately. On Linux, those registrations consume a limited kernel resource; a large
`node_modules` or `.git` tree can exhaust the allowance and leave the index incomplete (PDF
pp. 560 and 564–565). The chapter suggests exclusions. The larger lesson is sharper: an
event-driven mirror still needs a reconciliation strategy. Events can tell you what changed only
after you have successfully established observation.

## The backward dependency trail

Once you see the chain of promises, earlier chapters acquire jobs.

Start with Chapter 8's TCP server. It moves from a sequential listener to one goroutine per
connection and shows how a long-lived process accepts independent clients (printed pp. 298–304;
PDF pp. 323–329). Chapter 14 reuses that shape, but now every connection touches shared index
state. Networking creates the concurrency problem; it does not solve it.

Move backward to Chapter 7. Its JSON-stream material introduces encoders and decoders that handle
successive records without inventing a new delimiter protocol (printed pp. 260–267; PDF
pp. 285–292). That becomes both the wire format and, with newline framing, the journal format.
The same convenient representation crosses two boundaries with different failure conditions:
partial network input and partial disk writes.

Chapter 6 supplies observation. Directory traversal with `fs.WalkDir` teaches how to recurse,
inspect entries, and handle per-entry errors without loading the whole tree at once (printed
pp. 231–235; PDF pp. 256–260). In the final client, traversal becomes initial discovery and watch
registration. The callback is no longer just iteration; its error policy decides which parts of
reality enter the index.

Chapter 5 supplies durable intent. Opening a file with append/create/write-only flags appears first
as a small file-I/O technique (printed pp. 205–206; PDF pp. 230–231). Chapter 14 combines those
flags with serialization, locking, and `Sync` to make a WAL (PDF pp. 546–549). The journey from
“append some text” to “acknowledge a recoverable state transition” is exactly the kind of scale
change that makes finishing worthwhile.

Finally, Chapter 3 supplies the vocabulary for shared state. Its race detector material shows that
waiting for goroutines is not the same as protecting their data, and its mutex discussion explains
exclusive versus concurrent read access (printed pp. 119–125; PDF pp. 144–150). Chapter 14 turns
that lesson into an architectural boundary: internal trie operations assume the outer handler owns
the lock (PDF pp. 555–557). Whether that boundary is correct can now be asked in terms of an
invariant, not superstition.

The reverse route is therefore:

**shared-state discipline → append semantics → directory observation → streamed encoding →
concurrent transport → recoverable index.**

You do not need every earlier example before looking at the destination. You need to know why each
tool is being recruited.

## One reading mission

Read **PDF pages 545–551** (printed pp. 520–526), from “Creating a filesystem index service”
through `replayJournal`. Seven pages are enough to expose the complete durability path without
turning the mission into a chapter summary.

Carry three questions:

1. At what exact line does an incoming mutation become safe to acknowledge?
2. Which failure can leave the journal and in-memory trie disagreeing?
3. What grows without bound, and what user-visible behavior degrades first as it grows?

Completion evidence: write a one-page **guarantee ledger** with four columns—claimed guarantee,
enforcing code, unhandled failure, and one test. Include exactly three rows: acknowledged write,
restart recovery, and concurrent search during indexing. The mission is complete when each row
contains a failure you could reproduce, not when the pages are merely marked read.

## Receipts

- Client/server responsibility split, tokenization, trie, WAL, locks, and TCP protocol: PDF
  pp. 545–547.
- Append-only journal, `Sync`, and JSONL framing: PDF pp. 548–549.
- Construction and journal replay before serving: PDF pp. 550–551.
- Trie insertion/deletion and shared-state synchronization boundary: PDF pp. 552–557.
- Snapshot copy and persistent JSON/TCP connection handling: PDF pp. 558–559.
- fsnotify abstraction and client role: PDF pp. 560–564.
- Per-directory watches, inotify limits, exclusions, and event loop: PDF pp. 565–567.
- Exact filename limitation and extension exercise: PDF p. 571.
- Race detection, mutexes, and `RWMutex`: PDF pp. 144–150.
- Append-mode file I/O: PDF pp. 230–231.
- Directory traversal: PDF pp. 256–260.
- Streamed JSON: PDF pp. 285–292.
- Sequential and concurrent TCP servers: PDF pp. 323–329.

For edition identity, extraction limits, and the distinction between the book's claims and the
guarantees demonstrated by its code, see
`notes/review-practical-systems-programming-go.md`.
