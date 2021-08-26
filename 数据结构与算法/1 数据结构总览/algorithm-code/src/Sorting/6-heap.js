/*
堆排序的思想：
利用二叉堆的最大最小堆，形成最大堆后，依次出堆顶值，重新规则化最大堆，循环至出完，则得到数组倒序排序，利用最小堆同理得到顺序排序
操作：先将数组堆化，再不断出堆，将值交换到数组尾部，忽略尾部重新形成最大最小堆，直至不能堆化
时间复杂度：O(n log n)
注意一点，js没有内置堆结构，这种操作只是逻辑上模拟二叉堆的行为
* */

import { data, generateArray } from "./data.js";

const heapSort = (arr, type) => {
	// console.log(arr)
	// 构建二叉堆，以最后一位的父节点开始，遍历所有的父节点，保证二叉堆的规则在父子节点间满足，即最大堆或最小堆
	buildHeap(arr, type);
	// console.log(arr)
	// 构建的是最大堆，不断将堆顶移到末尾，并缩短处理的数组，则可以形成从小到大的顺序，若构建最小堆，则相反顺序
	for(let i = arr.length - 1; i > 0; i -= 1) {
		[arr[i], arr[0]] = [arr[0], arr[i]];
		heapify(arr, i, 0, type);
		// console.log('i = ' + i + '***' + arr)
	}
	return arr;
};

// 数组的堆化
const buildHeap = (arr, type) => {
	// 最后一位的父节点
	let mid = Math.floor((arr.length -1)  / 2);
	// 父节点到根节点为止
	for(let i = mid; i >= 0; i -= 1) {
		heapify(arr, arr.length, i, type);
	}
	return arr;
};

// 保证每个每个父节点和其叶子节点满足规则
const heapify = (arr, heapSize, i, type) => {
	let left = i * 2 + 1;
	let right = i * 2 + 2;
	let target = i;

	if(type === 'desc') {
		// 最小堆不断出堆规则化,才能产生顺序排序
		// 这里还是在原数组arr上操作,故而数据跟在尾部往前产生,所以可能存在right >= heapSize的情况
		
		// 最小堆在规则化时,需要拿父节点和最小叶子节点去比较交换
		// if(left < heapSize && arr[left] < arr[target] && (!arr[right] || right >= heapSize || arr[left] < arr[right])) {
		// 	target = left;
		// }
		// if(right < heapSize && arr[right] < arr[target] && arr[right] < arr[left]) {
		// 	target = right;
		// }
		
		// 实际在代码中,不需要比较叶子节点得到最小值(目前还看不懂这个操作，照道理应该要比较的)
		if(left < heapSize && arr[left] < arr[target]) {
			target = left;
		}
		if(right < heapSize && arr[right] < arr[target]) {
			target = right;
		}
	} else {
		// 最大堆在规则化时,需要拿父节点和最大叶子节点去比较交换，但实际代码中都不去先比较叶子节点大小
		if(left < heapSize && arr[left] > arr[target]) {
			target = left;
		}
		if(right < heapSize && arr[right] > arr[target]) {
			target = right;
		}
	}

	if(target !== i) {
		[arr[i], arr[target]] = [arr[target], arr[i]];
		heapify(arr, heapSize, target, type);
	}
	
	// 这里要么用递归去做，要么就用while满足条件遍历，递归理解更简单，不需要去管怎么去遍历（以后更多使用递归，思想更清晰）
	// while(i < heapSize) {
	// 	let target = i;
	// 	let left = target * 2 + 1;
	// 	let right = target * 2 + 2;
	// 	if(type === 'desc') {
	// 		if(left < heapSize && arr[target] > arr[left]) {
	// 			target = left;
	// 		}
	// 		if(right < heapSize && arr[target] > arr[right]) {
	// 			target = right;
	// 		}
	// 	} else {
	// 		if(left < heapSize && arr[left] > arr[target]) {
	// 			target = left;
	// 		}
	// 		if(right < heapSize && arr[right] > arr[target]) {
	// 			target = right;
	// 		}
	// 	}
	//
	// 	if(target === i) {
	// 		break;
	// 	}
	// 	if(target !== i) {
	// 		[arr[i], arr[target]] = [arr[target], arr[i]];
	// 		i = target;
	// 	}
	// }

	return arr;
};

// console.log(heapSort(data, 'desc'));
// console.log(heapSort(data, 'asc'));
console.time('heap');
console.log(heapSort(generateArray(1000000), 'desc'));
console.timeEnd('heap');
// 堆排序的速度也很快了，但是相对于快速排序还是稍慢一些
// 5w数据70ms左右，10w数据105ms左右，100W数据也才1s左右