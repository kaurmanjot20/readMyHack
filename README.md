# ReadMyHack

![License: Non-Commercial](https://img.shields.io/badge/license-Non--Commercial-blue)

**Turn your GitHub repo into a judge-ready hackathon submission - in seconds.**

Paste a GitHub repository URL and it automatically generates a polished Devpost-style submission: a problem statement, solution overview, architecture breakdown, impact statement, and a 2-minute demo script — all powered by Google Gemini AI.

## What it does

1. Fetches your repository's README, file structure, and `package.json` via the GitHub API.
2. Sends the context to Gemini and generates five structured sections:
   - **Problem Statement** — the real-world problem your project addresses
   - **Solution Overview** — what your code actually does
   - **How It Works** — tech stack and architecture explanation
   - **Why It Matters** — impact and who benefits
   - **Demo Script** — a ready-to-deliver 2-minute spoken pitch
3. Displays everything in a clean, copy-ready UI.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
# Optional: override the default model
GEMINI_MODEL=gemini-2.0-flash-exp
```

## Tech Stack

- [Next.js](https://nextjs.org) — React framework with API routes
- [Google Gemini AI](https://ai.google.dev) — content generation
- GitHub REST API — repository data fetching
- Tailwind CSS — styling

