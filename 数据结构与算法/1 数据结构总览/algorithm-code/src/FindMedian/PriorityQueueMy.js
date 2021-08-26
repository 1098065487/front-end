// 默认的构造参数，默认为最大堆
const DEFAULT_COMPARATOR = (a, b) => {
	if(typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}
	a = a.toString();
	b = b.toString();
	if(a === b) {
		return 0;
	}
	return a > b ? 1 : -1;
};

class PriorityQueueMy {
	constructor(comparator) {
		this._comparator = comparator || DEFAULT_COMPARATOR;
		this._elements = [];
	}
	
	// 取堆顶值，不影响堆
	peek = () => {
		if(this.isEmpty()) {
			throw new Error('PriorityQueue is empty!');
		}
		return this._elements[0];
	};
	
	// 入堆
	enq = element => {
		this._elements.push(element);
		let current = this.size() - 1;
		while(current > 0) {
			const parent = Math.floor((current - 1) / 2);
			if(this.compare(current, parent) <= 0) {
				break;
			}
			this.exchange(current, parent);
			current = parent;
		}
		console.log('入堆：   ' + this._elements);
		return this.size();
	};
	
	// 出堆
	deq = () => {
		// 获取堆顶，作为出堆操作返回值
		const first = this.peek();
		// 处理出堆
		const last = this._elements.pop();
		if(this.size() === 0) {
			console.log('出堆，堆空')
			return first;
		}
		console.log(this._elements)
		this._elements[0] = last;
		// 调整
		let current = 0;
		while(current < this.size()) {
			let largest = current;
			const left = 2 * current + 1;
			const right = 2 * current + 2;
			if(left < this.size() && this.compare(left, largest) >= 0) {
				largest = left;
			}
			if(right < this.size() && this.compare(right, largest) >= 0) {
				largest = right;
			}
			if(largest === current) break;
			this.exchange(largest, current);
			current = largest;
			// left和right所对应下标可能不存在，不能按以下写法
			// if(this.compare(left, right) >= 0) {
			// 	if(this.compare(current, left) <= 0) break;
			// 	this.exchange(current, left);
			// 	current = left;
			// } else {
			// 	if(this.compare(current, right) <= 0) break;
			// 	this.exchange(current, right);
			// 	current = right;
			// }
		}
		console.log('出堆：  ' + this._elements);
		return first;
	};
	
	isEmpty = () => {
		return this.size() === 0;
	};
	
	size = () => {
		return this._elements.length;
	};
	
	// 比较两个元素
	compare = (a, b) => {
		return this._comparator(this._elements[a], this._elements[b]);
	};
	// 交换两个元素
	exchange = (a, b) => {
		[this._elements[a], this._elements[b]] = [this._elements[b], this._elements[a]];
	};
}

export default PriorityQueueMy;