import { DoublyLinkedList } from "./lib/lists/doubly-linked-list";
import { Queue } from "./lib/queue";
import { Stack } from "./lib/stack"

(async function() {
  const stack = new Stack<number>();

  stack.push(5);
  stack.push(10);
  stack.push(11);

  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.isEmpty());
  console.log(stack.pop());
  console.log(stack.isEmpty());
  console.log(stack.pop());

  const dll = new DoublyLinkedList<number>();
  dll.insert(5);
  dll.insert(10);
  dll.insert(15);
  console.log(dll.removeRoot());
  console.log(dll.removeRoot());
  console.log(dll.removeRoot());
  console.log(dll.root, dll.tail)

  const q = new Queue<number>();
  q.enqueue(5)
  q.enqueue(10)
  console.log(q.peek())
  console.log(q.dequeue())
})()