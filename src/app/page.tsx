import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight tracking-tight animate-fade-in-down delay-0">
          I&apos;m Blake, a designer with over 15 years of building and scaling
          design teams, shipping impactful products, and helping founders bring
          their vision to life.
        </h1>

        <div className="space-y-4 text-lg md:text-xl text-black/90 leading-relaxed animate-fade-in-down delay-150">
          <p>
            I&apos;m currently back at Podium as a design architect. I
            previously built and led design at NexHealth, Peerspace, and Podium.
          </p>
          <p>
            If you&apos;re in need of an experienced design partner, I&apos;m
            available for select consulting, coaching, and advisory work.
          </p>
        </div>

        <div className="flex items-center gap-6 pt-4 animate-fade-in-down delay-300">
          <a
            href="mailto:blakesimkins@gmail.com"
            className="text-lg text-black hover:underline transition-colors"
            aria-label="Send email to Blake Simkins"
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/blakesimkins/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-black hover:underline transition-colors"
            aria-label="Connect with Blake Simkins on LinkedIn"
          >
            Connect on Linkedin
          </a>
          <Link
            href="/playground"
            className="text-lg text-black hover:underline transition-colors"
            aria-label="View Blake's design playground"
          >
            Playground
          </Link>
        </div>
      </div>
    </main>
  );
}
