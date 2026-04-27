import cors from 'cors';
import express from "express";
import dotenv from "dotenv";
import { logger } from './utils/logger.js';
import testRouter from './api/test.api.js';

// Load env
dotenv.config();

// App
const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
    res.send("🚀 Agentic AI Backend Running");
});

app.use("/api/test", testRouter);

// Port
const PORT = process.env.PORT || 5481;

app.listen(PORT, () => {
    logger.info(`✅ Server running on http://localhost:${PORT}`);
});