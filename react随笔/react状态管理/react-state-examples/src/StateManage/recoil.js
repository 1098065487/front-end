import React, { useState } from 'react';
import {RecoilRoot, atom, useRecoilState, selector, useRecoilValue} from 'recoil';

// 类似于Context，使用RecoilRoot包裹的组件，可以获取预定义的状态
const notesState = atom({
	key: 'noteState',
	default: [],
});
const todoState = atom({
	key: 'todoState',
	default: [
		{name: 'todo1', completed: true},
		{name: 'todo2', completed: false},
	],
});
const completedTodosState = selector({
	key: 'completedTodosState',
	get: ({get}) => {
		const todos = get(todoState);
		return todos.filter(todo => todo.completed);
	}
});

export default function Main() {
	return (
		<RecoilRoot>
			<App />
		</RecoilRoot>
	);
}

function App() {
	const [notes, setNotes] = useRecoilState(notesState);
	const [todos, setTodos] = useRecoilState(todoState);
	
	const completedTodos = useRecoilValue(completedTodosState);
	
	const [input, setInput] = useState('');
	
	function createNote() {
		const notesArray = [...notes, input];
		setNotes(notesArray);
		setInput('');
	}
	
	return (
		<div>
			<h1>My notes app</h1>
			<button onClick={createNote}>Create Note</button>
			<input value={input} onChange={e => setInput(e.target.value)} />
			{notes.map(note => <p key={note}>Note: {note}</p>)}
		</div>
	);
}