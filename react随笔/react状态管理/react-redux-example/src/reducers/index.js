import { combineReducers } from 'redux';
import todos from './todo';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
	todoList: todos,  // 可以这样修改state取值key
	visibilityFilter,
});