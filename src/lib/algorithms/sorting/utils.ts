export function swap(array: number[], i: number, j: number): number[] {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}

export function randomArray(length = 50, max = 250) {
  const array = Array.from({ length }).map(() => Math.floor(Math.random() * max));
  if (!array.some((el) => el === max)) array[Math.floor(Math.random() * length)] = max;
  return array;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
