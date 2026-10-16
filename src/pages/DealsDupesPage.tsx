import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ExternalLink, ShieldCheck, Layers, ArrowRight, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROMO_DEALS, DUPE_DATABASE, PromoDeal, DupeComparison, AffiliateMerchant } from '../data/skincareData';

interface DealsDupesPageProps {
  onOpenAffiliate: (productName: string, merchant: AffiliateMerchant) => void;
}

export const DealsDupesPage: React.FC<DealsDupesPageProps> = ({ onOpenAffiliate }) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopy = (deal: PromoDeal) => {
    navigator.clipboard.writeText(deal.code);
    setCopiedCodeId(deal.id);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#B85D3B', '#5C7764', '#C59A45']
    });
    setTimeout(() => setCopiedCodeId(null), 3000);
  };

  const handleActivateDeal = (deal: PromoDeal) => {
    handleCopy(deal);
    window.open(deal.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="border-b border-[#EAE2D8] pb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D3B] mb-2">
          <Tag className="w-4 h-4" />
          <span>Verified Partner Discounts</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181513]">
          Exclusive Promo Codes & Clinical Dupe Vault
        </h1>
        <p className="text-sm sm:text-base text-[#4A423A] mt-2 max-w-2xl">
          We negotiate reader-exclusive discounts directly with certified authorized distributors and rigorously test drugstore alternatives against multi-hundred-dollar luxury staples.
        </p>

        {/* Live guarantee badge */}
        <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-lg bg-[#E5EDE6] text-xs font-semibold text-[#47604F]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>All 5 discount codes verified active for October 2026.</span>
        </div>
      </div>

      {/* 1. EXCLUSIVE PROMO CODES HUB */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5C7764] block mb-1">
              Live Coupon Desk
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181513]">
              Active Partner Promo Codes
            </h2>
          </div>
          <span className="text-xs text-[#4A423A]">One-click copy & activate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROMO_DEALS.map((deal) => {
            const isCopied = copiedCodeId === deal.id;
            return (
              <div
                key={deal.id}
                className="bg-white border border-[#EAE2D8] rounded-2xl p-6 hover:border-[#B85D3B]/40 hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                {deal.exclusive && (
                  <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#B85D3B]/10 text-[#B85D3B]">
                    Exclusive Code
                  </span>
                )}

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#4A423A] mb-1">
                    {deal.retailer}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#181513] mb-2">
                    {deal.discount}
                  </h3>
                  <p className="text-xs text-[#4A423A] leading-relaxed mb-4">
                    {deal.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#F5EFEB]">
                  <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl p-2 px-3">
                    <span className="text-[10px] uppercase font-bold text-[#4A423A]">Voucher Code:</span>
                    <span className="font-mono font-bold text-sm text-[#181513]">{deal.code}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCopy(deal)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#FAF8F5] border border-[#EAE2D8] hover:bg-[#EAE2D8] text-[#181513] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#4A423A]" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleActivateDeal(deal)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Shop Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#4A423A]/70 pt-1">
                    <span>{deal.minimumSpend ? `Min: ${deal.minimumSpend}` : 'No minimum'}</span>
                    <span>Expires: {deal.expires}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. THE SMART DUPE VAULT (HEAD-TO-HEAD) */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#B85D3B] block mb-1">
            Formulation Reverse-Engineering
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#181513]">
            Luxury Icon vs Clinically Validated Dupe
          </h2>
          <p className="text-sm text-[#4A423A] mt-1 max-w-2xl">
            Save hundreds of dollars without compromising on active concentrations or skin barrier stability. Here is the exact chemical breakdown.
          </p>
        </div>

        <div className="space-y-8">
          {DUPE_DATABASE.map((dupe) => (
            <div
              key={dupe.id}
              className="bg-white border border-[#EAE2D8] rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden"
            >
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#F5EFEB]">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-[#E5EDE6] text-[#47604F]">
                    <Layers className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#181513]">
                      {dupe.luxuryProduct.brand} vs {dupe.smartDupe.brand}
                    </h3>
                    <p className="text-xs text-[#5C7764] font-semibold">
                      {dupe.similarityScore}% Chemical Profile Match
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8]">
                  <span className="text-xs uppercase font-bold text-[#4A423A]">Net Reader Savings:</span>
                  <span className="text-xl font-black text-[#5C7764]">${dupe.savingsAmount}</span>
                </div>
              </div>

              {/* Side by Side Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                {/* Luxury Original */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#4A423A] mb-3">
                      <span>Luxury Original</span>
                      <span>{dupe.luxuryProduct.size}</span>
                    </div>

                    <div className="flex gap-4">
                      <img
                        src={dupe.luxuryProduct.image}
                        alt={dupe.luxuryProduct.name}
                        className="w-20 h-20 rounded-xl object-cover bg-white shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#B85D3B] uppercase">
                          {dupe.luxuryProduct.brand}
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#181513]">
                          {dupe.luxuryProduct.name}
                        </h4>
                        <div className="text-xl font-extrabold text-[#181513] mt-1">
                          ${dupe.luxuryProduct.price}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EAE2D8] text-xs">
                      <strong className="text-[#181513] block mb-1">Key Formulation:</strong>
                      <p className="text-[#4A423A] leading-relaxed">{dupe.luxuryProduct.keyActives}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#EAE2D8]">
                    <button
                      onClick={() =>
                        onOpenAffiliate(dupe.luxuryProduct.name, dupe.luxuryProduct.merchant)
                      }
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-[#EAE2D8] hover:bg-[#EAE2D8] text-[#181513] transition-colors cursor-pointer"
                    >
                      <span>Shop Luxury Original (${dupe.luxuryProduct.price})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Smart Dupe */}
                <div className="p-5 rounded-2xl bg-white border-2 border-[#5C7764]/40 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#47604F] mb-3">
                      <span className="px-2 py-0.5 rounded-full bg-[#E5EDE6]">★ Clinically Proven Dupe</span>
                      <span>{dupe.smartDupe.size}</span>
                    </div>

                    <div className="flex gap-4">
                      <img
                        src={dupe.smartDupe.image}
                        alt={dupe.smartDupe.name}
                        className="w-20 h-20 rounded-xl object-cover bg-[#FAF8F5] shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#5C7764] uppercase">
                          {dupe.smartDupe.brand}
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#181513]">
                          {dupe.smartDupe.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xl font-extrabold text-[#181513]">
                            ${dupe.smartDupe.price}
                          </span>
                          <span className="text-xs line-through text-[#4A423A]/70">
                            ${(dupe.smartDupe.price + 5).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F5EFEB] text-xs">
                      <strong className="text-[#181513] block mb-1">Active Ingredient Match:</strong>
                      <p className="text-[#4A423A] leading-relaxed">{dupe.smartDupe.keyActives}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#F5EFEB]">
                    <button
                      onClick={() =>
                        onOpenAffiliate(dupe.smartDupe.name, dupe.smartDupe.merchant)
                      }
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#5C7764] hover:bg-[#47604F] transition-all cursor-pointer shadow-xs"
                    >
                      <span>Shop Dupe for ${dupe.smartDupe.price} (Save ${dupe.savingsAmount})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lab Verdict Bar */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] text-xs text-[#2C2621] flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#B85D3B] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#181513]">Cosmetic Chemist Verdict: </strong>
                  {dupe.verdict}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AFFILIATE TRANSPARENCY MANIFESTO */}
      <section className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-3xl p-8 sm:p-12">
        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <ShieldCheck className="w-8 h-8 text-[#5C7764] mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181513]">
            Our Affiliate & Editorial Transparency Manifesto
          </h2>
          <p className="text-xs sm:text-sm text-[#4A423A] leading-relaxed">
            DERMAVOX was founded with a singular conviction: skincare recommendations must be backed by peer-reviewed dermatology research, not paid brand sponsorships.
          </p>
          <div className="text-xs text-[#4A423A] text-left space-y-2 pt-4 border-t border-[#EAE2D8]">
            <p>
              • <strong>Zero Pay-to-Play:</strong> Brands cannot purchase placement on our Holy Grail awards or review lists.
            </p>
            <p>
              • <strong>Commission Structure:</strong> When you click our partner links and choose to make a purchase, the retailer pays us a small percentage (typically 3%–10%). This cost is absorbed entirely by the retailer.
            </p>
            <p>
              • <strong>Exclusive Pricing for You:</strong> Because we drive high volume to certified stores like Dermstore and Paula's Choice, we pass back exclusive 15%–20% discount vouchers to our readers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
