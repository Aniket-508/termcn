# Configuration

## Render Options

### stdout / stdin / stderr

Custom streams for output, input, and errors:

```jsx
render(<MyApp />, {
	stdout: customWriteStream,
	stdin: customReadStream,
	stderr: customErrorStream,
});
```

### exitOnCtrlC

Type: `boolean` | Default: `true`

Listen for Ctrl+C and exit. Needed when stdin is in raw mode (Ctrl+C is ignored by default in raw mode).

### patchConsole

Type: `boolean` | Default: `true`

Patch `console.*` methods so output doesn't mix with Ink's output. When enabled, Ink intercepts console calls, clears main output, renders console output, then rerenders the main output.

### debug

Type: `boolean` | Default: `false`

Render each update as separate output instead of replacing previous output. Useful for debugging render cycles.

### maxFps

Type: `number` | Default: `30`

Maximum frames per second. Controls how frequently the UI can update. Lower values reduce CPU usage for frequently-updating components.

```jsx
render(<MyApp />, {maxFps: 10}); // Throttle to 10fps
```

### incrementalRendering

Type: `boolean` | Default: `false`

Only update changed lines instead of redrawing the entire output. Reduces flickering and improves performance for frequently updating UIs.

```jsx
render(<MyApp />, {incrementalRendering: true});
```

### concurrent

Type: `boolean` | Default: `false`

Enable React Concurrent Rendering mode:
- Suspense boundaries work with async data fetching
- `useTransition` and `useDeferredValue` hooks are functional
- Updates can be interrupted for higher priority work

```jsx
render(<MyApp />, {concurrent: true});
```

**Note:** The `concurrent` option only takes effect on the first render for a given stdout. Call `unmount()` first to change rendering mode.

### onRender

Type: `({renderTime: number}) => void`

Callback after each render with metrics:

```jsx
render(<MyApp />, {
	onRender: ({renderTime}) => {
		console.log(`Rendered in ${renderTime}ms`);
	},
});
```

### isScreenReaderEnabled

Type: `boolean` | Default: `process.env['INK_SCREEN_READER'] === 'true'`

Enable screen reader support. See [Accessibility](../accessibility/REFERENCE.md).

### kittyKeyboard

Type: `object` | Default: `undefined`

Enable the kitty keyboard protocol for enhanced keyboard input.

```jsx
render(<MyApp />, {kittyKeyboard: {mode: 'auto'}});
```

#### kittyKeyboard.mode

- `'auto'`: Detect terminal support with heuristic precheck
- `'enabled'`: Force enable (stdin and stdout must be TTYs)
- `'disabled'`: Never enable

#### kittyKeyboard.flags

Default: `['disambiguateEscapeCodes']`

Available flags:
- `'disambiguateEscapeCodes'`
- `'reportEventTypes'`
- `'reportAlternateKeys'`
- `'reportAllKeysAsEscapeCodes'`
- `'reportAssociatedText'`

## CI Mode

When running on CI (detected via `CI` environment variable):
- Only the last frame is rendered on exit
- Terminal resize events are not listened to

Opt out with `CI=false`:

```bash
CI=false node my-cli.js
```

## Environment Variables

| Variable | Effect |
|----------|--------|
| `CI` | Enables CI rendering mode |
| `INK_SCREEN_READER` | Set to `'true'` to enable screen reader support |
| `DEV` | Enables React DevTools integration |

## React DevTools

Enable with `DEV=true`:

```bash
DEV=true my-cli
npx react-devtools  # In another terminal
```

You can inspect and change props live.

## Project Setup

### package.json (TypeScript)

```json
{
	"type": "module",
	"scripts": {
		"build": "tsc",
		"start": "node dist/index.js"
	},
	"dependencies": {
		"ink": "latest",
		"react": "latest"
	},
	"devDependencies": {
		"@types/react": "latest",
		"typescript": "latest"
	}
}
```

### Babel Setup (JavaScript)

```bash
npm install --save-dev @babel/preset-react
```

```json
{
	"presets": ["@babel/preset-react"]
}
```
