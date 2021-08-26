/*
通过优先队列的实现
实际上优先队列的实现思路，还是和二叉堆一致，最大最小堆就是两种优先队列
这里有：
1.通过引用别人写的插件priorityqueuejs
2.通过复制插件源码，便于解析PriorityQueue
3.通过自己整理的改写插件
* */

// import PriorityQueue from 'priorityqueuejs';
// import PriorityQueue from './PriorityQueue.js';
import PriorityQueue from './PriorityQueueMy.js';
import data from "./data.js";

const MedianFinder = function () {
	this.maxHeap = new PriorityQueue((a, b) => a - b);
	this.minHeap = new PriorityQueue((a, b) => b - a);
};

MedianFinder.prototype.addNum = function (num) {
	// 我们的目标就是建立两个堆，一个大顶堆，一个小顶堆
	// 结合中位数的特点
	// 这两个堆需要满足:
	// 1. 大顶堆元素都比小顶堆小（由于堆的特点其实只要比较堆顶即可）
	// 2. 大顶堆元素不小于小顶堆，且最多比小顶堆多一个元素
	
	// 满足上面两个条件的话，如果想要找到中位数，就比较简单了
	// 如果两个堆数量相等（本质是总数为偶数）, 就两个堆顶元素的平均数
	// 如果两个堆数量不相等（本质是总数为奇数）， 就取大顶堆的堆顶元素
	
	// 问题如果保证满足上述两个特点
	
	// 1. 保证第一点
	this.maxHeap.enq(num);
	// 由于小顶堆的所有数都来自大顶堆的堆顶元素（最大值）
	// 因此可以保证第一点
	this.minHeap.enq(this.maxHeap.deq());

	// 2. 保证第二点
	if (this.maxHeap.size() < this.minHeap.size()) {
		this.maxHeap.enq(this.minHeap.deq());
	}
};

MedianFinder.prototype.findMedian = function () {
	if (this.maxHeap.size() === this.minHeap.size())
		return (this.maxHeap.peek() + this.minHeap.peek()) / 2.0;
	else return this.maxHeap.peek();
};

MedianFinder.prototype.showHeap = function () {
	console.log('min:   ' + this.minHeap._elements);
	console.log('max:   ' + this.maxHeap._elements);
};

let obj = new MedianFinder();
console.time('test2');
for(let i = 0; i < data.length; i += 1) {
	obj.addNum(data[i]);
	obj.showHeap();
	console.log('*********************')
}
console.timeEnd('test2');
console.log(obj.findMedian());
obj.addNum(2);
obj.showHeap();
obj.addNum(1);
obj.showHeap();
console.log(obj.findMedian());