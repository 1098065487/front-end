/*
判定一个二叉树是否为二叉查找树，可以通过中序遍历该二叉树，根据其是否为顺序数组判定
步骤，在中序遍历二叉树的过程记录中，缓存上一步记录的值和当前记录值比较，存在上一步大的情况，即可判定不是
* */
import { data1, data2 } from "./data.js";

const isValidBST1 = tree => {
	// 当二叉树为空，或仅根节点的情况，可以判定为二叉查找树
	if(tree === null) return true;
	if(tree.left === null && tree.right === null) return true;
	
	// 根节点入栈
	const stack = [tree];
	
	// 所有左子节点入栈
	let left = tree.left;
	while(left) {
		stack.push(left);
		left = left.left;
	}
	
	// 当前记录和上一步记录
	let item;
	let pre;
	
	// 出栈记录
	while((item = stack.pop())) {
		// 比较上一步记录和当前记录，上一步出现大的情况，即可判定非法
		if(pre && item.val <= pre.val) return false;
		
		// 右子树入栈
		let t = item.right;
		while(t) {
			stack.push(t);
			t = t.left;   // 右子树的左子树也入栈
		}
		// 缓存上一步记录的值
		pre = item;
	}
	
	return true;
};

console.log(isValidBST1(data1));
console.log(isValidBST1(data2));