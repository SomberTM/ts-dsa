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
}
