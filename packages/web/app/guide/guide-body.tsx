import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const prose = {
  h1: "text-3xl font-bold text-foreground mt-10 mb-4 first:mt-0",
  h2: "text-xl font-bold text-foreground mt-10 mb-3 scroll-mt-8",
  h3: "text-lg font-semibold text-foreground mt-6 mb-2 scroll-mt-8",
  p: "text-foreground text-[17px] leading-relaxed mb-4",
  ul: "list-disc list-inside text-foreground text-[17px] leading-relaxed mb-4 space-y-1",
  ol: "list-decimal list-inside text-foreground text-[17px] leading-relaxed mb-4 space-y-1",
  li: "mb-0.5",
  blockquote:
    "border-l-4 border-[var(--color-border)] pl-4 py-1 my-4 text-muted italic",
  code: "font-mono text-sm bg-[var(--color-code-bg)] px-1.5 py-0.5 rounded text-foreground",
  pre: "font-mono text-sm bg-[var(--color-code-bg)] border border-[var(--color-border)] rounded-lg p-4 overflow-x-auto mb-4",
  table:
    "w-full border-collapse border border-[var(--color-border)] rounded-lg overflow-hidden mb-4 text-[17px]",
  th: "bg-[var(--color-code-bg)] font-medium text-left p-3 border-b border-[var(--color-border)]",
  td: "p-3 border-b border-[var(--color-border)] last:border-b-0",
  tr: "last:td:border-b-0",
  a: "text-[var(--color-accent-indigo)] hover:underline",
  strong: "font-semibold text-foreground",
  hr: "border-0 border-t border-[var(--color-border)] my-8",
};

export function GuideBody({ markdown }: { markdown: string }) {
  return (
    <div className="guide-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className={prose.h1} {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className={prose.h2} {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className={prose.h3} {...props} />
          ),
          p: ({ node, ...props }) => <p className={prose.p} {...props} />,
          ul: ({ node, ...props }) => <ul className={prose.ul} {...props} />,
          ol: ({ node, ...props }) => <ol className={prose.ol} {...props} />,
          li: ({ node, ...props }) => <li className={prose.li} {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className={prose.blockquote} {...props} />
          ),
          code: ({ node, className, ...props }) => {
            if (!className) {
              return <code className={prose.code} {...props} />;
            }
            return <code className="block text-sm" {...props} />;
          },
          pre: ({ node, ...props }) => (
            <pre className={prose.pre} {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <table className={prose.table} {...props} />
            </div>
          ),
          th: ({ node, ...props }) => <th className={prose.th} {...props} />,
          td: ({ node, ...props }) => <td className={prose.td} {...props} />,
          a: ({ node, ...props }) => (
            <a className={prose.a} target="_blank" rel="noopener noreferrer" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className={prose.strong} {...props} />
          ),
          hr: ({ node, ...props }) => <hr className={prose.hr} {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
      <p className="mt-12 pt-6 border-t border-[var(--color-border)] text-muted text-sm">
        This guide was created by{" "}
        <a
          href="https://holdmyclaw.com"
          className="text-[var(--color-accent-indigo)] hover:underline"
        >
          HoldMyClaw
        </a>
        . Your agent, your server, your data. Always.
      </p>
    </div>
  );
}
