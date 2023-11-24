import { Algorithms } from './lib/algorithms';
import { Graph } from './lib/graph';
import { Heap } from './lib/heaps/heap';
import { PriorityQueue } from './lib/heaps/priority-queue';
import { DoublyLinkedList } from './lib/lists/doubly-linked-list';
import { SinglyLinkedList } from './lib/lists/singly-linked-list';
import { Queue } from './lib/queue';
import { Stack } from './lib/stack';
import Graphviz from 'graphviz';

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

  // const sll = new SinglyLinkedList<number>();
  // sll.insert(5);
  // sll.insert(10);
  // sll.insert(15);
  // sll.insert(20);
  // sll.insert(25);

  // for (const value of sll) {
  //   console.log(value);
  // }

  // sll.removeAll((v) => v === 15 || v === 25);
  // console.log(sll.root);
  // for (const value of sll) {
  //   console.log(value);
  // }

  // const q = new Queue<number>();
  // q.enqueue(5)
  // q.enqueue(10)
  // console.log(q.peek())
  // console.log(q.dequeue())

  // const graph = new Graph<string>(true);
  // const A = graph.addVertex({ value: 'A' });
  // const B = graph.addVertex({ value: 'B' });
  // const C = graph.addVertex({ value: 'C' });
  // const D = graph.addVertex({ value: 'D' });
  // const E = graph.addVertex({ value: 'E' });
  // const F = graph.addVertex({ value: 'F' });
  // const G = graph.addVertex({ value: 'G' });
  // const H = graph.addVertex({ value: 'H' });
  // const I = graph.addVertex({ value: 'I' });
  // const J = graph.addVertex({ value: 'J' });

  // graph.addEdge(C, B);
  // graph.addEdge(B, A);
  // graph.addEdge(B, E);
  // graph.addEdge(E, D);
  // graph.addEdge(D, C);
  // graph.addEdge(D, F);
  // graph.addEdge(F, I);
  // graph.addEdge(F, J);
  // graph.addEdge(J, C);
  // graph.addEdge(I, H);
  // graph.addEdge(H, G);
  // graph.addEdge(G, D);

  // graph.toImage('./output.png');

  const graph = new Graph<string>(true);
  const PVD = graph.addVertex({ value: 'PVD' });
  const LGA = graph.addVertex({ value: 'LGA' });
  const MIA = graph.addVertex({ value: 'MIA' });
  const DFW = graph.addVertex({ value: 'DFW' });
  const ORD = graph.addVertex({ value: 'ORD' });
  const SFO = graph.addVertex({ value: 'SFO' });
  const LAX = graph.addVertex({ value: 'LAX' });
  const HNL = graph.addVertex({ value: 'HNL' });

  graph.addEdge(PVD, ORD, 849);
  graph.addEdge(PVD, LGA, 142);
  graph.addEdge(PVD, MIA, 1205);
  graph.addEdge(MIA, LGA, 1099);
  graph.addEdge(MIA, DFW, 1120);
  graph.addEdge(LGA, DFW, 1387);
  graph.addEdge(ORD, DFW, 802);
  graph.addEdge(ORD, SFO, 1843);
  graph.addEdge(ORD, LAX, 1743);
  graph.addEdge(DFW, LAX, 1233);
  graph.addEdge(LAX, SFO, 337);
  graph.addEdge(LAX, HNL, 2555);

  graph.toImage('./output.png');
  dijkstrasGraphImage(graph, PVD);

  // const nonHeap = [1, 3, 5, 2, 6, 8, 9, 10];
  // const maxHeap = Heap.heapify(nonHeap, (a, b) => a > b);
  // console.log(maxHeap.heap);
  // while (!maxHeap.isEmpty()) {
  //   console.log(maxHeap.extract(), maxHeap.heap);
  // }
})();

function dijkstrasGraphImage(g: Graph<any>, source: any) {
  const graph = g.directed ? Graphviz.digraph('G') : Graphviz.graph('G');

  for (const v of g.vertices) {
    graph.addNode(g.vertexValueToString(v));
  }

  const dijkstras = g.dijkstras(source);

  for (let i = 0; i < g.edges.length; i++) {
    const sourceVertex = g.vertices[i];
    for (const destinationVertex of g.edges[i]) {
      const e = graph.addEdge(g.vertexValueToString(sourceVertex), g.vertexValueToString(destinationVertex));
      e.set('label', destinationVertex.weight);
      if (dijkstras.previous[destinationVertex.idx]?.idx === sourceVertex.idx) e.set('color', 'red');
    }
  }

  graph.setGraphVizPath('/usr/local/bin');
  graph.output('png', './output-dijkstras.png');
}
