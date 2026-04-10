# Component Best Practices

## `<Box>`

### Rule: Box is Always Flexbox

Every `<Box>` is `display: flex`. You cannot disable it. Default axis is **row** (horizontal).

```jsx
// Horizontal layout (default)
<Box>
  <Text>Left</Text>
  <Text>Right</Text>
</Box>

// Vertical layout
<Box flexDirection="column">
  <Text>Top</Text>
  <Text>Bottom</Text>
</Box>
```

### Rule: All Text Must Be Inside `<Text>`

Raw strings directly in `<Box>` throw a runtime error:

```jsx
// WRONG — throws: "Text string "Hello" must be rendered inside <Text>"
<Box>Hello</Box>

// CORRECT
<Box><Text>Hello</Text></Box>
```

### Rule: Yoga Units Are Characters, Not Pixels

`padding`, `margin`, `width`, `height` are measured in **character cells** (horizontal) and **lines** (vertical):

```jsx
<Box padding={1}>   // 1 space on each side
<Box marginTop={2}> // 2 blank lines above
<Box width={40}>    // 40 characters wide
```

Percentage strings work when the parent has an explicit size:

```jsx
// WRONG — parent has no width, 50% = nothing
<Box><Box width="50%">...</Box></Box>

// CORRECT
<Box width={80}><Box width="50%">...</Box></Box>
```

### Rule: Understand Background Color Inheritance

`backgroundColor` on `<Box>` fills the **entire box area**. Child `<Text>` automatically inherits this background via React context:

```jsx
<Box backgroundColor="green">
  <Text>This text has green background</Text>
  <Text backgroundColor="red">This overrides to red (text glyphs only)</Text>
</Box>
```

Key distinction: `Box` fills the box area; `Text` only colors the character glyphs.

### Rule: Use `position: 'absolute'` for Overlay Elements

Ink supports `relative` (default) and `absolute` positioning. Absolute elements are positioned relative to the root:

```jsx
<Box>
  <Box flexGrow={1}><Text>Main content</Text></Box>
  <Box position="absolute" marginTop={1}>
    <Text>Overlay badge</Text>
  </Box>
</Box>
```

### Rule: Use `overflow: 'hidden'` to Clip Content

Content that exceeds box dimensions can be clipped:

```jsx
<Box width={20} overflow="hidden">
  <Text>This very long text gets clipped at 20 chars</Text>
</Box>
```

### Common Box Flex Defaults vs CSS

| Property | Ink Default | CSS Default |
|----------|-------------|-------------|
| `flexWrap` | `'nowrap'` | `'wrap'` |
| `flexDirection` | `'row'` | `'row'` |
| `flexGrow` | `0` | `0` |
| `flexShrink` | `1` | `1` |
| `alignItems` | `'stretch'` | `'stretch'` |

Note: Ink **does not wrap by default** — set `flexWrap="wrap"` explicitly if needed.

---

## `<Text>`

### Rule: Text is a Leaf Component

`<Text>` cannot contain `<Box>` or structural components:

```jsx
// WRONG — throws: "<Box> can't be nested inside <Text>"
<Text>Hello <Box>World</Box></Text>

// CORRECT — nest Text inside Text
<Text>Hello <Text bold>World</Text></Text>
```

### Rule: Null and Undefined Children Are Safe

`<Text>` with `undefined` or `null` children renders nothing (no error):

```jsx
// All fine — renders nothing
<Text>{undefined}</Text>
<Text>{null}</Text>
<Text>{condition && value}</Text>
```

### Rule: Know ANSI Sequence Handling

`<Text>` strips cursor movement sequences but preserves color/style codes:

| Sequence Type | Behavior |
|---|---|
| SGR color (`\x1b[32m`, `\x1b[0m`) | **Preserved** |
| OSC hyperlinks (`\x1b]8;;URL\x07`) | **Preserved** |
| Cursor movement (`\x1b[1A`, `\x1b[2K`) | **Stripped** |
| Cursor position (`\x1b[5;10H`) | **Stripped** |

If you're passing pre-colored strings (e.g. from `chalk`), they work correctly.

### Rule: Choose the Right `wrap` Mode

```jsx
<Box width={10}>
  <Text wrap="wrap">Hello World</Text>      // "Hello\nWorld" (default)
  <Text wrap="truncate">Hello World</Text>  // "Hello W…"
  <Text wrap="truncate-middle">Hello World</Text>  // "Hel…rld"
  <Text wrap="truncate-start">Hello World</Text>   // "…o World"
</Box>
```

Use `truncate` variants for single-line displays (status bars, file paths, etc.).

### Rule: Wide Characters Work Correctly

CJK, emoji, and emoji with variation selectors are handled. Terminal output aligns correctly:

```jsx
<Text>こんにちは</Text>   // 10 columns wide (each char = 2)
<Text>🎉 Done!</Text>    // emoji measured correctly
<Text>🌡️ Temp</Text>    // variation selector handled
```

---

## `<Static>`

### Rule: Static Only for Append-Only Output

`<Static>` renders items **once**, permanently. It tracks which items have been rendered and only processes new ones.

```jsx
// Correct usage — items only grow
const [completed, setCompleted] = useState([]);
// Add new item:
setCompleted(prev => [...prev, {id: Date.now(), text: 'Task done'}]);

<Static items={completed}>
  {item => <Box key={item.id}><Text>✔ {item.text}</Text></Box>}
</Static>
```

### Rule: Never Mutate Items Already in Static

Previously rendered items are permanently in the terminal output. Mutations are ignored:

```jsx
// WRONG — update to existing item won't re-render it
setCompleted(prev =>
  prev.map(item => item.id === id ? {...item, status: 'failed'} : item)
);

// CORRECT — show updates in a separate dynamic area, or append a new item
setCompleted(prev => [...prev, {id: Date.now(), text: 'Task FAILED', type: 'error'}]);
```

### Rule: Always Use Stable Keys in Static

```jsx
// WRONG — index as key breaks if items are ever reordered
<Static items={items}>
  {(item, index) => <Box key={index}>...</Box>}
</Static>

// CORRECT — stable item ID
<Static items={items}>
  {item => <Box key={item.id}>...</Box>}
</Static>
```

### Understanding Static Rendering Order

Output: Static content appears **above** dynamic content:

```
[static item 1]
[static item 2]
[dynamic content - updates in place]
```

---

## `<Transform>`

### Rule: Transform Receives Output Per Line

The `transform` function is called once per line of rendered output:

```jsx
// index = line number (0-based)
<Transform transform={(line, index) => `[${index}] ${line}`}>
  <Text>Line one{'\n'}Line two</Text>
</Transform>
// Output:
// [0] Line one
// [1] Line two
```

### Rule: Keep Transform Functions Pure and Fast

Transform is called every render, for every line of content:

```jsx
// BAD — closure with state, potential side effects
<Transform transform={(line) => { count++; return line.toUpperCase(); }}>

// GOOD — pure function
const toUpper = (line) => line.toUpperCase();
<Transform transform={toUpper}>
```

### Rule: Use `accessibilityLabel` for Screen Reader Compatibility

When visual transforms produce non-readable output (gradients, box-drawing), provide an accessible label:

```jsx
<Transform
  transform={addGradient}
  accessibilityLabel="Status: Done"
>
  <Text>✓✓✓ Done ✓✓✓</Text>
</Transform>
```

---

## `<Newline>`

### Rule: Newline Must Be Inside `<Text>`

`<Newline>` renders `\n` characters and must live inside a `<Text>` context:

```jsx
// WRONG — Newline is not a direct Box child
<Box>
  <Text>Line 1</Text>
  <Newline />
  <Text>Line 2</Text>
</Box>

// CORRECT — inside Text
<Text>
  Line 1
  <Newline />
  Line 2
</Text>

// For multi-line layouts, use flexDirection="column" on Box instead
<Box flexDirection="column">
  <Text>Line 1</Text>
  <Text>Line 2</Text>
</Box>
```

---

## `<Spacer>`

### Rule: Spacer Fills Remaining Space on Main Axis

`<Spacer>` is `<Box flexGrow={1} />`. It expands to fill available space:

```jsx
// Push items to opposite ends (horizontal)
<Box>
  <Text>Left</Text>
  <Spacer />
  <Text>Right</Text>
</Box>

// Push to top/bottom (vertical)
<Box flexDirection="column" height={10}>
  <Text>Top</Text>
  <Spacer />
  <Text>Bottom</Text>
</Box>
```

The parent `<Box>` must have a defined size (explicit or constrained by terminal) for `Spacer` to have space to fill.

---

## Anti-Patterns Summary

| Anti-Pattern | Problem | Fix |
|---|---|---|
| `<Box>Hello</Box>` | Runtime error | `<Box><Text>Hello</Text></Box>` |
| `<Text><Box>...</Box></Text>` | Runtime error | Flatten or nest `<Text>` in `<Text>` |
| Inline style `{{padding: 1}}` | Yoga recalc every render | Hoist or `useMemo` |
| Mutating `<Static>` items | Silently ignored | Append new items instead |
| `<Static>` with array index key | Breaks on reorder | Use stable item ID |
| `<Newline>` as direct `<Box>` child | Wrong output | Use `flexDirection="column"` |
| `<Spacer>` in unsized parent | No effect | Ensure parent has constrained size |
| `width="50%"` without parent size | No effect | Set parent `width` explicitly |
