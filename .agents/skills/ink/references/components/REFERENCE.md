# Ink Components

Reference for all built-in Ink components.

## Component Overview

| Component | Purpose | File |
|-----------|---------|------|
| `<Text>` | Display and style text | [text.md](./text.md) |
| `<Box>` | Layout container (Flexbox), borders, backgrounds | [box.md](./box.md) |
| `<Newline>` | Insert line breaks | [utilities.md](./utilities.md) |
| `<Spacer>` | Flexible space filler | [utilities.md](./utilities.md) |
| `<Static>` | Permanently rendered output | [utilities.md](./utilities.md) |
| `<Transform>` | Transform string output | [utilities.md](./utilities.md) |

## Component Chooser

```
Need a component?
├─ Styled text (color, bold, italic, etc.) -> text.md
├─ Layout container with flexbox -> box.md
├─ Borders around content -> box.md (borderStyle)
├─ Background color -> box.md (backgroundColor)
├─ Line break in text -> utilities.md (Newline)
├─ Push elements apart -> utilities.md (Spacer)
├─ Log/permanent output -> utilities.md (Static)
└─ Text transform (uppercase, gradient) -> utilities.md (Transform)
```

## Quick Import

```jsx
import {Text, Box, Newline, Spacer, Static, Transform} from 'ink';
```

## Key Rules

1. **All text must be in `<Text>`** — raw strings in `<Box>` throw errors
2. **`<Text>` only contains text and nested `<Text>`** — no `<Box>` inside `<Text>`
3. **`<Box>` is always flexbox** — every `<Box>` is `display: flex`
4. **`<Static>` only renders new items** — previously rendered items don't update

## See Also

- [Layout](../layout/REFERENCE.md) - Flexbox layout system
- [Hooks](../hooks/REFERENCE.md) - All hooks reference
- [Core API](../core/api.md) - render(), renderToString()
