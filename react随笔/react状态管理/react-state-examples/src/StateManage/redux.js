import React, { useState } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { createReducer, combineReducers, configureStore } from '@reduxjs/toolkit';

const App = () => {
	const [input, setInput] = useState('');
	
	// 可以理解成一种监听state，同步反应到筛选上的结果
	const notes = useSelector(state => state.notes);
	
	// dispatch原来是这么来的
	const dispatch = useDispatch();
	
	// action
	const onCreateNote = () => {
		dispatch({
			type: 'CREATE_NOTE',
			note: input
		});
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
};

// 创建一个reducer，内含action具体方法
const notesReducer = createReducer([], {
	'CREATE_NOTE': (state, action) => [...state, action.note],
});

// 组合reducers，配置中的key在使用时直接用
const reducers = combineReducers({ notes: notesReducer });
// 配置store，即组合后的reducer
const store = configureStore({ reducer: reducers });

export default function Main() {
	return (
		// 必须包裹Provider，并在其上配置好store
		<Provider store={store}>
			<App />
		</Provider>
	);
}