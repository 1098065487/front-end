/*
除了利用二叉查找树的中序遍历是顺序数组的特性来判断，还可以依据定义判定是否二叉查找树
* */
import { data1, data2 } from "./data.js";

const isValidBST = tree => {
	if(!tree) return true;
	return valid(tree);
};

const valid = (tree, min = -Infinity, max = Infinity) => {
	// 这里不是与上面重复，存在左右子树不存在的，比如叶子节点
	if(!tree) return true;
	
	const val = tree.val;
	
	// 所有左子树节点均小于其父节点，所有右子树节点均大于其父节点
	if(val <= min) return false;
	if(val >= max) return false;
	
	return valid(tree.left, min, val) && valid(tree.right, val, max);
};

console.log(isValidBST(data1));
console.log(isValidBST(data2));