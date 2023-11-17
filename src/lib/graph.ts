import { areNodesEqual } from "./utils";

export class Graph<T> implements IGraph<IVertex<T>>, IExtendedGraphFunctions<IVertex<T>> {
  public vertices: IVertex<T>[];
  public edges: IEdge<IVertex<T>>[];
  
  constructor(public directed: boolean) {
    this.vertices = [];
    this.edges = [];
  }

  public addEdge(edge: IEdge<IVertex<T>>): void;
  public addEdge(from: IVertex<T>, to: IVertex<T>, weight?: number): void;
  public addEdge(edgeOrFrom: IEdge<IVertex<T>> | IVertex<T>, to?: IVertex<T>, weight?: number): void {
    if ("from" in edgeOrFrom && "to" in edgeOrFrom) {
      this.edges.push(edgeOrFrom);
      if (!this.directed)
        this.edges.push({ from: edgeOrFrom.to, to: edgeOrFrom.from, weight: edgeOrFrom.weight })
    } else if (to) {
      this.edges.push({
        from: edgeOrFrom,
        to,
        weight
      })
      if (!this.directed)
        this.edges.push({
          from: to, 
          to: edgeOrFrom,
          weight
        })
    }
  }

  public removeVertex(vertex: IVertex<T>): boolean;
  public removeVertex(vertexValue: T): boolean;
  public removeVertex(vertexValue: unknown): boolean {
    for (let i = 0; i < this.vertices.length; i++) {
      const vertex = this.vertices[i];
      if (vertex === vertexValue || vertex.value === vertexValue)
        return this.vertices.splice(i, 1).length === 1;
    }

    return false;
  }

  public addVertex(vertex: IVertex<T>): IVertex<T> {
    this.vertices.push(vertex);
    return vertex;
  }

  public toConnectedVertices(): IConnectedVertex<IVertex<T>>[] { 
    return this.vertices.map((vertex) => this.toConnectedVertex(vertex));
  }

  public toConnectedVertex(vertex: IVertex<T>): IConnectedVertex<IVertex<T>> {
    const inVertices: IVertex<T>[] = [];
    const outVertices: IVertex<T>[] = [];
    
    if (!this.directed) {
      for (const edge of this.edges) {
        if (areNodesEqual(edge.from, vertex)) {
          inVertices.push(edge.to)
          outVertices.push(edge.to)
        }
      }
    } else {
      for (const edge of this.edges) {
        if (areNodesEqual(edge.from, vertex))
          outVertices.push(edge.to)
        else if (areNodesEqual(edge.to, vertex))
          inVertices.push(edge.from)
      }
    }

    return {
      vertexRef: vertex,
      inVertices,
      outVertices
    }
  }
}