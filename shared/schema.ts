import { z } from "zod";

// Counter schema - simple counter with metadata
export const counterSchema = z.object({
  value: z.number(),
  lastIncrement: z.string().nullable(),
  totalRequests: z.number(),
});

export type Counter = z.infer<typeof counterSchema>;

// History entry for counter resets
export const historyEntrySchema = z.object({
  value: z.number(),
  resetAt: z.string(),
  resetBy: z.string(), // "manual" or "eggfound"
});

export type HistoryEntry = z.infer<typeof historyEntrySchema>;

// Stats for the dashboard
export const statsSchema = z.object({
  value: z.number(),
  lastIncrement: z.string().nullable(),
  totalRequests: z.number(),
  mantaRequests: z.number(),
  mantaAddRequests: z.number(),
  history: z.array(historyEntrySchema),
});

export type Stats = z.infer<typeof statsSchema>;
