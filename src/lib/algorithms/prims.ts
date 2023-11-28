import { PriorityQueue } from '../data-structures';

export function prims<T>(graph: IGraph<IGraphVertex<T>>) {
  const edgeTo: (IEdge<IGraphVertex<T>> | undefined)[] = Array.from({ length: graph.vertices.length });
  const costToAdd: number[] = Array.from({ length: graph.vertices.length });
  const visited: boolean[] = Array.from({ length: graph.vertices.length });
  const inQueue: boolean[] = Array.from({ length: graph.vertices.length });
  const queue: PriorityQueue<IGraphVertex<T>> = new PriorityQueue();

  for (const v of graph.vertices) {
    edgeTo[v.idx] = undefined;
    costToAdd[v.idx] = Infinity;
    visited[v.idx] = false;
    inQueue[v.idx] = false;
  }
  costToAdd[0] = 0;
  queue.enqueue(graph.vertices[0], 0);
  inQueue[0] = true;

  while (!queue.isEmpty()) {
    const u = queue.dequeue()!;
    visited[u.idx] = true;
    inQueue[u.idx] = false;

    for (const v of graph.edges[u.idx]) {
      if (visited[v.idx]) continue;

      if (v.weight < costToAdd[v.idx]) {
        edgeTo[v.idx] = { from: u, to: v, weight: v.weight };
        costToAdd[v.idx] = v.weight;

        if (inQueue[v.idx]) {
          queue.set((x) => x.idx === v.idx, costToAdd[v.idx]);
        } else {
          queue.enqueue(v, costToAdd[v.idx]);
          inQueue[v.idx] = true;
        }
      }
    }
  }

  return edgeTo;
}
