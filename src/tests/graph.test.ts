import { Graph } from '../lib/data-structures';
import { arrayRandom } from './utils';

test('create graph ensure edges', () => {
  const graph = new Graph<string>(false);
  for (let i = 0; i < 26; i++) {
    graph.addVertex({ value: String.fromCharCode('A'.charCodeAt(0) + i) });
  }

  expect(graph.vertices.length).toBe(26);

  const edgesToCreate = Math.floor(Math.random() * 100 + 25);
  for (let i = 0; i < edgesToCreate; i++) {
    const u = arrayRandom(graph.vertices);
    const v = arrayRandom(graph.vertices);

    graph.addEdge(u, v);
    expect(graph.edges[u.idx].find((z) => z.value === v.value)).toBeTruthy();
    expect(graph.edges[v.idx].find((z) => z.value === u.value)).toBeTruthy();
  }
});

test('create digraph ensure edges', () => {
  const graph = new Graph<string>(true);
  for (let i = 0; i < 26; i++) {
    graph.addVertex({ value: String.fromCharCode('A'.charCodeAt(0) + i) });
  }

  expect(graph.vertices.length).toBe(26);

  const edgesToCreate = Math.floor(Math.random() * 100 + 25);
  for (let i = 0; i < edgesToCreate; i++) {
    const u = arrayRandom(graph.vertices);
    const v = arrayRandom(graph.vertices);
    if (u.value === v.value || graph.edges[v.idx].find((z) => z.value === u.value) !== undefined) continue;

    graph.addEdge(u, v);
    expect(graph.edges[u.idx].find((z) => z.value === v.value)).toBeTruthy();
    expect(graph.edges[v.idx].find((z) => z.value === u.value)).toBeFalsy();
  }
});
