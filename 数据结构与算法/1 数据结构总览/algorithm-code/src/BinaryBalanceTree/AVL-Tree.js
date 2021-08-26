import cx from './cx.js';
import data from './data.js';

class BTNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

// 获取树的高度
const getNodeHeight = node => {
	if(!node) return 0;
	const lh = getNodeHeight(node.left);
	const rh = getNodeHeight(node.right);
	
	return (lh > rh ? lh : rh) + 1;
};

// 获取树的平衡因子
const getBF = node => {
	return getNodeHeight(node.left) - getNodeHeight(node.right);
};

/*
 单左旋思想：当右子树深度 - 左子树深度 > 1
 对节点的右子节点操作，将右子节点的左子节点移到该节点的右子节点指针，再将右子节点空掉的左子节点指针指向该节点
 */
const leftRotation = node => {
	const nodeRight = node.right;
	node.right = nodeRight.left;
	nodeRight.left = node;
	return nodeRight;
};

/*
 单右旋思想：当左子节点深度 - 右子节点深度 > 1
 对节点的左子节点操作，将左子节点的右子节点移到该节点的左子节点指针，再将左子节点空掉的右子节点指针指向该节点
 */
const rightRotation = node => {
	const nodeLeft = node.left;
	node.left = nodeLeft.right;
	nodeLeft.right = node;
	return nodeLeft;
};

/*
 左右双旋思想：当左子节点深度 - 右子节点深度 > 1，且左子节点的右子节点深度 > 左子节点的左子节点深度
 先对节点的左子节点的右子节点操作，左旋，再对节点的左子节点操作，右旋
 */
const leftRightRotation = node => {
	node.left = leftRotation(node.left);
	return rightRotation(node);
};

/*
 右左双旋思想：当右子节点深度 - 左子节点深度 > 1，且右子节点的左子节点深度 > 右子节点的右子节点深度
 先对节点的右子节点的左子节点操作，右旋，在对节点的右子节点操作，左旋
 */
const rightLeftRotation = node => {
	node.right = rightRotation(node.right);
	return leftRotation(node);
};

// 一次平衡操作（代码中没看出遍历的情况，默认基于二叉平衡树操作）
const balance = node => {
	// console.log(node);
	if(!node) return node;
	// 左子树的平衡因子显示不平衡
	if(getBF(node) > 1) {
		// 左右双旋的情况，可以用下面更简单
		// if(getBF(node.left) < 0) {
		// 	node = leftRightRotation(node);
		// } else {
		// 	node = rightRotation(node);
		// }
		
		// 左子树的右子树平衡因子显示不平衡
		if(getBF(node.left) < 0) {
			node.left = leftRotation(node.left);
		}
		node = rightRotation(node);
	}
	// 右子树的平衡因子显示不平衡
	if(getBF(node) < -1) {
		// 右左双旋的情况，可以用下面更简单
		// if(getBF(node.right) > 0) {
		// 	node = rightLeftRotation(node);
		// } else {
		// 	node = leftRotation(node);
		// }
		
		// 右子树的左子树平衡因子显示不平衡
		if(getBF(node.right) > 0) {
			node.right = rightRotation(node.right);
		}
		node = leftRotation(node);
	}
	
	return node;
};

// 插入某个节点
const insertNode = (data, node) => {
	// 仅当到叶子节点才开始添加值，由于有再平衡操作，不用担心结构变化问题
	if(!node) {
		return new BTNode(data);
	}
	// 递归确定插入值的叶子节点位置
	if(data < node.val) {
		node.left = insertNode(data, node.left);
	}
	if(data > node.val) {
		node.right = insertNode(data, node.right);
	}
	// 再平衡
	node = balance(node);
	return node;
};

// 获取二叉查找树的最小值
const findMin = node => {
	while(node && node.left) {
		node = node.left;
	}
	return node;
};

// 删除某个节点
const removeNode = (data, node) => {
	if(!node) return false;
	
	if(data < node.val) {
		node.left = removeNode(data, node.left);
	} else if(data > node.val) {
		node.right = removeNode(data, node.right);
	} else {
		// else即相等的情况
		// 当查询到叶子节点时，返回null，做删除操作
		if(!node.left && !node.right) {
			return null;
		}
		// 非叶子节点，但是有一颗子树不存在，则直接返回存在的子树，做删除节点操作
		if(!node.left) {
			return node.right;
		}
		if(!node.right) {
			return node.left;
		}
		// 非叶子节点，且两颗子树都存在
		// 取右子树的最小值，即待删除元素的下一个数，替换删除的位置
		const aux = findMin(node.right);
		node.val = aux.val;  // 数值替换
		node.right = removeNode(aux.val, node.right);  // 右子树删除替换元素
	}
	// 再平衡
	node = balance(node);
	return node;
};

class AVLTree {
	constructor(data) {
		this.root = data;
	}
	
	insert = val => {
		// 从根节点开始递归
		this.root = insertNode(val, this.root);
	};
	
	remove = val => {
		this.root = removeNode(val, this.root);
	}
}

// 注意这里的data已经是二叉搜索树，平衡操作可变成二叉平衡树
const avl = new AVLTree(data);

console.log(cx(avl.root));

avl.root = balance(avl.root);
console.log(cx(avl.root));

avl.insert(20);
avl.root = insertNode(25, avl.root);

avl.remove(25);
avl.root = removeNode(22, avl.root);

console.log(cx(avl.root));
