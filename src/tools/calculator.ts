import { toolRegistry } from "./tool.registry.js";

toolRegistry.register({
    name: "calculator",
    description: "A simple calculator that can perform basic arithmetic operations.",
    execute: async (input: string) => {
        return String(eval(input))
    }
});

toolRegistry.register({
    name: "datetime",
    description: "Get the current date and time.",
    execute: async (input: string) => {

        const map: Record<string, string> = {
            india: "Asia/Kolkata",
            uk: "Europe/London",
            japan: "Asia/Tokyo"
        };

        const key = input?.toLowerCase().trim();
        const timezone = map[key] || input;

        try {
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                dateStyle: "full",
                timeStyle: "long"
            });

            return formatter.format(new Date());
        } catch {
            return "Invalid country or timezone.";
        }
    }
});