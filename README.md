# Mehrzad Babaei — Portfolio

A modern, animated developer portfolio built with Next.js, TypeScript, and Tailwind CSS. Features auto-synced projects from GitHub, scroll-triggered animations, and a fully responsive design.

**Live:** [portfolio.zadprogramming.com](https://portfolio.zadprogramming.com)

## Tech Stack

- **Framework:** Next.js 16 (App Router, ISR)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Deployment:** Vercel

## Features

- Animated hero section with typewriter effect and floating code editor
- Scroll-triggered section animations with staggered reveals
- Skill cards organized by category (Frontend, Backend, Database, Cloud & DevOps)
- Interactive experience timeline
- GitHub-powered project cards — auto-fetched via GitHub API with ISR caching
- On-demand revalidation webhook (`/api/revalidate`) for instant updates
- Contact form with validation
- Fully responsive (mobile, tablet, desktop)

## Auto-Sync Projects from GitHub

Add this marker to any repo's README to automatically include it in the portfolio:

```markdown
<!-- add-to-portfolio
title: "Project Name"
description: "What it does"
tags: ["React", "Node.js"]
live: "https://example.com"
image: "screenshot.png"
-->
```

The portfolio re-fetches from GitHub every hour via ISR, or instantly when triggered by a webhook.

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm run build
npm run start
```

## Project Structure

```
app/
├── layout.tsx              Root layout (fonts, metadata)
├── page.tsx                Home page (assembles all sections)
├── globals.css             Global styles
└── api/revalidate/         Webhook for on-demand ISR
components/
├── Navbar.tsx              Sticky glass navbar + mobile menu
├── Hero.tsx                Animated hero with code editor
├── About.tsx               Bio, photo, stat cards
├── Skills.tsx              Categorized skill grid
├── Experience.tsx          Animated vertical timeline
├── Projects.tsx            GitHub-powered project cards
├── Contact.tsx             Contact form + social links
└── Footer.tsx              Footer
lib/
├── data.ts                 Static data (skills, experience, nav)
└── github.ts               GitHub API fetcher + README parser
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `REVALIDATE_SECRET` | Secret token for the `/api/revalidate` webhook |

## License

MIT
