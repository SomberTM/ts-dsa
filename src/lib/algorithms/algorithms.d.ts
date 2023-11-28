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

interface DijkstrasResults<TGraphVertex> {
  dist: number[];
  previous: TGraphVertex[];
}

interface IGraphAlgorithms<TGraphVertex> {
  bfs(source?: TGraphVertex): BFSResults<TGraphVertex>;
  dfs(source?: TGraphVertex): DFSResults<TGraphVertex>;
  dijkstras(source?: TGraphVertex): DijkstrasResults<TGraphVertex>;
}
