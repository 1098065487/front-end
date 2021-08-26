import data from './data.js';
import quickSort from './quickSort.js';
/*
 思想：
 使用两个堆来存储一个有序列表，最小堆从中间开始，顺序结束，最大堆从中间开始，倒序结束
 满足两个条件：
 1.最大堆的元素都比最小堆要小（按有序列表的顺序，从后往前，类似于是倒序的最小堆+最大堆）
 2.最大堆的数量 - 最小堆的数量  = 0 || 1 （保证中位数可在两个堆顶取到）
 * */

/*
 写法2：
 使用es6类的写法+箭头函数
 其中关于堆的排序，这里未使用原作者的排序方法（他以二叉堆为数据结构），使用的是快速排序法（以数组为数据结构）
 从打印的速度上来看，还是写法1的速度更快些
 * */
class MedianFinder {
	constructor() {
		this.minHeap = [];
		this.maxHeap = [];
	}
	
	addNum = num => {
		// 插入值
		// if(num >= (this.minHeap[0] || Number.MIN_VALUE)) {
		// 	this.minHeap.push(num);
		// } else {
		// 	this.maxHeap.push(num);
		// }
		
		this.maxHeap.push(num);
		quickSort(this.maxHeap, 'desc');
		
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
		
		// 快速排序法，顺序排列最小堆，倒序排列最大堆
		quickSort(this.minHeap, 'asc');
		quickSort(this.maxHeap, 'desc');
	};
	
	// 获取中位数
	findMedian = () => {
		if((this.minHeap.length + this.maxHeap.length) % 2 === 0) {
			return (this.maxHeap[0] + this.minHeap[0]) / 2;
		}
		return this.maxHeap[0];
	};
	
	// 打印两个堆
	showHeap = () => {
		console.log('min:   ' + this.minHeap);
		console.log('max:   ' + this.maxHeap);
	};
}



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