# Rewrite recipe — sourced draft → Medium/Substack post

The 14 essays were drafted against local PDFs under a strict evidence contract. That contract
produced accurate prose and an unreadable reading experience. This is the checklist for converting
each one. The originals are archived verbatim in `corpus/_sourced-drafts/`.

Worked example: `essays/software-architecture-hard-parts.md`.

## The one structural change

**The reader's problem is the subject. The book is the evidence, not the destination.**

The drafts are organised around "why you should finish this book" — a meta-interest with a tiny
audience. Nobody shares a post about finishing a book they don't own. Flip it: lead with the
problem the reader has *today*, use the book's late chapter as the thing that solved it, and make
the post fully usable by someone who never opens the PDF. The book becomes where you got it, not
where the reader has to go.

Test: can a reader act on this post tonight, without the book? If no, it isn't done.

## The nine mechanical moves

1. **Strip every citation from the body.** Three formats exist: `[Receipt: …]`, inline
   `(printed pp. 329–332 / PDF pp. 352–355)`, and a trailing `## Receipts` list. All go. At most
   one pointer survives, as the last line, and it names the **chapter title, never a page range**:
   *"Chapter 15 — 'Build Your Own Trade-Off Analysis' — is the original, if you want it."* Page
   numbers are decorative once the post works without the book, they are wrong for anyone holding a
   paperback or an ebook, and PDF page numbers leak the pipeline outright.
2. **Open on a scene, not a thesis.** A real room, real people, a specific number. Ninety minutes.
   Three people. The fifth thread. `ttest_ind` returning in a millisecond. No abstract nouns until
   the reader is already inside something.
3. **Write in first person, with a stake.** The drafts have no `I` anywhere. Admit the failure that
   led you here — *"a book I had already failed to finish twice."* This is what makes it a post
   rather than a summary.
4. **Paragraphs of one to three sentences.** These are read on phones. The drafts run 5–8 sentence
   blocks with no whitespace rhythm.
5. **Headings are claims, not labels.** Kill `## Promise`, `## The idea:`, `## The backward
   dependency trail`, `## Why the earlier chapters suddenly matter` — they repeat verbatim across
   all 14 and say nothing. Use `## Stop scoring. Use low / medium / high.`
6. **One blockquote carrying the shareable line.** Exactly one per post, ideally two. It is the
   sentence someone screenshots. *"Context doesn't add detail to a decision. It deletes the parts
   of the decision that were never yours."*
7. **One visual asset per post.** A table, a code block, or a scenario list. 200KB of unbroken
   prose across the shelf and not one code block — even where the source is literally about code
   (`ttest_ind`, `sumA`/`sumB` false sharing). Pure upside.
8. **Chapter numbers out of the body.** *"Chapter 12 supplies a laboratory"* means nothing to
   someone who hasn't read Chapters 1–11. Describe the idea; drop the number.
9. **Cut the hedges.** "may be directionally useful", "can still expose", "That may be true, but".
   Say it or delete it.

## Invention: where the line is

Both rewrites so far composed material that isn't in the book, and the distinction matters more
than the word count does.

**Allowed:** a scene in the narrator's voice. The three people in the architecture meeting, the
four-month-old model file and eleven silent days — none of those are the book's examples. They are
framing, they are signalled as first-person experience, and every failure mode inside them is one
the source actually names.

**Not allowed:** anything a reader would take as a claim about the book. One draft rendered the
influence model as "reach times durability, divided by how much still depends on you." The book
states the three factors and no formula; the sentence read as if quoting one. Cut.

The test: if the sentence were wrong, would the reader blame the author or the narrator? Narrator
is fine. Author is not.

## Cross-essay repetition — check the shelf, not just the essay

Every rule in this recipe pushes toward sameness, and each essay is written without sight of the
others. A shelf-wide pass after every batch is mandatory. What the first full pass actually caught:

- **The closing pointer became one sentence, fourteen times.** Two templates covered 11 of 14, both
  copied from this recipe's own worked example. Do not give writers a closing sentence to imitate —
  give them the *constraint* (name the chapter, never a page) and let each ending differ.
- **Every mission opened "You don't need the book for this part."** 14 of 14, then "You need one…"
  in 9 of them. State the promise, not the phrasing.
- **Six Thursdays.** Asked for a plausible weekday, every model reaches for Thursday. Also two
  essays opened "forty minutes" into a meeting. Redate and rescene on sight.

Run this after each batch:

    python3 - <<'EOF'
    import re,glob,collections
    f={x.split('/')[-1][:-3]:open(x).read() for x in glob.glob('essays/*.md')}
    c=collections.defaultdict(set)
    for s,t in f.items():
        w=re.findall(r"[a-z']+",re.sub(r'```.*?```','',t,flags=re.S).lower())
        for i in range(len(w)-4): c[' '.join(w[i:i+5])].add(s)
    for n,k in sorted(((len(v),k) for k,v in c.items() if len(v)>=3),reverse=True)[:10]:
        print(n,k)
    EOF

Nothing should appear in three or more essays. Also diff the opening lines and the closing lines
side by side — n-grams miss structural sameness, like four essays opening in a meeting room.

## The ending

Every draft ends with homework: read exact pages, carry three questions, produce a five-field
ledger. That's a good study aid and a terrible post ending.

Keep the artifact — it is the differentiator — but make it doable **now**, from the post alone,
and open the section by saying so: *"You don't need the book for this part."* Then a twenty-minute
thing with a template. The book is the optional deeper cut on the last line.

Mechanically: the closing section must be preceded by an HTML comment `<!--mission-->` so
`site/build.mjs` can wrap it. That marker replaced the old fixed-heading regex, so headings are now
free. Set `missionLabel` in `site/catalog.mjs` for the section's eyebrow text (defaults to
"Your one reading mission").

## Keep the conceit loud

"I read fourteen IT books starting from the last chapter" is the shareable asset — more than any
individual post. Right now that frame lives only in the site chrome. **State it in the prose of
every essay**, near the top, as a short section. Removing the receipts removes friction; the
backward-reading frame should get *more* prominent, not less.

**But it converges, reliably, and banning phrasings does not stop it.** Writers working from this
recipe cannot see each other's output, so they reach for the same sentence. Round one produced "I
opened this book at the last chapter" and "I opened this one at the last chapter." Round two, with
those four phrasings explicitly forbidden, produced "an experiment on fourteen technical books" and
"reading fourteen technical books this year" — different words, identical move.

So the constraint is on the **shape**, not the wording. Every essay's conceit section must do its
job differently. Shapes already spent:

| Essay | Shape |
|---|---|
| software-architecture-hard-parts | Confession of failure — bounced off it twice |
| machine-learning-engineering | The book was a lookup table, never read straight |
| staff-engineers-path | Misfiled by genre — "career advice, the stuff I skim" |
| refactoring-to-rust | The series stated outright — an experiment across the shelf |
| practical-systems-programming-go | Why *this* book earns the order — only the ending makes promises |
| database-internals | You needed one answer and the index sent you to the back |
| defending-apis | A colleague quoted the ending you had never reached |
| performance-analysis-tuning-modern-cpus | Read it cover to cover once and retained nothing |
| think-stats | The ending contradicted what the early chapters implied |
| learning-systems-thinking | The ending named something you had lived inside without a word for |
| efficient-cloud-finops | You skipped to the end because everything earlier had already failed |
| designing-electronics-that-work | Handed the book by someone leaving the team |
| web-hacking-arsenal | Recommended for the one chapter nobody reads |
| engineering-leadership | The ending is what the author cared about; the rest is scaffolding |

All fourteen shapes are now spent. Any future essay needs a new one.

Assign one per essay rather than letting the writer pick, and check the result against this table
before accepting it. **Assigning is not enough — verify.** One run was given an assigned shape *and*
an explicit ban on the "fourteen technical books" phrasing, and opened with that phrasing anyway,
while a second essay in the same batch complied perfectly. It is a coin flip, so grep for it every
time.

Same failure mode governs punchlines: essay 1 ends a beat on "four seconds," so nothing else may.

## Paired edits — never rewrite the markdown alone

Rewriting an essay invalidates metadata in three other places:

- `site/catalog.mjs` — `title`, `payoff`, `mission`, `artifact`, `missionLabel`. These render in the
  essay hero and the shelf card. A stale entry advertises a mission the body no longer contains.
- `index.md` — the essay's blurb, which names the old artifact.
- `docs/` — generated; never edit by hand.

Note: `index.md` is **not** rendered by `build.mjs`. `homePage()` is hardcoded HTML. The
GitHub-readable index and the published home page are two separate surfaces.

Then: `npm run build && npm run check`.

## Difficulty order for the remaining 13

- **Easiest** (concrete hook already present, just needs a code block):
  `think-stats`, `performance-analysis-tuning-modern-cpus`, `database-internals`
- **Hardest**: `staff-engineers-path` — carries all three citation formats *plus* an italic
  metadata dek under the title. `defending-apis` and `engineering-leadership` are citation-dense
  throughout.
