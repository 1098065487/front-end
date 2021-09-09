import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

const AddTodo = ({dispatch, ...props}) => {
	let input;
	
	console.log(props);  // props中包含了整个应用的state
	
	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault();
					if(!input.value.trim()) {
						return
					}
					dispatch(addTodo(input.value));
					input.value = '';
				}}
			>
				<input ref={node => (input = node)} />
				<button type='submit'>Add Todo</button>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log(state.visibilityFilter);
	return state;
};

export default connect(mapStateToProps)(AddTodo);