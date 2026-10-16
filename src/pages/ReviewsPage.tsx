import React, { useState, useMemo } from 'react';
import { Star, Filter, Heart, ExternalLink, SlidersHorizontal, Check, ShieldCheck, Sparkles, X } from 'lucide-react';
import { PRODUCTS, ReviewItem, AffiliateMerchant } from '../data/skincareData';

interface ReviewsPageProps {
  onOpenProduct: (product: ReviewItem) => void;
  onOpenAffiliate: (productName: string, merchant: AffiliateMerchant) => void;
  onToggleSave: (productId: string) => void;
  savedIds: string[];
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  onOpenProduct,
  onOpenAffiliate,
  onToggleSave,
  savedIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [selectedConcern, setSelectedConcern] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<string>('All');
  const [fragranceFreeOnly, setFragranceFreeOnly] = useState(false);
  const [crueltyFreeOnly, setCrueltyFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc' | 'reviews'>('rating');

  const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Sunscreen', 'Exfoliants'];
  const skinTypes = ['All', 'Dry', 'Oily', 'Combination', 'Sensitive', 'Normal', 'Mature'];
  const concerns = ['All', 'Barrier Repair', 'Acne & Blemishes', 'Hyperpigmentation', 'Anti-Aging', 'Redness', 'Texture'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedSkinType !== 'All' && !p.skinTypes.includes(selectedSkinType as any)) return false;
      if (selectedConcern !== 'All' && !p.concerns.includes(selectedConcern as any)) return false;
      if (fragranceFreeOnly && !p.fragranceFree) return false;
      if (crueltyFreeOnly && !p.crueltyFree) return false;

      const lowestPrice = Math.min(...p.merchants.map((m) => m.price));
      if (priceRange === 'under30' && lowestPrice >= 30) return false;
      if (priceRange === '30to70' && (lowestPrice < 30 || lowestPrice > 70)) return false;
      if (priceRange === 'luxury' && lowestPrice <= 70) return false;

      return true;
    }).sort((a, b) => {
      const aPrice = Math.min(...a.merchants.map((m) => m.price));
      const bPrice = Math.min(...b.merchants.map((m) => m.price));

      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return aPrice - bPrice;
      if (sortBy === 'priceDesc') return bPrice - aPrice;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [selectedCategory, selectedSkinType, selectedConcern, priceRange, fragranceFreeOnly, crueltyFreeOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSkinType('All');
    setSelectedConcern('All');
    setPriceRange('All');
    setFragranceFreeOnly(false);
    setCrueltyFreeOnly(false);
    setSortBy('rating');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSkinType !== 'All' ||
    selectedConcern !== 'All' ||
    priceRange !== 'All' ||
    fragranceFreeOnly ||
    crueltyFreeOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#EAE2D8] pb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D3B] mb-2">
          <Sparkles className="w-4 h-4" />
          <span>The Vetted Catalog</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181513]">
          Clinical Skincare Reviews & Comparisons
        </h1>
        <p className="text-sm sm:text-base text-[#4A423A] mt-2 max-w-2xl">
          Every product below has been tested against physiological barrier integrity, molecular penetration pH, and real-world compliance. Filter by your skin specifications or compare authorized partner deals.
        </p>

        {/* Affiliate Disclosure badge */}
        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#EAE2D8] text-xs text-[#5C7764]">
          <ShieldCheck className="w-4 h-4" />
          <span>Prices & stock updated daily. Clicking retailer links applies reader promo codes automatically.</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#181513] text-white shadow-xs'
                : 'bg-white border border-[#EAE2D8] text-[#4A423A] hover:border-[#B85D3B]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter & Sorting Controls */}
      <div className="bg-white border border-[#EAE2D8] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#181513]">
            <SlidersHorizontal className="w-4 h-4 text-[#B85D3B]" />
            <span>Refine Clinical Criteria</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#B85D3B] hover:text-[#9E492B] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Skin Type */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-[#4A423A] mb-1">
              Skin Type
            </label>
            <select
              value={selectedSkinType}
              onChange={(e) => setSelectedSkinType(e.target.value)}
              className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-lg px-3 py-2 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
            >
              {skinTypes.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Skin Types' : t}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Concern */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-[#4A423A] mb-1">
              Primary Concern
            </label>
            <select
              value={selectedConcern}
              onChange={(e) => setSelectedConcern(e.target.value)}
              className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-lg px-3 py-2 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
            >
              {concerns.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Concerns' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-[#4A423A] mb-1">
              Price Range
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-lg px-3 py-2 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
            >
              <option value="All">All Prices</option>
              <option value="under30">Budget / Value (Under $30)</option>
              <option value="30to70">Mid-Range Clinical ($30 - $70)</option>
              <option value="luxury">Luxury / Medical ($70+)</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-[11px] uppercase font-bold text-[#4A423A] mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-lg px-3 py-2 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
            >
              <option value="rating">Highest Scientific Rating</option>
              <option value="reviews">Most Reader Reviews</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Checkbox toggles */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#F5EFEB] text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={fragranceFreeOnly}
              onChange={(e) => setFragranceFreeOnly(e.target.checked)}
              className="rounded text-[#B85D3B] focus:ring-[#B85D3B]"
            />
            <span className="text-[#181513] font-medium">Fragrance-Free Only (Barrier Safe)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={crueltyFreeOnly}
              onChange={(e) => setCrueltyFreeOnly(e.target.checked)}
              className="rounded text-[#B85D3B] focus:ring-[#B85D3B]"
            />
            <span className="text-[#181513] font-medium">Cruelty-Free Only</span>
          </label>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#4A423A]">
        <span>
          Showing <strong>{filteredProducts.length}</strong> formula reviews
        </span>
        <span className="text-[#5C7764] font-medium">
          Verified for high bioavailability
        </span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#EAE2D8] rounded-2xl p-8">
          <p className="text-base font-bold text-[#181513] mb-1">No products match your criteria</p>
          <p className="text-xs text-[#4A423A] mb-4">
            Try loosening your filters or resetting to view our full collection of tested formulas.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#181513] text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const bestMerchant = product.merchants[0];
            const isSaved = savedIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white border border-[#EAE2D8] rounded-2xl p-5 hover:border-[#B85D3B]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#FAF8F5] mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-[#181513]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={() => onToggleSave(product.id)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer shadow-xs ${
                        isSaved ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-[#4A423A] hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[#B85D3B] uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1 font-extrabold text-[#181513]">
                      <Star className="w-3.5 h-3.5 fill-[#C59A45] text-[#C59A45]" />
                      <span>{product.rating}</span>
                      <span className="text-[10px] text-[#4A423A] font-normal">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <h3
                    onClick={() => onOpenProduct(product)}
                    className="font-serif text-lg font-bold text-[#181513] leading-snug line-clamp-2 hover:text-[#B85D3B] transition-colors cursor-pointer mb-2"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#4A423A] line-clamp-2 mb-3">
                    {product.tagline}
                  </p>

                  {/* Actives Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.heroActives.map((act, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium bg-[#F5EFEB] text-[#2C2621] px-2 py-0.5 rounded"
                      >
                        {act}
                      </span>
                    ))}
                  </div>

                  {/* Texture & Sensorial Pill */}
                  <div className="flex items-center justify-between text-[11px] text-[#4A423A] pb-3 border-b border-[#F5EFEB]">
                    <span>Texture: <strong className="text-[#181513]">{product.texture}</strong></span>
                    <span>Finish: <strong className="text-[#181513]">{product.finish}</strong></span>
                  </div>
                </div>

                {/* Bottom Merchant Strip & Action */}
                <div className="pt-3 space-y-3">
                  {/* Retailers Mini Comparison */}
                  <div className="bg-[#FAF8F5] rounded-xl p-2.5 border border-[#EAE2D8] text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#181513] mb-1">
                      <span>Best: {bestMerchant.name}</span>
                      <span className="text-sm font-extrabold">${bestMerchant.price.toFixed(2)}</span>
                    </div>
                    {bestMerchant.promoCode && (
                      <div className="flex items-center justify-between text-[11px] text-[#5C7764]">
                        <span>Code: <code className="font-mono font-bold">{bestMerchant.promoCode}</code></span>
                        <span>{bestMerchant.promoDiscount}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenProduct(product)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-[#181513] bg-[#FAF8F5] border border-[#EAE2D8] hover:bg-[#EAE2D8] transition-colors cursor-pointer text-center"
                    >
                      Lab Verdict
                    </button>
                    <button
                      onClick={() => onOpenAffiliate(product.name, bestMerchant)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                    >
                      <span>Get Deal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
