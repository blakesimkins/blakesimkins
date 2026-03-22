import Link from "next/link";
import SearchSelect from "@/components/experiments/SearchSelect";

export const metadata = {
  title: "Blake Simkins - Playground",
};

const placeholders = [
  { label: "02", title: "Coming Soon", description: "" },
  { label: "03", title: "Coming Soon", description: "" },
  { label: "04", title: "Coming Soon", description: "" },
  { label: "05", title: "Coming Soon", description: "" },
  { label: "06", title: "Coming Soon", description: "" },
];

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

          {/* Search & Select */}
          <div className="space-y-3">
            <div className="bg-zinc-100 rounded-2xl shadow-xs p-8 h-[480px] overflow-visible">
              <SearchSelect />
            </div>
            <div>
              <p className="text-sm font-medium text-black">Search & Select</p>
              <p className="text-sm text-black/50">A search-and-select people picker with avatar support, live filtering, and keyboard navigation.</p>
            </div>
          </div>

          {/* Coming soon placeholders */}
          {placeholders.map(({ label, title, description }) => (
            <div key={label} className="space-y-3">
              <div className="bg-zinc-100 rounded-2xl shadow-xs h-[480px] flex items-center justify-center">
                <span className="text-sm font-medium text-black/20">{label}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black/30">{title}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
