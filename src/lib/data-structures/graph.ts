import { bfs, dfs, dijkstras } from '../algorithms';
import { SinglyLinkedList } from './singly-linked-list';
import { Queue } from './queue';
import Graphviz from 'graphviz';

export class Graph<T> implements IGraph<IGraphVertex<T>>, IGraphAlgorithms<IGraphVertex<T>> {
  public vertices: IGraphVertex<T>[];
  public edges: ISinglyLinkedList<IGraphEdgeVertex<T>>[];

  private availableVertexIndexes: Queue<number>;

  constructor(public directed: boolean) {
    this.vertices = [];
    this.edges = [];
    this.availableVertexIndexes = new Queue();
  }

  public addEdge(from: IGraphVertex<T>, to: IGraphVertex<T>, weight: number = 1): IEdge<IGraphVertex<T>> {
    this.edges[from.idx].insert({ ...to, weight });
    if (!this.directed) this.edges[to.idx].insert({ ...from, weight });
    return { from, to, weight };
  }

  public removeVertex(vertex: IGraphVertex<T>): boolean;
  public removeVertex(vertexValue: T): boolean;
  public removeVertex(vertexValue: IGraphVertex<T> | T): boolean {
    if (typeof vertexValue === 'object' && vertexValue && 'idx' in vertexValue) {
      this.vertices[vertexValue.idx] = undefined as unknown as IGraphVertex<T>;
      this.edges[vertexValue.idx] = undefined as unknown as ISinglyLinkedList<IGraphEdgeVertex<T>>;
      for (const edges of this.edges) {
        if (!edges) continue;
        edges.removeAll((v) => v.idx === vertexValue.idx);
      }
      this.availableVertexIndexes.enqueue(vertexValue.idx);
      return true;
    } else {
      for (let i = 0; i < this.vertices.length; i++) {
        const vertex = this.vertices[i];
        if (vertex.value === vertexValue) {
          this.vertices[i] = undefined as unknown as IGraphVertex<T>;
          this.edges[i] = undefined as unknown as ISinglyLinkedList<IGraphEdgeVertex<T>>;
          for (const edges of this.edges) {
            if (!edges) continue;
            edges.removeAll((v) => v.idx === i);
          }
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

  public getAdjacentTo(vertex: IGraphVertex<T>): ISinglyLinkedList<IGraphEdgeVertex<T>> {
    return this.edges[vertex.idx];
  }

  public bfs(source?: IGraphVertex<T> | undefined): BFSResults<IGraphVertex<T>> {
    return bfs(this, source);
  }

  public dfs(source?: IGraphVertex<T> | undefined): DFSResults<IGraphVertex<T>> {
    return dfs(this, source);
  }

  public dijkstras(source?: IGraphVertex<T> | undefined): DijkstrasResults<IGraphVertex<T>> {
    return dijkstras(this, source);
  }

  public toImage(outputLocation: string) {
    const graph = this.directed ? Graphviz.digraph('G') : Graphviz.graph('G');

    for (const v of this.vertices) {
      graph.addNode(this.vertexValueToString(v));
    }

    for (let i = 0; i < this.edges.length; i++) {
      const sourceVertex = this.vertices[i];
      for (const destinationVertex of this.edges[i]) {
        const e = graph.addEdge(this.vertexValueToString(sourceVertex), this.vertexValueToString(destinationVertex));
        e.set('label', destinationVertex.weight);
      }
    }

    graph.setGraphVizPath('/usr/local/bin');
    graph.output('png', outputLocation);
  }

  public vertexValueToString(vertex: IGraphVertex<T>): string {
    return JSON.stringify(vertex.value).replaceAll(`"`, ``);
  }
}
