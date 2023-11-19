export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  root?: IDoublyLinkedNode<T> | undefined;
  tail?: IDoublyLinkedNode<T> | undefined;

  private size: number;

  constructor() {
    this.size = 0;
  }

  insert(value: T): IDoublyLinkedNode<T> {
    this.size++;

    const node: IDoublyLinkedNode<T> = { value };
    node.next = undefined;
    node.previous = undefined;

    if (!this.root) {
      this.root = node;
      this.tail = node;
      return node;
    }

    if (!this.root || !this.tail) throw new Error();

    this.tail.next = node;
    node.previous = this.tail;
    this.tail = node;

    return node;
  }

  private deleteNode(node: IDoublyLinkedNode<T>) {
    this.size--;
    if (this.size === 0) {
      this.root = undefined;
      this.tail = undefined;
    } else {
      if (this.root === node) {
        this.root = node.next;
        if (this.root) this.root.previous = undefined;
      } else if (this.tail === node) {
        this.tail = node.previous;
        if (this.tail) this.tail.next = undefined;
      }

      if (node.next) node.next.previous = node.previous;
      if (node.previous) node.previous.next = node.next;
    }
  }

  remove(value: T): IDoublyLinkedNode<T> | undefined {
    const node = this.find((node) => node.value === value);
    if (!node) return;

    this.deleteNode(node);
    return node;
  }

  removeRoot(): IDoublyLinkedNode<T> | undefined {
    const node = this.root;
    if (node) this.deleteNode(node);
    return node;
  }

  removeTail(): IDoublyLinkedNode<T> | undefined {
    const node = this.tail;
    if (node) this.deleteNode(node);
    return node;
  }

  find(callback: (node: IDoublyLinkedNode<T>) => boolean): IDoublyLinkedNode<T> | undefined {
    let current = this.root;
    while (current !== undefined) {
      if (callback(current)) return current;
      current = current.next;
    }
    return undefined;
  }

  toArray(): T[] {
    const array: T[] = [];

    let current = this.root;
    while (current !== undefined) {
      array.push(current.value);
      current = current.next;
    }

    return array;
  }
}
