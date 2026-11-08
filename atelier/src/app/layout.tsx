import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--font-cormorant", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Atelier | Luxury Unstitched Fabrics", template: "%s | Atelier" },
  description: "Heirloom-quality unstitched suits, woven for those who appreciate craft.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-ivory font-sans text-charcoal antialiased">{children}</body>
    </html>
  );
}
