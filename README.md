# termcn

A Next.js-powered shadcn-compatible registry for Ink terminal UI components.

## Features

- 113 Ink-based terminal components exposed through the shadcn registry format
- Registry source organized by type under `registry/ui`, `registry/hooks`, and `registry/themes`
- Static Fumadocs pages with client-side `ink-web` + `xterm.js` previews
- Bundled terminal theme provider and installable theme files

## Quick Start

```bash
pnpm install
pnpm dev
```

Build the registry output:

```bash
pnpm registry:build
```

## Install a Component

```bash
npx shadcn@latest add https://termcn.vercel.app/r/badge.json
```

## Project Structure

```text
├── registry/
│   ├── hooks/              # registry hook items
│   ├── themes/             # installable theme files
│   └── ui/                 # registry UI components
├── content/docs/           # generated component + theme docs
├── components/docs/        # browser preview components
├── app/                    # Next.js app
└── public/r/               # built registry JSON output
```

## Scripts

- `pnpm dev` starts the docs app locally.
- `pnpm registry:build` emits JSON under `public/r/`.
- `pnpm build` runs the registry build and the Next.js production build.

## License

MIT
