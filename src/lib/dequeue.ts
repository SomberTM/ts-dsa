import { DoublyLinkedList } from './lists/doubly-linked-list';

export class Dequeue<T> implements IDequeue<T> {
  list: IDoublyLinkedList<T>;

  constructor() {
    this.list = new DoublyLinkedList();
  }

  insertFront(value: T): void {
    const node: IDoublyLinkedNode<T> = { value };
    node.next = undefined;
    node.previous = undefined;

    if (!this.list.root) {
      this.list.root = node;
      this.list.tail = node;
    }

    if (!this.list.root || !this.list.tail) throw new Error();

    this.list.tail.next = node;
    node.previous = this.list.tail;
    this.list.tail = node;

    node.next = this.list.root;
    this.list.root.previous = node;
    this.list.root = node;
  }

  insertBack(value: T): void {
    this.list.insert(value);
  }

  removeFront(): T | undefined {
    const node = this.list.root;
    if (node) this.list.remove(node.value);
    return node?.value;
  }

  removeBack(): T | undefined {
    const node = this.list.tail;
    if (node) this.list.remove(node.value);
    return node?.value;
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.list.root?.value;
  }

  peekBack(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.list.tail?.value;
  }

  isEmpty(): boolean {
    return this.list.size === 0;
  }
}
