const data = [8, 6, 15, 23, 66, 16, 18, 25, 9, 10];

const generateArray = length => {
	// let arr = Array(length);
	let arr = [];
	for(let i = 0; i < length; i += 1) {
		// arr[i] = (Math.random() * 1000 / 10).toFixed(0);
		arr.push(Number.parseInt((Math.random() * 1000 / 10).toFixed(0)));
	}
	
	return arr;
};

export { data, generateArray };
