import data from './data.js';
/*
 思想：
 使用两个堆来存储一个有序列表，最小堆从中间开始，顺序结束，最大堆从中间开始，倒序结束
 满足两个条件：
 1.最大堆的元素都比最小堆要小（按有序列表的顺序，从后往前，类似于是倒序的最小堆+最大堆）
 2.最大堆的数量 - 最小堆的数量  = 0 || 1 （保证中位数可在两个堆顶取到）
 * */

/*
写法1：
1》箭头函数不可以作为构造函数
2》原型链上方法实现中出现this指向构造的，全部不使用箭头函数
* */
const MedianFinder = function() {
	// 使用两个堆来存储顺序列表，最小堆从中位数开始，顺序结束，最大堆从中位数开始，倒序结束
	this.minHeap = [];
	this.maxHeap = [];
};

const minHeapify = function() {
	// hack操作，使实际数据从下标1开始，方便计算，既保证下标为i的节点，其父节点下标为i >> 1
	this.minHeap.unshift(null);
	const a = this.minHeap;

	// 看不懂原作者的排序算法，原文解释是因为数据结构为二叉堆，不太懂，在写法2中，使用快速排序，也可以实现功能
	for(let i = a.length - 1; i >> 1 > 0; i -= 1) {
		if(a[i] < a[i >> 1]) {
			let temp = a[i];
			a[i] = a[i >> 1];
			a[i >> 1] = temp;
		}
	}
	// hack操作
	this.minHeap.shift(null);
};

const maxHeapify = function() {
	this.maxHeap.unshift(null);
	const a = this.maxHeap;

	for(let i = a.length - 1; i >> 1 > 0; i -= 1) {
		if(a[i] > a[i >> 1]) {
			let temp = a[i];
			a[i] = a[i >> 1];
			a[i >> 1] = temp;
		}
	}
	this.maxHeap.shift(null);
};

MedianFinder.prototype.addNum = function(num) {
	// 插入值
	// if(num >= (this.minHeap[0] || Number.MIN_VALUE)) {
	// 	this.minHeap.push(num);
	// } else {
	// 	this.maxHeap.push(num);
	// }
	
	// 与其在处理后，根据大小交换堆顶元素，不如在一开始就保证min永远大于max
	this.maxHeap.push(num);
	maxHeapify.call(this);
	
	// 保证最大堆的数量最多比最小堆大1
	if(this.maxHeap.length > this.minHeap.length + 1) {
		this.minHeap.push(this.maxHeap.shift());
	}
	
	// 保证最小堆的数量最多和最大堆相等
	if(this.minHeap.length > this.maxHeap.length) {
		this.maxHeap.push(this.minHeap.shift());
	}
	
	// 保证最大堆的元素始终比最小堆要小（结合排序来，每次插入都会触发排序）
	// if(this.maxHeap[0] > this.minHeap[0]) {
	// 	let temp = this.maxHeap[0];
	// 	this.maxHeap[0] = this.minHeap[0];
	// 	this.minHeap[0] = temp;
	// }

	// 非原型链上方法，要保证this指向一致，才能有想要的结果
	minHeapify.call(this);
	maxHeapify.call(this);
};

// 获取中位数
MedianFinder.prototype.findMedian = function() {
	if((this.minHeap.length + this.maxHeap.length) % 2 === 0) {
		return (this.maxHeap[0] + this.minHeap[0]) / 2;
	}
	return this.maxHeap[0];
};

// 打印两个堆
MedianFinder.prototype.showHeap = function() {
	console.log('min:   ' + this.minHeap);
	console.log('max:   ' + this.maxHeap);
};

let obj = new MedianFinder();
console.time('test1');
for(let i = 0; i < data.length; i += 1) {
	obj.addNum(data[i]);
	obj.showHeap();
	console.log('*********************')
}
console.timeEnd('test1');
console.log(obj.findMedian());
obj.addNum(2);
obj.showHeap();
obj.addNum(1);
obj.showHeap();
console.log(obj.findMedian());


