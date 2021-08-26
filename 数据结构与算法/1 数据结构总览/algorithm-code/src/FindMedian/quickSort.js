/*
 不理解对于堆的排序为啥要这么写，原作者解释是因为数据结构选择的是二叉堆（后面看懂了，二叉堆的特性所致）
 自己写一个快速排序来做
 * */
// 选取中间位置数，由两边往中间比较交换，保证最后一次比较的顺序符合，返回下标，切割数组，再递归分别调用，直至不可分割
const partition = (arr, left, right, type) => {
	let pivot = arr[Math.floor((left + right) / 2)];
	while(left <= right) {
		if(type === 'desc') {
			while(arr[left] > pivot) {
				left += 1;
			}
			while(arr[right] < pivot) {
				right -= 1;
			}
		} else {
			while(arr[left] < pivot) {
				left += 1;
			}
			while(arr[right] > pivot) {
				right -= 1;
			}
		}
		
		if(left <= right) {
			[arr[left], arr[right]] = [arr[right], arr[left]];
			left += 1;
			right -= 1;
		}
	}
	return left;
};

// 递归操作
const handleSort = (arr, left, right, type) => {
	if(arr.length === 1) return;
	
	let index = partition(arr, left, right, type);
	if(left < index - 1) {
		handleSort(arr, left, index - 1, type);
	}
	if(index < right) {
		handleSort(arr, index, right, type);
	}
};

/**
 * 快速排序算法，输入数组，升序还是降序的类型，将数组按顺序排列
 * @param arr
 * @param type
 */
const quickSort = (arr, type) => {
	let left = 0;
	let right = arr.length - 1;
	handleSort(arr, left, right, type);
};

export default quickSort;