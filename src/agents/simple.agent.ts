import { generateResponse } from "../llm/openai.client.js";
import { addMessage, getSession } from "../memory/session.memory.js";
import { plannerPrompt } from "../prompts/system/planner.system.js";
import { retrive } from "../rag/retrieve.js";
import { toolRegistry } from "../tools/tool.registry.js";
import { AgentDecisionSchema } from "./agent.schema.js";

type AgentState = {
    messages: {
        role: string;
        content: string;
    }[];
};

export const runAgent = async (userInput: string, session_id: string) => {
    try {

        const history = getSession(session_id);

        history.push({ role: "user", content: userInput });

        for (let i = 0; i < 5; i++) {
            const context = await retrive(userInput);

            const planner_prompt = plannerPrompt(userInput);

            const response = await generateResponse({
                messages: [
                    ...history,
                    { role: "system", content: planner_prompt + `\n\nContext:\n${context}` }
                ]
            });

            let decision;

            try {
                const parsed = JSON.parse(response);
                decision = AgentDecisionSchema.parse(parsed);

                if (decision.action === "final") {
                    const finalAnswer = decision.finalAnswer ?? "No final answer";
                    addMessage(session_id, { role: "assistant", content: finalAnswer });
                    return finalAnswer;
                }

                if (decision.action === "tool") {
                    if (!decision.tool || !decision.input) {
                        throw new Error("Tool name or input is null");
                    }
                    const tool = toolRegistry.get(decision.tool);
                    if (!tool) {
                        throw new Error(`Tool ${decision.tool} not found`);
                    }

                    const result = await tool.execute(decision.input);
                    addMessage(session_id, { role: "assistant", content: result });
                }
            } catch (error) {
                console.error("Error parsing decision:", error);
            }
        }
        return "Agent stopped after max iterations";
    } catch (error) {
        console.log(error)
        return "Sorry, I am having trouble processing your request right now.";
    }
}