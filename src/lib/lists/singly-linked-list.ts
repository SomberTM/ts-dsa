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

  remove(value: T): ISinglyLinkedNode<T> | undefined {
    throw new Error('Method not implemented.');
  }

  find(callback: (node: ISinglyLinkedNode<T>) => boolean): ISinglyLinkedNode<T> | undefined {
    throw new Error('Method not implemented.');
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
