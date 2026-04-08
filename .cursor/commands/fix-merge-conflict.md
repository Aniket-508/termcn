Fix all merge conflicts on the current Git branch non-interactively and make the repo buildable and tested.

Requirements and constraints:
- Operate from the repository root. If not in a Git repo, stop and report.
- Do not ask the user for input. Choose sensible defaults and explain decisions in a brief summary.
- Prefer minimal, correct changes that preserve both sides' intent when possible.
- Use non-interactive flags for any tools you invoke.
- Do not push or tag; only commit locally.

High-level plan:
1) Detect conflicts
   - Run: git status --porcelain | cat
   - Collect files with conflict markers (U statuses or files containing <<<<<<< / ======= / >>>>>>>).
2) Resolve conflicts per file
   - Open each conflicting file and remove conflict markers.
   - Merge both sides logically when feasible. If mutually exclusive, pick the variant that:
     - Compiles and passes type checks, and
     - Preserves existing public APIs and behavior.
   - Language-aware strategy:
     - package.json/pnpm-lock.yaml/yarn.lock: merge keys conservatively; run install to regenerate lockfiles.
     - .lock files (package-lock.json, yarn.lock, pnpm-lock.yaml): prefer regenerating via the package manager rather than manual edits.
     - Generated files and build artifacts: prefer keeping them out of version control if applicable; otherwise prefer current branch (ours).
     - Config files: preserve union of safe settings; avoid deleting required fields.
     - Text/markdown: include both unique content, deduplicate headings.
     - Binary files: prefer current branch (ours) unless project docs indicate otherwise.
3) Validate
   - If Node/TypeScript/JS present: install deps if manifests changed (use --frozen-lockfile false equivalents), then run lint/typecheck/build/tests if available.
   - If other ecosystems detected (Python, Go, etc.), run their standard build/tests when available.
4) Finalize
   - Stage all resolved files and any regenerated lockfiles.
   - Create a single commit with message: "chore: resolve merge conflicts".
   - Output a concise summary of files touched and notable resolution choices.

Operational guidance:
- Assume the user isn’t available; make best-effort decisions. If a resolution is ambiguous and blocks build/tests, prefer the variant that compiles and green-tests.
- If a file still contains conflict markers after your first pass, revisit and resolve them before proceeding.
- For large refactors causing conflicts, prefer keeping consistent imports, types, and module boundaries. Use exhaustive switch guards in TypeScript and explicit type annotations where needed.
- Keep edits minimal and readable; avoid reformatting unrelated code.

Deliverables:
- A clean working tree with all conflicts resolved.
- Successful build/tests where applicable.
- One local commit containing the resolutions.
