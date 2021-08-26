import React from 'react';
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";

// 配置数据源，采用最新makeAutoObservable，可以不用再区分标记数据和action
class Store {
	data = { a: 0 };
	actionAdd = () => { this.data.a++ };
	actionDec = () => { this.data.a-- };
	constructor() {
		makeAutoObservable(this);
	}
}
const store = new Store(); // 获取数据源

// 在组件上添加监听，可以同步使用数据和方法
const App = observer(() => {
	const { data, actionAdd, actionDec } = store;
	return (
		<div>
			<p>a = {data.a}</p>
			<p>
				<button key='add' onClick={actionAdd}>增加 1</button>
				<button key='dec' onClick={actionDec}>减少 1</button>
			</p>
		</div>
	);
});

export default App;

// 这里使用的是轻量级的mobx-react包，关于数据在组件间传递，没有看出来
// 案例上给的是类似于redux Provider提供的方式，可以参考
// https://zhuanlan.zhihu.com/p/53599723 最末尾