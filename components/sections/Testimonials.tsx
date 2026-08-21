'use client';

const TESTIMONIALS = [
  {
    quote: "The ceramic vase set completely transformed our living room. You can feel the weight and craft in every piece.",
    author: "Ananya Roy",
    city: "Mumbai",
    rating: "★★★★★",
  },
  {
    quote: "Ordered custom artisan hampers for corporate gifting. The team curated something truly memorable instead of generic boxes.",
    author: "Karan Malhotra",
    city: "Bengaluru",
    rating: "★★★★★",
  },
  {
    quote: "Beautiful handwoven throws. It's rare to find store items with such authentic heritage and direct artisan support.",
    author: "Priya Sharma",
    city: "New Delhi",
    rating: "★★★★★",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-20 px-8 md:px-16 border-t border-dashed border-[var(--color-border)]">
      <div className="mb-12">
        <span className="type-label text-accent mb-2 block" style={{ fontSize: '0.625rem', letterSpacing: '0.2em' }}>
          PATRON REVIEWS
        </span>
        <h2 className="type-heading text-cream" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
          LOVED BY HOMES ACROSS INDIA
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-[var(--color-surface)] border border-dashed border-[var(--color-border)] flex flex-col justify-between"
          >
            <div>
              <p className="text-accent text-sm mb-4 tracking-widest">{item.rating}</p>
              <p className="text-cream/80 text-sm leading-relaxed mb-6 font-normal italic">
                "{item.quote}"
              </p>
            </div>
            <div className="pt-4 border-t border-dashed border-[var(--color-border)] flex items-center justify-between">
              <span className="type-label text-cream text-xs">{item.author}</span>
              <span className="type-label text-cream/40 text-[10px] tracking-widest">{item.city}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
