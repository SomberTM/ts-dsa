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

  getAdjacentTo(vertex: TGraphVertex): ISinglyLinkedList<TGraphVertex>;
}

interface BFSResults<TGraphVertex> {
  edgeTo: TGraphVertex[];
  distTo: number[];
}

interface DFSResults<TGraphVertex> {
  edgeTo: TGraphVertex[];
  /**
   * May also be referred to as dfs numbers.
   */
  preorder: TGraphVertex[];
  /**
   * May also be referred to as dfs finish numbers.
   */
  postorder: TGraphVertex[];
}

interface IGraphAlgorithms<TGraphVertex> {
  bfs(source?: TGraphVertex): BFSResults<TGraphVertex>;
  dfs(source?: TGraphVertex): DFSResults<TGraphVertex>;
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
  remove(value: ExtractGeneric<TLinkedNode>): boolean;
  removeAll(find: Find<ExtractGeneric<TLinkedNode>>): ExtractGeneric<TLinkedNode>[];
  find(callback: (node: TLinkedNode) => boolean): TLinkedNode | undefined;
  toArray(): ExtractGeneric<TLinkedNode>[];

  [Symbol.iterator](): {
    next(): IteratorResult<ExtractGeneric<TLinkedNode>, undefined>;
  };
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

type NumberComparator<T> = (a: T, b: T) => number;
/**
 * `a` will be considered greater than `b` if true.
 * And `b` considered greater than `a` if false.
 */
type BooleanComparator<T> = (a: T, b: T) => boolean;

type ComparingGreater = 1;
type ComparingEqual = 0;
type ComparingLess = -1;
type BasicNumberComparator<T> = (a: T, b: T) => ComparingGreater | ComparingEqual | ComparingLess;

type Find<T> = (value: T) => boolean;

/**
 * Represents a heap data structure. Depending on the
 * provided comparator can represent a min or max heap.
 */
interface IHeap<T> {
  heap: T[];
  size: number;
  comparator: BooleanComparator<T>;

  insert(value: T): void;
  remove(find: Find<T>): boolean;
  extract(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
}
