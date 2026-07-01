function node(data) {
	return { data, left: null, right: null };
};

function tree(array) {
	const sortedArray = [...new Set(array)].sort((a, b) => a - b);
	const root = buildTree(sortedArray, 0, sortedArray.length - 1);
	return { root };
}

function buildTree(array, left, right) {
	if (left > right) return null;

	let mid = left + Math.floor((right - left) / 2);
	let root = node(array[mid]);

	root.left = buildTree(array, left, mid - 1);
	root.right = buildTree(array, mid + 1, right);

	return root;
};

// Test code
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = tree(array);

console.log(test);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

prettyPrint(test.root);
