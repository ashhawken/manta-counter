import { type Counter, type Stats, type HistoryEntry } from "@shared/schema";

export interface IStorage {
  getCounter(): Promise<Counter>;
  incrementCounter(): Promise<Counter>;
  resetCounter(resetBy: string): Promise<Counter>;
  setCounter(value: number): Promise<Counter>;
  getStats(): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private counter: number;
  private lastIncrement: string | null;
  private totalRequests: number;
  private mantaRequests: number;
  private mantaAddRequests: number;
  private history: HistoryEntry[];

  constructor() {
    this.counter = 0;
    this.lastIncrement = null;
    this.totalRequests = 0;
    this.mantaRequests = 0;
    this.mantaAddRequests = 0;
    this.history = [];
  }

  async getCounter(): Promise<Counter> {
    this.totalRequests++;
    this.mantaRequests++;
    return {
      value: this.counter,
      lastIncrement: this.lastIncrement,
      totalRequests: this.totalRequests,
    };
  }

  async incrementCounter(): Promise<Counter> {
    this.counter++;
    this.lastIncrement = new Date().toISOString();
    this.totalRequests++;
    this.mantaAddRequests++;
    return {
      value: this.counter,
      lastIncrement: this.lastIncrement,
      totalRequests: this.totalRequests,
    };
  }

  async resetCounter(resetBy: string = "manual"): Promise<Counter> {
    // Save current counter to history before resetting
    if (this.counter > 0 || this.history.length > 0) {
      this.history.push({
        value: this.counter,
        resetAt: new Date().toISOString(),
        resetBy,
      });
    }

    this.counter = 0;
    this.lastIncrement = null;
    this.totalRequests = 0;
    this.mantaRequests = 0;
    this.mantaAddRequests = 0;
    return {
      value: this.counter,
      lastIncrement: this.lastIncrement,
      totalRequests: this.totalRequests,
    };
  }

  async setCounter(value: number): Promise<Counter> {
    this.counter = value;
    this.lastIncrement = new Date().toISOString();
    this.totalRequests++;
    return {
      value: this.counter,
      lastIncrement: this.lastIncrement,
      totalRequests: this.totalRequests,
    };
  }

  async getStats(): Promise<Stats> {
    return {
      value: this.counter,
      lastIncrement: this.lastIncrement,
      totalRequests: this.totalRequests,
      mantaRequests: this.mantaRequests,
      mantaAddRequests: this.mantaAddRequests,
      history: [...this.history].reverse(), // Most recent first
    };
  }
}

export const storage = new MemStorage();
