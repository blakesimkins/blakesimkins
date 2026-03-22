import Link from "next/link";
import SearchSelect from "@/components/experiments/SearchSelect";

export const metadata = {
  title: "Blake Simkins - Playground",
};

const placeholders = ["02", "03", "04", "05", "06"];

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen px-8 py-16 bg-zinc-100">
      <div className="max-w-6xl mx-auto space-y-12">

        <div className="flex items-baseline gap-8">
          <Link href="/" className="text-sm text-black/50 hover:text-black transition-colors">
            ← Back
          </Link>
          <h1 className="text-2xl font-bold text-black">Playground</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Search & Select */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-[480px] overflow-visible">
            <SearchSelect />
          </div>

          {/* Coming soon placeholders */}
          {placeholders.map((label) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-lg h-[480px] flex items-center justify-center"
            >
              <span className="text-sm font-medium text-black/20">{label}</span>
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}
