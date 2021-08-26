import React, { Component } from 'react';
import { createStore } from '@reduxjs/toolkit'; // 轻量级包
import { Provider, connect } from 'react-redux';

// reducer定义
const initialState = { a: 0 };
const reducers = (state = initialState, action) => {
	switch(action.type) {
	case 'COUNTER_ADD':
		return { ...state, a: state.a + 1 };
	case 'COUNTER_DEC':
		return { ...state, a: state.a - 1 };
	default:
		return state;
	}
};

// action定义，在我看来，其实没有必要存在，可以直接写在组件内，其也就是返回请求的数据和方法罢了，跟随组件写反而更清晰
const actionAdd = () => ({ type: 'COUNTER_ADD' });
const actionDec = () => ({ type: 'COUNTER_DEC' });

// 原始组件
class Demo extends Component {
	render() {
		const { store, dispatch } = this.props;
		return (
			<div>
				<p>a = {store.a}</p>
				<p>
					<button key='add' onClick={() => dispatch(actionAdd())}>增加 1</button>
					<button key='dec' onClick={() => dispatch(actionDec())}>减少 1</button>
				</p>
			</div>
		);
	}
}

// connect连接store和组件，将state传到组件props上
const mapStateToProps = (state) => {
	return { store: state };
};
const Root = connect(mapStateToProps)(Demo);

// 组件使用redux
const store = createStore(reducers);
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Root />
			</Provider>
		);
	}
}