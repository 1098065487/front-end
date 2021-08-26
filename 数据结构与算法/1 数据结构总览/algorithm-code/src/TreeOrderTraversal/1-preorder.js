import data from './data.js';

/*
前序遍历思路：
前序遍历顺序是根左右，先处理根，最简单，按层级，每次先处理根节点，再将右子节点，左子节点按顺序压入栈，循环直至结束

步骤：
1.根节点进栈
2.记录当前栈顶节点的值
3.查看右子节点，存在，则入栈，不存在，跳过
4.查看左子节点，存在，则入栈，不存在，跳过（出栈先进后出，故后处理左子节点）
5.栈顶节点出栈，重复步骤2，3，4
* */

const preorderTraversal = root => {
	if(!root) return [];
	
	// 根节点进栈
	const stack = [root];
	// 返回值
	const ret = [];
	
	// 当前栈顶节点
	let t = stack.pop();
	
	while(t) {
		// 先处理右子节点入栈
		if(t.right) {
			stack.push(t.right);
		}
		// 后处理左子节点入栈
		if(t.left) {
			stack.push(t.left);
		}
		// 记录当前栈顶节点的值
		ret.push(t.val);
		// 栈顶节点出栈，重复操作
		t = stack.pop();
	}
	
	return ret;
};

console.log(preorderTraversal(data));