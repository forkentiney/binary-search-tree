function node(data, left = null, right = null) {
	return { data: data, left: left, right: right };
};

function tree(array) {
	const root = buildTree(array);
}

function buildTree(array, left, right) {
	if (left > right) return null;

	let mid = left + Math.floor((right - left) / 2);
	let root = node(array[mid]);

	root.left = buildTree(array, left, mid - 1);
	root.right = buildTree(array, mid + 1, right);

	return root;
};

function displayBST(array) {
	return buildTree(array, 0, array.length - 1);
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const test = displayBST(array);

console.log(test);
