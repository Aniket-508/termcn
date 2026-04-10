# Performance Best Practices

## How the Render Loop Works

Ink throttles renders at **30 FPS** by default (~33ms window). The throttle runs with `leading: true, trailing: true` — the first render fires immediately, then subsequent updates are batched into the trailing edge.

Two render paths exist:
- **Normal render** → throttled at `maxFps`
- **Static render** (`<Static>` updates) → **always immediate**, bypasses throttle

Output comparison (`output !== lastOutput`) prevents unnecessary terminal I/O when React re-renders produce no visible change.

---

## Rule: Tune FPS to Your Use Case

Default 30 FPS is a safe middle ground. Adjust based on your UI's needs:

```jsx
// Heavy computation — avoid wasting CPU on renders
render(<App />, {maxFps: 10});

// Real-time game or animation
render(<App />, {maxFps: 60});

// Measure to find the bottleneck
render(<App />, {
  onRender: ({renderTime}) => {
    if (renderTime > 16) console.error(`Slow render: ${renderTime}ms`);
  },
});
```



---

## Rule: Use `<Static>` for Append-Only Output

`<Static>` renders each item **once** and permanently. Previously rendered items never re-render, even as state changes around them. This is the primary tool for performance-sensitive, high-volume output (test runners, build logs, migrations).

```jsx
// CORRECT
const TaskRunner = () => {
  const [done, setDone] = useState([]);
  const [current, setCurrent] = useState('Building...');

  return (
    <>
      <Static items={done}>
        {task => (
          <Box key={task.id}>
            <Text color="green">✔ {task.name}</Text>
          </Box>
        )}
      </Static>
      <Text dimColor>Running: {current}</Text>
    </>
  );
};
```

**Rules for `<Static>`:**
- Items array must only **grow** (append). Mutations to existing items are ignored.
- Each rendered element needs a **stable `key`** (use item ID, not array index if items can reorder).
- `<Static>` always renders immediately — Yoga calculates layout, then output fires before the throttle window.


---

## Rule: Never Use Unbounded Arrays for Live Display

Arrays that grow without bound cause memory leaks and slow renders as React diffs the full array:

```jsx
// BAD — grows forever, re-renders all items every tick
const [logs, setLogs] = useState([]);
useEffect(() => {
  stream.on('data', line => setLogs(prev => [...prev, line]));
}, []);
return logs.map((log, i) => <Text key={i}>{log}</Text>);

// GOOD — permanent output via Static
<Static items={logs}>
  {log => <Text key={log.id}>{log.text}</Text>}
</Static>

// GOOD — bounded window for a scrollable display
const [recent, setRecent] = useState([]);
stream.on('data', line => setRecent(prev => [...prev.slice(-50), line]));
```

---

## Rule: Memoize Style Objects

Every render, React passes props to the reconciler. If style is a new object each time, Ink diffs it against old props — Yoga then recalculates layout even if values are identical:

```jsx
// BAD — new object every render → unnecessary Yoga layout recalc
const MyBox = () => (
  <Box style={{flexDirection: 'column', padding: 1}}>
    ...
  </Box>
);

// GOOD — stable reference → reconciler diff returns null → Yoga skips
const style = {flexDirection: 'column', padding: 1};
const MyBox = () => <Box style={style}>...</Box>;

// GOOD — memoize when props affect style
const MyBox = ({isWide}) => {
  const style = useMemo(
    () => ({flexDirection: isWide ? 'row' : 'column'}),
    [isWide],
  );
  return <Box style={style}>...</Box>;
};
```


---

## Rule: Use Incremental Rendering for Sparse Updates

When your UI has a large stable area and only a small region updates frequently, incremental rendering saves I/O by diffing line-by-line instead of erasing and redrawing everything:

```jsx
render(<App />, {incrementalRendering: true});
```

**How it works:** Compares each line of new output against the previous frame. Unchanged lines → cursor moves past them. Changed lines → written. This avoids the ANSI erase-and-rewrite cycle for stable content.


---

## Rule: Memoize Expensive Context Values

If you build a context provider, memoize its value to prevent all consumers from re-rendering on unrelated state changes:

```jsx
// BAD — new object every render, all consumers re-render
const ctx = {data, refresh};

// GOOD — stable reference, consumers only re-render when data or refresh changes
const ctx = useMemo(() => ({data, refresh}), [data, refresh]);
```


---

## Rule: Use `useCallback` for Stable Event Handler References

Unstable handler references cause effects that depend on them to re-run unnecessarily:

```jsx
// BAD — new function every render → effects re-run
const handleExit = (error) => { cleanup(); onExit(error); };

// GOOD — stable reference → effects only re-run when deps change
const handleExit = useCallback(
  (error) => { cleanup(); onExit(error); },
  [cleanup, onExit],
);
```


---

## Rule: Don't Update State at Unbounded Frequency

Ink processes React updates synchronously by default (legacy mode). Firing state updates faster than `maxFps` doesn't produce more frames — it just wastes CPU:

```jsx
// BAD — updates every millisecond, only 33ms renders fire
setInterval(() => setState(n => n + 1), 0);

// GOOD — align update rate to render rate
setInterval(() => setState(n => n + 1), 1000 / 30);
```

---

## Rule: Profile with `onRender`

Use the built-in metrics callback before optimizing. Don't guess:

```jsx
const {rerender} = render(<App />, {
  onRender: ({renderTime}) => {
    // renderTime = ms from start of render to completion
    metrics.push(renderTime);
    if (metrics.length % 100 === 0) {
      const avg = metrics.reduce((a, b) => a + b, 0) / metrics.length;
      process.stderr.write(`Avg render: ${avg.toFixed(2)}ms\n`);
    }
  },
});
```
---

## Rule: Prefer `debug: true` During Development

Debug mode disables throttling and writes each render separately without clearing:

```jsx
render(<App />, {debug: true});
```

This lets you see every render frame in your terminal scrollback — useful for spotting unwanted re-renders. **Never use in production** as it accumulates all output.

---

## Anti-Patterns Summary

| Anti-Pattern | Problem | Fix |
|---|---|---|
| Raw strings in `<Box>` | Throws at runtime | Wrap in `<Text>` |
| Inline style objects `{{padding: 1}}` | Yoga layout recalc every render | Hoist to module or `useMemo` |
| Unbounded `useState` arrays for logs | Memory leak + slow renders | Use `<Static>` |
| `setInterval` faster than `maxFps` | Wasted CPU | Match rate to FPS |
| `maxFps: 60` for slow data apps | Unnecessary renders | Lower to 10-15 |
| No `onRender` during perf debugging | Guessing | Add metrics first |
