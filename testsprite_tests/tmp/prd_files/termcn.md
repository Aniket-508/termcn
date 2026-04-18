# termcn — Product requirements (testing)

## Overview

termcn is a documentation and marketing site for a registry of terminal UI components (React/Ink), distributed in a shadcn-style workflow.

## Goals

- Visitors understand what termcn is and how to install components.
- Developers browse MDX docs, examples, and registry metadata without signing in.
- Site header navigation works on all major pages; footer is credits-only (author / GitHub), not a secondary docs nav.

## In scope for QA

- Home (`/`) loads; primary CTAs navigate to docs.
- Docs shell (`/docs`, nested pages): sidebar, content, TOC where present, no broken critical links on sampled pages.
- Per-page markdown via `/llms.mdx/docs/.../content.md` matches docs content.
- Command search copies install commands (⌘C) and navigates on select; terminal theme picker updates live previews; Vercel Analytics records tracked copy events.
- Changelog is intentionally omitted from navigation; do not require discovering it via sidebar.
- No authentication flows (site is public).

## Out of scope

- Validating every static doc URL (hundreds of pages).
- Third-party font or OG image CDN availability.
