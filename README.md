# Zad Babaei Portfolio

A production Next.js portfolio for presenting projects, experience, skills, and contact information. Projects can sync from GitHub README markers and be curated through a small admin surface backed by Vercel Blob.

Live site: https://portfolio.zadprogramming.com

## What it demonstrates

- **Next.js App Router:** Static portfolio sections, dynamic admin routes, and route handlers for admin/project APIs.
- **GitHub project sync:** Repositories with `<!-- add-to-portfolio -->` markers are fetched from the GitHub API and cached with ISR.
- **Manual project curation:** Admin routes can hide repositories, control display order, and add manual projects through Vercel Blob storage.
- **On-demand revalidation:** `/api/revalidate` refreshes the home page cache when called with `REVALIDATE_SECRET`.
- **Responsive presentation UI:** Animated hero, project cards, experience timeline, skills, resume link, and contact form.
- **Vercel-ready deployment:** Uses Next.js image remote patterns for GitHub/OpenGraph/Vercel Blob assets.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion, react-type-animation |
| Icons | React Icons |
| Storage | Vercel Blob for admin project config |
| Deployment | Vercel |

## Repository layout

```text
portfolio/
  app/                  App Router pages and route handlers
  app/admin/            Admin login and project dashboard UI
  app/api/              Admin/project and revalidation APIs
  components/           Portfolio sections and floating nav
  lib/                  GitHub sync, project config, static data, admin auth
  public/               Resume and images
```

## Project markers

Add this marker to a repository README to include it in the portfolio sync:

```markdown
<!-- add-to-portfolio
title: "Project Name"
description: "What it does"
tags: ["React", "Node.js"]
live: "https://example.com"
image: "docs/screenshot.png"
-->
```

If a marker omits `image`, the site falls back to GitHub OpenGraph imagery for that repo.

## Local setup

```bash
npm ci
npm run dev
```

The development server runs at `http://localhost:3000`.

## Validation

```bash
npm ci
npm run typecheck
npm run build
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `REVALIDATE_SECRET` | Recommended | Secret token for `/api/revalidate` |
| `BLOB_READ_WRITE_TOKEN` | Required for admin writes | Vercel Blob token used by project config APIs |

## Portfolio notes

- Keep `public/MehrzadBabaeiResume.pdf` current with the deployed resume.
- Add screenshots to source repos and reference them from portfolio markers when a project has strong visuals.
- Use the admin page for ordering/manual overrides instead of hardcoding project cards.

<!-- add-to-portfolio -->

## License

MIT
