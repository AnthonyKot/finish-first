# `ttest_ind` Returned a Number. The Last Chapter Tells You What You Bought.

You have two groups and a difference between their means. You import `scipy.stats`, call
`ttest_ind`, and get a p-value in a millisecond. The number arrives with no warning label.

What did you just agree to?

The reward waiting at the very end of Allen Downey's *Think Stats*, third edition, is an answer to
that question and a working method for checking it. Chapter 14, "Analytic Methods," is the only
chapter where the book turns around and does with formulas what the previous thirteen chapters did
with random numbers. It is not a bolted-on math appendix. It is where the computational approach
finally gets audited, and where you learn that **every closed-form statistical test is a simulation
somebody stopped running, on the assumption that its answer had stopped changing.** The book's last
section states the rule that follows: when you replace a simulation with a formula, keep the
simulation as the thing that proves the formula still applies. [Receipt: "Computation and Analysis,"
PDF pp. 302–303; printed pp. 288–289.]

That is worth reaching, because it converts a vague professional anxiety — *am I allowed to use this
test?* — into a procedure you can run in ten lines of Python.

## The promise: a shortcut you can audit

Downey's framing is unusually direct for a statistics text. He lists three advantages of
computational methods: they are easier to explain, they are robust and versatile because they
require fewer assumptions, and they are *debuggable*, where analytic methods are "often like a black
box: you plug in numbers and they spit out results," easy to get subtly wrong and hard to diagnose.
He then lists the drawbacks honestly — they can be slow, and randomized methods do not produce the
same result twice, which makes them harder to check. [Receipt: PDF p. 302; printed p. 288.]

From that trade he derives a three-step process: explore computationally and stop if the runtime is
acceptable; if it is not, look for optimizations, of which an analytic method is one; and if you do
swap one in, keep the computational method as a basis of comparison, "providing mutual validation
between the computational and analytic results." He adds that for many practical problems you never
leave step one. [Receipt: PDF pp. 302–303; printed pp. 288–289.]

Read as an engineering rule: the formula is the optimized path, the simulation is the reference
implementation, and you do not delete the reference implementation when you ship the optimization.
You keep it as the test that tells you when the optimization's preconditions quietly stopped
holding.

## The idea: three tests, each shown to be an approximation

The chapter earns that conclusion by doing the work three times, and every time the analytic answer
is placed beside a simulated one before it is trusted.

It begins by building a `Normal` class — an object holding `mu` and `sigma2` — and giving it
arithmetic. `__add__` adds means and *adds* variances; `__mul__` scales the mean by a factor and the
variance by its square; `__sub__` subtracts the means and, uncomfortably, still adds the variances.
Each operation is verified against a random sample before it is used. [Receipt: PDF pp. 280–286;
printed pp. 266–272.] Out of that algebra falls the standard-error formula: after multiplying the
variance by *n* and dividing by *n²*, "the net effect was to divide the variance by n," so the
standard error is the standard deviation over √*n*. The familiar expression is not asserted — it is
derived, then checked against the sampling distribution it summarizes. [Receipt: PDF p. 285;
printed p. 271.]

Then the load-bearing caveat. All of that holds because normal distributions are closed under
addition, and the Central Limit Theorem is what extends it to data that is not normal. Downey states
the CLT and immediately attaches three conditions: the values must come from the same distribution,
they must be drawn independently, and the distribution must have finite mean and variance.
[Receipt: PDF p. 288; printed p. 274.]

What makes the chapter unusual is that he then *breaks* it, on purpose. Sums of exponential values
look normal by *n* = 10; sums of the more skewed lognormal still deviate in the tails at *n* = 100
[Receipt: PDF pp. 288–290; printed pp. 274–276]; sums from a Pareto distribution with `alpha=1`,
which has infinite mean and variance, are "nothing like a normal distribution" even at *n* = 100;
and serially correlated exponentials with `rho=0.8` converge slowly and may not converge at all if
distant elements are correlated too. [Receipt: "The Limits of the Central Limit Theorem," PDF
pp. 290–292; printed pp. 276–278.]

That is the payoff in operational form. Heavy tails and serial correlation are not exotic; they are
the two most common properties of data a working engineer actually holds — request latencies,
revenue per customer, file sizes, anything sampled over time. The chapter also names the diagnostic,
and it is a picture: the *normal probability plot*, introduced first precisely because, unlike
overlaying a fitted CDF, it does not depend on your ability to estimate the model's parameters.
[Receipt: PDF pp. 276–279; printed pp. 262–265.]

Three tests then follow, and the pattern never varies — simulate, plot the simulated null against
the analytic model, then use the formula.

**Difference in means.** The Chapter 9 pregnancy-length comparison, redone analytically: the normal
approximation gives p = 0.170, `ttest_ind` gives 0.1676, and Chapter 9's permutation test gave 0.18,
which the book calls consistent. Downey is explicit that the measurements are *not* normal and that
the approximation is licensed here only by large samples and modest skewness. [Receipt: "Applying
the CLT," PDF pp. 292–295; printed pp. 278–281.]

**Correlation.** Pearson's *r* is transformed by `r * sqrt((n-2)/(1-r**2))`, which follows a Student
*t* distribution with *n*−2 degrees of freedom — exactly for normal samples, approximately for
others as *n* grows — and the permuted correlations are shown to match that model before it is used.
The analytic p-value is 5.72e-11; `pearsonr` returns 5.72e-11. Here the formula buys something
resampling cannot: resampling could only establish p < 0.001 without enormous effort. Then Downey
undercuts his own win — below 0.001 it usually does not matter how much smaller the number is.
[Receipt: "Correlation Test," PDF pp. 295–299; printed pp. 281–285.]

**Chi-squared.** Simulated fair-die rolls are shown to follow a chi-squared distribution with *n*−1
degrees of freedom; the analytic p-value 0.0407 matches `chisquare`. The section closes with a
warning worth more than the technique: the chi-squared statistic is used because its null
distribution is cheap to compute, but "in context, it might not be the statistic that best
quantifies the difference between the observed and expected outcomes." [Receipt: "Chi-squared Test,"
PDF pp. 299–302; printed pp. 285–288.]

Three sections, one lesson: named tests are not a menu of correct answers for situations. They are
cached results, and the cache has invalidation conditions.

## The backward dependency trail

Read from Chapter 14 and the earlier chapters stop being a curriculum. Each supplies a piece the
last chapter needs.

**Chapter 9 supplies the thing being approximated.** It builds hypothesis testing out of three parts
and nothing else — a test statistic, a null hypothesis, and a p-value — using 140 heads in 250 coin
spins, simulated ten thousand times. [Receipt: "Flipping Coins," PDF pp. 164–166; printed
pp. 150–152.] The pregnancy-length test is then a permutation test: pool both groups, shuffle,
re-split at the original sizes, and count how often chance produces a difference as large as the
observed 0.078 weeks. [Receipt: PDF pp. 166–168; printed pp. 152–154.] Without this chapter,
`ttest_ind` is a black box. With it, the t test is visibly a faster way to compute a number you
already know how to produce by shuffling — which is why you can tell when the faster way is wrong.

**Chapter 8 supplies the object the formulas describe.** The sampling distribution — what the
estimate would do if you collected the sample again — is built by resampling penguin weights, and
the standard error is simply its standard deviation. Downey draws the distinction most readers carry
incorrectly: standard deviation quantifies variation in measurements, standard error quantifies the
precision of an estimate, and "they are answers to different questions." He then shows that
`np.std(sample) / np.sqrt(n)` reproduces the resampled result. [Receipt: "Sampling Distributions"
through "Confidence Intervals," PDF pp. 152–156; printed pp. 138–142.] Chapter 14's whole `Normal`
algebra is a derivation of that shortcut; you cannot appreciate a shortcut whose destination you
have never reached on foot.

Chapter 8 also carries the caution that outranks everything else in the book. Confidence intervals
quantify variability due to sampling only; sampling bias, self-selection, and measurement error are
separate, and "often it is not the biggest" source of error. [Receipt: "Sources of Error," PDF
p. 157; printed p. 143.] No amount of Chapter 14 rescues a badly drawn sample.

**Chapters 4 to 6 supply the models and the instruments.** Chapter 5 works through the binomial,
Poisson, exponential, normal, and lognormal distributions, then asks "Why Model?" — answering that
theoretical distributions are abstractions and a form of data compression, that all models are
imperfect, and, pointedly, that they "lend themselves to mathematical analysis, as we'll see in
Chapter 14." The book names its own destination two hundred pages early. [Receipt: PDF p. 97;
printed p. 83.] Chapter 6 establishes that a Pmf and a Cdf are interconvertible, which is what makes
"plot the empirical CDF against the analytic CDF" a valid test rather than a coincidence of shapes
[Receipt: PDF pp. 116–117; printed pp. 102–103], and Chapter 4 is where the CDF — the comparison
device on nearly every page of Chapter 14 — is built. [Receipt: "CDFs" through "Comparing CDFs,"
PDF pp. 62–67; printed pp. 48–53.] Chapter 7 defines the correlation statistics the correlation test
is testing, and separates them from causation. [Receipt: PDF pp. 130–140; printed pp. 116–126.]

**Chapters 10 and 11 supply the reason significance is not enough.** Chapter 10 derives R² as the
fractional reduction in mean squared error and shows r² = R². [Receipt: PDF p. 184; printed p. 170.]
Chapter 11 then plants the sentence every reader who has shipped a p-value should keep visible:
maternal age predicts birth weight with a small p-value *and* a small R², which "seems
contradictory" but is not — "a relationship can be statistically significant but not very useful for
prediction." [Receipt: PDF p. 206; printed p. 192.] Chapter 14 makes p-values cheap. Chapter 11 is
why cheap p-values are not the goal.

The reverse path is therefore:

**honest sample → sampling distribution → simulated null → fitted model → analytic shortcut, kept
under simulation's supervision.**

## What has aged, and one position to notice

Very little. This is the third edition, copyright 2025, O'Reilly, first release 2025-04-04, ISBN
978-1-098-19025-5. [Receipt: copyright page, PDF p. 4.] The stack it teaches — NumPy, SciPy, Pandas,
StatsModels, plus the author's `empiricaldist` and, in Chapter 13, `lifelines` — is current, and
every chapter ships as a Jupyter notebook designed to run on Colab without installing anything.
[Receipt: "What's New?" and "Using the Code," PDF pp. 11–12; printed pp. ix–x.] Those notebooks are
public at <https://github.com/AllenDowney/ThinkStats>, with a free online edition at
<https://allendowney.github.io/ThinkStats/> (checked 2026-08-31). That external dependency is the
only real fragility: datasets are downloaded by the notebooks rather than bundled, so a dead link is
a broken exercise, not a broken book.

One thing to notice rather than distrust. On printed page 142, Downey takes an explicit position
against the standard textbook prohibition, arguing that a 90% confidence interval may be read as a
90% chance the true value falls inside, and flagging that a strict frequentist reading forbids this.
[Receipt: PDF p. 156; printed p. 142.] He is transparent about it — but know it is a stance, not
consensus, because a reviewer trained on the orthodox definition will read your write-up differently
than you intended.

An honest extraction note. This book argues visually: there are no numbered figure captions
anywhere, only unnumbered plots introduced as "the following figure," and none of the plot images
extract to text. Every claim above about *what a plot shows* comes from the surrounding prose, which
describes each result explicitly. The plots themselves must be seen in the PDF or, better,
regenerated by running the notebook. That is exactly the mission below.

## Your one reading mission

Read **PDF pages 288–303 (printed pages 274–289)**: "Central Limit Theorem" through the end of
"Computation and Analysis." Sixteen pages. Skip nothing, but do not try to hold the `Normal` class
algebra in your head — it is on pages you can return to.

Then open one dataset you already own. Not penguins. A column of numbers from your own work:
request latencies, invoice amounts, session durations, ticket resolution times, commit sizes.

Carry three questions into the pages:

1. Which of the CLT's three conditions does my column violate — identical distribution,
   independence, or finite variance? (Latencies and revenue are usually heavy-tailed; anything
   indexed by time is usually serially correlated. Assume you are violating one until you check.)
2. At what *n* does the normal probability plot of my sums actually straighten out — 10, 100, or
   never?
3. If I ran the analytic test and the simulated test on my real question, would they agree to the
   precision I intend to report?

**Completion evidence — a shortcut-validity card.** One page, six lines, for your column: the
question you would actually ask of it (a difference, a correlation, or a proportion); the simulated
null, in one sentence, describing how you shuffle or resample; the simulated p-value; the analytic
p-value from the matching `scipy.stats` call; the gap between them and whether it changes any
decision; and the condition that would make you stop trusting the analytic one.

Write that last line even if the two numbers matched. Especially if they matched — a shortcut that
agrees today is the only kind that can silently stop agreeing later.

You are done when you can say which of the two numbers on your card you would defend in a review,
and why. If the answer is "the simulated one, because I watched it converge," Chapter 14 has already
paid for itself, and the thirteen chapters behind it have become a route rather than a queue.

---

Locator convention: `PDF p. N` is the physical page of the local 324-page PDF; `printed p. M` is the
number printed in the book. For the numbered body, PDF = printed + 14. For the edition identity,
extraction limits, and the 2026 currency check, see
[`notes/review-think-stats.md`](../notes/review-think-stats.md).
