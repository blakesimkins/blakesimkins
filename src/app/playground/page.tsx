import Link from "next/link";
import SearchSelect from "@/components/experiments/SearchSelect";
import SearchSelectTags from "@/components/experiments/SearchSelectTags";
import SearchSelectSingle from "@/components/experiments/SearchSelectSingle";

export const metadata = {
  title: "Blake Simkins - Playground",
};

const placeholders = ["04", "05", "06"];

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen px-8 py-16 bg-white">
      <div className="max-w-6xl mx-auto space-y-12">

        <div className="space-y-2">
          <Link href="/" className="text-sm text-black/50 hover:text-black transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-black">Playground</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1 — Search & Select (list) */}
          <div className="space-y-3">
            <div className="bg-zinc-100 rounded-2xl shadow-xs p-8 h-[480px] overflow-visible">
              <SearchSelect />
            </div>
            <div>
              <p className="text-sm font-medium text-black">Search & Select</p>
              <p className="text-sm text-black/50">A people picker with avatar support, live filtering, and keyboard navigation.</p>
            </div>
          </div>

          {/* Card 2 — Search & Select (tags) */}
          <div className="space-y-3">
            <div className="bg-zinc-100 rounded-2xl shadow-xs p-8 h-[480px] overflow-visible">
              <SearchSelectTags />
            </div>
            <div>
              <p className="text-sm font-medium text-black">Search & Select — Tags</p>
              <p className="text-sm text-black/50">Selected technicians appear as tags inside the input field.</p>
            </div>
          </div>

          {/* Card 3 — Search & Select (single) */}
          <div className="space-y-3">
            <div className="bg-zinc-100 rounded-2xl shadow-xs p-8 h-[480px] overflow-visible">
              <SearchSelectSingle />
            </div>
            <div>
              <p className="text-sm font-medium text-black">Search & Select — Single</p>
              <p className="text-sm text-black/50">Single selection with live search. Selected state replaces the input.</p>
            </div>
          </div>

          {/* Coming soon placeholders */}
          {placeholders.map((label) => (
            <div key={label} className="space-y-3">
              <div className="bg-zinc-100 rounded-2xl shadow-xs h-[480px] flex items-center justify-center">
                <span className="text-sm font-medium text-black/20">{label}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black/30">Coming Soon</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
