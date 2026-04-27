import type { Tool } from "./tool.types.js";

class ToolRegistry {
    private tools: Map<string, Tool> = new Map();

    register(tool: Tool) {
        this.tools.set(tool.name, tool)
    }

    get(name: string){
        return this.tools.get(name)
    }

    list() {
        return Array.from(this.tools.values())
    }
}

export const toolRegistry = new ToolRegistry();