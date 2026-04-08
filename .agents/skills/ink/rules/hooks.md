# Hook Best Practices

## `useInput`

### Rule: Tab and Shift+Tab Are Reserved

`Tab` and `Shift+Tab` are intercepted by the focus system and never reach `useInput` handlers. If you need custom Tab behavior, disable focus first:

```jsx
const {disableFocus} = useFocusManager();
disableFocus(); // now Tab reaches useInput
useInput((input, key) => {
  if (key.tab) { /* your custom logic */ }
});
```

### Rule: Ctrl+C Is Intercepted By Default

`exitOnCtrlC: true` (the default) means Ctrl+C exits the app before any `useInput` handler sees it:

```jsx
// To handle Ctrl+C yourself:
render(<App />, {exitOnCtrlC: false});

useInput((input, key) => {
  if (key.ctrl && input === 'c') {
    // Now you receive it
    performCleanup();
    exit();
  }
});
```

### Rule: Check `isRawModeSupported` in CI / Piped Input

Raw mode is unavailable when stdin is not a TTY (CI environments, piped input). `useInput` will silently not fire:

```jsx
const {isRawModeSupported} = useStdin();

useEffect(() => {
  if (!isRawModeSupported) {
    // Fallback: read from args, config, or skip interactive behavior
  }
}, [isRawModeSupported]);
```

### Rule: Use `isActive` to Coordinate Multiple `useInput` Hooks

All registered `useInput` handlers receive events unless you disable them. Coordinate with `isActive`:

```jsx
// Modal pattern — disable background input while modal is open
const [modalOpen, setModalOpen] = useState(false);

useInput(backgroundHandler, {isActive: !modalOpen});
useInput(modalHandler, {isActive: modalOpen});
```

### Rule: Pasted Text Fires the Handler Once with the Full String

When a user pastes multi-character text, `useInput` fires **once** with the entire paste as `input`:

```jsx
useInput((input, key) => {
  // input might be "Hello World" from a paste
  // key.return is false for pasted text
  if (input.length > 1) {
    handlePaste(input);
    return;
  }
  handleSingleChar(input, key);
});
```

### Rule: Uppercase Letters Always Set `key.shift = true`

This is a legacy behavior in Ink. If the user types `A`, `key.shift` is `true` regardless of whether the physical Shift key was pressed:

```jsx
useInput((input, key) => {
  // Don't rely on key.shift to detect Shift+letter combos
  // Instead, check input case directly
  if (input === 'A') { /* uppercase A */ }
  if (input === 'a') { /* lowercase a */ }
});
```

### Rule: Non-Printable Keys Produce Empty `input`

Arrow keys, F-keys, and modifier-only keys give `input === ''`. Use the `key` object instead:

```jsx
useInput((input, key) => {
  if (key.upArrow) { /* ← use key, not input */ }
  if (key.return) { /* ← use key, not input */ }
  if (input) { /* only truthy for printable characters */ }
});
```

### Rule: Wrap Input State Updates in `reconciler.discreteUpdates`

Ink does this internally — your state updates from `useInput` automatically get **discrete (high) priority** in React concurrent mode. You don't need to do anything extra, but it means input updates are never deferred or batched with lower-priority work.

---

## `useApp`

### Rule: Always Use `exit()` Instead of `process.exit()`

`process.exit()` aborts the process without cleanup, leaving the terminal in raw mode:

```jsx
// WRONG — terminal stays in raw mode, cursor hidden, garbled output
process.exit(0);

// CORRECT — disables raw mode, restores stdin, resolves waitUntilExit
const {exit} = useApp();
exit();
```

| Aspect | `exit()` | `process.exit()` |
|---|---|---|
| Disables raw mode | ✅ | ❌ |
| Restores cursor | ✅ | ❌ |
| Resolves `waitUntilExit()` | ✅ | ❌ |
| React cleanup | ✅ | ❌ |

### Rule: Pass Errors and Results via `exit()`

```jsx
const {exit} = useApp();

// Signal success with a value
exit('success');       // waitUntilExit() resolves with 'success'

// Signal failure with an Error
exit(new Error('timeout'));  // waitUntilExit() rejects with the error

// Plain exit
exit();               // resolves with undefined
```

### Rule: Do Not Call `exit()` During Effect Cleanup

Effect cleanup runs during React's unmount phase. Calling `exit()` there can cause re-entry:

```jsx
// RISKY — calling exit inside cleanup
useEffect(() => {
  return () => exit(); // Don't do this
}, []);

// CORRECT — schedule exit asynchronously if needed
useEffect(() => {
  return () => setTimeout(exit, 0);
}, [exit]);
```

### Rule: Raw Mode Blocks Exit Until Released

If any `useInput` or `useFocus` hook has raw mode enabled, `exit()` waits for raw mode to be released before resolving. This is automatic — you don't need to manage it.

---

## `useFocus` / `useFocusManager`

### Rule: Escape Resets Focus to `undefined`

Pressing Escape clears focus. The user must press Tab again to focus a component. This is intentional and not configurable:

```jsx
const {isFocused} = useFocus();
// After user presses Escape: isFocused === false for all components
```

### Rule: Unmounting a Focused Component Resets Focus

When the currently focused component unmounts, focus resets to `undefined`. It does **not** automatically move to the next component:

```jsx
// If FocusedItem unmounts while focused, user must Tab to refocus
{showItem && <FocusedItem />}
```

To auto-focus another component on unmount, use programmatic focus in an effect.

### Rule: Multiple `autoFocus` Components — Only First Wins

If multiple components have `autoFocus: true`, only the first registered one gets focus:

```jsx
// Only "First" gets autoFocus
<Item autoFocus label="First" />
<Item autoFocus label="Second" /> // this is ignored
```

### Rule: Disabled Components Are Skipped in Tab Navigation

Components with `isActive: false` stay registered but are invisible to Tab cycling:

```jsx
const {isFocused} = useFocus({isActive: !isDisabled});
```

If all components are disabled, Tab does nothing.

### Rule: `focus(id)` on Non-Existent ID Is Silent

Calling `focus('wrong-id')` silently does nothing. Ensure IDs match:

```jsx
// Register with explicit ID
const {isFocused} = useFocus({id: 'email-field'});

// Focus it programmatically
const {focus} = useFocusManager();
focus('email-field'); // ← must match exactly
```

### Rule: `focusNext()` / `focusPrevious()` Wraps Around

When at the last item, `focusNext()` wraps to the first. When at the first, `focusPrevious()` wraps to the last:

```jsx
// Use for arrow-key navigation in lieu of Tab
const {focusNext, focusPrevious} = useFocusManager();
useInput((_, key) => {
  if (key.downArrow) focusNext();
  if (key.upArrow) focusPrevious();
});
```

### Rule: Tab Order Is Component Mount Order

Components are focusable in the order they mount. If you need a different order, use `useFocusManager().focus(id)` programmatically rather than relying on Tab order.

### Rule: `activeId` Triggers Re-Renders for All Focusable Components

When focus changes, all components using `useFocus()` re-render to recalculate `isFocused`. For expensive renders, wrap the output in `useMemo`:

```jsx
const {isFocused} = useFocus();
const content = useMemo(() => <ExpensiveContent />, [data]);

return (
  <Box borderColor={isFocused ? 'green' : undefined} borderStyle="single">
    {content}
  </Box>
);
```

---

## `useCursor`

### Rule: Use `useInsertionEffect` Semantics Internally

`useCursor` uses `useInsertionEffect` (not `useEffect`) to synchronize cursor position. This ensures cursor state from abandoned renders (e.g. during Suspense) is discarded correctly. You don't call this yourself, but it explains why cursor state is always consistent.

### Rule: Provide Cursor Position Relative to Ink's Output Area

Coordinates are relative to the **top-left of Ink's rendered area**, not the full terminal:

```jsx
const {setCursorPosition} = useCursor();
// x = character offset from left edge of Ink output
// y = line offset from top of Ink output
setCursorPosition({x: stringWidth(prompt + text), y: 0});
```

### Rule: Cursor Hides Automatically on Unmount

When the component using `useCursor` unmounts, the cursor is hidden automatically via the cleanup in `useInsertionEffect`. No manual cleanup needed.

---

## `useStdin` / `useStdout` / `useStderr`

### Rule: Use `useStdout()` for Terminal Width

```jsx
const {stdout} = useStdout();
const width = stdout.columns ?? 80; // columns is undefined when not TTY

// Responsive layout
const isWide = width > 100;
```

### Rule: Use `useStderr()` for Error Output That Doesn't Corrupt UI

Writing to stdout directly competes with Ink's rendered output. Write errors to stderr:

```jsx
const {stderr} = useStderr();
stderr.write(`Error: ${message}\n`);
```

### Rule: Never Call `setRawMode` Directly

`useStdin()` exposes `setRawMode` but it uses reference counting internally. Calling `stdin.setRawMode()` directly bypasses the counter and can disable raw mode while other hooks still need it:

```jsx
// WRONG — bypasses refcount
const {stdin} = useStdin();
stdin.setRawMode(false); // breaks other hooks

// CORRECT — use the wrapped version
const {setRawMode} = useStdin();
setRawMode(false); // reference-counted
```

---

## `useIsScreenReaderEnabled`

### Rule: Provide `aria-label` on Visual-Only Boxes

When rendering visual decoration that means nothing to a screen reader:

```jsx
const isScreenReader = useIsScreenReaderEnabled();

// Box with aria-label — screen reader sees "Status: OK" instead of visual content
<Box aria-label="Status: OK">
  <Text color="green">■■■■■□□□□□</Text>
</Box>
```

---

## Anti-Patterns Summary

| Anti-Pattern | Problem | Fix |
|---|---|---|
| `process.exit()` | Terminal left in raw mode | Use `useApp().exit()` |
| No `isActive` with multiple `useInput` | All handlers fire | Coordinate with `isActive` |
| `focus('nonexistent')` | Silent no-op | Verify ID matches `useFocus({id})` |
| Assuming `key.shift` = Shift key for letters | Always true for uppercase | Check `input` case instead |
| `setRawMode(false)` directly on `stdin` | Breaks refcount | Use `useStdin().setRawMode` |
| `exit()` in effect cleanup | Re-entry risk | Schedule with `setTimeout(exit, 0)` |
| Not checking `isRawModeSupported` | Throws in CI | Guard with `if (isRawModeSupported)` |
| Multiple `autoFocus` | Only first wins | Use at most one `autoFocus` |
| Tab for custom navigation | Reserved by focus | `disableFocus()` first |
