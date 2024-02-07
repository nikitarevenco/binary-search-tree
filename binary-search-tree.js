class Node {
  constructor(data) {
    this.left = null;
    this.data = data;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = this.sortArray(array);
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  // isBalanced(currentNode = this.root) {
  //   if (currentNode === null) {
  //     return;
  //   }
  //   // const left =
  //   //   currentNode.left !== null ? this.height(currentNode.left.data) : 0;
  //   // const right =
  //   //   currentNode.right !== null ? this.height(currentNode.right.data) : 0;
  //   // let difference = Math.abs(left - right);

  //   if (currentNode.left !== null)
  //     console.log(currentNode.left, this.height(currentNode.left.data));
  //   if (currentNode.right !== null)
  //     console.log(currentNode.right, this.height(currentNode.right.data));

  //   this.isBalanced(currentNode.left);
  //   this.isBalanced(currentNode.right);

  //   // console.log(currentNode);
  //   console.log(
  //     "-------------------------------------------------------------------------------------------------------------------------"
  //   );
  //   // console.log(left, right);
  //   // if (leftRecursion === false) {
  //   //   return false;
  //   // } else if (rightRecursion === false) {
  //   //   return false;
  //   // } else if (difference > 1) {
  //   //   return false;
  //   // } else {
  //   //   return true;
  //   // }
  // }
  sortArray(thisArray) {
    return [...Array.from(new Set(thisArray))].sort((a, b) => a - b);
  }
  depth(node) {
    let currentNode = this.root;
    let counter = 0;
    while (node !== currentNode.data) {
      if (node < currentNode.data) {
        currentNode = currentNode.left;
        counter++;
      }
      if (node > currentNode.data) {
        currentNode = currentNode.right;
        counter++;
      }
    }
    if (node === currentNode.data) {
      return counter;
    }
  }
  height(node) {
    const visited = [];
    let currentNode = this.find(node);
    let counter = 0;
    const rememberLeaves = [];
    const rememberNodes = [];
    const abc = [];
    // for (let i = 0; i < 4; i++) {

    while (!visited.includes(this.find(node))) {
      counter++;
      rememberNodes.push(currentNode);
      const isLeaf = currentNode.left === null && currentNode.right === null;
      const isThisVisited =
        (currentNode.left === null && visited.includes(currentNode.right)) ||
        (currentNode.right === null && visited.includes(currentNode.left)) ||
        (visited.includes(currentNode.left) &&
          visited.includes(currentNode.right))
          ? true
          : false;

      if (currentNode.left !== null && !visited.includes(currentNode.left)) {
        currentNode = currentNode.left;
        visited.push(currentNode);
      } else if (
        currentNode.right !== null &&
        !visited.includes(currentNode.right)
      ) {
        currentNode = currentNode.right;
        visited.push(currentNode);
      }

      if (isThisVisited || isLeaf) {
        if (!visited.includes(currentNode)) {
          visited.push(currentNode);
        }
        if (isLeaf) {
          rememberLeaves.push({ counter: counter, leaf: currentNode });
          currentNode = this.find(node);
          const tracker = rememberNodes.slice(-counter);
          abc.push(tracker);
          counter = 0;
        } else {
          currentNode = this.getParent(currentNode.data);
        }
      }
    }
    // return visited.sort((a, b) => a.data - b.data).map((a) => a.data);
    return abc;
  }
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2);
    const value = new Node(array[mid]);
    value.left = this.buildTree(array, start, mid - 1);
    value.right = this.buildTree(array, mid + 1, end);
    return value;
  }
  preOrder(callback, currentNode = this.root, inOrderArray = []) {
    if (currentNode === null || callback) {
      return;
    }
    if (callback) {
      currentNode.data = callback(currentNode.data);
    }
    inOrderArray.push(currentNode.data);
    this.preOrder(callback, currentNode.left, inOrderArray);
    this.preOrder(callback, currentNode.right, inOrderArray);
    return inOrderArray;
  }
  inOrder(callback, currentNode = this.root, inOrderArray = []) {
    if (currentNode === null || callback) {
      return;
    }
    this.inOrder(callback, currentNode.left, inOrderArray);
    if (callback) {
      currentNode.data = callback(currentNode.data);
    }
    inOrderArray.push(currentNode.data);
    this.inOrder(callback, currentNode.right, inOrderArray);
    return inOrderArray;
  }
  postOrder(callback, currentNode = this.root, inOrderArray = []) {
    if (currentNode === null || callback) {
      return;
    }
    this.postOrder(callback, currentNode.left, inOrderArray);
    this.postOrder(callback, currentNode.right, inOrderArray);
    if (callback) {
      currentNode.data = callback(currentNode.data);
    }
    inOrderArray.push(currentNode.data);
    return inOrderArray;
  }
  levelOrder(callback) {
    const array = [this.root];
    const levelOrderArray = [this.root.data];
    while (array.at(0) !== undefined) {
      let rnNode = array.shift();

      if (callback) {
        rnNode.data = callback(rnNode.data);
      }

      if (rnNode.left !== null) {
        array.push(rnNode.left);
        levelOrderArray.push(rnNode.left.data);
      }
      if (rnNode.right !== null) {
        array.push(rnNode.right);
        levelOrderArray.push(rnNode.right.data);
      }
    }
    if (callback === undefined) {
      return levelOrderArray;
    }
  }
  insert(value, currentNode = this.root) {
    // Until either the right or the left node is null
    if (currentNode.left === null && currentNode.right === null) {
      if (value > currentNode.data) {
        currentNode.right = new Node(value);
        return;
      }
      if (value < currentNode.data) {
        currentNode.left = new Node(value);
        return;
      }
    } else {
      if (value > currentNode.data) {
        return this.insert(value, currentNode.right);
      }
      if (value < currentNode.data) {
        return this.insert(value, currentNode.left);
      }
    }
  }
  find(value) {
    let currentNode = this.root;
    while (currentNode.data !== value) {
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      }
    }
    return currentNode;
  }
  getParent(value, currentNode = this.root) {
    if (value === currentNode.data) {
      return currentNode;
    }
    if (currentNode.right !== null) {
      if (currentNode.right.data === value) {
        return currentNode;
      }
    }
    if (currentNode.left !== null) {
      if (currentNode.left.data === value) {
        return currentNode;
      }
    }
    if (value < currentNode.data) {
      return this.getParent(value, currentNode.left);
    }
    if (value > currentNode.data) {
      return this.getParent(value, currentNode.right);
    }
  }
  findNextBiggest(currentNode) {
    let nextBiggest = currentNode.right;
    while (nextBiggest.left !== null) {
      nextBiggest = nextBiggest.left;
    }
    return nextBiggest;
  }
  delete(value, currentNode = this.root) {
    const parent = this.getParent(value);
    const leftNodeIsNull = currentNode.left === null ? true : false;
    const rightNodeIsNull = currentNode.right === null ? true : false;
    // TRAVERSING
    if (value !== currentNode.data) {
      if (value > currentNode.data) {
        return this.delete(value, currentNode.right);
      }
      if (value < currentNode.data) {
        return this.delete(value, currentNode.left);
      }
    }
    if (leftNodeIsNull && rightNodeIsNull) {
      if (value < parent.data) {
        const removedNode = parent.left;
        parent.left = null;
        return removedNode;
      }
      if (value > parent.data) {
        const removedNode = parent.right;
        parent.right = null;
        return removedNode;
      }
    }
    if (leftNodeIsNull && !rightNodeIsNull) {
      const child = currentNode.right;
      if (parent.right.data === value) {
        const removedNode = parent.right;
        parent.right = child;
        return removedNode;
      }
      if (parent.left.data === value) {
        const removedNode = parent.left;
        parent.left = child;
        return removedNode;
      }
    }
    if (!leftNodeIsNull && rightNodeIsNull) {
      const child = currentNode.right;
      if (parent.right.data === value) {
        const removedNode = parent.right;
        parent.right = child;
        return removedNode;
      }
      if (parent.left.data === value) {
        const removedNode = parent.left;
        parent.left = child;
        return removedNode;
      }
    }
    if (!leftNodeIsNull && !rightNodeIsNull) {
      const nextBiggestNode = this.findNextBiggest(currentNode);
      const removedNode = { ...currentNode };
      const value = nextBiggestNode.data;
      this.delete(value);
      currentNode.data = value;
      return removedNode;
    }
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

const myTree = new Tree([
  1, 4, 7, 9, 11, 13, 14, 15, 18, 19, 20, 22, 24, 25, 27, 29, 31, 34, 35, 40,
  43, 44, 46, 49, 50, 51, 53,
]);

myTree.insert(16);
myTree.insert(10);

myTree.insert(30);
// console.log(myTree.height(4));
// console.log(myTree.isBalanced());
// console.log(myTree.find(25));
console.log(myTree.height(25));
// console.log(myTree.pOrder());
console.log("Ho");
myTree.prettyPrint();
