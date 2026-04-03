# termcn

A Next.js app and registry for publishing **shadcn-compatible** UI blocks. It ships with docs, a landing page, and a workflow to build and deploy your component registry.

## Features

- **Registry-ready** — Manifest + `pnpm registry:build` output under `public/r/`
- **Documentation** — Fumadocs-powered docs
- **CLI install** — Consumers use `npx shadcn@latest add <registry-url>`

## Quick Start

1. Clone or fork the repo and install:

```bash
pnpm install
```

2. Replace the placeholder at `registry/new-york/your-component.tsx`.

3. Update [`registry.json`](registry.json) with your component entries.

4. Build the registry:

```bash
pnpm registry:build
```

5. Run the app:

```bash
pnpm dev
```

6. Deploy and share your registry URL.

## Usage

After deploy, install a published item with:

```bash
npx shadcn@latest add https://your-domain.com/r/your-component.json
```

## Project Structure

```
├── registry/
│   └── new-york/           # Registry source components
│       └── your-component.tsx
├── registry.json           # Registry manifest
├── content/docs/           # Documentation (MDX)
├── app/                    # Next.js app
└── public/r/               # Built registry (generated)
```

## Scripts

- `pnpm dev` — Development server
- `pnpm build` — Production build (runs registry build first)
- `pnpm registry:build` — Emit JSON under `public/r/`

## License

MIT
