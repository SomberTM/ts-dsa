import { Stack } from '../lib/data-structures';

test('insert and pop 100 numbers', () => {
  const stack = new Stack<number>();

  const toInsert = Array.from({ length: 100 }).fill((Math.random() * 100).toFixed(2)) as number[];
  for (let i = 0; i < toInsert.length; i++) {
    stack.push(toInsert[i]);
    expect(stack.peek()).toBe(toInsert[i]);
  }

  for (let i = toInsert.length - 1; i >= 0; i--) {
    const top = stack.pop();
    expect(top).toBe(toInsert[i]);
  }
});
