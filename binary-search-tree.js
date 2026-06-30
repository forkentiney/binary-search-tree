function node(value = null, left = null, right = null) {};

function binarySearchTree(array, left, right) {
	if (left > right) return null;

	let mid = left + Math.floor((right - left) / 2);
	let root = node(array[mid]);

	root.left = binarySearchTree(array, left, mid - 1);
	root.right = binarySearchTree(array, mid + 1, right);

	return root;
};

function displayBST(array) {
	return binarySearchTree(array, 0, array.length - 1);
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
