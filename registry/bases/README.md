# Registry Bases

This folder mirrors the shadcn `registry/bases` layout for Termcn's internal
source trees.

- `ink/` contains the installable Ink source that powers the public component
  and hook registry output.
- `opentui/` contains internal OpenTUI React components for docs previews and
  future Termcn CLI support.
- `../themes/` contains the shared theme source used across both bases.

The public registry stays flat for shadcn directory compatibility. Internal
development should prefer the base trees in this folder.

The public build now generates a temporary flat registry workspace from
`registry/bases/ink` during `pnpm registry:build`, so the repo itself only needs
to keep the base trees.
