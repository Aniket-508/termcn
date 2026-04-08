# useFocus, useFocusManager, useCursor

Focus management for interactive CLI components.

## useFocus

Make a component focusable. Users cycle through focusable components with Tab and Shift+Tab.

### Import

```jsx
import {useFocus} from 'ink';
```

### Usage

```jsx
const {isFocused, focus, id} = useFocus();
```

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `isFocused` | `boolean` | Whether this component currently has focus |
| `focus` | `() => void` | Manually focus this component |
| `id` | `string` | Unique focus identifier |

### Options

```jsx
const {isFocused} = useFocus({
	autoFocus: false,   // Auto-focus on mount (default: false)
	isActive: true,     // Participate in focus cycling (default: true)
	id: 'my-component', // Custom focus ID (auto-generated if omitted)
});
```

### Example

```jsx
const FocusableItem = ({label}) => {
	const {isFocused} = useFocus();

	return (
		<Box>
			<Text color={isFocused ? 'green' : undefined}>
				{isFocused ? '>' : ' '} {label}
			</Text>
		</Box>
	);
};

const App = () => (
	<Box flexDirection="column">
		<FocusableItem label="Option 1" />
		<FocusableItem label="Option 2" />
		<FocusableItem label="Option 3" />
	</Box>
);
```

### Auto Focus

First rendered focusable component or the one with `autoFocus`:

```jsx
// Second item gets initial focus
<FocusableItem label="First" />
<FocusableItem label="Second" autoFocus />
<FocusableItem label="Third" />
```

### Disable Focus

Remove from Tab cycling:

```jsx
const {isFocused} = useFocus({isActive: false});
// This component will be skipped during Tab cycling
```

---

## useFocusManager

Programmatic control over the focus system.

### Import

```jsx
import {useFocusManager} from 'ink';
```

### Usage

```jsx
const {focus, focusNext, focusPrevious, enableFocus, disableFocus} = useFocusManager();
```

### Returns

| Method | Description |
|--------|-------------|
| `focus(id)` | Focus a specific component by its ID |
| `focusNext()` | Move focus to the next component |
| `focusPrevious()` | Move focus to the previous component |
| `enableFocus()` | Enable the focus system |
| `disableFocus()` | Disable the focus system |

### Example: Custom Focus Navigation

```jsx
const App = () => {
	const {focusNext, focusPrevious} = useFocusManager();

	useInput((input, key) => {
		if (key.downArrow) focusNext();
		if (key.upArrow) focusPrevious();
	});

	return (
		<Box flexDirection="column">
			<FocusableItem label="Item A" />
			<FocusableItem label="Item B" />
			<FocusableItem label="Item C" />
		</Box>
	);
};
```

### Example: Focus by ID

```jsx
const App = () => {
	const {focus} = useFocusManager();

	useInput((input) => {
		if (input === '1') focus('item-1');
		if (input === '2') focus('item-2');
	});

	return (
		<Box flexDirection="column">
			<FocusableInput id="item-1" label="Name" />
			<FocusableInput id="item-2" label="Email" />
		</Box>
	);
};
```

### Disable/Enable Focus System

Temporarily disable Tab cycling (e.g., when a modal is open):

```jsx
const {disableFocus, enableFocus} = useFocusManager();

// Disable Tab cycling while modal is open
useEffect(() => {
	if (isModalOpen) {
		disableFocus();
	} else {
		enableFocus();
	}
}, [isModalOpen]);
```

---

## useCursor

Show or hide the system cursor. Useful for text inputs with IME support.

### Import

```jsx
import {useCursor} from 'ink';
```

### Usage

```jsx
useCursor(visible);
```

### Parameter

| Parameter | Type | Description |
|-----------|------|-------------|
| `visible` | `boolean` | Show (`true`) or hide (`false`) the cursor |

### Example: Show Cursor When Focused

```jsx
const TextInput = () => {
	const {isFocused} = useFocus();
	useCursor(isFocused);

	return <Text>{isFocused ? '|' : ' '} Type here...</Text>;
};
```

---

## useIsScreenReaderEnabled

Check if screen reader mode is active.

### Import

```jsx
import {useIsScreenReaderEnabled} from 'ink';
```

### Usage

```jsx
const isEnabled = useIsScreenReaderEnabled();
```

### Returns

Type: `boolean`

Whether screen reader support is enabled (via `INK_SCREEN_READER=true` env var or `isScreenReaderEnabled` render option).

## Patterns

### Focus-Aware Input Handling

Combine `useFocus` with `useInput` for per-component keyboard handling:

```jsx
const SelectableItem = ({label, onSelect}) => {
	const {isFocused} = useFocus();

	useInput(
		(input, key) => {
			if (key.return) {
				onSelect();
			}
		},
		{isActive: isFocused},
	);

	return (
		<Text color={isFocused ? 'green' : undefined}>
			{isFocused ? '> ' : '  '}{label}
		</Text>
	);
};
```

### Multi-Step Form

```jsx
const Form = () => {
	const {focusNext} = useFocusManager();
	const [step, setStep] = useState(0);

	const handleSubmitField = () => {
		if (step < totalSteps - 1) {
			setStep(s => s + 1);
			focusNext();
		} else {
			submitForm();
		}
	};

	return (
		<Box flexDirection="column">
			<FocusableInput id="name" label="Name" onSubmit={handleSubmitField} />
			<FocusableInput id="email" label="Email" onSubmit={handleSubmitField} />
			<FocusableInput id="password" label="Password" onSubmit={handleSubmitField} />
		</Box>
	);
};
```

## See Also

- [Input](./input.md) - useInput for keyboard handling
- [Accessibility](../accessibility/REFERENCE.md) - Screen reader support
- [Patterns](../core/patterns.md) - Focus cycling pattern
