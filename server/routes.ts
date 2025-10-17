import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Nightbot endpoints - return plain text for chat commands
  app.get("/api/manta", async (_req, res) => {
    try {
      const counter = await storage.getCounter();
      const killWord = counter.value === 1 ? "kill" : "kills";
      res.send(`It has been ${counter.value} ${killWord} since the last egg`);
    } catch (error) {
      res.status(500).send("Error fetching counter");
    }
  });

  app.get("/api/mantaadd", async (_req, res) => {
    try {
      const counter = await storage.incrementCounter();
      const timeWord = counter.value === 1 ? "time" : "times";
      res.send(`Manta has now been slain ${counter.value} ${timeWord}`);
    } catch (error) {
      res.status(500).send("Error incrementing counter");
    }
  });

  app.get("/api/eggfound", async (_req, res) => {
    try {
      // Get current counter value before resetting
      const currentCounter = await storage.getCounter();
      const previousValue = currentCounter.value;
      
      // Reset counter
      await storage.resetCounter("eggfound");
      
      res.send(`Egg found! Manta count reset. Previous count: ${previousValue}`);
    } catch (error) {
      res.status(500).send("Error resetting counter");
    }
  });

  app.get("/api/setkills", async (req, res) => {
    try {
      const countParam = req.query.count as string;
      
      // Strict validation: must be a pure non-negative integer
      if (!countParam || !/^\d+$/.test(countParam)) {
        res.status(400).send("Invalid count parameter. Usage: !setkills <number>");
        return;
      }
      
      const count = parseInt(countParam, 10);
      
      if (count < 0) {
        res.status(400).send("Invalid count parameter. Usage: !setkills <number>");
        return;
      }
      
      const counter = await storage.setCounter(count);
      const killWord = counter.value === 1 ? "kill" : "kills";
      res.send(`Manta count set to ${counter.value} ${killWord}`);
    } catch (error) {
      res.status(500).send("Error setting counter");
    }
  });

  // Dashboard API endpoints - return JSON
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Error fetching stats" });
    }
  });

  app.post("/api/reset", async (_req, res) => {
    try {
      const counter = await storage.resetCounter("manual");
      res.json(counter);
    } catch (error) {
      res.status(500).json({ error: "Error resetting counter" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
