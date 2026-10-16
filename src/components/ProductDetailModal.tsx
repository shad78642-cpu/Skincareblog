import React, { useState } from 'react';
import { X, Star, Shield, CheckCircle, AlertTriangle, ExternalLink, Tag, Sparkles, Heart } from 'lucide-react';
import { ReviewItem, AffiliateMerchant } from '../data/skincareData';

interface ProductDetailModalProps {
  product: ReviewItem | null;
  onClose: () => void;
  onOpenAffiliate: (productName: string, merchant: AffiliateMerchant) => void;
  onToggleSave: (productId: string) => void;
  isSaved: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenAffiliate,
  onToggleSave,
  isSaved
}) => {
  const [activeTab, setActiveTab] = useState<'verdict' | 'science' | 'ingredients' | 'merchants'>('verdict');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs transition-opacity overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl shadow-2xl text-[#1F1D1B] overflow-hidden">
        {/* Close and Favorite button */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => onToggleSave(product.id)}
            className={`p-2.5 rounded-full border transition-all cursor-pointer backdrop-blur-md shadow-xs ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-white/90 border-[#EAE2D8] text-[#4A423A] hover:text-rose-600'
            }`}
            title={isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 border border-[#EAE2D8] text-[#4A423A] hover:bg-[#EAE2D8] transition-colors cursor-pointer shadow-xs"
            aria-label="Close product view"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Product Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 border-b border-[#EAE2D8] bg-white">
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[260px] rounded-xl overflow-hidden bg-[#F5EFEB] border border-[#EAE2D8]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#2C2621]/90 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {product.fragranceFree && (
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#E5EDE6] text-[#47604F]">
                  Fragrance-Free
                </span>
              )}
              {product.crueltyFree && (
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F4F7F4] text-[#5C7764] border border-[#E5EDE6]">
                  Cruelty-Free
                </span>
              )}
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B85D3B] mb-1">
                <span>{product.brand}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181513] leading-tight mb-2">
                {product.name}
              </h2>

              <p className="text-sm text-[#4A423A] mb-4">
                {product.tagline}
              </p>

              {/* Rating & Quick Stats */}
              <div className="flex items-center gap-4 py-2 px-3 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] mb-4">
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 fill-[#C59A45] text-[#C59A45]" />
                  <span className="text-lg font-bold text-[#181513]">{product.rating}</span>
                  <span className="text-xs text-[#4A423A]">/10</span>
                </div>
                <div className="h-4 w-px bg-[#D8CCC0]" />
                <div className="text-xs text-[#4A423A]">
                  <span className="font-semibold text-[#181513]">{product.reviewCount}</span> Reader Reviews
                </div>
                <div className="h-4 w-px bg-[#D8CCC0]" />
                <div className="text-xs text-[#5C7764] font-medium">
                  Verified Formulation
                </div>
              </div>

              {/* Suitable Skin Types & Concerns */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-medium text-[#4A423A]">Best for Skin Types: </span>
                  <span className="text-[#181513] font-semibold">{product.skinTypes.join(', ')}</span>
                </div>
                <div>
                  <span className="font-medium text-[#4A423A]">Key Targets: </span>
                  <span className="text-[#181513] font-semibold">{product.concerns.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Instant Best Price Affiliate Trigger */}
            <div className="pt-4 mt-4 border-t border-[#F5EFEB] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#4A423A]">Best Price From</span>
                <div className="text-2xl font-bold text-[#181513]">
                  ${product.merchants[0]?.price.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => onOpenAffiliate(product.name, product.merchants[0])}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Shop at {product.merchants[0]?.name}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EAE2D8] bg-[#F5EFEB] px-6">
          <button
            onClick={() => setActiveTab('verdict')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'verdict'
                ? 'border-[#B85D3B] text-[#B85D3B] bg-[#FAF8F5]'
                : 'border-transparent text-[#4A423A] hover:text-[#181513]'
            }`}
          >
            Editor's Verdict & Pros/Cons
          </button>
          <button
            onClick={() => setActiveTab('science')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'science'
                ? 'border-[#B85D3B] text-[#B85D3B] bg-[#FAF8F5]'
                : 'border-transparent text-[#4A423A] hover:text-[#181513]'
            }`}
          >
            Clinical Science & Data
          </button>
          <button
            onClick={() => setActiveTab('merchants')}
            className={`py-3 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
              activeTab === 'merchants'
                ? 'border-[#B85D3B] text-[#B85D3B] bg-[#FAF8F5]'
                : 'border-transparent text-[#4A423A] hover:text-[#181513]'
            }`}
          >
            Retailer Price Matrix ({product.merchants.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 max-h-[420px] overflow-y-auto">
          {activeTab === 'verdict' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#EAE2D8] p-5 rounded-xl">
                <h4 className="font-serif text-lg font-bold text-[#181513] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B85D3B]" />
                  Our Unfiltered Verdict
                </h4>
                <p className="text-sm text-[#4A423A] leading-relaxed">
                  {product.editorVerdict}
                </p>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#E5EDE6]/40 border border-[#E5EDE6] rounded-xl p-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#47604F] mb-3 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#47604F]" />
                    What We Love (Pros)
                  </h5>
                  <ul className="space-y-2 text-xs text-[#2C2621]">
                    {product.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#47604F] font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Good to Know (Cons)
                  </h5>
                  <ul className="space-y-2 text-xs text-[#2C2621]">
                    {product.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Texture & Finish Summary */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white border border-[#EAE2D8] text-xs">
                <div>
                  <span className="text-[#4A423A] font-medium block">Formulation Texture</span>
                  <span className="text-[#181513] font-semibold">{product.texture}</span>
                </div>
                <div>
                  <span className="text-[#4A423A] font-medium block">Sensorial Finish</span>
                  <span className="text-[#181513] font-semibold">{product.finish}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'science' && (
            <div className="space-y-6">
              <div className="bg-white border border-[#EAE2D8] p-5 rounded-xl">
                <h4 className="font-serif text-lg font-bold text-[#181513] mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#5C7764]" />
                  The Cosmetic Chemistry Take
                </h4>
                <p className="text-sm text-[#4A423A] leading-relaxed">
                  {product.scienceTake}
                </p>
              </div>

              <div className="bg-[#FAF8F5] border border-[#EAE2D8] p-5 rounded-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5C7764] block mb-2">
                  Clinical Trial & Lab Testing Data
                </span>
                <p className="text-sm font-medium text-[#181513] leading-relaxed">
                  {product.clinicalResults}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A423A] block mb-3">
                  Key Bio-Active Ingredients:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.heroActives.map((active, i) => (
                    <span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-[#EAE2D8] text-[#181513] shadow-2xs">
                      {active}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'merchants' && (
            <div className="space-y-4">
              <p className="text-xs text-[#4A423A]">
                We monitor prices daily across verified authorized retailers to ensure genuine stock and lowest available discount codes.
              </p>

              <div className="space-y-3">
                {product.merchants.map((merchant, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white border border-[#EAE2D8] hover:border-[#B85D3B]/40 transition-colors gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#181513]">{merchant.name}</span>
                        {merchant.isBestValue && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#B85D3B]/10 text-[#B85D3B]">
                            Best Value
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-bold text-[#181513]">${merchant.price.toFixed(2)}</span>
                        {merchant.originalPrice && (
                          <span className="text-xs line-through text-[#4A423A]/70">
                            ${merchant.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {merchant.promoCode && (
                          <span className="text-xs text-[#5C7764] font-medium flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            Code: <strong className="font-mono">{merchant.promoCode}</strong> ({merchant.promoDiscount})
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenAffiliate(product.name, merchant)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#2C2621] hover:bg-[#181513] text-white transition-all cursor-pointer shadow-xs"
                    >
                      <span>Check Stock & Perks</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
