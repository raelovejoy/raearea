# raearea.net

Source for **[raearea.net](https://raearea.net/)** — Rae Lovejoy's personal web space, profile, and small collection of web experiments.

The site is intentionally lightweight: mostly static HTML, a custom domain, and a small Markdown-to-HTML build step for `/whoami`.

## Structure

```text
/
├── index.html              # sparse site map / front door
├── whoami/
│   ├── whoami.md           # canonical /whoami content
│   ├── page.html           # /whoami page template
│   ├── build.js            # Markdown → HTML build
│   ├── index.html          # generated output; committed for Pages
│   └── assets/
├── contact/                # contact page
├── hello/                  # hello page
├── hashpad/                # #hashpad experiment
├── index_files/            # shared images/assets
├── CNAME                   # raearea.net
└── .nojekyll               # serve files directly through GitHub Pages
```

## Editing `/whoami`

`whoami/whoami.md` is the source of truth.

```bash
npm run build
```

Commit both the Markdown source and generated `whoami/index.html`.

CI runs `npm run check` so generated HTML cannot silently drift from the source. The build uses only Node.js built-ins; there are no runtime or build dependencies to install.

## Publishing

The repository is structured for GitHub Pages with the custom domain declared in `CNAME`.

The generated site lives directly in the repository root, so Pages can publish the root of `main` without a separate deployment artifact. The `/whoami` HTML is generated before changes are merged rather than at request time.

## Design principle

`raearea.net` is a map, not a portfolio CMS. The homepage stays deliberately sparse; deeper context lives in `/whoami`, project sites, repositories, and writing elsewhere.
