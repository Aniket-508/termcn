# Testing Ink Applications

Use `ink-testing-library` for headless testing of Ink components.

## Setup

```bash
npm install --save-dev ink-testing-library
```

## Import

```jsx
import {render} from 'ink-testing-library';
```

**Note:** Import `render` from `ink-testing-library`, not from `ink`.

## Basic Test

```jsx
import {render} from 'ink-testing-library';
import {Text} from 'ink';

test('renders greeting', () => {
	const {lastFrame} = render(<Text>Hello World</Text>);
	expect(lastFrame()).toBe('Hello World');
});
```

## API

### render(tree)

Returns a test instance with these properties:

| Property | Type | Description |
|----------|------|-------------|
| `lastFrame()` | `() => string \| undefined` | Last rendered output as string |
| `frames` | `string[]` | All rendered output frames |
| `stdin` | `object` | Object with `write()` for simulating input |
| `unmount()` | `() => void` | Unmount the component |
| `rerender(tree)` | `(element) => void` | Replace root node |
| `cleanup()` | `() => void` | Clean up the instance |

### lastFrame()

Get the last rendered output:

```jsx
const {lastFrame} = render(<Text color="green">Success</Text>);
expect(lastFrame()).toContain('Success');
```

Returns `undefined` if there's no output yet.

### frames

Array of all rendered frames (useful for testing animations/transitions):

```jsx
const {frames} = render(<Counter />);
// frames[0] = '0'
// frames[1] = '1'
// ...
```

### stdin.write(data)

Simulate keyboard input:

```jsx
const {stdin, lastFrame} = render(<TextInput />);

// Type text
stdin.write('hello');

// Press Enter
stdin.write('\r');

// Arrow keys
stdin.write('\u001B[A'); // Up
stdin.write('\u001B[B'); // Down
stdin.write('\u001B[C'); // Right
stdin.write('\u001B[D'); // Left

// Escape
stdin.write('\u001B');
```

### Common Key Sequences

| Key | Sequence |
|-----|----------|
| Enter | `'\r'` |
| Escape | `'\u001B'` |
| Up Arrow | `'\u001B[A'` |
| Down Arrow | `'\u001B[B'` |
| Right Arrow | `'\u001B[C'` |
| Left Arrow | `'\u001B[D'` |
| Tab | `'\t'` |
| Shift+Tab | `'\u001B[Z'` |
| Backspace | `'\x7F'` |
| Delete | `'\u001B[3~'` |
| Ctrl+C | `'\x03'` |
| Space | `' '` |

### unmount()

Unmount the component tree:

```jsx
const {unmount} = render(<App />);
unmount();
```

### rerender(tree)

Replace the entire component tree:

```jsx
const {rerender, lastFrame} = render(<Greeting name="Alice" />);
expect(lastFrame()).toContain('Alice');

rerender(<Greeting name="Bob" />);
expect(lastFrame()).toContain('Bob');
```

### cleanup()

Clean up internal resources:

```jsx
const instance = render(<App />);
// ... tests ...
instance.cleanup();
```

## Testing Patterns

### Test Component Output

```jsx
test('displays status', () => {
	const {lastFrame} = render(<Status type="success" message="Done" />);
	expect(lastFrame()).toContain('Done');
});
```

### Test User Input

```jsx
import {delay} from 'ink-testing-library';

test('handles keyboard input', async () => {
	const {stdin, lastFrame} = render(<Menu items={['A', 'B', 'C']} />);

	// Move down
	await delay(100);
	stdin.write('\u001B[B'); // Down arrow
	await delay(100);

	expect(lastFrame()).toContain('> B');
});
```

### Test with State Changes

```jsx
test('counter increments', async () => {
	const {lastFrame} = render(<Counter />);

	expect(lastFrame()).toContain('Count: 0');

	// Wait for state update
	await delay(200);

	expect(lastFrame()).toContain('Count: 1');
});
```

### Snapshot Testing

```jsx
test('layout matches snapshot', () => {
	const {lastFrame} = render(<Dashboard />);
	expect(lastFrame()).toMatchSnapshot();
});
```

### Test Props Update

```jsx
test('updates on prop change', () => {
	const {rerender, lastFrame} = render(<Badge count={5} />);
	expect(lastFrame()).toContain('5');

	rerender(<Badge count={10} />);
	expect(lastFrame()).toContain('10');
});
```

### Test Focus Cycling

```jsx
test('tab cycles focus', async () => {
	const {stdin, lastFrame} = render(
		<>
			<FocusItem label="First" />
			<FocusItem label="Second" />
		</>,
	);

	await delay(100);
	stdin.write('\t'); // Tab
	await delay(100);

	expect(lastFrame()).toContain('> Second');
});
```

### Test Exit

```jsx
test('exits on q', async () => {
	const {stdin, lastFrame} = render(<App />);

	stdin.write('q');
	await delay(100);

	// App should have unmounted
});
```

## Async Testing with delay

Use `delay` from `ink-testing-library` to wait for state updates:

```jsx
import {render, delay} from 'ink-testing-library';

test('async update', async () => {
	const {lastFrame} = render(<AsyncComponent />);

	expect(lastFrame()).toContain('Loading');

	await delay(1000);

	expect(lastFrame()).toContain('Loaded');
});
```

## Gotchas

### Timing

State updates in React are async. Use `await delay(ms)` between input and assertion.

### ANSI Codes in Output

`lastFrame()` includes ANSI escape codes for colors. Use `toContain` for partial matching rather than exact `toBe` when colors are involved.

### CI Environment

Tests run in CI mode by default when `CI` env var is set. This affects rendering behavior.

### Cleanup

Always clean up or unmount after tests to prevent resource leaks:

```jsx
afterEach(() => {
	instance?.cleanup();
});
```

## See Also

- [Core API](../core/api.md) - render(), renderToString()
- [Input](../hooks/input.md) - useInput for keyboard handling
- [Focus](../hooks/focus.md) - Focus management in tests
