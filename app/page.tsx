import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import CustomerInteraction from '@/components/sections/CustomerInteraction';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProducts />
      <WhyChooseUs />
      <CustomerInteraction />
    </>
  );
}
