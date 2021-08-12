import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { makeAutoObservable } from 'mobx';

// 数据源订阅，这里是类的写法，其实可以简单的调用makeAutoObservable方法订阅数据对象
class NoteStore {
	notes = [];
	createNote(note) {
		this.notes = [...this.notes, note];
	}
	constructor() {
		makeAutoObservable(this);
	}
}

const Notes = new NoteStore();

// observer监听数据变化，并更新到视图
const App = observer(() => {
	const [input, setInput] = useState('');
	const { notes } = Notes;
	function onCreateNote() {
		Notes.createNote(input);
		setInput('');
	}
	
	return (
		<div>
			<h1>My notes app</h1>
			<button onClick={onCreateNote}>Create Note</button>
			<input value={input} onChange={e => setInput(e.target.value)} />
			{notes.map(note => <p key={note}>Note: {note}</p>)}
		</div>
	);
});

// Listener只是拿来做一个简单的参照，可以不添加，不影响主功能
const Listener = observer(() => (<h1>{Notes.notes[Notes.notes.length - 1] || 'No note'}</h1>));

export default function Main() {
	return (
		<div>
			<App />
			<Listener />
		</div>
	);
}