export function dfs<T>(graph: IGraph<IGraphVertex<T>>, source?: IGraphVertex<T>): DFSResults<IGraphVertex<T>> {
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
