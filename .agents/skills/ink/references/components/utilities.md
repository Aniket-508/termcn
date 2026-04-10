# Utility Components

## `<Newline>`

Adds newline characters. Must be used within `<Text>`.

```jsx
import {Text, Newline} from 'ink';

<Text>
	<Text color="green">Hello</Text>
	<Newline />
	<Text color="red">World</Text>
</Text>
```

### Props

#### count

Type: `number` | Default: `1`

Number of newlines to insert:

```jsx
<Text>
	Line 1
	<Newline count={2} />
	Line 2
</Text>
```

## `<Spacer>`

Flexible space that expands along the major axis. Shortcut for filling available space.

```jsx
import {Box, Text, Spacer} from 'ink';

// Push items apart horizontally
<Box>
	<Text>Left</Text>
	<Spacer />
	<Text>Right</Text>
</Box>

// Push items apart vertically
<Box flexDirection="column" height={10}>
	<Text>Top</Text>
	<Spacer />
	<Text>Bottom</Text>
</Box>
```

`<Spacer>` is equivalent to `<Box flexGrow={1} />`.

## `<Static>`

Permanently render output above everything else. Useful for completed tasks, logs — things that don't change after rendering.

```jsx
import {render, Static, Box, Text} from 'ink';
```

### Usage

```jsx
const App = () => {
	const [tests, setTests] = useState([]);

	return (
		<>
			{/* Rendered once, permanently */}
			<Static items={tests}>
				{test => (
					<Box key={test.id}>
						<Text color="green">✔ {test.title}</Text>
					</Box>
				)}
			</Static>

			{/* Keeps updating */}
			<Box marginTop={1}>
				<Text dimColor>Completed: {tests.length}</Text>
			</Box>
		</>
	);
};
```

### Props

#### items

Type: `Array`

Array of items to render.

#### style

Type: `object`

Styles for the container. Accepts same properties as `<Box>`:

```jsx
<Static items={items} style={{padding: 1}}>
	{...}
</Static>
```

#### children(item, index)

Type: `Function`

Render function called for each item. Must return element with a `key`:

```jsx
<Static items={['a', 'b', 'c']}>
	{(item, index) => (
		<Box key={index}>
			<Text>Item: {item}</Text>
		</Box>
	)}
</Static>
```

### Important Notes

- `<Static>` **only renders new items**. Changes to previously rendered items are ignored.
- When adding items, only the new ones get rendered.
- Best for logs, completed tasks, or any output that shouldn't change.

## `<Transform>`

Transform the string representation of child components before output.

```jsx
import {Transform, Text} from 'ink';

// Uppercase everything
<Transform transform={output => output.toUpperCase()}>
	<Text>Hello World</Text>
</Transform>
// Output: HELLO WORLD
```

### Props

#### transform(outputLine, index)

Type: `Function`

Receives each line of output and its zero-indexed line number:

```jsx
// Hanging indent: indent all lines except first
const HangingIndent = ({indent = 4, children}) => (
	<Transform
		transform={(line, index) =>
			index === 0 ? line : ' '.repeat(indent) + line
		}
	>
		{children}
	</Transform>
);
```

### Restrictions

- Must only wrap `<Text>` children
- Should not change output dimensions (width/height), or layout will be incorrect
- Use for visual transforms: gradients, links, text effects

### Use Cases

- Text gradients (with [ink-gradient](https://github.com/sindresorhus/ink-gradient))
- Clickable links (with [ink-link](https://github.com/sindresorhus/ink-link))
- ASCII art text (with [ink-big-text](https://github.com/sindresorhus/ink-big-text))

## See Also

- [Text](./text.md) - Text component
- [Box](./box.md) - Layout container
- [Components Overview](./REFERENCE.md) - All components
