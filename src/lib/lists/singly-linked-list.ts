import { LinkedListIterator } from './iterator';

export class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
  root?: ISinglyLinkedNode<T> | undefined;

  constructor() {}

  insert(value: T): ISinglyLinkedNode<T> {
    const node: ISinglyLinkedNode<T> = { value };
    if (!this.root) {
      this.root = node;
      return node;
    }

    let current = this.root;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
    return node;
  }

  remove(value: T): boolean {
    if (!this.root) return false;
    if (this.root.value === value) {
      this.root = this.root.next;
      return true;
    }

    let current = this.root;
    while (current != undefined && current.next != undefined) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  removeAll(find: Find<T>): T[] {
    let removed: T[] = [];

    if (!this.root) return removed;
    while (this.root !== undefined && find(this.root.value)) {
      removed.push(this.root.value);
      this.root = this.root.next;
    }

    let current = this.root;
    while (current !== undefined && current.next !== undefined) {
      if (find(current.next.value)) {
        removed.push(current.next.value);
        current.next = current.next.next;
      }
      current = current.next;
    }

    return removed;
  }

  find(callback: (node: ISinglyLinkedNode<T>) => boolean): ISinglyLinkedNode<T> | undefined {
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

  [Symbol.iterator](): { next(): IteratorResult<T, undefined> } {
    return new LinkedListIterator(this);
  }

  get size(): number {
    throw new Error('Not implemented');
  }
}
