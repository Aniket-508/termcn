# Ink Best Practices

Best practices extracted from deep analysis of the Ink source code, tests, and examples.

## Rule Files

| File | Topic |
|------|-------|
| [performance.md](./performance.md) | FPS tuning, Static, memoization, incremental rendering |
| [components.md](./components.md) | Box, Text, Static, Transform, Newline, Spacer |
| [hooks.md](./hooks.md) | useInput, useApp, useFocus, useFocusManager, useCursor |
| [core.md](./core.md) | render(), renderToString(), error handling, environment behavior |

## Critical Rules (Always Apply)

1. **ALL text must be inside `<Text>`** — raw strings in `<Box>` throw runtime errors
2. **`<Text>` is a leaf** — cannot contain `<Box>` or structural components
3. **`<Box>` is always flexbox** — cannot disable `display: flex`
4. **NEVER use `process.exit()`** — use `useApp().exit()` for proper cleanup
5. **Tab/Shift+Tab are reserved** — intercepted by the focus system, not received by `useInput`
6. **Ctrl+C is intercepted** — by default it exits the app; set `exitOnCtrlC: false` to handle it yourself
7. **`<Static>` items are immutable** — only append new items; mutations to existing items are ignored
8. **Always `key` in `<Static>`** — each rendered element needs a stable, unique `key`
9. **Check `isRawModeSupported`** — raw mode is unavailable in CI and piped input scenarios
10. **Yoga units are characters/lines** — not pixels; `padding={1}` = 1 character horizontally, 1 line vertically
