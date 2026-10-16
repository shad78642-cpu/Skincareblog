import React, { useState } from 'react';
import { ExternalLink, Check, Copy, Sparkles, ShieldCheck, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AffiliateMerchant } from '../data/skincareData';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  merchant: AffiliateMerchant;
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({
  isOpen,
  onClose,
  productName,
  merchant,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    if (merchant.promoCode) {
      navigator.clipboard.writeText(merchant.promoCode);
      setCopied(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#B85D3B', '#5C7764', '#C59A45', '#FAF8F5']
      });
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleProceed = () => {
    // Open in new tab safely
    window.open(merchant.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl shadow-2xl p-6 md:p-8 text-[#1F1D1B] overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#E5EDE6] rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#F5EFEB] rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#4A423A] hover:bg-[#EAE2D8] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5C7764] mb-2">
          <Sparkles className="w-4 h-4 text-[#B85D3B]" />
          <span>Verified Partner Redirect</span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold leading-tight mb-2 text-[#181513]">
          Connecting to {merchant.name}
        </h3>

        <p className="text-sm text-[#4A423A] mb-5">
          You are viewing <span className="font-medium text-[#181513]">"{productName}"</span>. We have secured exclusive reader pricing and verified stock availability.
        </p>

        {/* Price & Code Highlight Box */}
        <div className="bg-white border border-[#EAE2D8] rounded-xl p-4 mb-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F5EFEB]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#4A423A]">Partner Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#181513]">${merchant.price.toFixed(2)}</span>
                {merchant.originalPrice && (
                  <span className="text-sm line-through text-[#4A423A]/70">
                    ${merchant.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E5EDE6] text-[#47604F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#47604F] animate-pulse" />
                {merchant.inStock ? 'In Stock' : 'Limited Stock'}
              </span>
            </div>
          </div>

          {/* Promo code block if present */}
          {merchant.promoCode ? (
            <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#B85D3B]">{merchant.promoDiscount || 'Exclusive Discount Code'}</p>
                <code className="text-sm font-mono font-bold bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EAE2D8] text-[#181513]">
                  {merchant.promoCode}
                </code>
              </div>
              <button
                onClick={handleCopyCode}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2C2621] hover:bg-[#181513] text-white transition-all active:scale-95 cursor-pointer shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="pt-3 text-xs text-[#4A423A]">
              ✨ Discount automatically applied at checkout when shopping through this link.
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <button
            onClick={handleProceed}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-medium text-sm text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Continue to {merchant.name}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl text-sm font-medium text-[#4A423A] hover:bg-[#EAE2D8] transition-colors cursor-pointer text-center"
          >
            Stay on Site
          </button>
        </div>

        {/* Affiliate FTC Transparency Notice */}
        <div className="flex items-start gap-2.5 pt-3 border-t border-[#EAE2D8] text-[11px] text-[#4A423A]/80 leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-[#5C7764] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#181513]">Editorial Disclosure:</strong> DERMAVOX is reader-supported. When you purchase through our links, we may earn an affiliate commission at no extra cost to you. This funds our lab testing & ensures 100% independent reviews.
          </p>
        </div>
      </div>
    </div>
  );
};
