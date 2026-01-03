const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates hackathon submission content using Gemini.
 */
export async function generateProjectDetails(repoData) {
    const prompt = `
  You are an expert hackathon judge assisting a participant.
  Your goal is to convert a GitHub repository into a winning Devpost submission and demo script.
  
  CONTEXT:
  - Event: "Hacks for Hackers" by MLH.
  - Audience: Non-specialist judges, looking for clarity and impact.
  - Vibe: Professional, calm, credible. No buzzwords.
  
  REPOSITORY INPUT:
  Repo Name: ${repoData.repo}
  Owner: ${repoData.owner}
  Files:
  ${repoData.structure ? repoData.structure.substring(0, 1000) : "Not available"}
  
  Package.json:
  ${repoData.packageJson ? JSON.stringify(repoData.packageJson).substring(0, 500) : "Not available"}
  
  README Content (Truncated):
  ${repoData.readme ? repoData.readme.substring(0, 15000) : "No README found"}
  
  TASK:
  Generate the following 5 distinct sections in valid JSON format only.
  
  1. problem_statement (string, max 120 words): Clear link to a real-world problem.
  2. solution_overview (string, max 150 words): What does this code actually do?
  3. how_it_works (string): Simple architecture explanation. Tech stack used.
  4. why_it_matters (string): Impact statement. Who cares?
  5. demo_script (string): A 2-minute spoken script (approx 300 words). Conversational but professional. "Hi, I'm [Name] and this is [Project]..."
  
  OUTPUT FORMAT:
  JSON object with keys: problem_statement, solution_overview, how_it_works, why_it_matters, demo_script.
  Do not include markdown formatting like \`\`\`json. Just the raw JSON string.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up if markdown code blocks are returned
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini generation error:", error);
        throw new Error("Failed to generate content.");
    }
}

export { model };
