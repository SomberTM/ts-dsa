import { randomArray, sleep } from '../utils';

const DEFAULT_MAX_CANDLE_HEIGHT = 300;
const DEFAULT_NUM_CANDLES = 50;
const DEFAULT_CANDLE_WIDTH = 25;
const DEFAULT_SORTING_SPEED = 10;
const DEFAULT_SORT_TIME = 0;
const DEFAULT_SHOW_CANDLE_HEIGHT = true;

export type SortingAlgorithm = (() => Promise<void>) & {
  displayName: string;
};

export class SorterStore {
  array: number[];
  historyIndex: number;
  sortTime: number;
  speed: number;
  numCandles: number;
  candleWidth: number;
  maxCandleHeight: number;
  showCandleHeight: boolean;

  constructor(public algorithm: SortingAlgorithm) {
    this.array = randomArray(DEFAULT_NUM_CANDLES, DEFAULT_MAX_CANDLE_HEIGHT);
    this.sortTime = DEFAULT_SORT_TIME;
    this.speed = DEFAULT_SORTING_SPEED;
    this.numCandles = DEFAULT_NUM_CANDLES;
    this.candleWidth = DEFAULT_CANDLE_WIDTH;
    this.maxCandleHeight = DEFAULT_MAX_CANDLE_HEIGHT;
    this.showCandleHeight = DEFAULT_SHOW_CANDLE_HEIGHT;
    this.historyIndex = 0;
  }

  setArray(array: number[]) {
    this.array = array;
  }

  setSortTime(sortTime: number) {
    this.sortTime = sortTime;
  }

  setSpeed(speed: number) {
    if (speed < 0) speed = 0;
    this.speed = speed;
  }

  setNumCandles(numCandles: number) {
    if (numCandles < 0) numCandles = 0;
    this.numCandles = numCandles;
  }

  setCandleWidth(candleWidth: number) {
    if (candleWidth < 0) candleWidth = 0;
    this.candleWidth = candleWidth;
  }

  setMaxCandleHeight(maxCandleHeight: number) {
    if (maxCandleHeight < 0) maxCandleHeight = 0;
    this.maxCandleHeight = maxCandleHeight;
  }

  setShowCandleHeight(showCandleHeight: boolean) {
    this.showCandleHeight = showCandleHeight;
  }

  setSortingHistoryIndex(index: number) {
    this.historyIndex = index;
  }

  swap(i: number, j: number) {
    const temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
  }

  async swapAndWait(i: number, j: number, before = false) {
    if (before) await this.wait();
    this.swap(i, j);
    if (!before) await this.wait();
  }

  async wait() {
    await sleep(this.speed);
  }

  async sort() {
    const timeStart = performance.now();
    await this.algorithm.call(this);
    this.sortTime = performance.now() - timeStart;
  }

  comparelt(i: number, j: number): boolean {
    return this.array[i] < this.array[j];
  }

  comparelte(i: number, j: number): boolean {
    return this.array[i] <= this.array[j];
  }

  comparegt(i: number, j: number): boolean {
    return this.array[i] > this.array[j];
  }

  comparegte(i: number, j: number): boolean {
    return this.array[i] >= this.array[j];
  }
}
