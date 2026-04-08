# useInput

Handle keyboard input from the user.

## Import

```jsx
import {useInput} from 'ink';
```

## Basic Usage

```jsx
useInput((input, key) => {
	if (input === 'q') {
		// User pressed 'q'
	}

	if (key.leftArrow) {
		// Left arrow pressed
	}
});
```

## Parameters

### Callback: (input, key) => void

#### input

Type: `string`

The character or string typed. For printable keys, this is the character itself. For non-printable keys (arrows, function keys), this is an empty string.

#### key

Type: `object`

Key metadata:

| Property | Type | Description |
|----------|------|-------------|
| `key.upArrow` | `boolean` | Up arrow key |
| `key.downArrow` | `boolean` | Down arrow key |
| `key.leftArrow` | `boolean` | Left arrow key |
| `key.rightArrow` | `boolean` | Right arrow key |
| `key.return` | `boolean` | Enter/Return key |
| `key.escape` | `boolean` | Escape key |
| `key.tab` | `boolean` | Tab key |
| `key.backspace` | `boolean` | Backspace key |
| `key.delete` | `boolean` | Delete key |
| `key.pageUp` | `boolean` | Page Up key |
| `key.pageDown` | `boolean` | Page Down key |
| `key.ctrl` | `boolean` | Ctrl modifier held |
| `key.meta` | `boolean` | Alt/Option modifier held |
| `key.shift` | `boolean` | Shift modifier held (arrows, Tab only) |

### Options

#### isActive

Type: `boolean` | Default: `true`

Enable/disable the handler. Useful for modals, focus-based input:

```jsx
useInput(handler, {isActive: isFocused});
```

## Patterns

### Quit on 'q'

```jsx
const {exit} = useApp();

useInput((input) => {
	if (input === 'q') {
		exit();
	}
});
```

### Arrow Key Navigation

```jsx
const [index, setIndex] = useState(0);

useInput((input, key) => {
	if (key.upArrow) {
		setIndex(i => Math.max(0, i - 1));
	}
	if (key.downArrow) {
		setIndex(i => Math.min(items.length - 1, i + 1));
	}
	if (key.return) {
		handleSelect(items[index]);
	}
});
```

### Ctrl+Key Shortcuts

```jsx
useInput((input, key) => {
	if (key.ctrl && input === 's') {
		save();
	}
	if (key.ctrl && input === 'c') {
		// Note: exitOnCtrlC handles this by default
		exit();
	}
});
```

### Conditional Input (Focus-Aware)

Only handle input when component is focused:

```jsx
const {isFocused} = useFocus();

useInput(
	(input, key) => {
		// Only fires when this component is focused
	},
	{isActive: isFocused},
);
```

### Character Input (Text Field)

```jsx
const [text, setText] = useState('');

useInput((input, key) => {
	if (key.backspace || key.delete) {
		setText(prev => prev.slice(0, -1));
		return;
	}
	if (key.return) {
		handleSubmit(text);
		return;
	}
	if (input) {
		setText(prev => prev + input);
	}
});
```

## Kitty Keyboard Protocol

When `kittyKeyboard` is enabled in render options, the `key` object has additional properties:

| Property | Type | Description |
|----------|------|-------------|
| `key.fn` | `boolean` | Fn key held |
| `key.numLock` | `boolean` | Num Lock on |
| `key.capsLock` | `boolean` | Caps Lock on |
| `key.scrollLock` | `boolean` | Scroll Lock on |
| `key.eventType` | `'press' \| 'repeat' \| 'release'` | Event type (with `reportEventTypes` flag) |

Notable differences with kitty keyboard:
- Non-printable keys (F1-F35, modifiers alone) produce empty `input`
- `Ctrl+letter` works correctly (`input` is letter, `key.ctrl` is true)
- `Ctrl+I` and `Tab` are distinguished
- Key release events available with `reportEventTypes` flag

## Notes

- `useInput` puts stdin into raw mode automatically
- Multiple `useInput` hooks all receive events — coordinate with `isActive`
- Arrow keys set `key.shift` when Shift is held
- Letter input: `input` contains the character, not the key name

## See Also

- [Focus](./focus.md) - useFocus, useFocusManager
- [App Lifecycle](./app-lifecycle.md) - useApp for exit
- [Patterns](../core/patterns.md) - Common input patterns
