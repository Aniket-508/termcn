# Ink Hooks

Reference for all built-in Ink hooks.

## Hook Overview

| Hook | Purpose | File |
|------|---------|------|
| `useInput` | Handle keyboard input | [input.md](./input.md) |
| `useApp` | Control app lifecycle (exit) | [app-lifecycle.md](./app-lifecycle.md) |
| `useStdin` | Access stdin stream and raw mode | [stdio.md](./stdio.md) |
| `useStdout` | Access stdout stream and dimensions | [stdio.md](./stdio.md) |
| `useStderr` | Access stderr stream and dimensions | [stdio.md](./stdio.md) |
| `useFocus` | Make component focusable | [focus.md](./focus.md) |
| `useFocusManager` | Programmatic focus control | [focus.md](./focus.md) |
| `useCursor` | Control cursor position (IME) | [focus.md](./focus.md) |
| `useIsScreenReaderEnabled` | Detect screen reader support | [focus.md](./focus.md) |

## Hook Chooser

```
Need a hook?
├─ Handle keyboard (arrows, letters, shortcuts) -> input.md (useInput)
├─ Exit the app programmatically -> app-lifecycle.md (useApp)
├─ Read raw stdin / check raw mode -> stdio.md (useStdin)
├─ Get terminal width/height -> stdio.md (useStdout)
├─ Write to stderr -> stdio.md (useStderr)
├─ Make a component focusable (Tab cycling) -> focus.md (useFocus)
├─ Control focus programmatically -> focus.md (useFocusManager)
├─ Show/hide cursor for IME -> focus.md (useCursor)
└─ Check screen reader mode -> focus.md (useIsScreenReaderEnabled)
```

## Quick Import

```jsx
import {
	useInput,
	useApp,
	useStdin,
	useStdout,
	useStderr,
	useFocus,
	useFocusManager,
	useCursor,
	useIsScreenReaderEnabled,
} from 'ink';
```

## See Also

- [Components](../components/REFERENCE.md) - All components
- [Core API](../core/api.md) - render(), renderToString()
- [Patterns](../core/patterns.md) - Common patterns using hooks
