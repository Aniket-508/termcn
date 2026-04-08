# Common Patterns

## Counter with Timer

The most basic Ink pattern — state updates over time:

```jsx
import React, {useState, useEffect} from 'react';
import {render, Text} from 'ink';

const Counter = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCount(prev => prev + 1);
		}, 100);
		return () => clearInterval(timer);
	}, []);

	return <Text color="green">{count} tests passed</Text>;
};

render(<Counter />);
```

## Task Runner (Static + Live)

Display completed items permanently with `<Static>`, show live progress below:

```jsx
import React, {useState, useEffect} from 'react';
import {render, Static, Box, Text} from 'ink';

const TaskRunner = () => {
	const [completed, setCompleted] = useState([]);
	const [running, setRunning] = useState('Task 1');

	return (
		<>
			<Static items={completed}>
				{task => (
					<Box key={task.id}>
						<Text color="green">✔ {task.name}</Text>
					</Box>
				)}
			</Static>

			<Box marginTop={1}>
				<Text dimColor>Running: {running}</Text>
			</Box>
		</>
	);
};
```

## Keyboard Navigation Menu

Arrow keys to navigate, Enter to select, q to quit:

```jsx
import React, {useState} from 'react';
import {render, Box, Text, useInput, useApp} from 'ink';

const Menu = ({items}) => {
	const [selected, setSelected] = useState(0);
	const {exit} = useApp();

	useInput((input, key) => {
		if (input === 'q') exit();
		if (key.upArrow) setSelected(i => Math.max(0, i - 1));
		if (key.downArrow) setSelected(i => Math.min(items.length - 1, i + 1));
		if (key.return) handleSelect(items[selected]);
	});

	return (
		<Box flexDirection="column">
			{items.map((item, i) => (
				<Text key={item} color={i === selected ? 'green' : undefined}>
					{i === selected ? '> ' : '  '}{item}
				</Text>
			))}
		</Box>
	);
};
```

## Chat/Text Input

Handle character-by-character input with backspace:

```jsx
import React, {useState} from 'react';
import {render, Box, Text, useInput} from 'ink';

const TextInput = () => {
	const [value, setValue] = useState('');
	const [messages, setMessages] = useState([]);

	useInput((input, key) => {
		if (key.return) {
			setMessages(prev => [...prev, {id: prev.length, text: value}]);
			setValue('');
			return;
		}
		if (key.backspace || key.delete) {
			setValue(prev => prev.slice(0, -1));
			return;
		}
		setValue(prev => prev + input);
	});

	return (
		<Box flexDirection="column">
			{messages.map(msg => (
				<Text key={msg.id}>{msg.text}</Text>
			))}
			<Text>{'> '}{value}</Text>
		</Box>
	);
};
```

## Focus Cycling

Tab through focusable items:

```jsx
import React from 'react';
import {render, Box, Text, useFocus} from 'ink';

const FocusItem = ({label}) => {
	const {isFocused} = useFocus();
	return (
		<Text color={isFocused ? 'green' : undefined}>
			{isFocused ? '>' : ' '} {label}
		</Text>
	);
};

const App = () => (
	<Box flexDirection="column">
		<FocusItem label="Item 1" />
		<FocusItem label="Item 2" />
		<FocusItem label="Item 3" />
	</Box>
);
```

## Subprocess Output

Capture and display child process output:

```jsx
import React, {useState, useEffect} from 'react';
import {render, Text, Box} from 'ink';
import {spawn} from 'child_process';

const SubprocessViewer = ({command, args}) => {
	const [lines, setLines] = useState([]);

	useEffect(() => {
		const child = spawn(command, args);
		child.stdout.on('data', data => {
			setLines(prev => [...prev.slice(-4), data.toString().trim()]);
		});
		return () => child.kill();
	}, []);

	return (
		<Box flexDirection="column">
			{lines.map((line, i) => (
				<Text key={i}>{line}</Text>
			))}
		</Box>
	);
};
```

## Responsive Layout

Adapt to terminal size:

```jsx
import React from 'react';
import {render, Box, Text, useStdout} from 'ink';

const Responsive = () => {
	const {stdout} = useStdout();
	const isWide = stdout.columns > 80;

	return (
		<Box flexDirection={isWide ? 'row' : 'column'}>
			<Box width={isWide ? '30%' : '100%'}>
				<Text>Sidebar</Text>
			</Box>
			<Box flexGrow={1}>
				<Text>Main content</Text>
			</Box>
		</Box>
	);
};
```

## Progress Bar

Visual progress indicator:

```jsx
import React from 'react';
import {Box, Text} from 'ink';

const ProgressBar = ({percent, width = 40}) => {
	const filled = Math.round(width * percent);
	const empty = width - filled;

	return (
		<Box>
			<Text color="green">{'█'.repeat(filled)}</Text>
			<Text color="gray">{'░'.repeat(empty)}</Text>
			<Text> {Math.round(percent * 100)}%</Text>
		</Box>
	);
};
```

## Table with Columns

Fixed-width column layout:

```jsx
import React from 'react';
import {Box, Text} from 'ink';

const Table = ({data, columns}) => (
	<Box flexDirection="column">
		<Box>
			{columns.map(col => (
				<Box key={col.key} width={col.width}>
					<Text bold>{col.label}</Text>
				</Box>
			))}
		</Box>
		{data.map((row, i) => (
			<Box key={i}>
				{columns.map(col => (
					<Box key={col.key} width={col.width}>
						<Text>{row[col.key]}</Text>
					</Box>
				))}
			</Box>
		))}
	</Box>
);
```

## Router with React Router

Navigate between views:

```jsx
import React from 'react';
import {render, Box, Text, useInput, useApp} from 'ink';
import {MemoryRouter, Routes, Route, useNavigate} from 'react-router';

const Home = () => {
	const navigate = useNavigate();
	useInput((input) => {
		if (input === 's') navigate('/settings');
	});
	return <Text>Home (press s for settings)</Text>;
};

const App = () => (
	<MemoryRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/settings" element={<Settings />} />
		</Routes>
	</MemoryRouter>
);

render(<App />);
```

## Suspense with Data Fetching

Use React Suspense for async data (requires `concurrent: true`):

```jsx
import React, {Suspense} from 'react';
import {render, Text} from 'ink';

const cache = new Map();

function fetchData(key) {
	if (!cache.has(key)) {
		const promise = loadData(key).then(data => {
			cache.set(key, {status: 'resolved', data});
		});
		cache.set(key, {status: 'pending', promise});
	}
	const entry = cache.get(key);
	if (entry.status === 'pending') throw entry.promise;
	return entry.data;
}

const DataView = ({dataKey}) => {
	const data = fetchData(dataKey);
	return <Text>{data}</Text>;
};

render(
	<Suspense fallback={<Text>Loading...</Text>}>
		<DataView dataKey="users" />
	</Suspense>,
	{concurrent: true},
);
```

## Exit with Result

Pass a value or error through exit:

```jsx
import {render, useApp} from 'ink';

const App = () => {
	const {exit} = useApp();

	useEffect(() => {
		doWork()
			.then(result => exit(result))    // resolves waitUntilExit
			.catch(error => exit(error));     // rejects waitUntilExit
	}, []);

	return <Text>Working...</Text>;
};

const {waitUntilExit} = render(<App />);
const result = await waitUntilExit();
```
