# Ink (React for CLIs)

Build and test CLI output using React components. Ink provides the same component-based UI building experience that React offers in the browser, but for command-line apps.

## Overview

Ink uses [Yoga](https://github.com/facebook/yoga) to build Flexbox layouts in the terminal:
- **Components**: `<Text>`, `<Box>`, `<Newline>`, `<Spacer>`, `<Static>`, `<Transform>`
- **Hooks**: `useInput`, `useApp`, `useFocus`, `useFocusManager`, `useStdin`, `useStdout`, `useStderr`, `useCursor`
- **Layout**: Full Flexbox via Yoga (every `<Box>` is `display: flex`)
- **Testing**: `ink-testing-library` for headless testing

## When to Use Ink

Use Ink when:
- Building interactive CLI tools
- Need component-based UI architecture for terminal apps
- Want familiar React patterns (hooks, state, effects) in the CLI
- Building complex CLI UIs with layouts, borders, colors
- Need testable terminal UI components

## Quick Start

### Using create-ink-app (Recommended)

```bash
npx create-ink-app my-ink-cli
cd my-ink-cli
```

For TypeScript:

```bash
npx create-ink-app --typescript my-ink-cli
```

### Manual Setup

```bash
mkdir my-cli && cd my-cli
npm init -y
npm install ink react
```

```jsx
import React, {useState, useEffect} from 'react';
import {render, Text} from 'ink';

const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(prev => prev + 1);
		}, 100);

		return () => clearInterval(timer);
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
};

render(<Counter />);
```

## Core Concepts

### Everything is Flexbox

Every `<Box>` in Ink behaves like `<div style="display: flex">`. There is no block or inline layout — it's Flexbox all the way down.

### Text Must Be Wrapped

All text must be inside a `<Text>` component. Raw strings outside `<Text>` will throw an error.

```jsx
// CORRECT
<Box><Text>Hello</Text></Box>

// WRONG - will throw
<Box>Hello</Box>
```

### App Lifecycle

An Ink app is a Node.js process. It stays alive only while there is active work in the event loop (timers, pending promises, `useInput` listening on stdin). If your component tree has no async work, the app renders once and exits immediately.

## Essential Commands

```bash
npm install ink react          # Install
node my-app.js                 # Run (with Babel/TypeScript)
npx create-ink-app my-cli      # Scaffold new project
```

## In This Reference

- [API](./api.md) - render(), renderToString(), Instance, measureElement()
- [Configuration](./configuration.md) - Render options, environment variables, CI mode
- [Patterns](./patterns.md) - Common patterns, recipes, best practices
- [Gotchas](./gotchas.md) - Pitfalls, limitations, debugging tips

## See Also

- [Components](../components/REFERENCE.md) - Text, Box, Static, Transform
- [Hooks](../hooks/REFERENCE.md) - useInput, useApp, useFocus, etc.
- [Layout](../layout/REFERENCE.md) - Yoga/Flexbox layout system
- [Testing](../testing/REFERENCE.md) - ink-testing-library
- [Accessibility](../accessibility/REFERENCE.md) - Screen reader & ARIA support
