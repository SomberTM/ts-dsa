export class Heap<T> implements IHeap<T> {
  heap: T[];

  constructor(public comparator: BooleanComparator<T>) {
    this.heap = [];
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

  get size() {
    return this.heap.length;
  }

  private parent(index: number): number {
    return (index - 1) / 2;
  }

  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  private hasParent(index: number): boolean {
    return index > 0;
  }

  private hasLeftChild(index: number): boolean {
    return this.leftChild(index) < this.size;
  }

  private hasRightChild(index: number): boolean {
    return this.rightChild(index) < this.size;
  }

  private swap(index1: number, index2: number): void {
    const temp: T = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  private heapifyUp(index: number): void {
    while (this.hasParent(index) && this.comparator(this.heap[index], this.heap[this.parent(index)])) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  private heapifyDown(index: number): void {
    while (this.hasLeftChild(index)) {
      let smallerChildIndex: number = this.leftChild(index);
      if (
        this.hasRightChild(index) &&
        this.comparator(this.heap[this.rightChild(index)], this.heap[smallerChildIndex])
      ) {
        smallerChildIndex = this.rightChild(index);
      }

      if (this.comparator(this.heap[index], this.heap[smallerChildIndex])) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }

      index = smallerChildIndex;
    }
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
