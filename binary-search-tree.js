function node(data) {
	return { data, left: null, right: null };
};

function tree(array) {
	const sortedArray = [...new Set(array)].sort((a, b) => a - b);
	const root = buildTree(sortedArray, 0, sortedArray.length - 1);

	const includes = (value, node = root) => {
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

	const insert = (value, node = root) => {
		if (includes(value, node)) return;

		if (node.data < value) {
			if (!node.right) {
				const newNode = node(value);
				node.right = newNode;
				return;
			} else {
				console.log("Trying deeper right");
				return insert(value, node.right);
			};
		} else if (node.data > value) {
			if (!node.left) {
				const newNode = node(value);
				node.left = newNode;
				return;
			} else {
				console.log("Trying deeper left")
				return insert(value, node.left);
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

	const levelOrderForEach = (callback) => {
		if (typeof callback !== 'function') throw new Error("Parameter is not a function");
		const queue = [root];
		const result = [];

		while (queue.length > 0) {
			const current = queue.shift();
			if (current === null) continue;
			result.push(callback(current.data));
			queue.push(current.left);
			queue.push(current.right);
		};

		return result;
	};

	const inOrderForEach = (callback) => {
		if (typeof callback !== 'function') throw new Error("Paramater is not a function");
		const result = [];

		const traverse = (node) => {
			if (node === null) return;
			traverse(node.left);
			result.push(callback(node.data));
			traverse(node.right);
		};

		traverse(root);
		return result;
	};

	const preOrderForEach = (callback) => {
		if (typeof callback !== 'function') throw new Error("Paramater is not a function");
		const result = [];

		const traverse = (node) => {
			if (node === null) return;
			result.push(callback(node.data));
			traverse(node.left);
			traverse(node.right);
		};

		traverse(root);
		return result;
	};

	const postOrderForEach = (callback) => {
		if (typeof callback !== 'function') throw new Error("Paramater is not a function");
		const result = [];

		const traverse = (node) => {
			if (node === null) return;
			traverse(node.left);
			traverse(node.right);
			result.push(callback(node.data));
		};

		traverse(root);
		return result;
	};

	const height = (value) => {
		let height = 0;
		const goToNodeWith = (value, node = root) => {
			if (!node) throw new Error("Value not in tree");
			if (node.data === value) {
				return node;
			} else if (node.data < value) {
				return goToNodeWith(value, node.right); 
			} else if (node.data > value) {
				return goToNodeWith(value, node.left);
			}; 
		};
		const countFrom = (node) => {
			if (!node) return;
			if (node.left) {
				height++;
				countFrom(node.left);
			} else if (node.right) {
				height++;
				countFrom(node.right);
			};
		};
		const current = goToNodeWith(value);
		console.log(current.data);
		countFrom(current);

		return height;
	};

	return { 
		root,
		includes,
		insert,
		deleteItem,
		levelOrderForEach,
		inOrderForEach, 
		preOrderForEach,
		postOrderForEach,
		height,
	};
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

function multiplyByTwo(value) {
	const result = value * 2;
	return result;
};
console.log(test.height(6345));
