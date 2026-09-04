# The Enclosure Did Not Cause the Failure. It Exposed It.

The circuit board works on the bench. Put it into its enclosure, tighten the screws, and it fails.
Loosen everything and it works again.

The enclosure looks guilty. Replace it, add clearance, or tell the assembler not to tighten the screws
so much, and the symptom may disappear. Yet the fault may still be waiting: a poor solder joint opens
when the board flexes and closes when the stress is released. The enclosure changed the conditions.
The joint made those conditions dangerous.

That distinction is the late payoff of Hunter Scott's *Designing Electronics That Work*. Chapter 14
borrows a diagnostic vocabulary from medicine and gives hardware engineers four different things to
name: a **sign**, a **symptom**, an underlying **etiology**, and a **promoter** that makes a hidden
fault express itself. The reward is not a new word for “root cause.” It is a way to avoid repairing the
trigger while leaving the defect alive. [Receipt: “Signs, Symptoms, Etiology” and the enclosure-flex
example, printed pp. 288–289 / PDF pp. 316–317.]

## The idea: the moment of failure is not necessarily its origin

In the book's adapted model, a sign is a physical observation another person can inspect: a burned
component, a cut trace, an unexpected hot spot, or a cracked joint. A symptom is the device's abnormal
behavior: a link drops, a rail collapses, a sensor freezes, or the board resets. Etiology is the mechanism
that explains why those observations and behaviors occur. [Receipt: printed p. 288 / PDF p. 316.]

Those three layers already improve a bug report. “The router died” is behavior, not cause. “There is
ice on the antenna” is a sign, not yet proof. “The ice changed the antenna's electrical environment
enough to destroy the link” connects the sign to the symptom through a mechanism. Chapter 14 works
through that example by asking whether the effect follows the suspected cause, appears across units
and places, becomes stronger with exposure, has a plausible mechanism, and can be reproduced in an
experiment. [Receipt: “Cause and Effect,” printed pp. 290–291 / PDF pp. 318–319.]

The promoter adds the sharpest distinction. A promoter changes how readily the fault appears without
being sufficient to explain the fault itself. In the enclosure example, installation flexes the PCB. The
flex opens a bad solder joint. If the same mechanical load does not break a correctly assembled board,
then “putting it in the enclosure” is not the whole etiology. The latent joint and the revealing load have
different engineering owners and different repairs. [Receipt: promoter definition and enclosure
example, printed p. 289 / PDF p. 317.]

This is not permission to dismiss the trigger. Board flex may itself violate a mechanical requirement,
and Chapter 7 says a product PCB should be supported so it does not bend in use. A robust correction
might address both the solder process and the enclosure load path. The point is to keep the causal
claims separate: **what created the vulnerability, what exposed it, and what the user observed are
three questions, even when one redesign answers all three**. [Receipt: enclosure support and PCB
flex, printed p. 156 / PDF p. 184.]

## Build a case that can survive the next unit

One repaired board is weak evidence. Replacing a suspect component and watching the device recover
may show that the component was involved; it does not show why it failed or whether another unit will
fail the same way.

Chapter 14's heavily adapted causal checks are useful when treated as questions rather than a proof
stamp:

- Does the suspected mechanism appear in failed units and not in healthy controls?
- When the suspected cause is removed, do the signs and symptoms disappear?
- Can the failure be recreated safely by applying that cause to a known-good unit?
- Does greater exposure generally strengthen the effect, and does the timing make sense?
- Can the mechanism explain all observations, including apparently different failure signatures?

[Receipt: adapted postulates and experimental advice, printed pp. 288–290 / PDF pp. 316–318.]

The word “safely” matters. Recreating electrical overstress, heat, pressure, or mechanical damage can
destroy equipment or harm a person. The chapter's differential-diagnosis model says to prioritize
candidate causes by urgency or danger, and the introduction explicitly sends specialized safety and
certification work back to the governing standards. A useful experiment reduces uncertainty without
creating an uncontrolled second failure. [Receipt: differential diagnosis, printed p. 287 / PDF p. 315;
scope warning, PDF p. 25.]

The model also resists two familiar traps. The first is a fluke mistaken for an explanation. The second
is confirming what you hope is true. Chapter 14 asks the engineer to deduce a prediction and then look
for evidence that conflicts with it. It also warns against affirming the consequent: a blown fuse can
prevent power-up, but failure to power up does not establish a blown fuse. Multiple causes can produce
the same outward behavior. [Receipt: “Scientific Troubleshooting,” printed pp. 292–293 / PDF
pp. 320–321.]

The practical output is therefore not “root cause found.” It is a case with a discriminating prediction:

> If enclosure flex opens this solder joint, then applying the measured flex while observing continuity
> should reproduce the open; supporting the board at the joint should suppress it; and an intact control
> board under the same load should remain continuous.

Each clause can fail. That is what makes it useful.

## Why the earlier chapters suddenly matter

Once the promoter is visible, the book's earlier practical advice becomes a chain for preserving and
testing causal evidence.

Chapter 13 teaches you to **learn a product's failure signature before the field teaches it to you**.
Testing beyond the pass boundary can reveal the signs and symptoms associated with failure and make
returned units easier to classify. Its opening also warns that a device can pass internal tests and fail
for users because the test environment did not represent actual use. The late diagnostic model needs
both facts: known failure signatures and honest operating conditions. [Receipt: realistic use and field
failures, printed pp. 261–262 / PDF pp. 289–290; “The Failure Point,” printed p. 273 / PDF p. 301.]

Chapter 12 teaches you to **preserve the state before intervention and integrate incrementally**. A
high-resolution image of a new board can show whether damage existed before bring-up. Testing each
subassembly and then adding them one at a time narrows the transition that introduced the symptom.
This is exactly what the enclosure story needs: evidence from before tightening, during integration,
and after failure—not a recollection assembled after rework. [Receipt: pre-intervention photographs
and System Integration, printed pp. 258–259 / PDF pp. 286–287.]

Chapter 10 teaches you to **keep the reasoning, not only the measurements**. A useful lab entry names
the hypothesis, conditions, equipment, setup, raw results, analysis, and conclusion; it keeps failed
tests rather than polishing them away. The chapter also defends a journal-like narrative because the
sequence of substitutions and ideas helps another engineer resume an interrupted investigation.
Chapter 14 turns that advice into narrative-based troubleshooting. [Receipt: notebook contents and
negative results, printed pp. 203–205 / PDF pp. 231–233; troubleshooting narrative, printed p. 291 /
PDF p. 319.]

Chapter 7 teaches you to **design both the stress path and the observation path**. Mechanical support
should keep the PCB from flexing. Test points must be accessible to a probe or fixture, and production
tests need durable pads placed where the fixture can reach them. Without those choices, the promoter
may remain invisible because the finished device cannot be stressed and observed at the same time.
[Receipt: enclosure mechanics, printed pp. 156–157 / PDF pp. 184–185; Design for Test, printed
pp. 159–160 / PDF pp. 187–188.]

Chapter 1 reaches bedrock: **a requirement should imply evidence**. Environmental conditions such
as temperature, vibration, impact, pressure, enclosure behavior, and flexibility belong in the product
definition, and a verifiable requirement must be observable by review, analysis, or test. If installation
load was never modeled as part of use, the test campaign can be perfectly repeatable and still miss the
world that activates the defect. [Receipt: verifiable and traceable requirements, printed pp. 5–6 / PDF
pp. 33–34.]

The backward dependency trail is now visible:

> Chapter 14's causal diagnosis depends on Chapter 13's failure signatures and realistic stress,
> Chapter 12's preserved pre-change state and incremental integration, Chapter 10's narrative evidence,
> Chapter 7's mechanical and test access, and Chapter 1's observable environmental requirements.

The book no longer reads as hundreds of isolated tips. It becomes a route for making the next
intermittent failure leave enough evidence to explain itself.

## What is current—and what is not a checklist

This local file is the first printing of a book published in August 2025, and No Starch Press still lists
the same title and ISBN. The selected diagnostic model is current in the useful sense: it does not
depend on a software release, a component catalog, or one test-equipment interface. Current identity
check: [No Starch Press](https://nostarch.com/designingelectronics); first-printing statement, PDF
p. 6.

That freshness should not be stretched into regulatory authority. The book itself says specialized
certification and safety work must defer to required standards (PDF p. 25). Its standards summaries,
regulatory generalizations, numeric prices, named vendors, URLs, and Appendix B recommendations
are snapshots. Use the book to decide what kind of question to ask; use the applicable regulator,
current standard, device datasheet, and laboratory to decide what procedure is valid. The selected
reading mission deliberately stays inside the durable causal method.

## Your one reading mission

Read **PDF pages 315–321 (printed pages 287–293)**, from “Troubleshooting Models” through the end
of Chapter 14. Use one real intermittent hardware failure you have seen; if the device is unavailable,
use its lab notes, repair record, or issue report rather than inventing a clean example.

Carry three questions:

1. Which fact is a physical sign, and which fact is only abnormal behavior?
2. What condition makes the failure appear without fully explaining why the unit is vulnerable?
3. What observation would make the leading cause less likely than its nearest alternative?

You are finished when you produce one **fault case** with exactly five fields: `sign`, `symptom`,
`candidate etiology`, `possible promoter`, and `disconfirming observation`. Under those fields, write
one controlled next experiment that changes one condition, preserves the original state, names a
known-good comparison, and stops before an unsafe limit.

Do not repair the device during this mission. The purpose is to make the explanation vulnerable to
evidence. If the experiment can prove only that the symptom disappears, revise it until it can
distinguish a trigger from the defect the trigger exposed.

## Receipts

- Identity, publication, publisher, and first-printing evidence: PDF pp. 1, 5–6.
- Scope warning for certification, safety, and reliability: PDF p. 25.
- Verifiable environmental requirements: printed pp. 5–6 / PDF pp. 33–34.
- Enclosure mechanics and board-flex prevention: printed pp. 156–157 / PDF pp. 184–185.
- Design for test and reliability: printed pp. 159–163 / PDF pp. 187–191.
- Lab-notebook setup, negative results, and narrative reasoning: printed pp. 203–205 / PDF
  pp. 231–233.
- Preserved board images and incremental system integration: printed pp. 258–259 / PDF
  pp. 286–287.
- Realistic-use testing and field mismatch: printed pp. 261–262 / PDF pp. 289–290.
- Failure-point testing and failure signatures: printed p. 273 / PDF p. 301.
- Instruments changing the system under test: printed p. 286 / PDF p. 314.
- Differential diagnosis and dangerous-cause priority: printed p. 287 / PDF p. 315.
- Signs, symptoms, etiology, causal checks, and promoters: printed pp. 288–291 / PDF pp. 316–319.
- Narrative and scientific troubleshooting: printed pp. 291–293 / PDF pp. 319–321.
- Edition, extraction, distinctiveness, and currency audit:
  [`notes/review-designing-electronics-that-work.md`](../notes/review-designing-electronics-that-work.md).
