/*
前面三个排序由于效率不高，一般只用在教学，不在生产中使用
究其原因，前面三种排序还是在数据层面上的操作排序，后面开始的高级排序，开始运用分治的思想
分治的思想，通过递归的方式，将问题拆分成类似的多个小问题，解决小问题后，将结果结合，已达解决原始问题的目的

归并排序的思想：将数组分解成只有单个元素的数组，可直接比较，再比较合并顺序数组，以达到按规则排序
时间复杂度O(n log n)

操作：递归调用，以数组中间数据为基准，不断拆分，直至数组长度为1，可比较后比较合并，使用一个第三方数组进行存值（这边以中位数进行拆分，递归调用，有点像二叉树的感觉了）
* */

import { data, generateArray } from "./data.js";

// 递归调用
const mergeSort = (arr, type) => {
// function mergeSort(arr, type) {
	// 仅当数组为单元素时，跳出递归
	if(arr.length === 1) return arr;
	
	const median = Math.floor(arr.length / 2);
	const left = arr.slice(0, median);
	const right = arr.slice(median);
	// console.log('left: ' + left + '***' + 'right: ' + right);
	
	// arguments.callee()已经不再被es5严格模式所支持，还有就是在箭头函数中，没有arguments对象
	// return merge(arguments.callee(left), arguments.callee(right));
	// 这里必须return，不然拿不到外层拿不到内层的处理结果
	return merge(mergeSort(left, type), mergeSort(right, type), type);
};

const merge = (left, right, type) => {
	let result = [];
	let i = 0;
	let j = 0;
	
	// 这是原作者没写的我的优化，作为顺序列表，如果left最后一值和right最前一值比较可以符合顺序，则可以直接合并
	if(type === 'desc' && left[left.length-1] > right[0]) {
		result = result.concat(left).concat(right);
		// console.log('result(desc):  ' + result)
		return result;
	}
	if(type !== 'desc' && left[left.length-1] < right[0]) {
		result = result.concat(left).concat(right);
		// console.log('result(asc):  ' + result)
		return result;
	}
	
	// 对于不可直接合并的，需要逐值对比，塞进新的数组，并将未比较完的数组拼接到新数组后
	while(i < left.length && j < right.length) {
		if(type === 'desc') {
			if(left[i] > right[j]) {
				result.push(left[i]);
				i += 1;
			} else {
				result.push(right[j]);
				j += 1;
			}
		} else {
			if(left[i] < right[j]) {
				result.push(left[i]);
				i += 1;
			} else {
				result.push(right[j]);
				j += 1;
			}
		}
	}
	// 未比较完的数组拼接到新数组后
	result = result.concat(left.slice(i)).concat(right.slice(j));
	// console.log('result:  ' + result)
	return result;
};

// console.log(mergeSort(data, 'desc'));
// console.log(mergeSort(data, 'asc'));

console.time('merge');
console.log(mergeSort(generateArray(1000000), 'desc'));
console.timeEnd('merge');

// 高级排序的速度快的惊人，归并排序在：5w的数据100ms左右，10w的数据在200ms左右，即使100W数据，也在2s左右就执行完毕了