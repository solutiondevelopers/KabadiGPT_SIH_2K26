import React, { useState } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Star,
  CheckCircle2,
  Filter,
  ArrowRight,
  ShieldCheck,
  Building2,
  HeartHandshake,
} from 'lucide-react';
import { Language } from '../../types';
import { MOCK_ECO_PRODUCTS } from '../../data/mockData';

interface StoreViewProps {
  lang: Language;
}

export const StoreView: React.FC<StoreViewProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartCount, setCartCount] = useState<number>(0);

  const content = {
    mr: {
      badge: 'चक्रीय उत्पादने व एनजीओ बाजारपेठ',
      title: 'इको सर्कुलर स्टोअर & एनजीओ विंग',
      subtitle: '१००% पुनर्वापर केलेल्या व सामाजिक संस्थांद्वारे (NGO) बनवलेली हस्तकला व अपसायकल उत्पादने खरेदी करा.',
      allTab: 'सर्व उत्पादने',
      recycledTab: 'रिसायकल',
      ngoTab: '🤝 एनजीओ अपसायकल उत्पादने',
      compostTab: 'कंपोस्टिंग किट',
      addToCart: 'खरेदी करा (कार्टमध्ये जोडा)',
      inStock: 'उपलब्ध',
      cartTitle: 'कार्ट:',
      itemsUnit: 'वस्तू',
      creatorProfile: 'निर्माता / एनजीओ भागीदार:',
      allocationNotice: 'गोदाम व MRF केंद्रातून प्राप्त साहित्याचा महिला पुनर्वसन व कला कौशल्यासाठी पुनर्वापर.',
    },
    hi: {
      badge: 'चक्रीय उत्पाद व एनजीओ मार्केटप्लेस',
      title: 'इको सर्कुलर स्टोर & एनजीओ विंग',
      subtitle: '100% पुनर्चक्रित व सामाजिक संगठनों (NGO) द्वारा निर्मित हस्तकला व अपसाइकिल उत्पाद खरीदें।',
      allTab: 'सभी उत्पाद',
      recycledTab: 'पुनर्चक्रित',
      ngoTab: '🤝 NGO अपसाइक्ड उत्पाद',
      compostTab: 'कम्पोस्ट किट',
      addToCart: 'खरीदें (कार्ट में जोड़ें)',
      inStock: 'उपलब्ध',
      cartTitle: 'कार्ट:',
      itemsUnit: 'सामग्री',
      creatorProfile: 'निर्माता / NGO भागीदार:',
      allocationNotice: 'वेयरहाउस व MRF हब से प्राप्त सामग्री का महिलाओं के पुनर्वास और कौशल विकास में उपयोग।',
    },
    en: {
      badge: 'Circular Marketplace & NGO Wing',
      title: 'Eco Circular Store & NGO Partner Hub',
      subtitle: 'Support rehabilitation and upcycling by purchasing verified craft items made from post-consumer waste.',
      allTab: 'All Products',
      recycledTab: 'Recycled Paper/Plastic',
      ngoTab: '🤝 NGO Upcycled Products',
      compostTab: 'Compost Kits',
      addToCart: 'Add to Cart',
      inStock: 'In Stock',
      cartTitle: 'Cart:',
      itemsUnit: 'items',
      creatorProfile: 'Creator / Social Partner:',
      allocationNotice: 'Material allocated directly from MRF Sorting Hubs for artisan livelihood & community rehabilitation.',
    },
  }[lang];

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    alert(lang === 'mr' ? 'वस्तू कार्टमध्ये जोडली गेली!' : lang === 'hi' ? 'सामग्री कार्ट में जोड़ी गई!' : 'Item added to cart!');
  };

  const ngoProducts = [
    {
      id: 'NGO-1',
      name: 'Handwoven Recycled Fabric Tote Bag',
      nameMr: 'पुनर्वापर कापडापासून बनवलेली हँडवोवन पिशवी',
      nameHi: 'पुनर्चक्रित कपड़े से बनी हस्तनिर्मित बैग',
      category: 'ngo_upcycled',
      price: 299,
      originalPrice: 450,
      rating: 4.9,
      reviewsCount: 118,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=60',
      creator: 'Aasra Women Livelihood Foundation (Pune NGO)',
      description: 'Stitched by women artisans using discarded cotton and textile remnants from industrial warehouses.',
      co2SavedKg: 3.1,
      badge: 'NGO Partner',
    },
    {
      id: 'NGO-2',
      name: 'Upcycled Tyre & Jute Ottoman Stool',
      nameMr: 'जुने टायर व ज्यूटपासून बनवलेला ऑटोमन स्टूल',
      nameHi: 'पुराने टायर व जूट से बना ओटोमन स्टूल',
      category: 'ngo_upcycled',
      price: 1199,
      originalPrice: 1799,
      rating: 5.0,
      reviewsCount: 94,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=60',
      creator: 'SwachhKarigar Social Welfare Trust',
      description: 'Reclaimed radial tyres upholstered with natural coir and hand-braided jute by rural artisans.',
      co2SavedKg: 18.5,
      badge: 'Waste-to-Best',
    },
    {
      id: 'NGO-3',
      name: 'Recycled Paper Seed-Embedded Notebooks (Pack of 5)',
      nameMr: 'बियाणे घातलेल्या रिसायकल कागदाच्या वह्या',
      nameHi: 'बीजयुक्त पुनर्चक्रित पेपर नोटबुक',
      category: 'ngo_upcycled',
      price: 399,
      originalPrice: 599,
      rating: 4.8,
      reviewsCount: 230,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=60',
      creator: 'GreenEarth Rehabilitation Center, Pune',
      description: 'Plantable seed paper embedded with tomato and basil seeds. Tree-free handmade paper.',
      co2SavedKg: 5.4,
      badge: 'Eco Friendly',
    },
  ];

  const allFilteredProducts = [
    ...MOCK_ECO_PRODUCTS,
    ...ngoProducts,
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-200/80 rounded-2xl p-4 sm:p-6 shadow-sm shadow-purple-500/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              {content.badge}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
              {content.title}
            </h2>
            <p className="text-xs sm:text-sm text-purple-700/80">
              {content.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-purple-900 self-start sm:self-auto shadow-2xs">
            <ShoppingBag className="w-4 h-4 text-purple-600" />
            <span>{content.cartTitle} {cartCount} {content.itemsUnit}</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-purple-100 overflow-x-auto pb-1">
          {[
            { id: 'all', label: content.allTab },
            { id: 'ngo_upcycled', label: content.ngoTab },
            { id: 'recycled', label: content.recycledTab },
            { id: 'compost', label: content.compostTab },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedCategory === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs'
                  : 'bg-purple-50 hover:bg-purple-100 text-slate-700 border border-purple-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* NGO Allocation Notice Banner */}
      <div className="p-4 bg-gradient-to-r from-purple-100/95 to-indigo-100/95 border border-purple-300 rounded-2xl flex items-start gap-3 text-xs text-purple-950">
        <HeartHandshake className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">NGO Partner Integration: </span>
          {content.allocationNotice}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allFilteredProducts.filter(
          (p) => selectedCategory === 'all' || p.category === selectedCategory || (selectedCategory === 'ngo_upcycled' && (p.category === 'ngo_upcycled' || p.category === 'waste_to_best'))
        ).map((prod: any) => {
          const prodName = lang === 'mr' ? (prod.nameMr || prod.name) : (prod.nameHi || prod.name);
          return (
            <div
              key={prod.id}
              className="bg-white/95 backdrop-blur-sm border border-purple-200/80 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-md hover:shadow-purple-500/10 transition-all"
            >
              <div className="relative h-44 overflow-hidden bg-purple-50">
                <img
                  src={prod.image}
                  alt={prodName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#e4fb52] text-slate-950 uppercase shadow-xs">
                  {prod.badge || 'Eco'}
                </span>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {prodName}
                  </h4>
                  {prod.creator && (
                    <p className="text-[10px] text-purple-700 font-semibold mt-1 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-purple-600" />
                      <span>{prod.creator}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{prod.rating}</span>
                    <span className="text-slate-400 font-normal">({prod.reviewsCount})</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                    🌱 {prod.co2SavedKg} kg CO2 Saved
                  </p>
                </div>

                <div className="pt-2 border-t border-purple-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-extrabold text-purple-900 font-mono">₹{prod.price}</span>
                    <span className="text-[10px] text-slate-400 line-through ml-1.5 font-mono">₹{prod.originalPrice}</span>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    {content.addToCart}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
