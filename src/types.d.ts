interface INode<T> {
  value: T;
}

type ExtractGeneric<TExtendsNode> = TExtendsNode extends INode<infer T> ? T : never;

/// --- Graph ---
interface IVertex<T> extends INode<T> {}
interface IGraphVertex<T> extends IVertex<T> {
  idx: number;
}
interface IGraphEdgeVertex<T> extends IGraphVertex<T> {
  weight?: number;
}

interface IEdge<V> {
  from: V;
  to: V;
  weight?: number;
}

interface IGraph<TGraphVertex> {
  vertices: TGraphVertex[];
  edges: ISinglyLinkedList<IGraphEdgeVertex<ExtractGeneric<TGraphVertex>>>[];
  directed: boolean;

  addVertex(vertex: IVertex<ExtractGeneric<TGraphVertex>>): TGraphVertex;
  // addEdge(edge: IEdge<TVertex>): void;
  addEdge(from: TGraphVertex, to: TGraphVertex, weight?: number): void;

  /**
   * Removes vertex by reference
   */
  removeVertex(vertex: TGraphVertex): boolean;

  /**
   * Removes vertex by value
   */
  removeVertex(vertexValue: ExtractGeneric<TGraphVertex>): boolean;

  getAdjacentTo(vertex: TGraphVertex): TGraphVertex[];
}

interface BFSResults<TGraphVertex> {
  edgeTo: TGraphVertex[];
  distTo: number[];
}

interface IGraphAlgorithms<TGraphVertex> {
  bfs(source?: TGraphVertex): BFSResults<TGraphVertex>;
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
  find(callback: (node: TLinkedNode) => boolean): TLinkedNode | undefined;
  toArray(): ExtractGeneric<TLinkedNode>[];
}

interface ISinglyLinkedNode<T> extends INode<T> {
  next?: ISinglyLinkedNode<T>;
}

interface ISinglyLinkedList<T> extends ILinkedList<ISinglyLinkedNode<T>> {}

interface IDoublyLinkedNode<T> extends INode<T> {
  previous?: IDoublyLinkedNode<T>;
  next?: IDoublyLinkedNode<T>;
}

interface IDoublyLinkedList<T> extends ILinkedList<IDoublyLinkedNode<T>> {
  tail?: IDoublyLinkedNode<T>;
}

//

interface ITreeNode<T> extends INode<T> {
  children: ITreeNode<T>[];
}

interface IBinaryTreeNode<T> extends INode<T> {
  left: IBinaryTreeNode<T> | null;
  right: IBinaryTreeNode<T> | null;
}

type NodeCallback<TNode> = (node: TNode) => void;

interface ITreeBase<TNode> {
  root: TNode | null;
  find(value: ExtractGeneric<TNode>): TNode | null;
  insert(value: ExtractGeneric<TNode>): void;
  remove(value: ExtractGeneric<TNode>): boolean;
}

interface ITree<T> extends ITreeBase<ITreeNode<T>> {}

interface IBinaryTree<T> extends ITreeBase<IBinaryTreeNode<T>> {
  inorder: (node: IBinaryTreeNode<T> | null, callback: NodeCallback<IBinaryTreeNode<T>>) => void;
  preorder: (node: IBinaryTreeNode<T> | null, callback: NodeCallback<IBinaryTreeNode<T>>) => void;
  postorder: (node: IBinaryTreeNode<T> | null, callback: NodeCallback<IBinaryTreeNode<T>>) => void;
}
