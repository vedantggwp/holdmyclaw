"use client";

import { useEffect, useState } from "react";

const LINES = [
  "$ holdmyclaw deploy",
  "",
  "  HoldMyClaw v1.0.0",
  "",
  "  ✓ Connected to Hetzner                    0.8s",
  "  ✓ Server created (Falkenstein, Germany)    1.2s",
  "  ✓ Security hardened (firewall + SSH)       0.4s",
  "  ✓ Docker installed                         0.6s",
  "  ✓ OpenClaw configured                      0.3s",
  "  ● Starting OpenClaw...                     ",
  "  ✓ OpenClaw is live!                        0.5s",
  "",
  "  Dashboard:  http://203.0.113.42:18789",
  "  Agent:      Ready — say hello on Telegram!",
  "",
  "  Total time: 3 minutes 48 seconds",
];

const CHAR_DELAY_MS = 35;
const LINE_DELAY_MS = 900;
const LOOPS_BEFORE_RESTART = 2;

export function TerminalDemo({ className }: { className?: string }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const line = LINES[lineIndex];
    const isComplete = charIndex >= (line?.length ?? 0);
    if (isComplete) {
      const t = setTimeout(() => {
        if (lineIndex >= LINES.length - 1) {
          setLoopCount((c) => c + 1);
          if (loopCount + 1 >= LOOPS_BEFORE_RESTART) {
            setLineIndex(0);
            setCharIndex(0);
            setLoopCount(0);
          } else {
            setLineIndex(0);
            setCharIndex(0);
          }
        } else {
          setLineIndex((i) => i + 1);
          setCharIndex(0);
        }
      }, LINE_DELAY_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCharIndex((c) => c + 1), CHAR_DELAY_MS);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex, reducedMotion, loopCount]);

  if (reducedMotion) {
    return (
      <div
        className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg)] p-4 font-mono text-sm text-left ${className ?? ""}`}
      >
        {LINES.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("  ✓")
                ? "text-[var(--color-accent-emerald)]"
                : line.startsWith("  ●")
                  ? "text-[var(--color-accent-indigo)]"
                  : "text-foreground"
            }
          >
            {line || " "}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-code-bg)] p-4 font-mono text-sm text-left ${className ?? ""}`}
    >
      {LINES.slice(0, lineIndex + 1).map((line, i) => {
        const isCurrent = i === lineIndex;
        const currentLine = LINES[lineIndex];
        const displayed = isCurrent && currentLine ? currentLine.slice(0, charIndex) : line;
        const isCompletedCheck = i < lineIndex && line.startsWith("  ✓");
        const isCurrentLine = i === lineIndex;
        const colorClass = isCompletedCheck
          ? "text-[var(--color-accent-emerald)]"
          : isCurrentLine
            ? "text-[var(--color-accent-indigo)]"
            : "text-foreground";
        return (
          <div key={i} className={colorClass}>
            {displayed}
            {isCurrentLine && (
              <span
                className="inline-block w-2 h-4 ml-0.5 bg-[var(--color-accent-indigo)] animate-pulse align-middle"
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
