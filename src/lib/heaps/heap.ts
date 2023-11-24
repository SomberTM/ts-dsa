import { HeapBase } from './heap-base';

export class Heap<T> extends HeapBase<T> implements IHeap<T> {
  constructor(comparator: BooleanComparator<T>) {
    super(comparator);
  }

  public static heapify<T>(array: T[], comparator: BooleanComparator<T>): Heap<T> {
    const heap = new Heap<T>(comparator);

    // Copy the array elements to the heap's internal array
    heap.heap = array.slice();

    // Start from the last non-leaf node and perform heapifyDown for each
    for (let i = Math.floor(heap.size / 2) - 1; i >= 0; i--) {
      heap.heapifyDown(i);
    }

    return heap;
  }

  insert(value: T): void {
    this.heap.push(value);
    this.heapifyUp(this.size - 1);
  }

  remove(find: Find<T>): boolean {
    for (let i = 0; i < this.size; i++) {
      if (!find(this.heap[i])) continue;

      this.heap.splice(i, 1);
      return true;
    }
    return false;
  }

  extract(): T | undefined {
    if (this.isEmpty()) return undefined;

    const item = this.heap[0];
    this.heap[0] = this.heap[this.size - 1];
    this.heap.splice(this.size - 1, 1);
    this.heapifyDown(0);
    return item;
  }

  peek(): T | undefined {
    if (this.isEmpty()) return undefined;

    return this.heap[0];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  // TODO: implement this once tree is working
  toTree(): ITree<T> {
    throw new Error('Method not implemented.');
  }
}
