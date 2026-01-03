
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import RepoInput from "@/components/RepoInput";
import ResultsDisplay from "@/components/ResultsDisplay";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (repoUrl) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze repository");
      }

      setData(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pb-24 relative overflow-hidden bg-background">
      {/* Subtle background decoration if desired, keeping it minimal for now */}

      <div className="container mx-auto px-4 max-w-4xl pt-8 sm:pt-12">
        <Header />

        <div className="mt-8 mb-12">
          <RepoInput onAnalyze={handleAnalyze} isLoading={loading} />
        </div>

        {error && (
          <div className="max-w-xl mx-auto p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-center animate-in fade-in slide-in-from-top-2">
            ⚠️ {error}
          </div>
        )}

        <ResultsDisplay data={data} />
      </div>
    </main>
  );
}
