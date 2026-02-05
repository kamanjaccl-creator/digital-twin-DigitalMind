# MCP Server

This folder contains a minimal MCP server entrypoint at `src/mcp-server/index.ts` which uses a small `rolldice` utility.

Prerequisites
- Node.js (recommended >= 16)
- npm (or yarn/pnpm)

Quick start (development)
1. Install dev dependencies:
   ```bash
   npm install --save-dev typescript ts-node @types/node nodemon
   ```
2. Run the MCP server directly with ts-node:
   ```bash
   npm run start:mcp
   ```
   Or run in watch mode (restarts on changes):
   ```bash
   npm run dev:mcp
   ```

Build & run (production)
1. Build TypeScript:
   ```bash
   npm run build
   ```
2. Run compiled JS:
   ```bash
   npm run start
   ```

Notes
- The MCP server entrypoint is `src/mcp-server/index.ts`. It imports `rollDice` from `src/tools/rolldice`.
- If you prefer not to add TypeScript dev dependencies, you can compile elsewhere and push the compiled `dist/` files, or adjust `package.json` scripts to your preferred workflow.
- If the import path needs adjusting (e.g., different folder layout), update `src/mcp-server/index.ts` accordingly.

---