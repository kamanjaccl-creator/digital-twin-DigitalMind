/**
 * MCP Server / Tools – Digital Twin III
 */

// Local rollDice to avoid cross-project import issues during type-check
export function rollDice(sides: number): number {
  if (!Number.isInteger(sides) || sides <= 0) {
    throw new Error('sides must be a positive integer');
  }
  return Math.floor(Math.random() * sides) + 1;
}

export async function startMcpServer(): Promise<void> {
  console.log('MCP server initialized');
  const result = rollDice(6);
  console.log('Rolldice result:', result);
}

type InterviewResult = {
  role: string;
  questions: string[];
  evaluatedAt: string;
};

export function runInterviewSimulation(role: string): InterviewResult {
  return {
    role,
    questions: [
      "What is SQL injection and how do you prevent it?",
      "Explain prompt injection in LLM systems.",
      "How does rate limiting protect AI APIs?",
      "Describe OWASP Top 10 and its relevance today."
    ],
    evaluatedAt: new Date().toISOString()
  };
}

/**
 * MCP tool registry (for agent discovery)
 */
export const tools = {
  runInterviewSimulation: {
    description: "Run a cybersecurity interview simulation for a given role",
    inputSchema: {
      type: "object",
      properties: {
        role: { type: "string" }
      },
      required: ["role"]
    }
  }
};
