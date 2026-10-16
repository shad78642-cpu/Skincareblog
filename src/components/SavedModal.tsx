import React from 'react';
import { X, Trash2, ExternalLink, Heart, Sparkles, ShoppingBag } from 'lucide-react';
import { PRODUCTS, ReviewItem, AffiliateMerchant } from '../data/skincareData';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemoveSaved: (id: string) => void;
  onOpenProduct: (product: ReviewItem) => void;
  onOpenAffiliate: (productName: string, merchant: AffiliateMerchant) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onRemoveSaved,
  onOpenProduct,
  onOpenAffiliate,
}) => {
  if (!isOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => savedIds.includes(p.id));
  const totalPrice = savedProducts.reduce((sum, p) => sum + (p.merchants[0]?.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl shadow-2xl overflow-hidden text-[#1F1D1B]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EAE2D8] bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif text-2xl font-bold text-[#181513]">Your Curated Regimen</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E5EDE6] text-[#47604F] font-semibold">
              {savedProducts.length} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#4A423A] hover:bg-[#FAF8F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[460px] overflow-y-auto space-y-4">
          {savedProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-12 h-12 text-[#D8CCC0] mx-auto mb-3" />
              <p className="text-base font-semibold text-[#181513] mb-1">Your wishlist is empty</p>
              <p className="text-xs text-[#4A423A] max-w-xs mx-auto">
                Explore our clinical reviews and tap the heart icon on any product to save it to your personalized routine.
              </p>
            </div>
          ) : (
            <>
              {savedProducts.map((product) => {
                const bestMerchant = product.merchants[0];
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#EAE2D8] shadow-2xs hover:border-[#B85D3B]/40 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => {
                        onClose();
                        onOpenProduct(product);
                      }}
                      className="w-16 h-16 rounded-lg object-cover bg-[#F5EFEB] shrink-0 cursor-pointer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-[#B85D3B]">
                        <span>{product.brand}</span>
                        <span>•</span>
                        <span>{product.category}</span>
                      </div>
                      <h4
                        onClick={() => {
                          onClose();
                          onOpenProduct(product);
                        }}
                        className="text-sm font-bold text-[#181513] truncate cursor-pointer hover:text-[#B85D3B]"
                      >
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-extrabold text-[#181513]">
                          ${bestMerchant?.price.toFixed(2)}
                        </span>
                        {bestMerchant?.promoCode && (
                          <span className="text-[11px] font-mono text-[#5C7764] bg-[#E5EDE6]/60 px-1.5 py-0.5 rounded">
                            {bestMerchant.promoCode}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onOpenAffiliate(product.name, bestMerchant)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-colors cursor-pointer"
                      >
                        <span>Shop</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveSaved(product.id)}
                        className="p-2 rounded-lg text-[#4A423A]/70 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Total & Summary Box */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] mt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#4A423A]">Estimated Total</span>
                  <div className="text-xl font-extrabold text-[#181513]">${totalPrice.toFixed(2)}</div>
                </div>
                <div className="text-right text-xs text-[#5C7764] font-medium">
                  Verified with reader discounts
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
