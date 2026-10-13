# The Paris Pneumatic Post — React + Node.js

An interactive educational website about the Paris Pneumatic Post, using React/Vite for the frontend and Express/Node.js for a small API.

## Requirements
- Node.js 18+ (Node.js 20+ recommended)
- npm

## Run locally
1. Extract the project ZIP.
2. Open the project folder in VS Code.
3. Open a terminal in the project folder.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the React development server and Node API together:
   ```bash
   npm run dev
   ```
6. Open **http://localhost:5173**

The Express API runs at `http://localhost:4000`.
- `GET /api/health` — server health
- `GET /api/timeline` — historical timeline data
- `POST /api/simulation` — calculates ideal pressure force from pressure difference and area

## Production build
```bash
npm run build
```
The frontend build is created in `dist/`. The Express API is a separate service; for deployment, host the frontend and API appropriately and configure the API URL/proxy for your chosen host.

## Notes
- The tube network drawing is a conceptual schematic, not a historically accurate map.
- The force calculator uses `F = ΔP × A` and is an idealised estimate, not a prediction of capsule speed.
- Historical statistics are presented as approximate where appropriate. Verify them against the linked specialist sources before formal academic submission.
- Google Fonts are loaded online. A system-font fallback is provided.
