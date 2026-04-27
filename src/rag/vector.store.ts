type VectorItem = {
    id: string;
    embedding: number[];
    text: string;
}

export class VectorStore {
    private store: VectorItem[] = [];

    add(item: VectorItem){
        this.store.push(item);
    }

    private cosine(a: number[], b: number[]) {
        let dot = 0;
        let magA = 0;
        let magB = 0;

        for(let i = 0; i < a.length; i++) {
            const ai = a[i] ?? 0;
            const bi = b[i] ?? 0;
            dot += ai * bi;
            magA += ai * ai;
            magB += bi * bi;
        }

        return dot / Math.sqrt(magA) / Math.sqrt(magB);
    }

    search(queryEmbedding: number[], topK: number = 3) {
        return this.store.map(item => ({
            ...item,
            score: this.cosine(queryEmbedding, item.embedding)
        })).sort((a, b) => b.score - a.score).slice(0, topK)
    }
}

export const vectorStore = new VectorStore();