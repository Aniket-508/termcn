# `<Box>` Component

Essential layout container. Works like `<div style="display: flex">` in the browser.

## Import

```jsx
import {Box} from 'ink';
```

## Basic Usage

```jsx
<Box margin={2}>
	<Text>Content with margin</Text>
</Box>
```

## Dimensions

### width / height

Type: `number | string`

Fixed size in spaces (columns/rows), or percentage of parent:

```jsx
<Box width={40} height={10}>...</Box>
<Box width="50%">...</Box>
```

### minWidth / minHeight

Type: `number` (minWidth) | `number | string` (minHeight)

```jsx
<Box minWidth={20} minHeight={5}>...</Box>
<Box minHeight="50%">...</Box>
```

**Note:** `minWidth` does not support percentages (Yoga limitation).

### maxWidth / maxHeight

Type: `number` (maxWidth) | `number | string` (maxHeight)

```jsx
<Box maxWidth={80} maxHeight={20}>...</Box>
<Box maxHeight="50%">...</Box>
```

**Note:** `maxWidth` does not support percentages (Yoga limitation).

## Padding

All padding props: Type `number`, Default `0`.

```jsx
<Box padding={2}>...</Box>                    // All sides
<Box paddingX={2}>...</Box>                   // Left + right
<Box paddingY={1}>...</Box>                   // Top + bottom
<Box paddingTop={1} paddingBottom={2}>...</Box> // Individual
<Box paddingLeft={2} paddingRight={2}>...</Box>
```

## Margin

All margin props: Type `number`, Default `0`.

```jsx
<Box margin={2}>...</Box>                     // All sides
<Box marginX={2}>...</Box>                    // Left + right
<Box marginY={1}>...</Box>                    // Top + bottom
<Box marginTop={1} marginBottom={2}>...</Box>  // Individual
```

## Gap

### gap

Type: `number` | Default: `0`

Space between children (shorthand for `columnGap` and `rowGap`):

```jsx
<Box gap={1} width={3} flexWrap="wrap">
	<Text>A</Text>
	<Text>B</Text>
	<Text>C</Text>
</Box>
// A B
//
// C
```

### columnGap / rowGap

Type: `number` | Default: `0`

```jsx
<Box columnGap={1}>
	<Text>A</Text>
	<Text>B</Text>
</Box>
// A B
```

## Flex

### flexDirection

Type: `string` | Allowed: `'row'` `'row-reverse'` `'column'` `'column-reverse'`

```jsx
<Box flexDirection="column">
	<Text>Top</Text>
	<Text>Bottom</Text>
</Box>
```

### flexGrow / flexShrink / flexBasis

```jsx
<Box>
	<Text>Label:</Text>
	<Box flexGrow={1}><Text>Fills remaining space</Text></Box>
</Box>
```

### flexWrap

Type: `string` | Allowed: `'nowrap'` `'wrap'` `'wrap-reverse'`

### alignItems

Type: `string` | Allowed: `'flex-start'` `'center'` `'flex-end'`

### alignSelf

Type: `string` | Default: `'auto'` | Allowed: `'auto'` `'flex-start'` `'center'` `'flex-end'`

### justifyContent

Type: `string` | Allowed: `'flex-start'` `'center'` `'flex-end'` `'space-between'` `'space-around'` `'space-evenly'`

See [Layout Reference](../layout/REFERENCE.md) for detailed flex examples.

## Display

### display

Type: `string` | Allowed: `'flex'` `'none'` | Default: `'flex'`

Hide elements with `display="none"`.

## Overflow

### overflow / overflowX / overflowY

Type: `string` | Allowed: `'visible'` `'hidden'` | Default: `'visible'`

```jsx
<Box overflow="hidden" width={10} height={3}>
	<Text>Content that might be too long</Text>
</Box>
```

## Borders

### borderStyle

Type: `string | BoxStyle` | Allowed: `'single'` `'double'` `'round'` `'bold'` `'singleDouble'` `'doubleSingle'` `'classic'`

```jsx
<Box borderStyle="round">
	<Text>Rounded box</Text>
</Box>
```

Custom border style:

```jsx
<Box borderStyle={{
	topLeft: '↘', top: '↓', topRight: '↙',
	left: '→', bottomLeft: '↗', bottom: '↑',
	bottomRight: '↖', right: '←'
}}>
	<Text>Custom</Text>
</Box>
```

### borderColor

Type: `string`

Shorthand for all border sides:

```jsx
<Box borderStyle="round" borderColor="green">
	<Text>Green border</Text>
</Box>
```

Individual: `borderTopColor`, `borderRightColor`, `borderBottomColor`, `borderLeftColor`

### borderDimColor

Type: `boolean` | Default: `false`

Dim the border color. Individual: `borderTopDimColor`, `borderBottomDimColor`, `borderLeftDimColor`, `borderRightDimColor`

### Border Visibility

`borderTop`, `borderRight`, `borderBottom`, `borderLeft`: Type `boolean`, Default `true`

Show/hide individual border sides:

```jsx
<Box borderStyle="single" borderBottom={false}>
	<Text>No bottom border</Text>
</Box>
```

## Background

### backgroundColor

Type: `string`

Background color fills the entire `<Box>` area. Inherited by child `<Text>` unless they override:

```jsx
<Box backgroundColor="blue" alignSelf="flex-start">
	<Text>Blue inherited </Text>
	<Text backgroundColor="yellow">Yellow override </Text>
	<Text>Blue inherited again</Text>
</Box>
```

Works with borders and padding:

```jsx
<Box backgroundColor="cyan" borderStyle="round" padding={1} alignSelf="flex-start">
	<Text>Background with border and padding</Text>
</Box>
```

## See Also

- [Text](./text.md) - Text display component
- [Layout](../layout/REFERENCE.md) - Flexbox layout system
- [Layout Patterns](../layout/patterns.md) - Common layout recipes
