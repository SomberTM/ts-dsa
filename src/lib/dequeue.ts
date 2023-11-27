import { DoublyLinkedList } from './lists/doubly-linked-list';

export class Dequeue<T> {
  private list: DoublyLinkedList<T>;

  constructor() {
    this.list = new DoublyLinkedList();
  }

  insertFront(value: T): void {
    this.list.insertFront(value);
  }

  insertBack(value: T): void {
    this.list.insert(value);
  }

  removeFront(value: T): void {
    this.list.removeRoot()?.value;
  }

  removeBack(value: T): void {
    this.list.removeTail()?.value;
  }

  peekFront(): T | undefined {
    return this.list.root?.value;
  }

  peekBack(): T | undefined {
    return this.list.tail?.value;
  }
}
