type Message = {
    role: "user" | "assistant";
    content: string;
}

const session: Map<string, Message[]> = new Map();

export const getSession = (sessionId: string) => {
    if (!session.has(sessionId)) {
        session.set(sessionId, []);
    }

    return session.get(sessionId)!;
}

export const addMessage = (sessionId: string, message: Message) => {
    const session = getSession(sessionId);

    session.push(message);
}