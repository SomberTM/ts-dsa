import { PriorityQueue } from './heaps/priority-queue';
import { Queue } from './queue';

export class Algorithms {
  public static bfs<T>(graph: IGraph<IGraphVertex<T>>, source?: IGraphVertex<T>): BFSResults<IGraphVertex<T>> {
    const queue = new Queue<number>();
    const marked: boolean[] = Array.from({ length: graph.vertices.length }).fill(false) as boolean[];
    const edgeTo: IGraphVertex<T>[] = [];
    const distTo: number[] = [];

    if (!source && !graph.vertices[0])
      return {
        edgeTo,
        distTo,
      };

    const sourceIdx = source?.idx ?? graph.vertices[0].idx;
    queue.enqueue(sourceIdx);
    marked[sourceIdx] = true;
    distTo[sourceIdx] = 0;

    while (!queue.isEmpty()) {
      const vertexIdx = queue.dequeue()!;
      const vertex = graph.vertices[vertexIdx];
      for (const adjacent of graph.getAdjacentTo(vertex)) {
        if (!marked[adjacent.idx]) {
          queue.enqueue(adjacent.idx);
          marked[adjacent.idx] = true;
          edgeTo[adjacent.idx] = vertex;
          distTo[adjacent.idx] = distTo[vertexIdx] + 1;
        }
      }
    }

    return {
      edgeTo,
      distTo,
    };
  }

  public static dfs<T>(graph: IGraph<IGraphVertex<T>>, source?: IGraphVertex<T>): DFSResults<IGraphVertex<T>> {
    const results: DFSResults<IGraphVertex<T>> = {
      edgeTo: [],
      preorder: [],
      postorder: [],
    };
    const marked: boolean[] = Array.from({ length: graph.vertices.length }).fill(false) as boolean[];

    function dfsRecursor(v: IGraphVertex<T>) {
      marked[v.idx] = true;
      for (const w of graph.getAdjacentTo(v)) {
        if (!marked[w.idx]) {
          results.preorder.push(w);
          dfsRecursor(w);
          results.postorder.push(w);
          results.edgeTo[w.idx] = v;
        }
      }
    }

    const s = source ?? graph.vertices[0];
    if (!s) return results;

    results.preorder.push(s);
    dfsRecursor(s);
    results.postorder.push(s);
    return results;
  }

  public static dijkstras<T>(
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
}
