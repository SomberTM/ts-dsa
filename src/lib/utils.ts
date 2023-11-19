export function areNodesEqual<T>(node1: INode<T>, node2: INode<T>): boolean {
  return node1 === node2 || node1.value === node2.value;
}
