# Nothing Changed. The Model Got Worse Anyway.

The model file was four months old. Nobody had retrained it, redeployed it, or opened the repo.

Three dashboards, all green. Every request answered with a 200, p99 latency flat, 5xx a rounding error.

And the thing was wrong. Not spectacularly — quietly, on a slice of users nobody was watching, for eleven days, until one support ticket arrived with enough detail to reproduce.

We had built an excellent way of knowing the service was up. We had built nothing that could notice it had stopped being useful.

I found the language for that gap in the back of a book I'd owned for years and had only ever used as a lookup table.

## I opened this one at the last chapter

*Machine Learning Engineering* by Andriy Burkov runs the usual road: data collection, features, training, evaluation, deployment. I'd dipped into the middle the way you dip into a manual — look up imbalanced data, close the book, feel productive.

So I tried reading it backward instead, starting at the last chapter that asks you to *do* anything, one short of the conclusion. It's about serving, monitoring, and maintenance, and it retroactively reorganizes everything in front of it.

Because it changes what a model *is*. In the first eight chapters, a model is an object that wins or loses on a test set. In the ninth, it's one fallible component inside a system that keeps moving — used by people you can't predict, fed by dependencies that can disappear.

> The question was never how accurate the model is. It's what the product is allowed to do while the model is wrong.

## Three limits you don't get to engineer away

The chapter opens by refusing to console you.

You cannot always explain why a model made a particular error. You cannot reliably predict when it will err. And you cannot always know how to fix a specific error once you've found it.

Worse, a wrong output isn't necessarily a near-miss. It can be nowhere near right.

And an error rate small enough to be called rare still lands on thousands of people at scale.

That reads as pessimism for about ten seconds. Then it turns into a better brief — because if you can't prevent the errors, explain them, or see them coming, the only lever left is what happens *around* them.

## Six questions that draw the boundary

Not "how accurate is it." These:

- Which actions may this model initiate on its own?
- Which outputs require validation, abstention, or human confirmation?
- What fallback remains when the model is unavailable or its answer is implausible?
- Can the affected person see, challenge, or undo the result?
- Can an operator reconstruct the context a week after the harm shows up?
- Can we retreat to the previous version without improvising under pressure?

The answers draw a boundary I've started calling the **failure envelope**: the set of mistakes the product can absorb without losing control.

Inside it, the model is wrong and the system stays predictable. Outside it, one probabilistic output quietly becomes a charge, a denial, a recommendation somebody acts on, or a relationship you don't get back.

And the envelope is made of ordinary product decisions. Hide a prediction when its expected error cost is too high. Offer several options instead of one when confidence is low.

Limit exposure so the rate of *perceived* errors stays survivable. Give people a way to report a mistake. Let actions be undone.

Where the model can decline to answer, have something behind it — a simpler model, even a hand-written heuristic — and check that output too, because a fallback nobody validates is just a second unmonitored model.

The undo path is the one that changed how I think. In ordinary interface design, undo is polish. In a probabilistic system it does three jobs at once: it hands agency back to the user, it emits an observable correction signal, and it converts an irreversible failure into a recoverable interaction.

> Undo isn't a convenience feature in a learning system. It's the cheapest containment device you will ever ship.

## Green means the service is up. That is all it means.

A test score is measured against a frozen sample. Production isn't frozen — and the model's own outputs shape the data you'll collect next.

Which is how a model file sits untouched for four months and gets worse:

```yaml
# what we alerted on
- service_up
- p99_latency
- error_rate_5xx

# what moved while all three stayed green
- the input distribution
- a feature extractor upstream, versioned separately from the model
- a data source that quietly stopped being available
- users, who had figured out what the model rewarded
```

The book asks for layers that would have caught it: feature and prediction distributions, task metrics once labels arrive, latency and resource use, changes in usage, numerical instability, and performance on slices of the population that actually mean something.

It also warns, in the same breath, that too many alerts train operators to ignore alerts. The goal isn't maximum telemetry. It's enough discriminating evidence to notice a damaging change and decide what to do.

Logging closes the loop — user context, extracted features, model output, timings, what the person did next — with stratified sampling when recording everything is absurd. And with limits: people should know what's stored, access should be restricted, opt-out should exist. Observability is not a license to build a surveillance archive.

## Swapping a model is an experiment, not a file copy

Version the data, the code, and the model together. Test the candidate. Compare it against the one currently running. Roll out gradually. Keep rollback.

And check more than the average. A replacement that improves mean performance while making its expensive errors more expensive, or shifting them onto one category of user, is a regression wearing a better number.

## Read it backward and the early chapters stop being a catalog

Every earlier chapter turns out to supply a condition the envelope depends on.

Silent and canary releases exist because pre-production testing can't reproduce every interaction — run the new model without exposing its output, then expose it to a fraction of users. Without a reversible release, monitoring tells you you're in trouble and can't get you out.

Offline metrics tell you how a candidate behaves on history. Online evaluation tests the business outcome, plus the latency and data loss history can't reproduce. Skip the distinction and you optimize a proxy and celebrate.

A versioned feature schema is what makes "drift" a meaningful word — you can't detect an invalid input if you never wrote down what a valid one looks like. And a feature that encodes the target, or arrives from the future, produces beautiful tests and a useless product.

Then the pre-project question, which is where the envelope actually starts: what human or organizational decision is this model supposed to improve, and what's the minimum performance worth shipping? You can't say which errors are costly until you've answered that.

So the trail runs: **business decision → valid data → honest evaluation → reversible deployment → observable operation.**

Training sits inside that chain. It does not define it.

The book is a 2020 draft and its tool references are period pieces. Read them as history and the argument as the point.

<!--mission-->
## Write the envelope for one system this week

No reading required for this part. Bring one model that's currently live, and twenty minutes.

Pick the system, then fill in five rows. Prose, not a spec:

| Field | The question it answers |
|---|---|
| Prohibited autonomous action | What must this model never do without a human? |
| Fallback | What answers when the model can't, or shouldn't? |
| Undo / recovery path | How does the affected person get the outcome reversed? |
| One monitored slice | Which population would we notice degrading, specifically? |
| Rollback trigger | What observation makes us revert, decided in advance? |

The hard row is the last one, because writing it down means committing to a threshold before you're under pressure to argue with it.

You're not done when the table is full. You're done when you can show it to another engineer and they disagree with one of your boundaries — that disagreement is the whole point, and it's the conversation nobody was having while the dashboards were green.

For the original, it is the chapter on serving, monitoring and maintenance — and “Model Serving in Real World” is the section I would re-read.
