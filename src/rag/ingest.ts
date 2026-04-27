import { chunkText } from "./chunk.js"
import { createEmbedder } from "./embeddings.js";
import { vectorStore } from "./vector.store.js";

export const ingest = async(text: string) => {
    const chunks = text.match(/.{1,500}/g) || [];

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]!;
        const embedding = await createEmbedder(chunk) as number[];
        // Do something with the embedding, e.g., store it in the vector store

        vectorStore.add({
            id: `chunk-${i}`,
            embedding,
            text: chunk,
        })
    }
}