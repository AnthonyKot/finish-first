# Editorial gate — *Machine Learning Engineering*

**Verdict: PASS**, with an identity warning and a currency warning.

## Identity

**Observed:** The supplied file is not the book named by its filename. The original filename says
`Modern_Software_Engineering_Doing_What_Works_to_Build_Better_Software.pdf`, but the embedded
running title identifies *Machine Learning Engineering — Draft* by Andriy Burkov (PDF p. 1).
The foreword is dated September 2020 (PDF p. 3), and the PDF creation/modification metadata is
dated 2020-11-08. No edition number is printed in the extracted front matter, so the manifest
records the edition as an exact-edition-unknown 2020 draft rather than guessing.

## Extraction gate

**Observed:** `pdftotext` recovered 11,251 lines / 680,836 bytes across 274 preserved PDF-page
boundaries. Spot checks passed:

- Beginning, PDF pp. 1–7: author/running title, foreword, preface, and Chapter 1 prose are readable.
- Middle, PDF p. 120: Section 4.11's prose and machine-readable schema example are readable.
- End, PDF pp. 269–274: conclusion, recommendations, and acknowledgements are readable.
- Selected payoff, PDF pp. 253–263: section hierarchy, prose, lists, and page boundaries are clear.

The PDF is untagged and its printed page number restarts at each chapter. Some internal references
literally say `Section ??`, which is a source-draft defect rather than an extraction failure. Figures
and equations are less clean than prose, but the selected systems essay does not depend on them.
Full extraction remains under ignored `workspace/modern-software-engineering/`.

## Currency gate

**Observed:** This is a 2020 survey of a fast-moving field. Named implementation advice should not
be used as a 2026 setup guide. The source, for example, demonstrates unqualified Python `pickle`
persistence (PDF p. 156) and discusses deployment choices such as PMML, PFA, and MLeap
(PDF pp. 242–243). Current scikit-learn documentation explicitly warns that loading pickle-based
artifacts can execute arbitrary code and requires a matching dependency environment. The book's
fixed illustrative alert percentages and technology lists should likewise be treated as examples,
not defaults (PDF pp. 259–260).

**Observed current check:** The durable core has not expired. Current Google Cloud documentation
still treats schemas plus skew/drift detection as model-monitoring primitives, and NIST's 2024
Generative AI Profile extends lifecycle risk management to newer generative systems. These sources
do not validate every recipe in the book; they support the narrower judgment that post-deployment
measurement and lifecycle controls remain live engineering concerns.

Current-check sources:

- [scikit-learn: Model persistence](https://scikit-learn.org/stable/model_persistence.html)
- [Google Cloud: Provide schemas to Vertex AI Model Monitoring](https://cloud.google.com/vertex-ai/docs/model-monitoring/schemas)
- [NIST AI 600-1: Generative Artificial Intelligence Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

## Why it earns an essay

**Observed:** Chapter 9 makes a strong late-book move: it treats errors, change, and human behavior
as normal operating conditions rather than exceptions (PDF p. 253). It then connects user-visible
fallbacks and undo paths (PDF pp. 254–255), gradual change and trust (PDF pp. 256–257), monitoring
and slice analysis (PDF pp. 258–260), traceable logs (PDF p. 260), and controlled maintenance
(PDF pp. 262–265). Chapter 8 supplies deployment and rollback mechanics (PDF pp. 233–235), while
Chapter 7 distinguishes offline model quality from online business outcomes (PDF pp. 205–206).

**Editorial judgment:** That sequence supports one genuinely useful reverse overview: **the model
is allowed to be wrong; the system is not allowed to be helpless**. It reframes the earlier chapters
as prerequisites for drawing and enforcing a failure envelope around probabilistic behavior. The
idea transfers to present-day AI systems even though the book does not cover the modern generative-AI
stack.

**Scope decision:** PASS for the systems argument; do not recommend it as a current catalog of ML
frameworks, model formats, security practices, or deployment APIs.
