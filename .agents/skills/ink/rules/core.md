# Core / Render API Best Practices

## `render()`

### Rule: Always `await waitUntilExit()`

Without `await`, the process may exit before cleanup completes. Always await:

```jsx
const {waitUntilExit} = render(<App />);

try {
  const result = await waitUntilExit(); // resolves with exit(value)
  process.exit(0);
} catch (error) {
  console.error(error.message);         // rejects with exit(new Error(...))
  process.exit(1);
}
```

### Rule: One `render()` Per `stdout` Stream

Ink caches one instance per stdout. Calling `render()` twice with the same stdout reuses the same instance and ignores the second call's options. To reset:

```jsx
const {cleanup} = render(<App />, {stdout: process.stdout});
cleanup(); // clears the cache
render(<App />, {stdout: process.stdout}); // fresh instance
```

This is important in tests — always call `cleanup()` between test cases.

### Rule: `concurrent` Mode Is Immutable After First Render

The `concurrent` option only takes effect on the first `render()` call for a given stdout. Changing it on subsequent calls has no effect (Ink logs a warning):

```jsx
// To switch concurrent mode:
const {unmount, cleanup} = render(<App />, {concurrent: false});
unmount();
cleanup();
render(<App />, {concurrent: true}); // now takes effect
```

### Rule: Keep `patchConsole: true` (Default)

Without console patching, `console.log()` writes directly to stdout and corrupts Ink's rendered output. The default patches `console.log`, `console.error`, etc. to render above Ink's output:

```jsx
// Only disable if you have a specific reason
render(<App />, {patchConsole: false}); // risk: console.log corrupts output
```

### Rule: Use `debug: true` Only in Development

Debug mode disables throttling and accumulates all rendered frames without clearing. Never ship with `debug: true`:

```jsx
// DEV only — shows each render separately in terminal scrollback
render(<App />, {debug: process.env.NODE_ENV === 'development'});
```

### Rule: Use `exitOnCtrlC: false` to Handle Ctrl+C Yourself

The default `exitOnCtrlC: true` intercepts Ctrl+C before any `useInput` handler:

```jsx
render(<App />, {exitOnCtrlC: false});
// Now useInput handlers receive Ctrl+C as: input='' key.ctrl=true key.name='c'
```

---

## `renderToString()`

### Rule: Use for Testing, Not Production Rendering

`renderToString()` is synchronous, creates no terminal bindings, and is safe to call anywhere. Use it for snapshot tests and assertion-based testing:

```jsx
import {renderToString, Box, Text} from 'ink';

const output = renderToString(
  <Box padding={1}>
    <Text color="green">Hello</Text>
  </Box>,
  {columns: 40}, // virtual terminal width
);

expect(output).toMatch('Hello');
```

### Rule: `useEffect` Does Not Affect `renderToString` Output

`useEffect` runs after render but the returned string is captured before effects execute. Only `useLayoutEffect` affects the output:

```jsx
// Effect fires but output is already captured
const Component = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []); // too late

  return <Text>{loaded ? 'Loaded' : 'Loading'}</Text>;
};

renderToString(<Component />); // Returns 'Loading', not 'Loaded'
```

### Rule: All Terminal Hooks Return No-Ops in `renderToString`

`useInput`, `useApp`, `useStdin`, `useFocus`, etc. return safe defaults and do nothing. This makes `renderToString` safe to call with any component that uses these hooks.

### Rule: Yoga Nodes Are Freed Automatically

`renderToString` wraps everything in a try/finally to free Yoga WASM memory even on error. You don't need manual cleanup.

---

## Error Handling

### Rule: Use `<ErrorBoundary>` for Render Errors

Ink wraps your app in an `ErrorBoundary` automatically. Render errors display an error panel in the terminal. To handle them yourself, wrap specific subtrees:

```jsx
import {ErrorBoundary} from 'react'; // standard React ErrorBoundary

class MyErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return {error};
  }
  render() {
    if (this.state.error) {
      return <Text color="red">Error: {this.state.error.message}</Text>;
    }
    return this.props.children;
  }
}
```

### Rule: Distinguish Errors from Exit Results

`exit()` differentiates errors from values:

```jsx
const {exit} = useApp();

// This REJECTS waitUntilExit (thrown as error)
exit(new Error('something failed'));

// This RESOLVES waitUntilExit (returned as value)
exit({files: 42, duration: 1200});
exit('done');
exit(); // resolves with undefined
```

Only instances of `Error` (or objects whose `toString` is `[object Error]`) are treated as rejections.

---

## Environment-Specific Behavior

### Rule: CI Mode Renders Differently

Ink detects CI via the `CI` environment variable. In CI:
- Only the **final frame** is written to stdout (no terminal clearing)
- A trailing newline is added after the last render
- Raw mode is typically unavailable (`isRawModeSupported === false`)

To force full interactive rendering in CI:
```
CI=false node my-app.js
```

### Rule: Handle Non-TTY stdout (Piped Output)

When stdout is not a TTY (e.g., `node app.js | tee output.txt`):
- `stdout.columns` is `undefined` → Ink defaults to 80 columns
- `isTTY` is `false` → no ANSI clearing, no cursor manipulation
- Raw mode is unavailable

```jsx
const {stdout} = useStdout();
const width = stdout.columns ?? 80; // always guard with fallback
const isTTY = stdout.isTTY ?? false;
```

### Rule: Screen Reader Mode Changes All Output

Enable with `INK_SCREEN_READER=true` or `render(<App />, {isScreenReaderEnabled: true})`:
- Visual formatting (borders, colors) is stripped
- `aria-label` is used instead of visual content
- `flexDirection` determines separator (row → space, column → newline)
- ANSI escape codes are removed

Test your app's screen reader output:
```jsx
const output = renderToString(<App />, {isScreenReaderEnabled: true});
```

---

## Concurrent Mode

### Rule: Enable Concurrent Mode for Suspense

React Suspense and `useTransition` require concurrent mode:

```jsx
render(
  <React.Suspense fallback={<Text>Loading…</Text>}>
    <AsyncDataComponent />
  </React.Suspense>,
  {concurrent: true},
);
```

### Rule: Concurrent Mode Tests Need `act()`

State updates in concurrent mode may not flush synchronously. Wrap test assertions in `act()`:

```jsx
import {act} from 'react';

await act(async () => {
  // trigger async state updates
});
// Now assert
```

---

## Cleanup & Unmounting

### Rule: Unmount Properly in Tests

Each test should unmount and clean up the Ink instance:

```jsx
afterEach(() => {
  instance.unmount();
  instance.cleanup(); // clears instance cache for next test
});
```

### Rule: Throttle Flushes on Unmount

On `unmount()`, Ink:
1. Flushes any pending throttled renders (writes final frame)
2. Settles the throttled log writer
3. Restores the console
4. Disables Kitty keyboard protocol if enabled
5. Unmounts the React tree
6. Removes the instance from the cache
7. Resolves/rejects `waitUntilExit()`

This is automatic — you just need to call `unmount()` or `exit()`.

### Rule: Signal Handling Is Automatic

Ink uses `signal-exit` to register cleanup on `SIGINT`, `SIGTERM`, and `beforeExit`. If the process exits via a signal, Ink still cleans up. You don't need to register your own signal handlers for terminal cleanup.

---

## Kitty Keyboard Protocol

### Rule: Opt In Explicitly

Kitty keyboard is disabled by default. Enable when you need:
- Key **release** events (`key.eventType === 'release'`)
- Key **repeat** distinction (`key.eventType === 'repeat'`)
- Disambiguation of `Ctrl+I` vs `Tab`
- Modifier-only key events

```jsx
render(<App />, {
  kittyKeyboard: {
    mode: 'auto', // auto-detect kitty/WezTerm/ghostty
    flags: ['disambiguateEscapeCodes', 'reportEventTypes'],
  },
});
```

`mode: 'auto'` checks for known terminals (`KITTY_WINDOW_ID`, `TERM=xterm-kitty`, `TERM_PROGRAM=WezTerm`, `TERM_PROGRAM=ghostty`) and queries the terminal for protocol support.

### Rule: Always Handle Both Kitty and Legacy Input

Users may run your app in terminals that don't support the Kitty protocol. Design input handling to work without `key.eventType`:

```jsx
useInput((input, key) => {
  // Works in all terminals
  if (key.return) { /* submit */ }

  // Only meaningful in kitty-capable terminals
  if (key.eventType === 'release' && key.ctrl && input === 's') {
    // Optional: special release handling
  }
});
```

---

## Anti-Patterns Summary

| Anti-Pattern | Problem | Fix |
|---|---|---|
| No `await waitUntilExit()` | Process exits before cleanup | Always await |
| Two `render()` to same stdout | Second options ignored | `cleanup()` between renders |
| `debug: true` in production | Accumulates all frames | Only in development |
| `patchConsole: false` | `console.log` corrupts output | Keep default `true` |
| Using Suspense without `concurrent: true` | Suspense silently broken | Enable concurrent mode |
| No `cleanup()` in tests | Instance leaks between tests | Call `cleanup()` in `afterEach` |
| Assuming CI supports raw mode | Throws in CI | Check `isRawModeSupported` |
| Assuming `stdout.columns` is set | `undefined` when not TTY | Guard with `?? 80` |
