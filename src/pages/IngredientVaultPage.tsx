import React, { useState } from 'react';
import { BookOpen, AlertTriangle, CheckCircle, Sparkles, ArrowRight, ShieldCheck, HelpCircle, ExternalLink } from 'lucide-react';
import { INGREDIENT_DIRECTORY, PRODUCTS, ReviewItem, AffiliateMerchant } from '../data/skincareData';

interface IngredientVaultPageProps {
  onOpenProduct: (product: ReviewItem) => void;
  onOpenAffiliate: (productName: string, merchant: AffiliateMerchant) => void;
}

export const IngredientVaultPage: React.FC<IngredientVaultPageProps> = ({
  onOpenProduct,
  onOpenAffiliate,
}) => {
  const [activeA, setActiveA] = useState<string>('retinoids');
  const [activeB, setActiveB] = useState<string>('vitamin-c');
  const [selectedIngredient, setSelectedIngredient] = useState<string>(INGREDIENT_DIRECTORY[0].id);

  // Layering analysis matrix logic
  const getCompatibility = (idA: string, idB: string) => {
    if (idA === idB) {
      return {
        status: 'redundant',
        title: 'Redundant Stacking',
        badge: 'Redundant',
        color: 'bg-amber-50 border-amber-200 text-amber-800',
        icon: AlertTriangle,
        explanation: 'Applying multiple products with the exact same active class does not double efficacy—it simply spikes sensitization and wastes money.',
      };
    }

    const pair = [idA, idB].sort().join('+');

    switch (pair) {
      case 'retinoids+vitamin-c':
        return {
          status: 'alternate',
          title: 'Alternate AM and PM (Optimal Strategy)',
          badge: 'Alternate Times of Day',
          color: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: HelpCircle,
          explanation:
            'Use Vitamin C in your morning routine to scavenge UV-induced free radicals, and Retinoids at night for cellular turnover. Layering them directly together low-pH unbuffered formulas can trigger severe stinging and peeling.',
        };
      case 'retinoids+salicylic-acid':
        return {
          status: 'caution',
          title: 'Caution: Alternate Nights (Skin Cycling)',
          badge: 'Cycle Evenings',
          color: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: AlertTriangle,
          explanation:
            'Both are potent exfoliators/turnover agents. Layering BHA and Retinol on the same evening often strips lipid bilayers. We recommend the viral Derm Cycling method: Night 1 BHA, Night 2 Retinoid, Nights 3 & 4 Barrier Recovery.',
        };
      case 'ceramides+retinoids':
        return {
          status: 'synergistic',
          title: 'Holy Grail Protective Synergy',
          badge: 'Highly Synergistic',
          color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: CheckCircle,
          explanation:
            'Ceramides replace the lipid mortar stripped during initial retinoid acclimatization. Apply ceramides after your retinoid (or sandwich before and after) to eliminate redness and flaking.',
        };
      case 'niacinamide+vitamin-c':
        return {
          status: 'synergistic',
          title: 'Safe & Proven Modern Synergy',
          badge: 'Synergistic Duo',
          color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: CheckCircle,
          explanation:
            'Older 1960s chemistry myths suggested these cancel each other out. Modern stabilized cosmetic formulations work in dual synergy to block melanosome transfer and fade stubborn dark spots.',
        };
      case 'ceramides+salicylic-acid':
        return {
          status: 'synergistic',
          title: 'Clarifying with Zero Barrier Damage',
          badge: 'Recommended Pairing',
          color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: CheckCircle,
          explanation:
            'BHA dissolves congested sebum inside the pores while ceramides safeguard the acid mantle. Essential pairing for adult acne prone to dehydration.',
        };
      case 'peptides+retinoids':
        return {
          status: 'synergistic',
          title: 'Intensive Collagen Remodeling',
          badge: 'Anti-Aging Powerhouse',
          color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: CheckCircle,
          explanation:
            'Signal peptides trigger new collagen synthesis while retinoids accelerate cellular renewal. Outstanding combination for mature and sun-damaged skin.',
        };
      case 'peptides+vitamin-c':
        return {
          status: 'caution',
          title: 'Safe with Standard Peptides, Avoid Copper',
          badge: 'Formulation Dependent',
          color: 'bg-amber-50 border-amber-200 text-amber-800',
          icon: AlertTriangle,
          explanation:
            'Standard matrixyl and signal peptides pair beautifully with Vitamin C. However, pure low-pH L-Ascorbic Acid will oxidize and chelate Copper Peptides (GHK-Cu). Keep copper peptides for PM.',
        };
      default:
        return {
          status: 'synergistic',
          title: 'Safe to Layer & Synergistic',
          badge: 'Safe Pairing',
          color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          icon: CheckCircle,
          explanation:
            'These two bio-actives do not compete for cellular receptors or alter pH absorption curves. Apply thinner water-based formulas first, followed by thicker creams.',
        };
    }
  };

  const compatibility = getCompatibility(activeA, activeB);
  const CompatibilityIcon = compatibility.icon;

  const currentIngredient =
    INGREDIENT_DIRECTORY.find((i) => i.id === selectedIngredient) || INGREDIENT_DIRECTORY[0];
  const topProduct = PRODUCTS.find((p) => p.id === currentIngredient.topPickProductId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <div className="border-b border-[#EAE2D8] pb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5C7764] mb-2">
          <BookOpen className="w-4 h-4" />
          <span>The Scientific Encyclopedia</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181513]">
          Actives Compatibility & Layering Matrix
        </h1>
        <p className="text-sm sm:text-base text-[#4A423A] mt-2 max-w-2xl">
          Skincare chemistry is governed by molecular weight, lipid solubility, and pH stability. Use our interactive checker below to verify if your daily actives play well together or destroy your barrier.
        </p>
      </div>

      {/* 1. INTERACTIVE "CAN I LAYER THIS?" TOOL */}
      <section className="bg-white border border-[#EAE2D8] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B85D3B] block mb-1">
            Ingredient Interaction Engine
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181513]">
            Can I Layer These Two Actives Together?
          </h2>
          <p className="text-xs text-[#4A423A] mt-1">
            Select two actives below to instantly run a cosmetic chemistry compatibility diagnosis.
          </p>
        </div>

        {/* Dropdowns row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8]">
            <label className="block text-[11px] uppercase font-bold text-[#4A423A] mb-2">
              Active Ingredient A:
            </label>
            <select
              value={activeA}
              onChange={(e) => setActiveA(e.target.value)}
              className="w-full text-sm font-semibold bg-white border border-[#EAE2D8] rounded-xl px-4 py-3 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
            >
              {INGREDIENT_DIRECTORY.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8]">
            <label className="block text-[11px] uppercase font-bold text-[#4A423A] mb-2">
              Active Ingredient B:
            </label>
            <select
              value={activeB}
              onChange={(e) => setActiveB(e.target.value)}
              className="w-full text-sm font-semibold bg-white border border-[#EAE2D8] rounded-xl px-4 py-3 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
            >
              {INGREDIENT_DIRECTORY.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Compatibility Result Box */}
        <div className={`p-6 sm:p-8 rounded-2xl border-2 transition-all ${compatibility.color}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-current/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/80 shadow-2xs">
                <CompatibilityIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">
                  Clinical Compatibility Verdict
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">{compatibility.title}</h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 shadow-2xs self-start sm:self-center">
              {compatibility.badge}
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-4">{compatibility.explanation}</p>

          <div className="flex items-center gap-2 text-xs font-medium opacity-90">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Rule of thumb: Always allow 60 seconds between serum applications to avoid pilling.</span>
          </div>
        </div>
      </section>

      {/* 2. STAR ACTIVES DIRECTORY */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#5C7764] block mb-1">
            Clinical Monograph Directory
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#181513]">
            The 6 Pillars of Modern Evidence-Based Skincare
          </h2>
          <p className="text-sm text-[#4A423A] mt-1">
            Click any active ingredient to view bio-availability data, optimal pH ranges, and our vetted top-rated formula.
          </p>
        </div>

        {/* Ingredient Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {INGREDIENT_DIRECTORY.map((ing) => (
            <button
              key={ing.id}
              onClick={() => setSelectedIngredient(ing.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedIngredient === ing.id
                  ? 'bg-[#181513] text-white shadow-xs'
                  : 'bg-white border border-[#EAE2D8] text-[#4A423A] hover:border-[#B85D3B]'
              }`}
            >
              {ing.name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Selected Ingredient Monograph Card */}
        <div className="bg-white border border-[#EAE2D8] rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B85D3B]">
                {currentIngredient.category}
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#181513] mt-1 mb-2">
                {currentIngredient.name}
              </h3>
              <p className="text-xs text-[#5C7764] font-mono font-medium">
                Physiological Target Stability: {currentIngredient.phRange}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A423A] mb-2">
                Validated Cellular Benefits:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#181513]">
                {currentIngredient.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EAE2D8]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#5C7764] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8]">
                <strong className="text-[#181513] block mb-1">Recommended Application Method:</strong>
                <p className="text-[#4A423A] leading-relaxed">{currentIngredient.howToUse}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8]">
                <strong className="text-[#181513] block mb-1">Dermatologist Clinical Note:</strong>
                <p className="text-[#4A423A] leading-relaxed">{currentIngredient.editorNote}</p>
              </div>
            </div>
          </div>

          {/* Top Pick Product Card for this Active */}
          {topProduct && (
            <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C7764] px-2.5 py-1 rounded-full bg-[#E5EDE6] inline-block">
                ★ Benchmark Formula For {currentIngredient.name.split(' (')[0]}
              </span>

              <div className="aspect-square rounded-xl overflow-hidden bg-white border border-[#EAE2D8]">
                <img
                  src={topProduct.image}
                  alt={topProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-xs font-bold text-[#B85D3B] uppercase">{topProduct.brand}</div>
                <h4
                  onClick={() => onOpenProduct(topProduct)}
                  className="font-serif text-lg font-bold text-[#181513] hover:text-[#B85D3B] transition-colors cursor-pointer"
                >
                  {topProduct.name}
                </h4>
                <p className="text-xs text-[#4A423A] mt-1 line-clamp-2">{topProduct.tagline}</p>
              </div>

              <div className="pt-3 border-t border-[#EAE2D8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#4A423A]">From</span>
                  <div className="text-xl font-extrabold text-[#181513]">
                    ${topProduct.merchants[0].price.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => onOpenAffiliate(topProduct.name, topProduct.merchants[0])}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all cursor-pointer shadow-xs"
                >
                  <span>Shop at {topProduct.merchants[0].name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
