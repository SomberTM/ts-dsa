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
}
