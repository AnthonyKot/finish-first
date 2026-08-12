# The Model Is Allowed to Be Wrong. The System Is Not Allowed to Be Helpless.

You can spend weeks improving a model and still leave the most important engineering question
unanswered: **what happens when it is wrong in front of a real person?**

That is the payoff waiting near the end of Andriy Burkov's *Machine Learning Engineering*. The
book begins with the familiar ingredients—data, features, training, metrics—but Chapter 9 changes
the unit of thought. A model is no longer an object that wins or loses on a test set. It is one
fallible component inside a changing system, used by unpredictable people, fed by dependencies
that can disappear, and exposed to mistakes that may be rare without being harmless. The late-book
lesson is not how to eliminate uncertainty. It is how to build a boundary around uncertainty so a
bad prediction does not become an uncontrolled outcome.

That distinction is worth reaching because it changes concrete design decisions. It tells you when
to withhold an answer, when to offer several options, what to log, which slices to monitor, how to
roll out a replacement, and when an undo button is part of the safety architecture rather than a
minor convenience. The 2020 tool references have aged. The design problem has not.

## The promise: design the failure before celebrating the prediction

Chapter 9 opens its real-world section with three uncomfortable limits. You cannot always explain
why a model made an error; you cannot reliably predict when it will err; and you cannot always know
how to fix a particular error. Burkov adds that a wrong output need not be close to the right one.
A rare failure can still affect thousands of people at scale (Section 9.3.1, PDF p. 253).

Accepting those limits is not pessimism. It creates a better engineering brief. Instead of asking
only, “How accurate is the model?”, ask:

- Which actions may this model initiate by itself?
- Which outputs require validation, abstention, or human confirmation?
- What fallback remains when the primary model is unavailable or implausible?
- Can the affected person see, challenge, or undo the result?
- Can an operator reconstruct the context after harm appears?
- Can we retreat to a previous version without improvising under pressure?

Together, the answers define a **failure envelope**: the set of mistakes the product can absorb
without losing control. A model can fail inside that envelope while the surrounding system remains
predictable. Outside it, one probabilistic output silently becomes a financial transaction, a denied
request, a dangerous recommendation, or a broken user relationship.

The book turns this principle into product behavior. It suggests hiding a prediction when its
expected error cost is too high, presenting multiple options under low confidence, limiting exposure
to manage the rate of perceived errors, giving users a way to report a mistake, and allowing actions
to be undone. Where rejection is possible, it proposes a fallback such as a simpler model or a
handwritten heuristic, whose output must itself be checked (Section 9.3.2, PDF pp. 254–255). These
are not tricks for squeezing another decimal point from a benchmark. They are ways to keep the
system useful when the benchmark stops describing the moment in front of you.

The sharpest example is the undo path. In conventional interface design, undo may look like polish.
In a learning system, it also limits the blast radius of uncertainty. It returns agency to the user,
creates an observable correction signal, and converts an irreversible failure into a recoverable
interaction. That is a systems property, not merely a UI feature.

## The idea: production is a loop, not a finish line

A test score is measured against a frozen sample. Production is not frozen. Inputs change, upstream
databases change, feature code changes, user behavior adapts, and the model's own outputs influence
what data will be collected next. Chapter 9 lists failures that can occur even when the model artifact
itself is untouched: a data source becomes unavailable, production data drifts, feature extraction
changes without a corresponding model update, or users deliberately manipulate the learning loop
(Section 9.4.1, PDF pp. 258–259).

This is why monitoring only uptime is insufficient. A service can return HTTP 200 while becoming
quietly useless. The book asks for several layers of evidence: feature and prediction distributions,
task metrics when labels arrive, latency and resource use, usage changes, numerical instability,
and performance on meaningful slices of the population. It also warns that excessive alerts train
operators to ignore them (Section 9.4.2, PDF pp. 259–260). The objective is not maximum telemetry.
It is enough discriminating evidence to notice a damaging change and decide what to do next.

Logging completes the loop. To investigate an erratic result later, the system may need the user's
context, extracted features, model output, timings, and subsequent reaction. At scale, stratified
sampling may be more practical than recording every event. The same section also makes privacy and
retention part of the design: users should know what is stored, access should be restricted, and
opt-out should be possible (Section 9.4.3, PDF p. 260). Observability is not permission to create an
unbounded surveillance archive.

Maintenance then becomes a controlled experiment rather than a file replacement. The book asks you
to version data, code, and model; test the proposed model; compare it with the current one; deploy
gradually; retain rollback; and verify not only average performance but costly errors and their
distribution across user categories (Section 9.5.2, PDF pp. 263–265). The destination of the book is
therefore not “a trained model.” It is an evidence-producing loop that can detect, diagnose, and
reverse change.

## The backward dependency trail

Once that destination is visible, the earlier chapters stop looking like a linear catalog. Each one
supplies a condition needed by the failure envelope.

Start one chapter earlier with deployment. Silent and canary releases exist because a pre-production
test cannot expose every interaction. Running a new model without immediately exposing its outputs
creates observation time; exposing it to a small fraction of users limits initial harm. The text also
insists that training data, feature extractor, and model versions stay synchronized, and that failed
end-to-end or confidence tests trigger rollback (Sections 8.4–8.5, PDF pp. 233–235). Without a
reversible release, monitoring can tell you that you are in trouble but cannot get you out.

Move backward to evaluation. Chapter 7 separates offline assessment from online evaluation. Offline
metrics tell you how a candidate behaves on historical data; online evaluation tests business
outcomes and conditions such as latency and data loss that the historical set cannot reproduce.
Production results also become future offline data, closing the feedback loop (Section 7.1, PDF
pp. 205–206). Without that distinction, teams optimize a proxy and mistake its improvement for a
better product.

Move backward again to features and data. Chapter 4 recommends a versioned schema that records
expected feature properties and explains how inconsistency between training and serving corrupts a
system (Section 4.11, PDF pp. 119–121). Chapter 3 shows a subtler failure: a feature can encode the
target or come from the future, producing excellent tests and useless production behavior. Avoiding
that leakage requires understanding when information exists in the real business process (Sections
3.5–3.6, PDF pp. 59–61). Monitoring drift is of little use if you never defined what a valid input
looked like, and a perfect test is worthless if it used information unavailable at prediction time.

Finally, return to the pre-project question. Chapter 2 says the model is part of a system serving a
business purpose and asks you to define its inputs, outputs, and minimum acceptable performance
(Section 2.3, PDF p. 30). That is where the failure envelope really begins. You cannot decide which
errors are costly, which actions need confirmation, or which metric deserves an alert until you know
what human or organizational decision the model is supposed to improve.

The reverse path is therefore:

**business decision → valid data → honest evaluation → reversible deployment → observable operation.**

Training sits inside that chain. It does not define the chain.

## One reading mission

Read **PDF pages 253–258**, from Section 9.3, “Model Serving in Real World,” through the opening of
Section 9.4, “Model Monitoring.” This is six PDF pages (printed Chapter 9 pages 10–15).

Carry three questions:

1. What can fail in one system you know even if its model file never changes?
2. Which output should be withheld, downgraded, confirmed, or made undoable?
3. What evidence would let an operator reconstruct one harmful result a week later?

Completion evidence: write a one-page **failure-envelope note** for that system with exactly five
fields: prohibited autonomous action, fallback, undo/recovery path, one monitored slice, and rollback
trigger. Do not choose tools yet. The mission is complete when another engineer could disagree with
one of your boundaries—not merely when the pages are marked read.

## Receipts

- The three limits of model errors and the scale of rare failures: Section 9.3.1, PDF p. 253.
- Confidence-aware presentation, reporting, undo, action limits, and fallback: Section 9.3.2,
  PDF pp. 254–255.
- Change, user adaptation, trust, fatigue, and human expectations: Sections 9.3.3–9.3.4,
  PDF pp. 256–257.
- Production failure modes and monitoring layers: Sections 9.4.1–9.4.2, PDF pp. 258–260.
- Traceability, sampling, privacy, retention, and abuse monitoring: Sections 9.4.3–9.4.4,
  PDF pp. 260–261.
- Model maintenance and controlled replacement: Section 9.5, PDF pp. 262–265.
- Silent/canary deployment, synchronized versions, test assets, and rollback: Sections 8.4–8.5,
  PDF pp. 233–235.
- Offline versus online evaluation: Section 7.1, PDF pp. 205–206.
- Leakage and prediction-time availability: Sections 3.5–3.6, PDF pp. 59–61.
- Feature schemas and training-serving consistency: Section 4.11, PDF pp. 119–121.
- The model's business purpose: Section 2.3, PDF p. 30.

This essay treats the source as a conceptual systems guide, not a current tool manual. For the
edition identity and 2026 currency check, see
[`notes/review-machine-learning-engineering.md`](../notes/review-machine-learning-engineering.md).
