# Gotchas

## Text Outside `<Text>`

All text must be wrapped in `<Text>`. Raw strings in `<Box>` will throw:

```jsx
// WRONG - throws error
<Box>Hello World</Box>

// CORRECT
<Box><Text>Hello World</Text></Box>
```

## `<Box>` Inside `<Text>`

`<Text>` only allows text nodes and nested `<Text>`. No `<Box>` inside `<Text>`:

```jsx
// WRONG - throws error
<Text>Hello <Box>World</Box></Text>

// CORRECT
<Text>Hello <Text bold>World</Text></Text>
```

## Process Not Exiting

An Ink app stays alive while there's async work in the event loop. If your app renders once and should exit, make sure there are no lingering timers or listeners.

```jsx
// Problem: interval keeps process alive forever
useEffect(() => {
	setInterval(() => {}, 1000);
}, []);

// Fix: clean up timers
useEffect(() => {
	const timer = setInterval(() => {}, 1000);
	return () => clearInterval(timer);
}, []);
```

To exit programmatically, use `useApp().exit()`:

```jsx
const {exit} = useApp();
exit(); // unmounts and exits
```

## DEV Environment Variable Hanging

If `DEV` is set but React DevTools server is not running, the process will hang trying to connect. Only set `DEV=true` when you have `npx react-devtools` running.

## Console Output Mixing

Without `patchConsole: true` (default), `console.log()` output would overwrite Ink's rendered output. Ink patches console methods to render them above the main output.

If you need to disable this:
```jsx
render(<MyApp />, {patchConsole: false});
```

## CI Rendering

On CI (detected via `CI` env var), Ink only renders the last frame on exit. This is because most CI environments don't support ANSI escape sequences for overwriting output.

Override with `CI=false` if your CI supports full terminal rendering.

## Flickering

If the UI flickers, try:

1. **Incremental rendering**: Only update changed lines
   ```jsx
   render(<MyApp />, {incrementalRendering: true});
   ```

2. **Lower maxFps**: Reduce update frequency
   ```jsx
   render(<MyApp />, {maxFps: 10});
   ```

3. **Avoid unnecessary re-renders**: Use `React.memo`, `useMemo`, `useCallback`.

## useInput Not Receiving Input

`useInput` requires stdin to be in raw mode. Ink handles this automatically when `useInput` is active. But if you have multiple `useInput` hooks, use the `isActive` option to control which one is active:

```jsx
useInput(handler, {isActive: isFocused});
```

## `<Static>` Only Renders New Items

`<Static>` renders items once and ignores changes to previously rendered items. If you update an item in the array, the previously rendered version stays:

```jsx
// Adding new items works
setItems(prev => [...prev, newItem]);

// Modifying existing items does NOT re-render them in Static
setItems(prev => prev.map(item =>
	item.id === id ? {...item, status: 'done'} : item
));
```

## measureElement Returns Zero

`measureElement()` returns `{width: 0, height: 0}` when called during render (before layout). Always call it from `useEffect` or `useLayoutEffect`:

```jsx
// WRONG - returns 0
const ref = useRef();
const size = measureElement(ref.current); // {width: 0, height: 0}

// CORRECT
useEffect(() => {
	const size = measureElement(ref.current); // actual dimensions
}, []);
```

## Percentage Width Requires Parent Size

Percentage widths only work when the parent has an explicit size:

```jsx
// WRONG - parent has no width, 50% of nothing is nothing
<Box>
	<Box width="50%"><Text>Half</Text></Box>
</Box>

// CORRECT
<Box width={80}>
	<Box width="50%"><Text>Half</Text></Box>
</Box>
```

## Key Prop in Lists

Always provide `key` when rendering lists, especially in `<Static>`:

```jsx
<Static items={items}>
	{item => (
		<Box key={item.id}>
			<Text>{item.name}</Text>
		</Box>
	)}
</Static>
```

## Concurrent Mode Caveats

When using `concurrent: true`:
- Some tests may need `act()` to properly await updates
- The option only takes effect on the first render for a given stdout
- Call `unmount()` first if you need to change rendering mode

## Kitty Keyboard Protocol

When enabled, input behavior changes:
- Non-printable keys (F1-F35, modifiers) produce empty `input` string
- Ctrl+letter works as expected (`input` is the letter, `key.ctrl` is true)
- `Ctrl+I` vs `Tab` are distinguished
- `key.eventType` reports `'press'`, `'repeat'`, or `'release'`

## Common Errors

### "Text string must be rendered inside a `<Text>` component"

You have raw text outside `<Text>`. Wrap it.

### "Objects are not valid as a React child"

You're passing an object where text is expected. Convert to string first.

### "Each child in a list should have a unique key prop"

Add `key` to list items, especially in `<Static>`.
