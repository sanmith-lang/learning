import OpenAI from "openai";
import "dotenv/config";
import { logger } from "../utils/logger.js";

if (!process.env.OPENAI_API_KEY) {
    logger.error("❌ Missing OPENAI_API_KEY in .env");
    process.exit(1);
}

export const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
    baseURL: "https://api.groq.com/openai/v1",
});

