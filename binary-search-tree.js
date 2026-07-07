function node(data) {
	return { data, left: null, right: null };
};

function tree(array) {
	const sortedArray = [...new Set(array)].sort((a, b) => a - b);
	const root = buildTree(sortedArray, 0, sortedArray.length - 1);

	const includes = (value, node) => {
		if (!node) return false;
		if (node.data === value) {
			return true;
		} else if (node.data < value) {
			return includes(value, node.right);
		} else if (node.data > value) {
			return includes(value, node.left);
		}; 
		return false;
	};

	const insert = (value, root) => {
		if (includes(value, root)) return;

		if (root.data < value) {
			if (!root.right) {
				const newNode = node(value);
				root.right = newNode;
				return;
			} else {
				console.log("Trying deeper right");
				return insert(value, root.right);
			};
		} else if (root.data > value) {
			if (!root.left) {
				const newNode = node(value);
				root.left = newNode;
				return;
			} else {
				console.log("Trying deeper left")
				return insert(value, root.left);
			};
		};
	};

	const deleteItem = (value, root) => {
		const getSuccessor = (root) => {
			current = root.right;
			while (current && current.left) {
				current = current.left;
			};
			return current;
		};

		if (!root) return root;

		if (root.data > value) {
			root.left = deleteItem(value, root.left);
		} else if (root.data < value) {
			root.right = deleteItem(value, root.right);
		} else {
			if (!root.left) return root.right;
			if (!root.right) return root.left;

			const successor = getSuccessor(root);
			root.data = successor.data;
			root.right = deleteItem(successor.data, root.right);
		};
		return root;
	};

	return { root, includes, insert, deleteItem };
};

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

test.deleteItem(4, test.root);
prettyPrint(test.root);
