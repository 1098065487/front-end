import data from './data.js';

/*
后序遍历思路：
后序遍历顺序是左右根，按照顺序去获取比较麻烦，转换思路，
只有当节点为叶子节点时，或者叶子节点都输出完了的父节点，该节点才可以输出，且顺序是左右根，
可以判断，当节点为叶子节点或输出玩叶子节点的父节点时，记录节点值，否则，按先右后左的顺序，将节点压入栈

步骤：
1.根节点入栈
2.判断当前栈顶节点，是否为叶子节点或者输出完叶子节点的父节点，是则记录该节点值，并弹出栈顶节点
3.不是则先将右子节点压入栈，后将左子节点压入栈
4.循环步骤2，3，直至结束
* */

const postorderTraversal = root => {
	if(!root) return [];
	
	// 根节点入栈
	const stack = [root];
	// 返回值
	const ret = [];
	
	// 标识判断是否出栈，其实就是记录上一步出栈的右子节点，是否和当前节点右子节点一致，一致表示该节点所有叶子节点已输出完
	let p = root;
	// 栈顶节点，由于pop方法影响原数组，要么使用数组下标去取，stack[stack.length - 1]，要么使用slice()复制数组
	let item;
	
	while((item = stack.slice().pop())) {
		// 判断当前节点是否为输出完的父节点或者叶子节点
		if(item.left === p || item.right === p || (!(item.left) && !(item.right))) {  // 先左后右的顺序，其实只要item.right === p即可
			ret.push(item.val);
			p = stack.pop();
		} else {
			if(item.right) {
				stack.push(item.right);
			}
			if(item.left) {
				stack.push(item.left);
			}
		}
	}
	
	return ret;
};

console.log(postorderTraversal(data));