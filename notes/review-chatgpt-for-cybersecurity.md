# Editorial gate — *ChatGPT for Cybersecurity Cookbook*

**Verdict: SKIP.** The PDF is correctly identified and extracts cleanly with a stable
page mapping, so receipts would have been reliable. The book fails the other three
gate conditions at once. Its final chapter is built on an OpenAI API that stopped
answering five days ago; its most durable-sounding late idea is asserted in a single
bullet and never demonstrated; and its flagship scripts do not run as printed while
executing unreviewed model output with `shell=True`. A 2024 LLM cookbook can survive
model churn on the strength of a method. This one has no method underneath the
recipes.

## Identity

- **Observed:** *ChatGPT for Cybersecurity Cookbook: Learn practical generative AI
  recipes to supercharge your cybersecurity skills*, by Clint Bodungen. The title page
  is PDF p. 2. Foreword by Aaron Crow (PDF p. 5); technical reviewers Aaron Shbeeb,
  Pascal Ackerman, and Bradley Jackson (PDF p. 7).
- **Observed:** First published March 2024 by Packt Publishing; copyright 2024;
  production reference 1130324; ISBN 978-1-80512-404-7. The copyright page is PDF p. 3.
- **Observed:** 372 physical PDF pages; SHA-256
  `1ad374f18e5fa6bd12c57dcdbada96b009f0a6d49401a4339e931f174aa1440c`; 12,025,836 bytes.
  The embedded PDF Title and Author fields are blank; identity was recovered from the
  rendered title and copyright pages. Creator: Adobe InDesign 18.5 (Windows); Producer:
  Adobe PDF Library 17.0; CreationDate 2024-03-13.
- **Observed, current check (2026-08-31):** Packt and the retail listings still carry
  only the March 2024 first edition; a targeted search surfaced no second edition. That
  is not proof none exists, but no newer edition repairs the problems below:
  <https://www.packtpub.com/en-us/product/chatgpt-for-cybersecurity-cookbook-9781805124047>.

## Extraction gate — PASSES

- **Observed:** `pdftotext` (flow and `-layout`) produced 372 page chunks plus a
  trailing form-feed artifact, 91,708 words, and **zero** Unicode replacement
  characters. Eight chunks are text-empty: PDF pp. 1, 15, 59, 99, 129, 207, 299, 361.
  Spot checks show these are the cover and right-hand chapter-opening separators, not
  missing body prose.
- **Observed:** The printed table of contents is readable on PDF pp. 8–14. The numbered
  body uses a stable `pdf_page = printed_page + 23` mapping with no drift: Chapter 1 at
  PDF p. 24 / printed p. 1; Chapter 5 at PDF p. 170 / printed p. 147; Chapter 8 at PDF
  p. 276 / printed p. 253; Chapter 10 at PDF p. 328 / printed p. 305; Index at PDF
  p. 362 / printed p. 339; back matter through PDF p. 372 / printed p. 349.
- **Observed:** Beginning (PDF p. 24), middle (PDF p. 244 / printed p. 221), late
  (PDF p. 328 / printed p. 305), and back matter (PDF p. 369 / printed p. 346) preserve
  headings, code blocks, paragraph order, and page labels.
- **Observed limitation:** the book is heavily screenshot-driven, especially Chapters 9
  and 10, where several recipes are UI click-throughs. Figure captions extract; the
  images do not. Nothing in this verdict rests on unextracted visual content.

Extraction quality is not the reason for the skip.

## Currency gate — FAILS

- **Observed in the book:** the capstone recipe of the whole book, *Building Advanced
  Cybersecurity Assistants with OpenAI*, is built entirely on the Assistants API beta —
  `client.beta.assistants.create`, `client.beta.threads.create`,
  `client.beta.threads.runs.create`, `tools=[{"type": "retrieval"}]`, `file_ids=` — with
  `model="gpt-4-turbo-preview"` (PDF pp. 352–360 / printed pp. 329–337).
- **Observed, current check (2026-08-31):** OpenAI notified developers on 2025-08-26
  that the Assistants API was deprecated and would be removed one year later. It was
  removed on **2026-08-26**; `/v1/assistants`, `/v1/threads`, and `/v1/threads/runs`
  now return errors, and OpenAI directs new work to the Responses API. The book's final
  recipe is therefore not merely dated — it cannot execute:
  <https://platform.openai.com/docs/deprecations> and
  <https://community.openai.com/t/assistants-api-beta-deprecation-august-26-2026-sunset/1354666>.
- **Observed in the book:** `gpt-3.5-turbo` is the hardcoded default across the working
  scripts (for example PDF p. 68 / printed p. 45; PDF p. 238 / printed p. 215; PDF
  p. 263 / printed p. 240; PDF p. 283 / printed p. 260), and the FAISS log-triage recipe
  pins `text-embedding-ada-002` (PDF p. 292 / printed p. 269).
- **Observed, current check (2026-08-31):** OpenAI has scheduled `gpt-3.5-turbo` for
  retirement on 2026-10-23 and `gpt-3.5-turbo-instruct` for 2026-09-28. The scripts are
  weeks from failing outright: <https://platform.openai.com/docs/deprecations>.
- **Observed in the book:** Chapter 10 is a set of UI walkthroughs of the late-2023
  ChatGPT interface — the Image Viewer upload flow, the GPT Builder and Zapier AI
  Actions wiring, the separate "web browsing" mode, and "Advanced Data Analysis" as a
  distinct feature (PDF pp. 330–351 / printed pp. 307–328). Every one of those surfaces
  has since been renamed, merged, or rebuilt. Chapter 9's installs point at
  `github.com/imartinez/privateGPT` with a `poetry install --with ui,local` path (PDF
  p. 318 / printed p. 295); development moved to `zylon-ai/private-gpt` and the install
  path changed: <https://github.com/zylon-ai/private-gpt>.
- **Observed:** the author concedes the problem in the chapter's own opening — ChatGPT
  "has outpaced our ability to update each chapter with all of the latest features"
  (PDF p. 328 / printed p. 305). That is an honest disclosure in 2024. In 2026 it
  describes the whole book.

## Late-payoff gate — FAILS

The gate allows a stale edition to pass on a durable method found near the end. Two
candidates were examined, and both collapse under inspection.

- **Candidate 1 — the local drop-in.** The strongest durable idea in the book is that a
  local OpenAI-compatible inference endpoint makes privacy a configuration choice rather
  than a rewrite: LMStudio's "ability to mimic the format of ChatGPT's API makes it a
  seamless substitute for any recipe in this book" (PDF p. 308 / printed p. 285). That
  is one bullet, asserted and never demonstrated. **Observed:** the strings `base_url`
  and `api_base` appear **zero** times in the full extracted text. Every earlier recipe
  instantiates a bare `client = OpenAI()` with a hardcoded OpenAI model name, so the
  "seamless substitute" is not seamless and the book never shows the substitution it
  promises. The local chapter itself only reaches the endpoint via raw `curl` and
  PowerShell to `localhost:1234` (PDF pp. 306–307 / printed pp. 283–284).
- **Candidate 2 — the detection-rule loop.** *Building Custom Threat Detection Rules*
  has the right shape: identify a unique threat, draft, test in an isolated environment,
  refine against false positives, deploy, monitor (PDF pp. 266–269 / printed
  pp. 243–246). **Observed:** no rule is ever shown, no test corpus is defined, no
  metric is named, and the recipe is four pages of sub-step bullets. Worse, the single
  worked example is a category error: it asks ChatGPT to draft a **YARA** rule to detect
  repeated failed **SSH login attempts** from an IP address, and calls `192.168.1.101` —
  an RFC 1918 private address — an "unknown external IP" (PDF p. 267 / printed p. 244).
  YARA matches file and memory content; that scenario belongs to auth-log, Sigma, or
  Suricata tooling. A reader who follows the recipe will produce a rule that cannot fire.
- **Observed, and decisive:** the terms **"prompt injection" and "hallucination" each
  appear zero times in the entire extracted text** (both the flow and layout
  extractions), as do "untrusted," "ground truth," and "human-in-the-loop." This is a
  2024 cybersecurity book whose recipes feed attacker-influenceable text straight into
  prompts — Windows `tasklist` and `netstat` output (PDF p. 262 / printed p. 239),
  streamed syslog lines (PDF pp. 256–257 / printed pp. 233–234), PCAP contents, scraped
  OSINT job postings, and Gmail message bodies pulled in through Zapier (PDF p. 337 /
  printed p. 314) — and then executes the model's reply. The book never names the two
  failure modes that define its own subject.
- **Observed:** the recurring "Note of caution" boxes are real but narrow, and all three
  say the same thing: do not send sensitive data to the API, and wait for the local-model
  chapter (PDF p. 259 / printed p. 236; PDF p. 286 / printed p. 263; PDF p. 289 /
  printed p. 266; PDF p. 298 / printed p. 275). Data residency is the only risk the book
  treats seriously. Model error, injected instructions, and unsafe execution are not
  treated at all.

## Correctness gate — FAILS

The flagship script of Chapter 6, the *GPT-powered Kali Linux terminal*, is the clearest
single piece of evidence.

- **Observed:** it pipes the model's raw reply into
  `subprocess.Popen(command, shell=True, ...)` with no confirmation step and no
  allowlist (PDF pp. 238–240 / printed pp. 215–217). "Command validation" appears only
  as enhancement #2 in the *There's more…* wishlist (PDF p. 242 / printed p. 219).
- **Observed:** the load-bearing prompt file, `prompt4.txt`, in a recipe titled
  *GPT-powered Kali Linux terminals*, instructs the model: "Provide me with the
  **Windows** CLI command necessary to complete the following request" (PDF p. 239 /
  printed p. 216).
- **Observed:** the "completed script" cannot run, for at least three independent
  reasons. It calls `client.chat.completions.create(model=..., prompt=prompt, ...)` —
  `prompt` is a legacy Completions parameter, not a Chat Completions one; it catches
  `openai.error.APIError`, which was removed in `openai-python` v1.x, the very version
  the same file imports with `from openai import OpenAI`; and it reads
  `response['choices'].message.content.strip()`, mixing subscript and attribute access
  (PDF pp. 238 and 240 / printed pp. 215 and 217).
- **Observed:** the API key is read from a plaintext `openai-key.txt` beside the script,
  and this is presented under the heading "Security measures" (PDF pp. 240–241 /
  printed pp. 217–218).
- **Observed:** an unremoved editorial instruction survives into the published prose on
  the same page: "the connection to the OpenAI API,Remove this from the sentence. GPT-3.5
  and GPT-4 models are autoregressive language model that use deep learning…" (PDF p. 241
  / printed p. 218). Present in both extractions; not an extraction artifact.

It is not an isolated page.

- **Observed:** the Chapter 7 APT hunter calls `client.chat.completions.creat(` and
  omits the `return` in its step-by-step form (PDF p. 261 / printed p. 238), and detects
  "low-and-slow" persistent threats by reading `wevtutil qe Security /c:10` — the last
  ten Security events (PDF p. 262 / printed p. 239).
- **Observed:** Chapter 9 recommends `auto_run: true` and `interpreter -y` to skip
  confirmation (PDF pp. 312–313 / printed pp. 289–290) for a tool the book describes as
  "a function-calling language model equipped with an `exec()` function" (PDF p. 311 /
  printed p. 288), and proposes driving it with incident-response prompts such as
  "Isolate the infected system from the network" (PDF p. 310 / printed p. 287) — that
  is, auto-executing LLM-authored commands on a host during a live incident.
- **Observed:** Chapter 10's closing *There's more…* presents an invented Assistants API
  surface as illustration of "the breadth and depth of functionalities offered by the
  Assistants API": `client.beta.streams.create`, `client.notifications.subscribe`,
  `client.dalle.generate`, `threads.create(persistent=True)`,
  `purpose='knowledge-retrieval'`, `tools=[{"type": "custom_tool", ...}]`, and
  `privacy_mode=True` (PDF pp. 358–360 / printed pp. 335–337). Two items are hedged as
  "potential future" or "hypothetical"; the rest are not. The same list labels the
  knowledge-retrieval entry "Code Interpreter Tool" twice.
- **Observed:** the capstone script as typeset substitutes guillemets and curly quotes
  for ASCII string delimiters — `file=open(«data.txt», «rb")`, `purpose=›assistants›`
  (PDF p. 355 / printed p. 332). Extraction produced zero replacement characters and
  renders ASCII quotes correctly everywhere else, so this is **inferred** to be a
  typesetting failure in the source rather than an extraction defect. As printed, the
  book's final script is not valid Python.

## Distinctiveness

- **Observed:** the shelf's *Defending APIs* essay already carries the risk-prioritized
  security-lifecycle payoff, and no accepted essay covers LLM-assisted security
  operations. This candidate had a genuinely open lane. It does not fail on duplication;
  it fails on its own evidence.

## Decision

Do not create a manifest, structure map, or essay for this candidate. An essay strong
enough for this shelf would have to migrate the API surface, replace the models, supply
the injection and hallucination discipline the book never mentions, correct the YARA
scenario, and add the evaluation the recipes lack — at which point it would be an
original essay on LLM-assisted security operations that happens to cite a 2024 PDF, not
a reverse overview of this book.

For the shelf, prefer a source whose late chapters treat model output as untrusted
input: one that defines an evaluation set for a detection or triage task, states a
false-positive budget, handles instructions injected through the artifacts under
analysis, and gates the execution of generated commands. Keep this PDF, if at all, as a
2024 snapshot of what practitioners were being told to try.
