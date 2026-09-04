# The Server Said “ok.” Nobody Asked the Disk.

A machine rebooted at three in the morning. The search index came back up, replayed its journal, and started answering queries in under a second.

It was missing about four hundred files.

Not stale, not corrupted — absent. Every one of them had been indexed hours earlier by a client that got back the same cheerful `ok` as everything else.

I spent two days looking in the wrong layer. The tree was fine. The network was fine. The journal was fine, in the narrow sense that it held exactly what had been successfully written.

What was broken was a sentence: *we acknowledge after we persist.*

## The last chapter is the first one that makes a promise

I've been working through my pile of unfinished technical books end-first: last chapter, then backward only as far as the ending actually demands. Mihalis Tsoukalos's *Practical Systems Programming in Go* is one of them, and it rewards the order more than most.

Most of its length hands you parts — goroutines, mutexes, file flags, directory walks, JSON streams, TCP listeners. All useful, and none of it arguable. A demonstration of `append` mode has no opinion to test.

The final chapter builds a filesystem index service: a thing that runs, holds state, survives a restart, takes clients. That's where the prose starts making promises — this is durable, this mirrors the filesystem, this is fast.

Promises can be broken, which is why I'd rather start there.

## A file indexer is not a data structure

The obvious reading is that this project is about a tree. Walk the directories, split each path into tokens, insert, answer prefix queries. `src/main/server_test.go` becomes `src`, `main`, `server`, `test`, `go`, each terminal node remembering the host and path it came from.

The tree is the least interesting thing in the design.

The system splits into an active client that watches the filesystem and a passive server that owns state. Between them, JSON messages over a long-lived TCP connection carry four operations: index, delete, search, stats. Inside the server, every mutation is appended to a journal on disk before it touches memory, so a restart can rebuild.

One fact — *this file exists* — now has to survive five representations of itself:

**filesystem event → wire message → journal line → in-memory index → query response.**

Every arrow is a promise, and every promise has a failure mode. Correctness doesn't live in any of the five representations. It lives in the gaps between them.

## The order is right. The error path isn't.

Write to the log, then mutate memory. That ordering is the whole basis of crash recovery, and the book gets it right.

Then look at what the handlers do with it. Reduced to its shape — my paraphrase, not the book's listing:

```go
func (s *Server) HandleIndex(...) {
    s.journal.WriteEvent(...)   // returns an error. Nobody reads it.
    s.index.Insert(...)         // memory mutates either way
}
// ...and the connection handler writes "ok" back to the client.
```

The delete path has the same shape.

Now fill the disk, or let `Sync` fail, and ask what the server just told the client. Memory has the file. The journal doesn't. The client has a receipt. On the next restart that file quietly ceases to exist, and nothing logs a complaint.

This isn't a typo hunt. It's where an example stops being a tutorial and becomes systems education:

> "We use a write-ahead log" is a claim about a component. "After an acknowledgment, replay restores the write" is a claim about a system. Only the second one cares whether the disk is full.

To earn the second sentence, the error has to travel the same route the data did — out of the file operation, through the handler, back across the socket to the caller who is about to believe you. Until it does, the ordering is an intention, not a guarantee.

## The lock is honest about one thing and silent about another

Searches take a read lock. Mutations take the exclusive lock and hold it across the journal append, the disk sync, and the memory update.

That buys something real: readers never see the log and the index disagree. It also means every search in flight waits behind storage latency whenever a write is happening.

A defensible first design — but not free concurrency, and calling it high-performance skips the trade. Batching writes, splitting commit from apply, or accepting a weaker read model each change what a search result means. Those are design decisions, not optimizations.

## Two names that promise more than the code delivers

Recovery replays the journal line by line and skips any record that fails to decode.

That's partial recovery, and better than refusing to start. But it can't distinguish a half-written final record from corruption mid-file, and the skipped line might have been a delete — in which case a file you removed comes back, indexed, findable. The journal also only grows. No compaction path, which makes "replay works" the opening of a policy rather than the end of one.

The other name is subtler. The chapter first teaches a compressed radix tree, where one edge can carry a whole prefix. The service that follows inserts one character per node, which is a trie, and splits paths on punctuation — `go.mod` enters as `go` and `mod`, and matching a full filename is left to the reader as an exercise.

Because traversal starts at a token root, `serv` finds `server`. A fragment from the middle of a name need not find anything. Users build expectations out of the word "search," so be exact about which search you shipped.

## An event stream only reports what you were already watching

The hardest constraint comes from outside Go entirely.

fsnotify smooths over the differences between platform notification APIs, but it does not make watching recursive. The client walks the tree and registers every directory one at a time. On Linux each registration consumes a bounded kernel resource, and a fat `node_modules` or `.git` tree can exhaust the allowance — at which point the index is incomplete and still reporting healthy.

The chapter's advice is to exclude noisy directories. The sharper lesson sits underneath:

> Events can only tell you what changed after you successfully established observation. A mirror built on events without a reconciliation path is a cache that lies quietly.

## Read backward and the earlier chapters become parts

This is where the ending pulls material forward.

The mutex and race-detector chapter becomes the lock discipline the consistency story rests on. Append-mode file flags become durable intent. Directory traversal becomes the thing that decides which parts of reality enter the index at all — its error policy is a coverage policy. Streamed JSON encoding turns out to be both the wire format and the journal format, one convenient representation crossing two boundaries with different failure modes: partial network reads, partial disk writes. And the concurrent TCP server supplies the transport that creates the sharing problem without solving any of it.

The route back: shared-state discipline → append semantics → directory observation → streamed encoding → concurrent transport → recoverable index.

You don't need every earlier example before you read the ending. You need to know what each one got recruited for.

<!--mission-->
## Audit one acknowledgment you already ship

The book is not required for what follows. Choose one endpoint in your own service that returns success to a caller — a write, an enqueue, an upload receipt. A real one, in production.

Trace it by hand and fill three rows:

| What we tell the caller | Code that actually enforces it | Failure that breaks it silently | Smallest test that would prove it |
|---|---|---|---|
| The write is durable once we reply | | | |
| A restart restores everything we acknowledged | | | |
| Reads during a write see a consistent state | | | |

Two rules. "Enforcing code" means a file and a line, not a component name — if you can't point at where the error is checked, the guarantee is prose. And the failure has to be something you could cause on purpose this afternoon: fill the volume, kill the process between two statements, truncate the log's last line.

You're done when every row names a reproducible failure, not when the table is full. An empty middle column is the finding.

Most services I've audited this way have one row where the honest answer is *we tell them it's durable and we check nothing*. That isn't incompetence. It's what happens when the ordering gets written down and the error path doesn't.

The code I've been arguing with is in “Creating an Index for Unix Files.” Read it the way you'd read a pull request from a colleague you trust — which is to say closely, and out loud.
