# Nobody in That Microservices Argument Is Discussing the Same Decision

Three people, one room, ninety minutes.

The first wants to split the service. She has scaling numbers. The second wants to keep the monolith. He has an incident report from the last time you split something. The third has arrived with an architecture diagram from a company doing forty times your traffic.

All three are right. The meeting still ends with nothing.

For years I read this as a people problem — ego, tribalism, résumé-driven design. It isn't. Watch one of these arguments closely and you notice something stranger: the three of them are answering three different questions, and none of them said which question out loud.

I found the fix in the last chapter of a book I had already failed to finish twice.

## The experiment: read the last chapter first

*Software Architecture: The Hard Parts* is four hundred pages of distributed-systems patterns. I bounced off it twice, both times somewhere in the decomposition chapters, both times convinced I was reading a catalog of things I would never need.

So I tried the opposite. I opened the final chapter and read backward from there.

Chapter 15 is called "Build Your Own Trade-Off Analysis," and it retroactively changes what the previous fourteen chapters were. They aren't a catalog. They're a parts bin for one method. And the method's output is not a winning architecture.

It's a way to stop asking for one.

## Three moves, and the order is the whole trick

1. Find the dimensions that are actually tangled together.
2. Work out where changing one forces the other to change.
3. Trace what those changes cost — in your system, not in general.

Almost everybody skips to step three and produces a pros-and-cons list.

A generic pros-and-cons list is worse than nothing, because it contains every property anyone in the room can remember. Deployability. Scalability. Testability. Consistency. Fault isolation. Twelve rows, all true, none of them decisive. You now have more text and the same argument.

Step one is what makes the list short. Before comparing anything, you answer five questions about the specific decision in front of you:

- Which workflow is involved?
- Which data has to agree, and *when*?
- Who is waiting?
- What has to scale on its own?
- Where does failure need to stop?

Answer those and most of the twelve rows evaporate. This is the part I didn't expect:

> Context doesn't add detail to a decision. It deletes the parts of the decision that were never yours.

## What it looks like on a real argument

Payments. One service, or one per method — card, reward points, and whatever finance invents next quarter?

"Microservices improve agility" does not survive step one. So stop asserting and start running scenarios.

**We tune card processing only.** Separation wins. You test and ship one thing, and the reward-points code doesn't move.

**Finance adds a new payment type.** Separation wins again. New service, no redeploy of the others.

**A customer pays with points *and* a card in a single transaction.** Separation loses, badly. You now own a distributed transaction, and "did this purchase happen" becomes a question whose honest answer is *probably*.

Three scenarios, and the argument has changed shape. It is no longer *one service or many*. It is:

> Is independent deployment of payment methods worth more to us than a single-transaction correctness guarantee?

That question has an answer, and somebody in your company already knows it. The original question had no answer and nobody knew it. That is the entire difference between a ninety-minute meeting and a four-minute one.

## The trap that eats good architects

Here's the move that made me trust the rest of the chapter.

The book works a shared-library-versus-shared-service comparison and, tallying up the generic characteristics, the library wins. Clean sweep. Then it introduces one real constraint from the actual system — and the comparison inverts.

The generic answer wasn't a weaker version of the right answer. It was pointing the other way.

I've since started calling this out loud in meetings, because you can hear it happening. Somebody says "shared libraries are simpler." True in general. Irrelevant here. The out-of-context comparison is seductive precisely because it's defensible — every individual claim in it survives fact-checking, and the conclusion is still wrong.

Which means: **when your comparison table has more than about five rows, you haven't found the decision yet.** You've found the topic.

## Stop scoring. Use low / medium / high.

The other habit I picked up: no numbers.

Two architectures almost never share enough conditions to justify a precise score, and a spreadsheet that says 7.4 versus 6.8 is fiction wearing a lab coat. Worse, it ends the conversation — nobody argues with a decimal.

Low, medium, high does the actual job. It exposes relationships. Run the payment saga across communication (sync/async), consistency (atomic/eventual), and coordination (orchestrated/choreographed) with an ordinal scale, and a pattern shows up immediately: the more tightly a workflow is coupled, the harder it becomes to scale its pieces independently, and the more distinct ways it can become unavailable.

That's not a winner. It's a testable claim — and a testable claim is what you actually wanted out of the meeting.

## The one sentence that ends it

The endpoint isn't the table. It's a question a non-engineer can answer.

Synchronous or asynchronous credit approval, stripped of protocol talk, is this:

> Would you rather be certain the charge has started before the customer's request returns, or have a faster checkout that survives a downstream outage?

A product owner answers that in four seconds.

Ask the same person "REST or messaging?" and you've required them to pretend to be a distributed-systems engineer. So they defer to whoever sounds most confident.

Which is how you got the meeting.

## What ages, and what doesn't

The book is a 2021 first edition. Its product examples are period pieces, and the analytical-data chapter should not be read as a market survey.

I'd argue that's a reason to take the method more seriously, not less. Every few years something arrives promising to have abolished an old trade-off. The chapter gives you a disciplined response: model the workflow, identify which constraint genuinely disappeared, then go find where the cost moved. It didn't leave. It relocated.

<!--mission-->
## Try this in your next architecture meeting

None of this needs the book. Take one real decision you're currently facing — not a toy one.

Write it as a single sentence: *"Should we ___ or ___ for ___ workflow?"*

Then build a table with **no more than five rows**:

| Dimension | Option A costs you | Option B costs you | What we already know | Smallest test that would settle it |
|---|---|---|---|---|

Under it, two sentences: *"Choose A when ___ matters more. Choose B when ___ matters more."*

Don't pick a winner unless your context supplies the missing priority. If it doesn't, you've just learned the most useful thing available: the decision isn't yours to make yet, and you know exactly which fact you're missing.

That table takes twenty minutes. If it changes how the next meeting goes, the four hundred pages behind Chapter 15 stop being an obstacle and become instruments — the things you go back for when a row in your table is vague and you can't say why.

“Build Your Own Trade-Off Analysis” is where this came from, and the only chapter I'd insist on.
