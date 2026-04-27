import { z } from "zod";

export const AgentDecisionSchema = z.object({
    action: z.enum(["tool", "final"]),
    tool: z.string().nullable(),
    input: z.string().nullable(),
    finalAnswer: z.string().nullable(),
});

export type AgentDecision = z.infer<typeof AgentDecisionSchema>;