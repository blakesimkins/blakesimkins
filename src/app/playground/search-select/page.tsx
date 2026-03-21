import SearchSelect from "@/components/experiments/SearchSelect";

export const metadata = {
  title: "Search & Select - Blake Simkins Playground",
};

export default function SearchSelectPage() {
  return (
    <article className="animate-fade-in-up delay-150">
      <div className="max-w-4xl space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            Search & Select
          </h2>
          <p className="text-lg md:text-xl text-black/90 leading-relaxed">
            A search-and-select people picker with avatar support, live
            filtering, and keyboard navigation.
          </p>
        </div>

        <SearchSelect />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-black">
            About this experiment
          </h3>
          <p className="text-base text-black/80 leading-relaxed">
            A polished search-and-select component following shadcn/ui design
            conventions. Features live search filtering, avatar initials,
            keyboard-friendly interactions, and smooth add/remove animations.
          </p>
          <div className="inline-block px-4 py-2 text-sm font-medium text-black/90 bg-green-100 rounded-full">
            Interactive
          </div>
        </div>
      </div>
    </article>
  );
}
