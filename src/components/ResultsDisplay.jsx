
"use client";

import { useState } from "react";

function Section({ title, content, copyText }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(copyText || content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-surface rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-semibold text-foreground">{title}</h3>
                <button
                    onClick={handleCopy}
                    className="text-xs font-medium px-3 py-1.5 rounded-md bg-white border border-gray-200 hover:bg-gray-50 text-secondary transition-colors"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <div className="p-6">
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default function ResultsDisplay({ data }) {
    if (!data) return null;

    const { generated } = data;

    const fullDevpost = `
## Problem Statement
${generated.problem_statement}

## Solution Overview
${generated.solution_overview}

## How It Works
${generated.how_it_works}

## Why It Matters
${generated.why_it_matters}
  `.trim();

    return (
        <div className="w-full max-w-3xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="flex justify-end gap-3 mb-8">
                <SectionButton
                    text="Copy All for Devpost"
                    content={fullDevpost}
                />
                <SectionButton
                    text="Copy Demo Script"
                    content={generated.demo_script}
                    primary
                />
            </div>

            <Section
                title="Problem Statement"
                content={generated.problem_statement}
            />

            <Section
                title="Solution Overview"
                content={generated.solution_overview}
            />

            <Section
                title="How It Works"
                content={generated.how_it_works}
            />

            <Section
                title="Why It Matters (Impact)"
                content={generated.why_it_matters}
            />

            <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-6 text-center">🗣️ Demo Script (2 Minutes)</h2>
                <div className="bg-white p-8 rounded-xl border-2 border-dashed border-gray-200 shadow-subtle">
                    <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 font-medium">
                        {generated.demo_script}
                    </p>
                </div>
            </div>

        </div>
    );
}

function SectionButton({ text, content, primary }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${primary
                    ? "bg-foreground text-white hover:bg-black/90 shadow-md"
                    : "bg-white border border-gray-200 text-secondary hover:bg-gray-50 shadow-sm"
                }`}
        >
            {copied ? "Copied!" : text}
        </button>
    );
}
