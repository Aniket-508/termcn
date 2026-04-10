# useStdin, useStdout, useStderr

Access stdio streams and terminal dimensions from within components.

## useStdin

Access the stdin stream and check raw mode state.

### Import

```jsx
import {useStdin} from 'ink';
```

### Usage

```jsx
const {stdin, isRawModeSupported, setRawMode} = useStdin();
```

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `stdin` | `ReadableStream` | The stdin stream |
| `isRawModeSupported` | `boolean` | Whether raw mode is available |
| `setRawMode` | `(mode: boolean) => void` | Enable/disable raw mode |

### Raw Mode

Raw mode sends individual keypresses to your app instead of line-buffered input. `useInput` enables raw mode automatically.

```jsx
const {setRawMode, isRawModeSupported} = useStdin();

if (isRawModeSupported) {
	setRawMode(true); // Enable raw mode
}
```

**Note:** `setRawMode` is reference-counted. Each call to `setRawMode(true)` increments a counter; `setRawMode(false)` decrements it. Raw mode stays on until all callers release it.

### Reading Raw Data

```jsx
const {stdin} = useStdin();

useEffect(() => {
	const onData = (data) => {
		console.log('stdin:', data.toString());
	};
	stdin.on('data', onData);
	return () => stdin.off('data', onData);
}, []);
```

---

## useStdout

Access the stdout stream and terminal dimensions.

### Import

```jsx
import {useStdout} from 'ink';
```

### Usage

```jsx
const {stdout, write} = useStdout();
```

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `stdout` | `WritableStream` | The stdout stream |
| `write` | `(data: string) => void` | Write directly to stdout |

### Terminal Dimensions

```jsx
const {stdout} = useStdout();
const columns = stdout.columns; // Terminal width
const rows = stdout.rows;       // Terminal height
```

### Direct Write

Write output outside Ink's rendering:

```jsx
const {write} = useStdout();
write('This bypasses Ink rendering\n');
```

**Warning:** Direct writes mix with Ink output. Use sparingly.

---

## useStderr

Access the stderr stream for error output.

### Import

```jsx
import {useStderr} from 'ink';
```

### Usage

```jsx
const {stderr, write} = useStderr();
```

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `stderr` | `WritableStream` | The stderr stream |
| `write` | `(data: string) => void` | Write directly to stderr |

### Stderr Dimensions

```jsx
const {stderr} = useStderr();
const columns = stderr.columns;
const rows = stderr.rows;
```

## Patterns

### Responsive to Terminal Size

```jsx
const {stdout} = useStdout();
const isWide = stdout.columns > 80;

return (
	<Box flexDirection={isWide ? 'row' : 'column'}>
		<Box width={isWide ? '30%' : '100%'}>
			<Text>Sidebar</Text>
		</Box>
		<Box flexGrow={1}>
			<Text>Content</Text>
		</Box>
	</Box>
);
```

### Logging to Stderr

Write logs/debug info to stderr so they don't mix with stdout:

```jsx
const {write} = useStderr();
write(`[DEBUG] Processing item ${id}\n`);
```

## See Also

- [Input](./input.md) - useInput for keyboard handling
- [Configuration](../core/configuration.md) - stdin/stdout/stderr options
- [Patterns](../core/patterns.md) - Responsive layout pattern
