import { HeapBase } from './heap-base';

export enum HeapType {
  MinHeap,
  MaxHeap,
}

export class PriorityQueue<T> extends HeapBase<IPriorityItem<T>> implements IPriorityQueue<T> {
  constructor(heapType: HeapType = HeapType.MinHeap) {
    let comparator: (a: IPriorityItem<T>, b: IPriorityItem<T>) => boolean;
    switch (heapType) {
      case HeapType.MinHeap:
        comparator = (a, b) => a.priority < b.priority;
        break;
      case HeapType.MaxHeap:
        comparator = (a, b) => a.priority > b.priority;
        break;
    }
    super(comparator);
  }

  enqueue(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.heapifyUp(this.size - 1);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;

    const item = this.heap[0];
    this.heap[0] = this.heap[this.size - 1];
    this.heap.splice(this.size - 1, 1);
    this.heapifyDown(0);
    return item.value;
  }

  set(find: Find<T>, priority: number): void {
    for (let i = 0; i < this.size; i++) {
      if (find(this.heap[i].value)) {
        this.heap[i].priority = priority;
        this.heapifyUp(i);
        this.heapifyDown(i);
        return;
      }
    }
  }

  peek(): T | undefined {
    return this.heap[0].value;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
