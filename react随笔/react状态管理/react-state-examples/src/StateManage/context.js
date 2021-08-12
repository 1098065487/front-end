import React, { useState, createContext, useContext } from 'react';

const NotesContext = createContext();

export default function Main() {
	const [notes, setNotes] = useState([]);
	const createNote = note => {
		const noteArray = [...notes, note];
		setNotes(noteArray);
	};
	
	return (
		<NotesContext.Provider value={{ notes, createNote }}>
			<App />
		</NotesContext.Provider>
	);
}

function App() {
	// 注意一点，useContext()传入的是Context本身，不是Provider
	const { notes, createNote } = useContext(NotesContext);
	const [input, setInput] = useState('');
	
	const onCreateNote = () => {
		createNote(input);
		setInput('');
	};
	
	return (
		<div>
			<h1>My notes app</h1>
			<button onClick={onCreateNote}>Create Note</button>
			<input value={input} onChange={e => setInput(e.target.value)} />
			{notes.map(note => <p key={note}>Note: {note}</p>)}
		</div>
	);
}

// 讲道理，这只是为了讲解Context才做的示例，实际要自己去做，甚至用不上Context