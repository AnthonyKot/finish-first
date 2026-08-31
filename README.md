# Finish First

A reader-facing collection of fourteen source-backed essays that begin with the valuable idea near the
end of a technical book, trace its prerequisites backward, and finish with one exact reading mission.

The published HTML book is generated from the original Markdown essays. Source PDFs and full-text
extractions remain local and ignored.

## Build locally

```bash
npm install
npm run build
npm run check
python3 -m http.server 4173 --directory docs
```

Then open `http://localhost:4173`.

## Repository structure

- `essays/` — original finish-first companion prose
- `corpus/` — edition manifests and verified page structure
- `notes/` — evidence-backed editorial pass and skip records
- `site/` — static-book generator and visual system
- `docs/` — generated GitHub Pages site

The project publishes no source book, page image, or full extraction.
