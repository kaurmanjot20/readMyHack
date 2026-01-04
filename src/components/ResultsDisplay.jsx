
"use client";

import { useState } from "react";

import Markdown from "react-markdown";

function Section({ title, content, copyText }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(copyText || content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-surface rounded-xl border border-gray-800 border-l-4 border-l-accent shadow-sm overflow-hidden transition-all hover:shadow-md h-full flex flex-col hover:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-white/5">
                <h3 className="font-semibold text-foreground tracking-wide">{title}</h3>
                <button
                    onClick={handleCopy}
                    className="text-xs font-medium px-3 py-1.5 rounded-md bg-transparent border border-gray-700 hover:border-accent hover:text-accent text-secondary transition-all"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <div className="p-6 flex-grow prose prose-sm prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                <Markdown>
                    {content}
                </Markdown>
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
        <div className="w-full mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
                <h2 className="text-xl font-bold mb-6 text-center text-accent">🗣️ Demo Script (2 Minutes)</h2>
                <div className="bg-surface p-8 rounded-xl border-2 border-dashed border-gray-800 shadow-subtle hover:border-accent/50 transition-colors prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed font-medium">
                    <Markdown>
                        {generated.demo_script}
                    </Markdown>
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
            className={`px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${primary
                ? "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-accent/20"
                : "bg-surface border border-gray-700 text-gray-300 hover:border-accent hover:text-accent shadow-sm"
                }`}
        >
            {copied ? "Copied!" : text}
        </button>
    );
}
