import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blake Simkins - Product Design Leader & Design Architect | 15+ Years Experience",
  description:
    "Blake Simkins is a product design leader with over 15 years of experience building and scaling design teams, shipping impactful products, and helping founders bring their vision to life. Currently at Podium as design architect.",
  keywords:
    "Blake Simkins, product design leader, design architect, UX design, design team building, Podium, NexHealth, Peerspace, design consulting, design coaching",
  authors: [{ name: "Blake Simkins" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://blakesimkins.com/",
    title: "Blake Simkins - Product Design Leader & Design Architect",
    description:
      "Product design leader with over 15 years of experience building and scaling design teams, shipping impactful products, and helping founders bring their vision to life.",
    images: [{ url: "https://blakesimkins.com/imgs/blake-simkins.png" }],
    siteName: "Blake Simkins",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://blakesimkins.com/",
    title: "Blake Simkins - Product Design Leader & Design Architect",
    description:
      "Product design leader with over 15 years of experience building and scaling design teams, shipping impactful products, and helping founders bring their vision to life.",
    images: ["https://blakesimkins.com/imgs/blake-simkins.png"],
    creator: "@blakesimkins",
  },
  icons: {
    icon: "/imgs/blake-simkins.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} bg-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
