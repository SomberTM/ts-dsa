import { Dequeue } from '../lib/data-structures/dequeue';

test('create dequeue', () => {
  const dequeue = new Dequeue<number>();
  expect(dequeue.peekBack()).toBe(undefined);

  for (let i = 0; i < 10; i++) {
    dequeue.insertFront(i);
  }
  for (let i = 0; i < 10; i++) {
    dequeue.insertBack(i);
  }

  expect(dequeue.peekBack()).toBe(9);
  expect(dequeue.peekFront()).toBe(9);
});

test('remove dequeue', () => {
  const dequeue = new Dequeue<number>();

  for (let i = 0; i < 10; i++) {
    dequeue.insertFront(i);
  }

  expect(dequeue.removeFront()).toBe(9);
  expect(dequeue.removeBack()).toBe(0);
});
