export class BinarySearchTree<T> implements IBinaryTree<T> {
  constructor(public root: IBinaryTreeNode<T> | null) {}

  public find(value: T): IBinaryTreeNode<T> | null {
    let current = this.root;

    while (current != null) {
      if (current.value === value) return current;
      else if (value > current.value) current = current.right;
      else current = current.left;
    }

    return null;
  }

  public insert(value: T): void {
    const node: IBinaryTreeNode<T> = {
      value,
      left: null,
      right: null,
    };

    if (this.root === null) {
      this.root = node;
      return;
    }

    let current = this.root;
    while (true) {
      if (node.value > current.value) {
        if (current.right === null) {
          current.right = node;
          return;
        }
        current = current.right;
      } else {
        if (current.left === null) {
          current.left = node;
          return;
        }
        current = current.left;
      }
    }
  }

  public remove(value: T): boolean {
    const nodeToDelete = this.find(value);
    if (nodeToDelete === null) return false;

    return false;
  }

  public inorder(node: IBinaryTreeNode<T> | null, callback: NodeCallback<IBinaryTreeNode<T>>): void {
    if (node === null) return;

    this.inorder(node.left, callback);
    callback(node);
    this.inorder(node.right, callback);
  }

  public preorder(node: IBinaryTreeNode<T> | null, callback: NodeCallback<IBinaryTreeNode<T>>): void {
    if (node === null) return;

    callback(node);
    this.inorder(node.left, callback);
    this.inorder(node.right, callback);
  }

  public postorder(node: IBinaryTreeNode<T> | null, callback: NodeCallback<IBinaryTreeNode<T>>): void {
    if (node === null) return;

    this.inorder(node.left, callback);
    this.inorder(node.right, callback);
    callback(node);
  }
}
