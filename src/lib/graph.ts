import { SinglyLinkedList } from './lists/singly-linked-list';
import { Queue } from './queue';

export class Graph<T> implements IGraph<IGraphVertex<T>> {
  public vertices: IGraphVertex<T>[];
  public edges: ISinglyLinkedList<IGraphEdgeVertex<T>>[];

  private availableVertexIndexes: Queue<number>;

  constructor(public directed: boolean) {
    this.vertices = [];
    this.edges = [];
    this.availableVertexIndexes = new Queue();
  }

  public addEdge(from: IGraphVertex<T>, to: IGraphVertex<T>, weight?: number | undefined): void {
    this.edges[from.idx].insert({ ...to, weight });
    if (!this.directed) this.edges[to.idx].insert({ ...from, weight });
  }

  public removeVertex(vertex: IGraphVertex<T>): boolean;
  public removeVertex(vertexValue: T): boolean;
  public removeVertex(vertexValue: IGraphVertex<T> | T): boolean {
    if (typeof vertexValue === 'object' && vertexValue && 'idx' in vertexValue) {
      this.vertices.splice(vertexValue.idx, 1, undefined as unknown as IGraphVertex<T>);
      this.edges.splice(vertexValue.idx, 1, undefined as unknown as ISinglyLinkedList<IGraphEdgeVertex<T>>);
      this.availableVertexIndexes.enqueue(vertexValue.idx);
      return true;
    } else {
      for (let i = 0; i < this.vertices.length; i++) {
        const vertex = this.vertices[i];
        if (vertex.value === vertexValue) {
          this.vertices.splice(i, 1, undefined as unknown as IGraphVertex<T>);
          this.edges.splice(i, 1, undefined as unknown as ISinglyLinkedList<IGraphEdgeVertex<T>>);
          this.availableVertexIndexes.enqueue(i);
          return true;
        }
      }
    }

    return false;
  }

  public addVertex(vertex: IVertex<T>): IGraphVertex<T> {
    let idx = this.vertices.length;
    if (!this.availableVertexIndexes.isEmpty()) {
      idx = this.availableVertexIndexes.dequeue()!;
    }
    const graphVertex: IGraphVertex<T> = { ...vertex, idx };
    this.edges[graphVertex.idx] = new SinglyLinkedList();
    this.vertices[idx] = graphVertex;
    return graphVertex;
  }

  public getAdjacentTo(vertex: IGraphVertex<T>): IGraphVertex<T>[] {
    return this.edges[vertex.idx].toArray();
  }
}
