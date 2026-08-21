'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { products, Product } from '@/lib/products';
import AnimatedHeading from '@/components/ui/AnimatedHeading';
import AccordionGallery from '@/components/ui/AccordionGallery';
import { fadeUpReveal } from '@/lib/animations';

const CATEGORIES = ['All', 'Ceramics', 'Textiles', 'Lighting', 'Living', 'Garden'];

export default function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile to switch accordion orientation
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    const trigger = fadeUpReveal(headerRef.current, sectionRef.current);
    return () => { trigger?.kill(); };
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.tag === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Map filtered products to AccordionGallery format with price included
  const galleryItems = (filteredProducts.length > 0 ? filteredProducts : products).map((product) => ({
    image: product.image,
    label: `${product.name.toUpperCase()}  |  ${product.price}`,
    link: '#',
    alt: product.name,
  }));

  return (
    <section
      id='products'
      ref={sectionRef}
      className='w-full py-24 overflow-hidden bg-[var(--color-surface)]'
    >
      {/* Section header */}
      <div ref={headerRef} className='px-8 md:px-16 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6'>
        <div>
          <span className="type-label text-accent mb-3 block" style={{ fontSize: '0.625rem', letterSpacing: '0.2em' }}>
            LATEST CURATION
          </span>
          <AnimatedHeading
            text='FEATURED PIECES'
            className='type-heading text-cream'
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '0.95' }}
            tag='h2'
          />
        </div>

        {/* Search Input Box */}
        <div className="w-full md:w-auto min-w-[240px]">
          <input
            type="text"
            placeholder="SEARCH PRODUCTS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-dashed border-[var(--color-border)] py-2 text-cream placeholder-[var(--color-cream)]/30 focus:outline-none focus:border-[var(--color-accent)] transition-colors type-label text-xs tracking-widest"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-8 md:px-16 mb-10 flex flex-wrap gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`relative z-20 px-4 py-2 rounded-full text-xs type-label tracking-widest transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-[var(--color-accent)] text-[var(--color-cream)] shadow-lg'
                : 'border border-dashed border-[var(--color-border)] text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] hover:border-[var(--color-cream)]'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Accordion Gallery */}
      <div className='px-8 md:px-16 w-full mb-16' style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <AccordionGallery
          items={galleryItems}
          defaultIndex={1}
          expandRatio={0.52}
          trigger="hover"
          accentColor="var(--color-accent)"
          overlayColor="var(--color-surface)"
          textColor="var(--color-cream)"
          grayscale={true}
          showLabels={true}
          duration={0.6}
          ease="power3.out"
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          height={480}
          gap={16}
          radius={12}
          orientation={isMobile ? 'vertical' : 'horizontal'}
        />
      </div>

      {/* Product Cards Grid with Prices & Quick View */}
      <div className="px-8 md:px-16 max-w-[1400px] mx-auto">
        <h3 className="type-label text-cream/40 text-xs tracking-[0.2em] mb-6">
          ALL CATALOGUE ITEMS ({filteredProducts.length})
        </h3>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[var(--color-border)] rounded-xl">
            <p className="text-cream/50 text-sm">No products found matching your search or filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-4 text-accent text-xs type-label tracking-widest hover:underline"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-[var(--color-canvas)] border border-dashed border-[var(--color-border)] rounded-xl overflow-hidden p-4 flex flex-col justify-between hover:border-[var(--color-accent)] transition-all duration-300"
              >
                <div>
                  <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4 bg-black/20">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 right-3 bg-[var(--color-surface)] text-[var(--color-cream)] text-[10px] type-label px-3 py-1 rounded-full border border-dashed border-[var(--color-border)]">
                      {product.tag}
                    </span>
                  </div>
                  <h4 className="type-heading text-cream text-lg mb-1">{product.name}</h4>
                  <p className="text-cream/60 text-xs line-clamp-2 mb-3">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-dashed border-[var(--color-border)]">
                  <span className="type-heading text-accent text-lg">{product.price}</span>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-xs type-label text-cream hover:text-accent tracking-widest flex items-center gap-1 transition-colors"
                  >
                    QUICK VIEW →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--color-canvas)] border border-dashed border-[var(--color-border)] rounded-2xl max-w-xl w-full p-6 relative flex flex-col md:flex-row gap-6">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-cream/60 hover:text-cream text-xl"
            >
              ✕
            </button>
            <div className="relative w-full md:w-1/2 h-64 rounded-xl overflow-hidden">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-accent text-[10px] type-label tracking-widest">{selectedProduct.tag}</span>
                <h3 className="type-heading text-cream text-2xl mt-1 mb-2">{selectedProduct.name}</h3>
                <p className="text-cream/70 text-xs leading-relaxed mb-4">{selectedProduct.description}</p>
                <p className="type-heading text-accent text-2xl">{selectedProduct.price}</p>
              </div>

              <a
                href="#contact"
                onClick={() => setSelectedProduct(null)}
                className="mt-6 w-full py-3 bg-[var(--color-accent)] text-cream text-center text-xs type-label tracking-widest rounded-full hover:opacity-90 transition-opacity"
              >
                INQUIRE ABOUT THIS ITEM →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
