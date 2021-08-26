/*
快速排序和归并排序的核心思想都是分治，归并排序侧重点在分完后的合并，快速排序的侧重点在怎么分，时间复杂度都是O(n log n)
操作：
以数组中间数数值为基准，进行对比交换，保证交换的最后一步，满足规则，并返回下标，以下标拆分数组，递归操作，使所有数据都满足规则
由于是在同一数组进行操作，不需要考虑合并问题（简化操作），不需要额外的资源去存储合并排序好的数组，这也是速度比归并排序更高的原因
这里只是以中间数值为锚点，并不直接参与交换，以左右与锚点比较，当左右和中间都不满足规则时，交换，关键是最后一次交换，保证这个数据与后面满足规则，可以此下标拆分
* */

import { data, generateArray } from "./data.js";

const quickSort = (arr, type) => {
	let left = 0;
	let right = arr.length - 1;

	recursion(arr, left, right, type);

	// 一直在arr上操作，可以直接返回
	return arr;
	
	// 这也是快速排序的一种思路，无非就是递归调用拆分，保证拆分处的前后顺序规则满足即可，但是其速度由于调用了数组的查询方法，并不够块，思想是一样的
	// if(arr.length <= 1) return arr;
	// return [
	// 	// 递归调用quickSort，通过Array.prototype.filter方法过滤小于arr[0]的值，注意去掉了arr[0]以防止出现死循环。
	// 	...quickSort(arr.slice(1).filter(item => item < arr[0])),
	// 	arr[0],
	// 	...quickSort(arr.slice(1).filter(item => item >= arr[0]))
	// ];
	
};

const recursion = (arr, left, right, type) => {
	// console.log(arr)
	if(arr.length === 1) return;
	// console.log('left: '+left+ '   ***   ' + 'right: '+right)
	const index = partition(arr, left, right, type);
	
	if(left < index - 1) {
		recursion(arr, left, index - 1, type);
	}
	if(index < right) {
		recursion(arr, index, right, type);
	}
};

const partition = (arr, left, right, type) => {
	
	const pivot = arr[Math.floor((left + right) / 2)];
	// 保证返回的下标可以使用，在交换时做了下标处理，则必须满足相等的情况也可以走进循环内（即left = right的情况，保证left可以+1，并返回）
	while(left <= right) {
		if(type === 'desc') {
			// if(arr[left] > pivot) {
			// 	left += 1;
			// 	continue;
			// }
			// if(arr[right] < pivot) {
			// 	right -= 1;
			// 	continue;
			// }
			while(arr[left] > pivot) {
				left += 1;
			}
			while(arr[right] < pivot) {
				right -= 1;
			}
		} else {
			// if(arr[left] < pivot) {
			// 	left += 1;
			// 	continue;
			// }
			// if(arr[right] > pivot) {
			// 	right -= 1;
			// 	continue;
			// }
			while(arr[left] < pivot) {
				left += 1;
			}
			while(arr[right] > pivot) {
				right -= 1;
			}
		}
		if(left <= right) {
			if(left !== right) {
				[arr[left], arr[right]] = [arr[right], arr[left]];
			}
			left += 1;
			right -= 1;
		}
	}
	// console.log('return-index: ' + left)
	return left;
};

// console.log(quickSort(data, 'desc'));
// console.log(quickSort(data, 'asc'));

console.time('quick');
console.log(quickSort(generateArray(1000000), 'desc'));
console.timeEnd('quick');
// 快速排序作为目前最推荐的排序算法，速度还是很快的，甚至比归并排序还要快
// 5w数据60ms左右，10w数据100ms左右，100w数据也才700ms左右