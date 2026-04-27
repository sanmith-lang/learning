import { Router } from "express";
import { generateResponse } from "../llm/openai.client.js";
import { CHAT_SYSTEM_PROMPT } from "../prompts/system/chat.system.js";
import { runAgent } from "../agents/simple.agent.js";

const testRouter = Router();

testRouter.post("/", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await generateResponse(CHAT_SYSTEM_PROMPT, message);

        const final_answer = response.replace(/\n/g, "").trim();

        res.json({ response: final_answer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

testRouter.post("/plan", async (req, res) => {
    try {
        const { message, session_id } = req.body;

        const response = await runAgent(message, session_id);

        if (!response) {
            throw new Error("Response is null");
        }

        const final_answer = response.replace(/\n/g, "").trim();

        res.json({ response: final_answer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default testRouter;