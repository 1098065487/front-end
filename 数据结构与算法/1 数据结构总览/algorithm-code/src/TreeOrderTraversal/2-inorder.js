import data from './data.js';

/*
中序遍历思路：
中序遍历顺序是左根右，从根节点开始，按层级依次将所有的左子节点压入栈，遍历出栈，
首次是记录栈顶最外层左子节点的值，出栈后，新的栈顶节点，则是上一层左子节点，包括已记录的左子节点和中间根节点和右子节点的值，
此时再记录当前根节点的值，并将右子节点压入栈，再将右子节点的所有左子节点压入栈，以此循环，直至出栈结束

步骤：
1.从根节点开始，根节点进栈（所有的二叉树遍历操作，第一步都是根节点进栈）
2.将其所有左子节点压入栈，不存在则跳过，取栈顶节点，保存节点值
3.将指针指向当前的右子节点上，若存在右子节点，先将右子节点压入栈，再将该右子节点的所有左子节点压入栈（步骤2），不存在则跳过
4.重复2，3
* */

const inorderTraversal = root => {
	if(!root) return [];
	
	// 根节点进栈
	const stack = [root];
	// 返回值
	const ret = [];
	
	let left = root.left;
	let item = null;
	
	// 所有左子节点压入栈
	while(left) {
		stack.push(left);
		left = left.left;
	}
	
	// 遍历出栈
	while((item = stack.pop())) {
		// 栈顶节点保存值
		ret.push(item.val);
		// 右子节点
		let t = item.right;
		
		// 右子节点入栈，并将所有左子节点入栈
		while(t) {
			stack.push(t);
			t = t.left;
		}
	}
	
	return ret;
};

console.log(inorderTraversal(data));

export default inorderTraversal;