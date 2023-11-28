export abstract class HeapBase<T> {
  heap: T[];
  comparator: BooleanComparator<T>;

  constructor(comparator: BooleanComparator<T>) {
    this.heap = [];
    this.comparator = comparator;
  }

  get size() {
    return this.heap.length;
  }

  protected parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  protected leftChild(index: number): number {
    return 2 * index + 1;
  }

  protected rightChild(index: number): number {
    return 2 * index + 2;
  }

  protected hasParent(index: number): boolean {
    return index > 0;
  }

  protected hasLeftChild(index: number): boolean {
    return this.leftChild(index) < this.size;
  }

  protected hasRightChild(index: number): boolean {
    return this.rightChild(index) < this.size;
  }

  private swap(index1: number, index2: number): void {
    const temp: T = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  protected heapifyUp(index: number): void {
    while (this.hasParent(index) && this.comparator(this.heap[index], this.heap[this.parent(index)])) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  protected heapifyDown(index: number): void {
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
}
