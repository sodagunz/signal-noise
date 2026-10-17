# Signal to Noise

A small writing focused blog built with [Zola](https://www.getzola.org/). The design takes cues from [austere](https://www.getzola.org/themes/austere/), [Typography for Lawyers](https://typographyforlawyers.com/what-is-typography.html), and [This is a web page](https://justinjackson.ca/words.html). It uses no external fonts, analytics, or runtime dependencies.

## Run it

Install Zola 0.23 or later, or enter the pinned [devenv](https://devenv.sh/) shell:

```sh
devenv shell
```

Then run:

```sh
zola serve
```

Open the local address printed by Zola. To build a deployable static site, run `zola build`; the output goes to `public/`.

## Make it yours

1. Set `base_url`, `title`, `description`, and `extra.tagline` in `config.toml`.
2. Replace the sample essay in `content/writing/` and the introduction in `content/about.md`.
3. Add essays as Markdown files in `content/writing/`, each with a title, date, and description in TOML front matter.

```toml
+++
title = "A new thought"
date = 2026-10-17
description = "One sentence about this piece."
+++
```

Zola sorts the writing section by date. Neighbor links and the side tabs follow that order. The Atom feed is generated at `/atom.xml`.

The site works without JavaScript. The script adds a color theme switch, reading progress, copy link button, and left/right arrow shortcuts between essays. The page also has a table of contents on wide screens and print styles.

## Publish on GitHub Pages

The workflow in `.github/workflows/pages.yml` checks and builds the site on pull requests. Pushes to `main` also publish the generated `public/` directory to GitHub Pages. It takes the actual site URL from GitHub Pages, so project sites and custom domains get correct links.

Before the first deployment, connect this repository to GitHub and select **GitHub Actions** as the source in **Settings → Pages**. Then push `main`. The workflow needs no extra repository secret. Replace the sample content and `https://example.com` in `config.toml` with your final details before sharing links outside GitHub Pages; the workflow overrides that URL during its builds.
