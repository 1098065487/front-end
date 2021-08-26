/*
插入排序的思路：
插入排序和前面的冒泡和选择排序不太一样，前面是保证对应位置的值满足规则，插入排序是保证前面数组满足规则，不断加入后续值，并不断交换位置，一直到全部数据都满足规则
操作：从数组第二项开始，不断与左边数组从右往左去比较，不满足规则交换数据至满足或比较完毕，向后循环至结束

相比前面两个时间复杂度为O(n^2)的排序算法，插入排序减少了比较次数，速度更快，对于小数据集，效率更高
* */

import { data, generateArray } from "./data.js";

const insertionSort = (arr, type) => {
	console.time('insertion');
	for(let i = 1; i < arr.length; i += 1) {
		// 这是另一种写法，注意，break必须放在前面，逻辑上也是先判断是不是break才往下走的
		// for(let j = i; j > 0; j -= 1) {
		// 	if((type === 'desc' && arr[j] < arr[j - 1]) || (type !== 'desc' && arr[j] > arr[j - 1])) {
		// 		break;
		// 	}
		// 	if((type === 'desc' && arr[j] > arr[j - 1]) || (type !== 'desc' && arr[j] < arr[j - 1])) {
		// 		[arr[j], arr[j-1]] = [arr[j-1], arr[j]];
		// 	}
		// }
		let j = i;
		if(type === 'desc') {
			while(j > 0 && arr[j] > arr[j-1]) {
				[arr[j], arr[j-1]] = [arr[j-1], arr[j]];
				j -= 1;
			}
		} else {
			while(j > 0 && arr[j] < arr[j-1]) {
				[arr[j], arr[j-1]] = [arr[j-1], arr[j]];
				j -= 1;
			}
		}
	}
	console.timeEnd('insertion');
	// console.log(type + ':   ' + arr);
	return arr;
};

// insertionSort(data, 'desc');
// insertionSort(data, 'asc');
//
// insertionSort(generateArray(1000), 'desc');
// insertionSort(generateArray(1000), 'asc');
insertionSort(generateArray(100000), 'desc');
// 插入排序已经比选择排序速度还要快了，减少比较次数，效果明显，5w数据3s左右，10w数据9s左右