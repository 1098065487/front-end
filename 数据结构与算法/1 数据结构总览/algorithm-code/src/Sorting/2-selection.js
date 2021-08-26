/*
 选择排序在我看来，和沉淀排序思想一致（前面理解错误，就只是选择排序），按规则确定首位值，循环往后
 /% 理解错误 %/ 不同的是，选择排序没有在比较过程中直接交换，仅记录待交换的下标，在我看来差别不大（未交换值便和沉淀排序根本不同）
 时间复杂度也是O(n^2)，但不得不说，运行时间的确减少了
 * */

import { data, generateArray } from "./data.js";

const selectionSort = (arr, type) => {
	console.time('select');
	for(let i = 0; i < arr.length; i += 1) {
		// let mark = i;
		// for(let j = i + 1; j < arr.length; j += 1) {
		// 	if((type === 'desc' && arr[mark] < arr[j]) || (type !== 'desc' && arr[mark] > arr[j])) {
		// 		mark = j;
		// 	}
		// }
		// if(i !== mark) {
		// 	[arr[i], arr[mark]] = [arr[mark], arr[i]];
		// }
		
		for(let j = i + 1; j < arr.length; j += 1) {
			if((type === 'desc' && arr[i] < arr[j]) || (type !== 'desc' && arr[i] > arr[j])) {
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
		}
	}
	console.timeEnd('select');
	// console.log(type + ':   ' + arr);
	return arr;
};

// selectionSort(data, 'desc');
// selectionSort(data, 'asc');
//
// selectionSort(generateArray(1000), 'desc');
// selectionSort(generateArray(1000), 'asc');
selectionSort(generateArray(10000), 'desc');
// 选择排序较冒泡排序速度更快，5w数据在3s左右，10w数据在14s左右
// 还有就是缓存下标再交换值的确更快一点，数组交换值要比变量赋值要慢，这个以后写代码可以借鉴