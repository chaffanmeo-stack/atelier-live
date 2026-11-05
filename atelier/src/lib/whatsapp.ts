const SITE = process.env.NEXT_PUBLIC_SITE_URL!;
const NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
export function productUrl(slug: string) { return `${SITE}/product/${slug}`; }
export function buildWhatsAppUrl(product: { title: string; slug: string; availability?: string }) {
  const url = productUrl(product.slug);
  const message = product.availability === "sold-out" 
    ? `Hello! I love your luxury unstitched suit: ${product.title}, but it shows as sold out. Could you let me know if it will be restocked? Here is the reference: ${url}` 
    : `Hello! I am mesmerized by your luxury unstitched suit: ${product.title}. Could you please share more details or assist me in placing an order? Here is the reference: ${url}`;
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;
}