# Ink Layout System

Ink uses [Yoga](https://github.com/facebook/yoga) to build Flexbox layouts in the terminal. Every `<Box>` is `display: flex` by default.

## Overview

Key concepts:
- **Flexbox model**: CSS Flexbox properties via Yoga engine
- **Terminal units**: Dimensions are in character cells (columns x rows)
- **No block/inline**: Only Flexbox layout is supported
- **Percentage support**: Relative sizing based on parent (parent must have explicit size)

## flexDirection

Controls the main axis:

```jsx
// Row (default) - horizontal
<Box flexDirection="row">
	<Text>1</Text>
	<Text>2</Text>
	<Text>3</Text>
</Box>
// Output: 1 2 3

// Column - vertical
<Box flexDirection="column">
	<Text>1</Text>
	<Text>2</Text>
	<Text>3</Text>
</Box>
// Output:
// 1
// 2
// 3

// Reverse variants
<Box flexDirection="row-reverse">...</Box>
<Box flexDirection="column-reverse">...</Box>
```

## justifyContent

Align children along the main axis:

```jsx
<Box justifyContent="flex-start">   {/* Start (default) */}
<Box justifyContent="center">       {/* Centered */}
<Box justifyContent="flex-end">     {/* End */}
<Box justifyContent="space-between">{/* First/last at edges, rest spaced */}
<Box justifyContent="space-around"> {/* Equal space around each child */}
<Box justifyContent="space-evenly"> {/* Equal space between all */}
```

## alignItems

Align children along the cross axis:

```jsx
<Box alignItems="flex-start">  {/* Top (for row) or left (for column) */}
<Box alignItems="center">      {/* Centered on cross axis */}
<Box alignItems="flex-end">    {/* Bottom (for row) or right (for column) */}
```

## alignSelf

Override parent's `alignItems` for one child:

```jsx
<Box alignItems="center" height={10}>
	<Text>Centered</Text>
	<Box alignSelf="flex-end"><Text>Bottom</Text></Box>
</Box>
```

## flexGrow

How much a child should grow relative to siblings:

```jsx
<Box width={60}>
	<Box width={10}><Text>Fixed</Text></Box>
	<Box flexGrow={1}><Text>Fills rest</Text></Box>
</Box>
```

## flexShrink

How much a child should shrink when space is limited:

```jsx
<Box width={20}>
	<Box flexShrink={1} width={30}><Text>Shrinks</Text></Box>
	<Box flexShrink={0} width={10}><Text>Fixed</Text></Box>
</Box>
```

## flexBasis

Initial size before growing/shrinking:

```jsx
<Box>
	<Box flexBasis={20} flexGrow={1}><Text>Start 20, can grow</Text></Box>
	<Box flexBasis="50%"><Text>Half of parent</Text></Box>
</Box>
```

## flexWrap

Whether children wrap to new lines:

```jsx
<Box flexWrap="wrap" width={10}>
	<Box width={6}><Text>A</Text></Box>
	<Box width={6}><Text>B</Text></Box>
</Box>
// B wraps to next line
```

## Gap

Space between children:

```jsx
<Box gap={2}>             {/* All directions */}
<Box columnGap={2}>       {/* Horizontal only */}
<Box rowGap={1}>          {/* Vertical only */}
```

## Dimensions

### Fixed

```jsx
<Box width={40} height={10}>...</Box>
```

### Percentage

Parent must have explicit size:

```jsx
<Box width={80}>
	<Box width="50%"><Text>Half width</Text></Box>
</Box>
```

### Min/Max Constraints

```jsx
<Box minWidth={20} maxWidth={60}>...</Box>
<Box minHeight={5} maxHeight="50%">...</Box>
```

**Note:** `minWidth` and `maxWidth` do not support percentage values (Yoga limitation).

## Padding

Space inside the box:

```jsx
<Box padding={2}>...</Box>
<Box paddingX={2} paddingY={1}>...</Box>
<Box paddingTop={1} paddingRight={2} paddingBottom={1} paddingLeft={2}>...</Box>
```

## Margin

Space outside the box:

```jsx
<Box margin={1}>...</Box>
<Box marginX={2} marginY={1}>...</Box>
<Box marginTop={1} marginRight={2} marginBottom={1} marginLeft={2}>...</Box>
```

## Display

```jsx
<Box display="flex">...</Box>   {/* Visible (default) */}
<Box display="none">...</Box>   {/* Hidden */}
```

## Overflow

```jsx
<Box overflow="visible">...</Box>   {/* Content can extend (default) */}
<Box overflow="hidden">...</Box>    {/* Content clipped */}
```

Axis-specific:

```jsx
<Box overflowX="hidden" overflowY="visible">...</Box>
```

## See Also

- [Layout Patterns](./patterns.md) - Common layout recipes
- [Box Component](../components/box.md) - Box props including borders
- [Spacer](../components/utilities.md) - Flexible space component
