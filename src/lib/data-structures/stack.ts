import { SinglyLinkedList } from './singly-linked-list';

export class Stack<T> implements IStack<T> {
  private list: ISinglyLinkedList<T>;

  constructor() {
    this.list = new SinglyLinkedList();
  }

  push(value: T): void {
    const node: ISinglyLinkedNode<T> = { value, next: this.list.root };
    this.list.root = node;
  }

  pop(): T | undefined {
    const node = this.list.root;
    this.list.root = this.list.root?.next;
    return node?.value;
  }

  peek(): T | undefined {
    return this.list.root?.value;
  }

  isEmpty(): boolean {
    return this.list.root === undefined;
  }
}
