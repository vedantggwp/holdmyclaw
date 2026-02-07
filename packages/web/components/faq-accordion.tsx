"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-[var(--color-border)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="border-b border-[var(--color-border)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full py-5 pr-8 text-left flex items-start justify-between gap-4 min-h-[44px]"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <span
                className={
                  isOpen
                    ? "text-[var(--color-accent-indigo)] font-medium"
                    : "text-foreground font-medium"
                }
              >
                {item.question}
              </span>
              <span
                className="shrink-0 text-muted text-xl leading-none"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="pb-5 pr-8 text-muted text-[17px] leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
