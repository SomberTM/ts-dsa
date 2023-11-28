import { PriorityQueue } from '../data-structures/priority-queue';

export function dijkstras<T>(
  graph: IGraph<IGraphVertex<T>>,
  source?: IGraphVertex<T>
): DijkstrasResults<IGraphVertex<T>> {
  const results: DijkstrasResults<IGraphVertex<T>> = {
    dist: [],
    previous: [],
  };

  const s = source ?? graph.vertices[0];
  if (!s) return results;

  const visited: boolean[] = Array.from({ length: graph.vertices.length }).fill(false) as boolean[];
  const queue: PriorityQueue<IGraphVertex<T>> = new PriorityQueue();

  results.dist[s.idx] = 0;
  for (const v of graph.vertices) {
    if (v.idx !== s.idx) {
      results.dist[v.idx] = Infinity;
    }
    queue.enqueue(v, results.dist[v.idx]);
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue()!;
    visited[u.idx] = true;
    for (const w of graph.getAdjacentTo(u)) {
      if (visited[w.idx]) continue;
      const d = results.dist[u.idx] + w.weight;

      if (d < results.dist[w.idx]) {
        results.dist[w.idx] = d;
        results.previous[w.idx] = u;
        queue.set((x) => x.idx === w.idx, d);
      }
    }
  }

  return results;
}
