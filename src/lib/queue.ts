import { DoublyLinkedList } from './lists/doubly-linked-list';

export class Queue<T> implements IQueue<T> {
  private list: DoublyLinkedList<T>;

  constructor() {
    this.list = new DoublyLinkedList();
  }

  enqueue(value: T): void {
    this.list.insert(value);
  }

  dequeue(): T | undefined {
    return this.list.removeRoot()?.value;
  }

  peek(): T | undefined {
    return this.list.root?.value;
  }

  isEmpty(): boolean {
    return this.list.root === undefined;
  }
}
