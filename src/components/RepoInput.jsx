
"use client";

import { useState } from "react";

export default function RepoInput({ onAnalyze, isLoading }) {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) return;

        if (!url.includes("github.com/")) {
            setError("Please enter a valid GitHub repository URL");
            return;
        }

        setError("");
        onAnalyze(url);
    };

    return (
        <div className="w-full max-w-xl mx-auto px-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="https://github.com/username/repo"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-surface shadow-subtle text-foreground placeholder:text-gray-400"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm animate-pulse">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !url}
                    className="w-full bg-foreground text-white font-medium py-3 rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-card"
                >
                    {isLoading ? "Analyzing Repository..." : "Generate Submission"}
                </button>
            </form>

            <p className="text-center text-xs text-secondary mt-4">
                Analysis takes about 10-15 seconds.
            </p>
        </div>
    );
}
