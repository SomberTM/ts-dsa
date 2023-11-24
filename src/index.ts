import { Algorithms } from './lib/algorithms';
import { Graph } from './lib/graph';
import { Heap } from './lib/heaps/heap';
import { DoublyLinkedList } from './lib/lists/doubly-linked-list';
import { SinglyLinkedList } from './lib/lists/singly-linked-list';
import { Queue } from './lib/queue';
import { Stack } from './lib/stack';

(async function () {
  // const stack = new Stack<number>();

  // stack.push(5);
  // stack.push(10);
  // stack.push(11);

  // console.log(stack.pop());
  // console.log(stack.pop());
  // console.log(stack.isEmpty());
  // console.log(stack.pop());
  // console.log(stack.isEmpty());
  // console.log(stack.pop());

  // const dll = new DoublyLinkedList<number>();
  // dll.insert(5);
  // dll.insert(10);
  // dll.insert(15);

  // console.log(dll.tail)
  // dll.remove(15);
  // console.log(dll.tail)
  // dll.remove(10);
  // console.log(dll.tail)
  // dll.remove(5);
  // console.log(dll.tail)
  // console.log(dll.root)
  // dll.removeRoot();
  // console.log(dll.root)
  // dll.removeRoot();
  // console.log(dll.root)
  // dll.removeRoot();
  // console.log(dll.root)

  const sll = new SinglyLinkedList<number>();
  sll.insert(5);
  sll.insert(10);
  sll.insert(15);

  for (const value of sll) {
    console.log(value);
  }

  // const q = new Queue<number>();
  // q.enqueue(5)
  // q.enqueue(10)
  // console.log(q.peek())
  // console.log(q.dequeue())

  const graph = new Graph<string>(true);
  const A = graph.addVertex({ value: 'A' });
  const B = graph.addVertex({ value: 'B' });
  const C = graph.addVertex({ value: 'C' });
  const D = graph.addVertex({ value: 'D' });
  const E = graph.addVertex({ value: 'E' });

  graph.addEdge(A, B);
  graph.addEdge(B, C);
  graph.addEdge(C, D);
  graph.addEdge(D, E);
  // graph.addEdge(E, C);

  console.log(graph.vertices);
  graph.removeVertex(B);
  console.log(graph.vertices);
  graph.addVertex({ value: 'F' });
  console.log(graph.vertices);

  // const nonHeap = [1, 3, 5, 2, 6, 8, 9, 10];
  // const heap = Heap.heapify(nonHeap, (a, b) => a > b);
  // console.log(heap.peek(), heap.heap);
  // while (!heap.isEmpty()) {
  //   console.log(heap.extract(), heap.heap);
  // }
})();
