interface INode<T> {
  value: T;
}

type ExtractGeneric<TExtendsNode> = TExtendsNode extends INode<infer T> ? T : never;

/// --- Graph ---
interface IVertex<T> extends INode<T> {}

interface IEdge<V> {
  from: V,
  to: V
  weight?: number
}

interface IConnectedVertex<TVertex> {
    vertexRef: TVertex;
    inVertices: TVertex[];
    outVertices: TVertex[];
}

interface IGraph<TVertex> {
  vertices: TVertex[],
  edges: IEdge<TVertex>[];
  directed: boolean;

  addVertex(vertex: TVertex): TVertex;
  addEdge(edge: IEdge<TVertex>): void;
  addEdge(from: TVertex, to: TVertex, weight?: number): void;

  /**
   * Removes vertex by reference
   */
  removeVertex(vertex: TVertex): boolean;

  /**
   * Removes vertex by value
   */
  removeVertex(vertexValue: ExtractGeneric<TVertex>): boolean;
}

interface IExtendedGraphFunctions<TVertex> {
  toConnectedVertices(): IConnectedVertex<TVertex>[];
  toConnectedVertex(vertex: TVertex): IConnectedVertex<TVertex>;
}
/// -------------

interface IStack<T> {
  push(value: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
}

interface IQueue<T> {
  enqueue(value: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
}

interface ILinkedList<TLinkedNode extends INode<unknown>> {
  root?: TLinkedNode;

  insert(value: ExtractGeneric<TLinkedNode>): TLinkedNode;
  remove(value: ExtractGeneric<TLinkedNode>): TLinkedNode | undefined;
  find(callback: (node:TLinkedNode) => boolean): TLinkedNode | undefined;
}

interface ISinglyLinkedNode<T> extends INode<T> {
  next?: ISinglyLinkedNode<T>
}

interface ISinglyLinkedList<T> extends ILinkedList<ISinglyLinkedNode<T>> {}

interface IDoublyLinkedNode<T> extends INode<T> {
  previous?: IDoublyLinkedNode<T>;
  next?: IDoublyLinkedNode<T>;
}

interface IDoublyLinkedList<T> extends ILinkedList<IDoublyLinkedNode<T>> {
  tail?: IDoublyLinkedNode<T>
}