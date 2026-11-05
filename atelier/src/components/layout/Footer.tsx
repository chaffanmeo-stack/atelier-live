"use client";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-charcoal px-6 py-20 text-ivory sm:px-12">
      <div className="mx-auto flex max-w-[1800px] flex-col justify-between gap-12 lg:flex-row">
        <div className="max-w-sm"><Link href="/" className="font-serif text-3xl tracking-wide text-gold-light">Atelier</Link><p className="mt-6 text-sm text-ivory/60">Heirloom-quality unstitched suits, handpicked for those who appreciate the finest craft.</p></div>
        <div className="flex gap-16 text-xs uppercase tracking-luxe">
          <div className="flex flex-col gap-4"><span className="text-gold-deep">Shop</span><Link href="/collection" className="text-ivory/70 hover:text-gold-light">Collection</Link></div>
          <div className="flex flex-col gap-4"><span className="text-gold-deep">Client Care</span><a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} className="text-ivory/70 hover:text-gold-light">WhatsApp Us</a></div>
        </div>
      </div>
    </footer>
  );
}