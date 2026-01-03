
import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN // Optional, but recommended for rate limits
});

/**
 * Fetches repository data from GitHub API.
 */
export async function fetchRepoData(repoUrl) {
    // 1. Parse URL
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = repoUrl.match(regex);
    if (!match) throw new Error("Invalid GitHub URL");

    // Remove .git and trailing slashes
    let [_, owner, repo] = match;
    repo = repo.replace(".git", "").replace(/\/$/, "");

    try {
        const [readme, structure, packageJson] = await Promise.all([
            fetchReadme(owner, repo),
            fetchStructure(owner, repo),
            fetchPackageJson(owner, repo)
        ]);

        return {
            owner,
            repo,
            url: repoUrl,
            readme,
            structure,
            packageJson
        };
    } catch (error) {
        console.error("Error fetching repo data:", error);
        throw new Error("Failed to fetch repository data. Please check the URL.");
    }
}

async function fetchReadme(owner, repo) {
    try {
        const { data } = await octokit.request('GET /repos/{owner}/{repo}/readme', {
            owner,
            repo,
            headers: { 'Accept': 'application/vnd.github.raw' }
        });
        return data; // Raw string
    } catch (e) {
        return ""; // No README found
    }
}

async function fetchPackageJson(owner, repo) {
    try {
        const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/package.json', {
            owner,
            repo,
            headers: { 'Accept': 'application/vnd.github.raw' }
        });
        return data;
    } catch (e) {
        return null;
    }
}

async function fetchStructure(owner, repo) {
    try {
        // Get the default branch first? Or just try 'main'/'master'?
        // Better to get repo info to find default branch, but for hackathon speed:
        // recursive=1 to get depth. We only want top level or depth 2.

        // 1. Get repo details for default branch
        const { data: repoData } = await octokit.request('GET /repos/{owner}/{repo}', { owner, repo });
        const defaultBranch = repoData.default_branch;

        // 2. Get tree
        const { data: treeData } = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1', {
            owner,
            repo,
            tree_sha: defaultBranch
        });

        // Filter valid tree
        // Limit to reasonable depth (e.g. 2 levels) and exclude node_modules etc.
        const relevantPaths = treeData.tree
            .filter(item => {
                const parts = item.path.split('/');
                if (parts.length > 3) return false; // Max depth 3
                if (item.path.startsWith('.')) return false; // Ignore dotfiles
                if (item.path.includes('node_modules') || item.path.includes('dist') || item.path.includes('build')) return false;
                return true;
            })
            .map(item => item.path)
            .join('\n');

        return relevantPaths;

    } catch (e) {
        console.error("Structure fetch error:", e);
        return "Could not fetch structure.";
    }
}

