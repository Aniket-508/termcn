# Layout Patterns

Common layout recipes for Ink apps.

## Centered Content

```jsx
<Box justifyContent="center" alignItems="center" width="100%" height={20}>
	<Text>Centered horizontally and vertically</Text>
</Box>
```

## Header / Content / Footer

```jsx
<Box flexDirection="column" height={24}>
	<Box borderStyle="single" paddingX={1}>
		<Text bold>My CLI App v1.0</Text>
	</Box>

	<Box flexGrow={1} flexDirection="column" paddingX={1}>
		<Text>Main content goes here</Text>
	</Box>

	<Box borderStyle="single" paddingX={1}>
		<Text dimColor>Press q to quit</Text>
	</Box>
</Box>
```

## Sidebar + Main

```jsx
<Box width={80}>
	<Box width={20} borderStyle="single" flexDirection="column">
		<Text bold>Menu</Text>
		<Text>Item 1</Text>
		<Text>Item 2</Text>
	</Box>

	<Box flexGrow={1} paddingLeft={1}>
		<Text>Main content area</Text>
	</Box>
</Box>
```

## Two Columns (Equal)

```jsx
<Box width={80}>
	<Box width="50%"><Text>Left column</Text></Box>
	<Box width="50%"><Text>Right column</Text></Box>
</Box>
```

## Push Items Apart (Spacer)

```jsx
import {Spacer} from 'ink';

// Horizontal: left + right
<Box>
	<Text>Left</Text>
	<Spacer />
	<Text>Right</Text>
</Box>

// Vertical: top + bottom
<Box flexDirection="column" height={10}>
	<Text>Top</Text>
	<Spacer />
	<Text>Bottom</Text>
</Box>
```

## Status Bar

```jsx
<Box>
	<Text color="green"> READY </Text>
	<Spacer />
	<Text dimColor>Branch: main</Text>
	<Text> | </Text>
	<Text dimColor>3 files changed</Text>
</Box>
```

## Table Layout

```jsx
const columns = [
	{key: 'name', width: 20, label: 'Name'},
	{key: 'status', width: 10, label: 'Status'},
	{key: 'time', width: 8, label: 'Time'},
];

<Box flexDirection="column">
	{/* Header */}
	<Box>
		{columns.map(col => (
			<Box key={col.key} width={col.width}>
				<Text bold underline>{col.label}</Text>
			</Box>
		))}
	</Box>
	{/* Rows */}
	{data.map((row, i) => (
		<Box key={i}>
			{columns.map(col => (
				<Box key={col.key} width={col.width}>
					<Text>{row[col.key]}</Text>
				</Box>
			))}
		</Box>
	))}
</Box>
```

## Card Component

```jsx
const Card = ({title, children}) => (
	<Box
		flexDirection="column"
		borderStyle="round"
		borderColor="cyan"
		paddingX={2}
		paddingY={1}
		width={40}
	>
		<Text bold color="cyan">{title}</Text>
		<Box marginTop={1}>{children}</Box>
	</Box>
);
```

## Loading Spinner

```jsx
const Spinner = () => {
	const [frame, setFrame] = useState(0);
	const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

	useEffect(() => {
		const timer = setInterval(() => {
			setFrame(f => (f + 1) % frames.length);
		}, 80);
		return () => clearInterval(timer);
	}, []);

	return <Text color="cyan">{frames[frame]}</Text>;
};

// Usage
<Box gap={1}>
	<Spinner />
	<Text>Loading...</Text>
</Box>
```

## Responsive Layout

```jsx
const App = () => {
	const {stdout} = useStdout();
	const isNarrow = stdout.columns < 60;

	return (
		<Box flexDirection={isNarrow ? 'column' : 'row'}>
			<Box width={isNarrow ? '100%' : '30%'}>
				<Text>Sidebar</Text>
			</Box>
			<Box flexGrow={1}>
				<Text>Content</Text>
			</Box>
		</Box>
	);
};
```

## Progress with Label

```jsx
const ProgressRow = ({label, percent, width = 30}) => {
	const filled = Math.round(width * percent);
	return (
		<Box gap={1}>
			<Box width={15}>
				<Text>{label}</Text>
			</Box>
			<Text color="green">{'█'.repeat(filled)}</Text>
			<Text dimColor>{'░'.repeat(width - filled)}</Text>
			<Text> {Math.round(percent * 100)}%</Text>
		</Box>
	);
};
```

## Indent/Nested List

```jsx
const TreeItem = ({label, depth = 0, children}) => (
	<Box flexDirection="column">
		<Box marginLeft={depth * 2}>
			<Text>{depth > 0 ? '├─ ' : ''}{label}</Text>
		</Box>
		{children}
	</Box>
);
```

## See Also

- [Layout Reference](./REFERENCE.md) - Flexbox properties
- [Box](../components/box.md) - Box component props
- [Spacer](../components/utilities.md) - Spacer component
