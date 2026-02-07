"use client";

import { useState } from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
}

/**
 * Expandable "Need help?" panel for wizard steps.
 * Renders guide content (markdown can be added via react-markdown later).
 */
export function InlineTutorial({ title = "Need help?", children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 rounded-lg border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-code-bg flex items-center justify-between"
      >
        <span>{title}</span>
        <span className="text-muted">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-code-bg/50 text-sm text-muted border-t border-border prose prose-sm max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}
