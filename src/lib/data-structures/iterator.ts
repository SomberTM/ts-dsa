export class LinkedListIterator<TNode extends ISinglyLinkedNode<unknown> | IDoublyLinkedNode<unknown>> {
  private current: TNode | undefined;

  constructor(private list: ILinkedList<TNode>) {
    this.current = this.list.root;
  }

  next(): IteratorResult<ExtractGeneric<TNode>, undefined> {
    if (!this.current) return { done: true, value: undefined };

    const node = this.current;
    this.current = this.current.next as TNode;
    return {
      done: false,
      value: node.value as ExtractGeneric<TNode>,
    };
  }
}
