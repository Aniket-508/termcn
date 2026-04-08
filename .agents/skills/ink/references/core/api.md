# Core API Reference

## render(tree, options?)

Mount a component and render the output. Returns an `Instance`.

```jsx
import {render} from 'ink';

const instance = render(<MyApp />);
```

### Options

```jsx
render(<MyApp />, {
	stdout: process.stdout,         // Output stream (default: process.stdout)
	stdin: process.stdin,           // Input stream (default: process.stdin)
	stderr: process.stderr,        // Error stream (default: process.stderr)
	exitOnCtrlC: true,             // Exit on Ctrl+C (default: true)
	patchConsole: true,            // Patch console.* methods (default: true)
	debug: false,                  // Render each update separately (default: false)
	maxFps: 30,                    // Max frames per second (default: 30)
	incrementalRendering: false,   // Only update changed lines (default: false)
	concurrent: false,             // React Concurrent mode (default: false)
	isScreenReaderEnabled: false,  // Screen reader support (default: env check)
	onRender: ({renderTime}) => {},// Callback after each render
	kittyKeyboard: undefined,      // Kitty keyboard protocol options
});
```

### Instance

The object returned by `render()`:

```jsx
const {rerender, unmount, waitUntilExit, cleanup, clear} = render(<MyApp />);
```

#### rerender(tree)

Replace or update the root node:

```jsx
const {rerender} = render(<Counter count={1} />);
rerender(<Counter count={2} />);
```

#### unmount()

Manually unmount the whole app:

```jsx
const {unmount} = render(<MyApp />);
unmount();
```

#### waitUntilExit()

Returns a promise that settles when the app unmounts:

```jsx
const {waitUntilExit} = render(<MyApp />);
await waitUntilExit(); // resolves after unmount
```

It resolves with the value passed to `exit(value)` and rejects with the error passed to `exit(error)`.

#### cleanup()

Delete the internal Ink instance for the current stdout. Useful in tests where you need `render()` to create a fresh instance.

#### clear()

Clear rendered output:

```jsx
const {clear} = render(<MyApp />);
clear();
```

## renderToString(tree, options?)

Render a React element to a string synchronously. Does not write to stdout, does not set up terminal listeners.

```jsx
import {renderToString, Text, Box} from 'ink';

const output = renderToString(
	<Box padding={1}>
		<Text color="green">Hello World</Text>
	</Box>,
);

console.log(output);
```

### Options

```jsx
renderToString(<MyApp />, {
	columns: 80,  // Virtual terminal width (default: 80)
});
```

**Notes:**
- Terminal hooks (`useInput`, `useStdin`, `useApp`, etc.) return default no-op values
- `useEffect` callbacks execute but state updates don't affect the returned output
- `useLayoutEffect` callbacks fire synchronously and **will** affect the output
- `<Static>` is supported — its output is prepended

## measureElement(ref)

Measure the dimensions of a `<Box>` element. Returns `{width, height}`.

**Important:** Returns `{width: 0, height: 0}` during render. Call from `useEffect`, `useLayoutEffect`, input handlers, or timer callbacks.

```jsx
import {useRef, useEffect} from 'react';
import {render, measureElement, Box, Text} from 'ink';

const Example = () => {
	const ref = useRef();

	useEffect(() => {
		const {width, height} = measureElement(ref.current);
		// width = 100, height = 1
	}, []);

	return (
		<Box width={100}>
			<Box ref={ref}>
				<Text>This box will stretch to 100 width</Text>
			</Box>
		</Box>
	);
};
```
