const partition = (arr, left, right) => {
	let pivot = arr[Math.floor((left + right) / 2)];
	while(left <= right) {
		while(arr[left] > pivot) {
			left += 1;
		}
		while(arr[right] < pivot) {
			right -= 1;
		}
		
		if(left <= right) {
			[arr[left], arr[right]] = [arr[right], arr[left]];
			left += 1;
			right -= 1;
		}
	}
	return left;
};

const handleSort = (arr, left, right) => {
	if(arr.length === 1) return;
	
	let index = partition(arr, left, right);
	if(left < index - 1) {
		handleSort(arr, left, index - 1);
	}
	if(index < right) {
		handleSort(arr, index, right);
	}
};

const quickSort = arr => {
	let left = 0;
	let right = arr.length - 1;
	handleSort(arr, left, right);
};

const arr1 = [6, 4, 5, 2, 3, 1];
quickSort(arr1);
console.log(arr1);