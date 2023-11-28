interface BFSResults<TGraphVertex> {
  edgeTo: (TGraphVertex | undefined)[];
  distTo: number[];
}

interface DFSResults<TGraphVertex> {
  edgeTo: (TGraphVertex | undefined)[];
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
  previous: (TGraphVertex | undefined)[];
}

interface IGraphAlgorithms<TGraphVertex> {
  bfs(source?: TGraphVertex): BFSResults<TGraphVertex>;
  dfs(source?: TGraphVertex): DFSResults<TGraphVertex>;
  dijkstras(source?: TGraphVertex): DijkstrasResults<TGraphVertex>;
}
