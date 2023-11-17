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

  remove(value: T): IDoublyLinkedNode<T> | undefined {
    throw new Error("Method not implemented.");
  }

  removeRoot(): IDoublyLinkedNode<T> | undefined {
    this.size--;
    if (this.size === 0) {
      const node = this.root;
      this.root = undefined;
      this.tail = undefined;
      return node;
    } else {
      const root = this.root;
      this.root = this.root?.next;
      if (this.root) this.root.previous = undefined;
      return root;
    }
  }

  find(callback: (node: IDoublyLinkedNode<T>) => boolean): IDoublyLinkedNode<T> | undefined {
    throw new Error("Method not implemented.");
  }
}