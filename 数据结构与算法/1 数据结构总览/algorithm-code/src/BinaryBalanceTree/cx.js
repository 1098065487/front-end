const levelorderTraversal = root => {
	if (!root) return [];
	const items = []; // 存放所有节点
	const queue = [root, null]; // null 简化操作
	let levelNodes = []; // 存放每一层的节点
	
	while (queue.length > 0) {
		const t = queue.shift();
		
		if (t) {
			levelNodes.push(t.val);
			if (t.left) {
				queue.push(t.left);
			}
			if (t.right) {
				queue.push(t.right);
			}
		} else {
			// 一层已经遍历完了
			items.push(levelNodes);
			levelNodes = [];
			if (queue.length > 0) {
				queue.push(null);
			}
		}
	}
	
	return items;
}
export default levelorderTraversal;