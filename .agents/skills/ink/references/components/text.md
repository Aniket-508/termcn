# `<Text>` Component

Display text and change its style. Supports color, bold, italic, underline, strikethrough, inverse, and dim.

## Import

```jsx
import {Text} from 'ink';
```

## Basic Usage

```jsx
<Text>Hello World</Text>
<Text color="green">Green text</Text>
<Text bold>Bold text</Text>
```

## Props

### color

Type: `string`

Change text color. Uses [chalk](https://github.com/chalk/chalk) under the hood.

```jsx
<Text color="green">Green</Text>
<Text color="#005cc5">Blue</Text>
<Text color="rgb(232, 131, 136)">Red</Text>
```

### backgroundColor

Type: `string`

Background color for text. Same format as `color`.

```jsx
<Text backgroundColor="green" color="white">Green bg</Text>
<Text backgroundColor="#005cc5" color="white">Blue bg</Text>
```

### dimColor

Type: `boolean` | Default: `false`

Make the color less bright:

```jsx
<Text color="red" dimColor>Dimmed Red</Text>
```

### bold

Type: `boolean` | Default: `false`

```jsx
<Text bold>Bold text</Text>
```

### italic

Type: `boolean` | Default: `false`

```jsx
<Text italic>Italic text</Text>
```

### underline

Type: `boolean` | Default: `false`

```jsx
<Text underline>Underlined text</Text>
```

### strikethrough

Type: `boolean` | Default: `false`

```jsx
<Text strikethrough>Crossed out</Text>
```

### inverse

Type: `boolean` | Default: `false`

Swap foreground and background colors:

```jsx
<Text inverse color="yellow">Inversed Yellow</Text>
```

### wrap

Type: `string` | Default: `'wrap'`
Allowed: `'wrap'` `'truncate'` `'truncate-start'` `'truncate-middle'` `'truncate-end'`

Controls text wrapping/truncation when wider than container:

```jsx
<Box width={7}>
	<Text>Hello World</Text>
</Box>
// 'Hello\nWorld'

<Box width={7}>
	<Text wrap="truncate">Hello World</Text>
</Box>
// 'Hello…'

<Box width={7}>
	<Text wrap="truncate-middle">Hello World</Text>
</Box>
// 'He…ld'

<Box width={7}>
	<Text wrap="truncate-start">Hello World</Text>
</Box>
// '…World'
```

**Note:** `truncate` is an alias for `truncate-end`.

## Nesting

`<Text>` can contain nested `<Text>` to compose styles:

```jsx
<Text>
	Hello <Text bold>bold</Text> and <Text color="green">green</Text>
</Text>
```

## Restrictions

- `<Text>` can only contain text nodes and other `<Text>` components
- `<Box>` cannot be placed inside `<Text>`
- All visible text must be wrapped in `<Text>` — raw strings in `<Box>` throw errors

## See Also

- [Box](./box.md) - Container component
- [Utilities](./utilities.md) - Newline, Transform
