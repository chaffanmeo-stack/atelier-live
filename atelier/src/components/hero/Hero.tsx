"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#3a3226_0%,#1C1C1E_65%)]" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-8 text-xs uppercase tracking-luxe text-gold-light">Luxury Unstitched Collection</p>
        <h1 className="font-serif text-5xl font-light leading-[1.05] text-ivory sm:text-7xl lg:text-8xl">
          <span className="block">Woven for those</span>
          <span className="block italic text-gold-light">who remember.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-ivory/70 sm:text-base">
          Heirloom fabrics, chosen by hand. Yours to shape into something entirely your own.
        </p>
        <div className="mt-12">
          <Link href="/collection" className="group relative inline-flex items-center gap-3 border border-gold px-10 py-4 text-xs uppercase tracking-luxe text-ivory transition-colors duration-500 hover:bg-gold hover:text-charcoal">
            Explore the Collection
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
