/*
冒泡排序也叫沉淀排序，思路比较简单，就是两层循环，不断向后或向前对比相邻两数，将符合规则数沉淀下来或者冒泡上去，至结束
该算法时间复杂度较高（O(n^2)），效率较低

   /% 该想法错误，这么理解已经是选择排序了 %/  沉淀排序：两层循环，以开头往后对比，保证第一位满足规则，循环至最后一位，按规则沉淀下来到开头
冒泡排序：两层循环，每一行当前位与后一位对比，保证最后一位满足规则，循环至第一位，按规则冒泡到末尾
* */

import { data, generateArray } from './data.js';

const sinkingSort = (arr, type) => {
	console.time('test');
	// 沉淀排序    /% 理解错误，这是选择排序 %/
	// for(let i = 0; i < arr.length; i += 1) {
	// 	for(let j = i + 1; j < arr.length; j += 1) {
	// 		if((type === 'desc' && arr[i] < arr[j]) || (type !== 'desc' && arr[i] > arr[j])) {
	// 			[arr[i], arr[j]] = [arr[j], arr[i]];
	// 		}
	// 	}
	// }
	
	// 冒泡排序 bubbleSort
	for(let i = 0; i < arr.length; i += 1) {
		for(let j = 0; j < arr.length - 1 - i; j += 1) {
			if((type === 'desc' && arr[j] < arr[j + 1]) || (type !== 'desc' && arr[j] > arr[j + 1])) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
	}
	console.timeEnd('test');
	// console.log(type + ':   ' + arr);
	return arr;
};

// sinkingSort(data, 'asc');
// sinkingSort(data, 'desc');
// sinkingSort(generateArray(1000), 'asc');
// sinkingSort(generateArray(1000), 'desc');
sinkingSort(generateArray(50000), 'desc');
// 冒泡排序速度最慢了，5w数据已经需要9s左右，10W需要40s左右