import { client } from "../config/llm.config.js";

export const generateResponse = async (prompt: string ,messages: string) => {
    try {
        const stream = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
                {
                    role: "user",
                    content: messages,
                },
            ],
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
