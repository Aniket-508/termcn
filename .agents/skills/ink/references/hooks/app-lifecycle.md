# useApp

Control the app lifecycle from within components.

## Import

```jsx
import {useApp} from 'ink';
```

## Usage

```jsx
const {exit} = useApp();
```

## Returns

### exit(error?)

Exit the app. Unmounts the component tree and resolves or rejects the `waitUntilExit()` promise.

```jsx
const {exit} = useApp();

// Normal exit — resolves waitUntilExit()
exit();

// Exit with error — rejects waitUntilExit()
exit(new Error('Something went wrong'));
```

### Exiting with a Result Value

Pass any value to resolve `waitUntilExit()` with it:

```jsx
// In component
const {exit} = useApp();
exit(result); // resolves waitUntilExit with result

// Outside
const {waitUntilExit} = render(<App />);
const result = await waitUntilExit();
```

## Patterns

### Exit on Keypress

```jsx
import {useApp, useInput} from 'ink';

const App = () => {
	const {exit} = useApp();

	useInput((input) => {
		if (input === 'q') {
			exit();
		}
	});

	return <Text>Press q to quit</Text>;
};
```

### Exit After Task Completion

```jsx
const App = ({task}) => {
	const {exit} = useApp();

	useEffect(() => {
		runTask(task)
			.then(() => exit())
			.catch(error => exit(error));
	}, []);

	return <Text>Running task...</Text>;
};
```

### Exit with Error Handling

```jsx
const run = async () => {
	const {waitUntilExit} = render(<App />);

	try {
		await waitUntilExit();
		console.log('App exited successfully');
	} catch (error) {
		console.error('App failed:', error.message);
		process.exitCode = 1;
	}
};

run();
```

### Never Call process.exit() Directly

Always use `useApp().exit()` from within components. `process.exit()` prevents cleanup:

```jsx
// WRONG
process.exit(1);

// CORRECT
const {exit} = useApp();
exit(new Error('Fatal error'));
```

## See Also

- [Core API](../core/api.md) - render(), waitUntilExit(), unmount()
- [Input](./input.md) - useInput for keyboard-triggered exit
- [Gotchas](../core/gotchas.md) - Process not exiting issues
