import SnowflakeCreator from "@/components/experiments/SnowflakeCreator";

export const metadata = {
  title: "Snowflake Creator - Blake Simkins Playground",
};

export default function SnowflakeCreatorPage() {
  return (
    <article className="animate-fade-in-up delay-150">
      <div className="max-w-4xl space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            Snowflake Creator
          </h2>
          <p className="text-lg md:text-xl text-black/90 leading-relaxed">
            An interactive generative art tool. Control symmetry, complexity,
            and colors to create unique snowflakes.
          </p>
        </div>

        <SnowflakeCreator />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-black">
            About this experiment
          </h3>
          <p className="text-base text-black/80 leading-relaxed">
            This interactive snowflake generator uses radial symmetry and
            recursive branching algorithms to create unique, customizable
            snowflakes. Adjust the controls to explore different patterns, from
            simple geometric shapes to complex fractal-like structures. The
            canvas-based rendering ensures smooth real-time updates as you
            experiment with various parameters.
          </p>
          <div className="inline-block px-4 py-2 text-sm font-medium text-black/90 bg-green-100 rounded-full">
            Interactive
          </div>
        </div>
      </div>
    </article>
  );
}
