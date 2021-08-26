const data1 = {
	val: 1,
	left: {
		val: 2,
		left: {
			val: 4,
			left: { val: 8 },
			right: { val: 9 },
		},
		right: { val: 5 },
	},
	right: {
		val: 3,
		left: { val: 6 },
		right: { val: 7 },
	},
};

const data2 = {
	val: 6,
	left: {
		val: 4,
		left: {
			val: 2,
			left: { val: 1 },
			right: { val: 3 },
		},
		right: { val: 5 },
	},
	right: {
		val: 8,
		left: { val: 7 },
		right: { val: 9 },
	},
};

export { data1, data2 };