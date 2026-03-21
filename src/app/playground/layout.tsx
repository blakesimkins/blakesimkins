"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const experiments = [
  { href: "/playground/snowflake-creator", label: "Snowflake Creator", active: true },
  { href: "/playground/search-select", label: "Search & Select", active: true },
  { href: null, label: "Experiment 03", active: false },
  { href: null, label: "Experiment 04", active: false },
  { href: null, label: "Experiment 05", active: false },
  { href: null, label: "Experiment 06", active: false },
];

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-gray-200 p-8 space-y-8 animate-fade-in-down delay-0 shrink-0">
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-block text-base text-black hover:underline transition-colors"
            aria-label="Return to Blake Simkins home page"
          >
            ← Back to Home
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-black mb-2">Playground</h1>
            <p className="text-sm text-black/60">Experimental UI & Interactions</p>
          </div>
        </div>

        <nav className="space-y-1" aria-label="Experiment navigation">
          {experiments.map((exp) =>
            exp.href ? (
              <Link
                key={exp.href}
                href={exp.href}
                className={`experiment-nav w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors block ${
                  pathname === exp.href ? "active" : ""
                }`}
                aria-label={`View ${exp.label}`}
              >
                {exp.label}
              </Link>
            ) : (
              <span
                key={exp.label}
                className="experiment-nav w-full text-left px-4 py-3 rounded-lg text-base font-medium block opacity-40 cursor-not-allowed"
                aria-disabled="true"
              >
                {exp.label}
              </span>
            )
          )}
        </nav>
      </aside>

      <main className="flex-1 p-8 md:p-16">{children}</main>
    </div>
  );
}
