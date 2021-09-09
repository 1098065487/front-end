import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { toggleTodo } from '../actions';

const TodoList = ({ todos, dispatch }) => (
	<ul>
		{todos.map(todo => (
			<Todo key={todo.id} {...todo} onClick={() => dispatch(toggleTodo(todo.id))} />
		))}
	</ul>
);

TodoList.propTypes = {
	todos: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			completed: PropTypes.bool.isRequired,
			text: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
	// toggleTodo: PropTypes.func.isRequired,
};

export default TodoList;