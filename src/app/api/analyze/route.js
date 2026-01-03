
import { NextResponse } from "next/server";
import { fetchRepoData } from "@/lib/github";
import { generateProjectDetails } from "@/lib/gemini";

export async function POST(request) {
    try {
        const { repoUrl } = await request.json();

        if (!repoUrl) {
            return NextResponse.json({ error: "Repository URL is required" }, { status: 400 });
        }

        console.log("Analyzing repo:", repoUrl);

        // 1. Fetch GitHub Data
        const repoData = await fetchRepoData(repoUrl);

        // 2. Generate Content with Gemini
        const generatedContent = await generateProjectDetails(repoData);

        // 3. Return Combined Result
        return NextResponse.json({
            success: true,
            originalData: {
                owner: repoData.owner,
                repo: repoData.repo,
                // Don't send full readme back to client to save bandwidth
            },
            generated: generatedContent
        });

    } catch (error) {
        console.error("Analysis API Error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong during analysis." },
            { status: 500 }
        );
    }
}
