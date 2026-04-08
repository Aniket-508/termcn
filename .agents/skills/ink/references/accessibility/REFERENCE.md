# Accessibility

Ink supports screen readers via the Ink Screen Reader project. When enabled, Ink renders output compatible with assistive technologies.

## Enabling Screen Reader Support

### Environment Variable

```bash
INK_SCREEN_READER=true my-cli-app
```

### Render Option

```jsx
render(<MyApp />, {isScreenReaderEnabled: true});
```

### Check From Components

```jsx
import {useIsScreenReaderEnabled} from 'ink';

const App = () => {
	const isEnabled = useIsScreenReaderEnabled();
	// Adapt UI for screen readers if needed
};
```

## ARIA Roles

Announce the purpose of a `<Box>` to screen readers:

```jsx
<Box aria-role="status">
	<Text>3 tasks remaining</Text>
</Box>

<Box aria-role="alert">
	<Text color="red">Error: Connection failed</Text>
</Box>
```

### Supported Roles

| Role | Description |
|------|-------------|
| `status` | Live region with polite updates |
| `alert` | Live region with assertive (immediate) updates |
| `timer` | Ticking timer |
| `progressbar` | Progress indication |
| `img` | Image (use with `aria-label` for description) |
| `checkbox` | Toggle control |
| `radiogroup` | Group of radio buttons |
| `radiobutton` | Single radio option |
| `button` | Clickable action |
| `textbox` | Text input |
| `listbox` | List of options |
| `option` | Option within a listbox |
| `none` | Remove semantic meaning |

## ARIA Properties

### aria-label

Human-readable label, overrides visible text:

```jsx
<Box aria-role="img" aria-label="Company logo">
	<Text>{'🏢'}</Text>
</Box>

<Box aria-role="button" aria-label="Submit form">
	<Text>[Submit]</Text>
</Box>
```

### aria-live

How updates are announced:

```jsx
<Box aria-live="polite">
	{/* Announced when screen reader is idle */}
	<Text>{statusMessage}</Text>
</Box>

<Box aria-live="assertive">
	{/* Announced immediately, interrupting */}
	<Text color="red">{errorMessage}</Text>
</Box>

<Box aria-live="off">
	{/* Not announced */}
</Box>
```

### aria-checked

For checkbox/radio components:

```jsx
<Box aria-role="checkbox" aria-checked={isChecked}>
	<Text>{isChecked ? '[x]' : '[ ]'} Accept terms</Text>
</Box>
```

Supported values: `true`, `false`, `'mixed'`

### aria-selected

For listbox options:

```jsx
<Box aria-role="listbox">
	{items.map(item => (
		<Box
			key={item.id}
			aria-role="option"
			aria-selected={item.id === selectedId}
		>
			<Text>{item.label}</Text>
		</Box>
	))}
</Box>
```

### aria-disabled

Mark elements as non-interactive:

```jsx
<Box aria-role="button" aria-disabled>
	<Text dimColor>[Disabled]</Text>
</Box>
```

### aria-expanded

For expandable/collapsible sections:

```jsx
<Box aria-role="button" aria-expanded={isOpen}>
	<Text>{isOpen ? '▼' : '▶'} Details</Text>
</Box>
```

### aria-valuemin / aria-valuemax / aria-valuenow / aria-valuetext

For progress bars:

```jsx
<Box
	aria-role="progressbar"
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuenow={progress}
	aria-valuetext={`${progress}% complete`}
>
	<Text>{'█'.repeat(progress / 5)}{'░'.repeat(20 - progress / 5)}</Text>
</Box>
```

### aria-hidden

Hide from screen readers:

```jsx
<Box aria-hidden>
	<Text>Decorative border ═══════</Text>
</Box>
```

## Patterns

### Accessible Checkbox List

```jsx
const CheckboxList = ({items, selected, onToggle}) => (
	<Box flexDirection="column" aria-role="group" aria-label="Options">
		{items.map(item => (
			<Box key={item.id} aria-role="checkbox" aria-checked={selected.has(item.id)}>
				<Text>
					{selected.has(item.id) ? '[x]' : '[ ]'} {item.label}
				</Text>
			</Box>
		))}
	</Box>
);
```

### Accessible Select Menu

```jsx
const SelectMenu = ({items, selectedIndex}) => (
	<Box flexDirection="column" aria-role="listbox" aria-label="Menu">
		{items.map((item, i) => (
			<Box
				key={item}
				aria-role="option"
				aria-selected={i === selectedIndex}
			>
				<Text color={i === selectedIndex ? 'green' : undefined}>
					{i === selectedIndex ? '> ' : '  '}{item}
				</Text>
			</Box>
		))}
	</Box>
);
```

### Accessible Progress Bar

```jsx
const AccessibleProgress = ({label, percent}) => (
	<Box
		aria-role="progressbar"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(percent * 100)}
		aria-valuetext={`${label}: ${Math.round(percent * 100)}%`}
	>
		<Text>{label}: </Text>
		<Text color="green">{'█'.repeat(Math.round(20 * percent))}</Text>
		<Text dimColor>{'░'.repeat(20 - Math.round(20 * percent))}</Text>
		<Text> {Math.round(percent * 100)}%</Text>
	</Box>
);
```

### Status Announcements

```jsx
const StatusBar = ({message, type}) => (
	<Box aria-role={type === 'error' ? 'alert' : 'status'} aria-live={type === 'error' ? 'assertive' : 'polite'}>
		<Text color={type === 'error' ? 'red' : 'green'}>
			{type === 'error' ? '✖' : '✔'} {message}
		</Text>
	</Box>
);
```

## Best Practices

1. **Use semantic roles** — helps screen readers understand UI structure
2. **Provide `aria-label`** for decorative or icon-only elements
3. **Use `aria-live`** for dynamic content that updates
4. **Use `aria-hidden`** for decorative elements (borders, separators)
5. **Test with screen reader mode** — set `INK_SCREEN_READER=true` during development

## See Also

- [Focus](../hooks/focus.md) - useFocus, useFocusManager
- [Configuration](../core/configuration.md) - isScreenReaderEnabled option
- [Box](../components/box.md) - Box component (accepts ARIA props)
