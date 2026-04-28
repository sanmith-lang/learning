import { client } from "../config/llm.config.js";

type ChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

export const generateResponse = async ({
    messages,
}: {
    messages: ChatMessage[];
}) => {
    try {
        const stream = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: messages,
            stream: true,
        });

        let fullResponse = "";

        for await (const chunk of stream) {
            const content = chunk?.choices[0]?.delta?.content;
            if (content) {
                fullResponse += content;
            }
        }
        return fullResponse;
    } catch (error) {
        console.log("llm error", error);
        return "Sorry, I am having trouble processing your request right now.";
    }
};
