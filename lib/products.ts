export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tag: string;
}

export const products: Product[] = [
  {
    id: 'ceramic-vase-set',
    name: 'Ceramic Vase Set',
    description: 'Hand-thrown stoneware in three complementary heights.',
    price: '₹2,400',
    image: '/images/product-ceramic-vase.jpg',
    tag: 'Ceramics',
  },
  {
    id: 'handwoven-throw',
    name: 'Handwoven Throw Blanket',
    description: 'Undyed wool, natural cream, from Kutch artisans.',
    price: '₹3,800',
    image: '/images/product-throw-blanket.jpg',
    tag: 'Textiles',
  },
  {
    id: 'linen-cushion',
    name: 'Linen Cushion Cover',
    description: 'Stone-washed European linen, invisible zip closure.',
    price: '₹950',
    image: '/images/product-linen-cushion.jpg',
    tag: 'Textiles',
  },
  {
    id: 'brass-candle-holder',
    name: 'Brass Candle Holder',
    description: 'Cast brass, raw finish. Holds taper and pillar candles.',
    price: '₹1,750',
    image: '/images/product-brass-candle.jpg',
    tag: 'Lighting',
  },
  {
    id: 'rattan-tray',
    name: 'Rattan Serving Tray',
    description: 'Woven rattan frame, reclaimed teak base. Multipurpose.',
    price: '₹2,100',
    image: '/images/product-rattan-tray.jpg',
    tag: 'Living',
  },
  {
    id: 'terracotta-planter',
    name: 'Terracotta Planter',
    description: 'Unglazed Rajasthani clay with a drainage tray.',
    price: '₹680',
    image: '/images/product-terracotta.jpg',
    tag: 'Garden',
  },
];
