import { pipeline } from "@xenova/transformers";

let embedder: any = null;

export const getEmbedder = async () => {
    if (!embedder) {

        embedder = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );
    }
    return embedder;
}

export const createEmbedder = async(text: string) => {
    const embedder = await getEmbedder();

    const output = await embedder(text, {
        pooling: "mean",
        normalize: true,
    });

    return Array.from(output.data);
}