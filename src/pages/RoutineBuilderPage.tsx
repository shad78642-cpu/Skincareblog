import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Sun, Moon, RefreshCw, Copy, CheckCircle2, ShoppingBag, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS, ReviewItem, AffiliateMerchant } from '../data/skincareData';

interface RoutineBuilderPageProps {
  onOpenProduct: (product: ReviewItem) => void;
  onOpenAffiliate: (productName: string, merchant: AffiliateMerchant) => void;
  onToggleSave: (productId: string) => void;
  savedIds: string[];
}

export const RoutineBuilderPage: React.FC<RoutineBuilderPageProps> = ({
  onOpenProduct,
  onOpenAffiliate,
  onToggleSave,
  savedIds,
}) => {
  // Wizard states
  const [step, setStep] = useState<number>(1);
  const [skinType, setSkinType] = useState<string>('Combination');
  const [concern, setConcern] = useState<string>('Hyperpigmentation');
  const [finish, setFinish] = useState<string>('Dewy Glow');
  const [routineComplexity, setRoutineComplexity] = useState<string>('Targeted 4-Step');
  const [generated, setGenerated] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Generate matched routine
  const handleGenerate = () => {
    setGenerated(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#B85D3B', '#5C7764', '#C59A45']
    });
  };

  const resetQuiz = () => {
    setGenerated(false);
    setStep(1);
  };

  // Logic to curate AM and PM regimen based on user choices
  const getRegimen = () => {
    // Pick cleanser
    const cleanser = PRODUCTS.find((p) => p.category === 'Cleansers') || PRODUCTS[5];

    // Pick AM antioxidant / treatment
    let amTreatment = PRODUCTS.find((p) => p.id === 'skinceuticals-ce-ferulic')!;
    if (concern === 'Hyperpigmentation' && skinType === 'Oily') {
      amTreatment = PRODUCTS.find((p) => p.id === 'timeless-20-vit-c') || amTreatment;
    } else if (concern === 'Barrier Recovery & Redness Relief') {
      amTreatment = PRODUCTS.find((p) => p.id === 'niod-survival-0') || amTreatment;
    }

    // Pick PM active
    let pmActive = PRODUCTS.find((p) => p.id === 'medik8-crystal-retinal-6')!;
    if (concern === 'Stubborn Texture & Congested Pores') {
      pmActive = PRODUCTS.find((p) => p.id === 'paulas-choice-bha-liquid') || pmActive;
    }

    // Pick moisturizer
    const moisturizer = PRODUCTS.find((p) => p.id === 'dieux-air-angel')!;

    // Pick SPF
    const spf = PRODUCTS.find((p) => p.id === 'beauty-of-joseon-relief-sun')!;

    return {
      am: [
        {
          stepNumber: 1,
          name: 'Gentle Purifying Cleanse',
          instruction: 'Splash with lukewarm water or apply one pump without stripping skin barrier.',
          product: cleanser,
        },
        {
          stepNumber: 2,
          name: 'Antioxidant Photoprotection',
          instruction: 'Apply 4-5 drops onto dry skin. Wait 60 seconds before layering.',
          product: amTreatment,
        },
        {
          stepNumber: 3,
          name: 'Lipid Replenishment',
          instruction: 'Smooth pea-sized amount over face and neck for non-greasy barrier support.',
          product: moisturizer,
        },
        {
          stepNumber: 4,
          name: 'Broad-Spectrum UV Defense',
          instruction: 'Apply two full finger-lengths across face, ears, and neck. Reapply every 2 hours outdoors.',
          product: spf,
        },
      ],
      pm: [
        {
          stepNumber: 1,
          name: 'Evening Barrier Cleanse',
          instruction: 'Massage onto damp skin for 60 seconds to melt sunscreen and particulate pollution.',
          product: cleanser,
        },
        {
          stepNumber: 2,
          name: 'Targeted Cellular Active',
          instruction:
            concern === 'Stubborn Texture & Congested Pores'
              ? 'Apply 2-3 drops to t-zone with clean hands. Do not rinse.'
              : 'Apply pea-sized amount to completely dry skin (start 2x/week, build up to nightly).',
          product: pmActive,
        },
        {
          stepNumber: 3,
          name: 'Barrier Restoration Seal',
          instruction: 'Lock in active ingredients with ceramide matrix to prevent trans-epidermal water loss.',
          product: moisturizer,
        },
      ],
    };
  };

  const regimen = getRegimen();
  const allRoutineProducts = Array.from(
    new Set([...regimen.am.map((s) => s.product), ...regimen.pm.map((s) => s.product)])
  );
  const totalBundlePrice = allRoutineProducts.reduce(
    (sum, p) => sum + p.merchants[0].price,
    0
  );

  const copyRegimen = () => {
    const text = `✨ MY DERMAVOX CLINICAL ROUTINE ✨\nProfile: ${skinType} Skin | Concern: ${concern}\n\nAM ROUTINE:\n1. Cleanse: ${regimen.am[0].product.name}\n2. Treat: ${regimen.am[1].product.name}\n3. Hydrate: ${regimen.am[2].product.name}\n4. Protect: ${regimen.am[3].product.name}\n\nPM ROUTINE:\n1. Cleanse: ${regimen.pm[0].product.name}\n2. Active: ${regimen.pm[1].product.name}\n3. Barrier Lock: ${regimen.pm[2].product.name}\n\nGenerated via DERMAVOX Skincare Intelligence.`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5EDE6] text-[#47604F] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Diagnostic Algorithm</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181513]">
          Custom Skincare Regimen Builder
        </h1>
        <p className="text-sm sm:text-base text-[#4A423A]">
          Answer 4 quick diagnostic questions. We'll map the exact order, active layering rules, and clinically validated products to achieve optimal skin barrier equilibrium.
        </p>
      </div>

      {!generated ? (
        /* WIZARD CONTAINER */
        <div className="max-w-3xl mx-auto bg-white border border-[#EAE2D8] rounded-3xl p-6 sm:p-10 shadow-lg">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-[#4A423A] mb-2">
              <span>Diagnostic Step {step} of 4</span>
              <span>
                {step === 1 && 'Skin Profile'}
                {step === 2 && 'Primary Concern'}
                {step === 3 && 'Texture Finish'}
                {step === 4 && 'Regimen Scale'}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#FAF8F5] border border-[#EAE2D8] overflow-hidden">
              <div
                className="h-full bg-[#B85D3B] transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: SKIN TYPE */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#181513] mb-1">
                  How does your skin feel 2 hours after washing?
                </h3>
                <p className="text-xs text-[#4A423A]">
                  This establishes your baseline sebaceous production and barrier lipid density.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    type: 'Combination',
                    desc: 'Oily or shiny on forehead/nose, normal or tight along cheeks.',
                  },
                  {
                    type: 'Oily & Sebum-Prone',
                    desc: 'All-over shine, enlarged pores, prone to frequent breakouts.',
                  },
                  {
                    type: 'Dry & Flaky',
                    desc: 'Feels tight, rough sandpaper patches, absorbs cream instantly.',
                  },
                  {
                    type: 'Sensitive / Compromised',
                    desc: 'Stings easily, flushes red from temperature or active ingredients.',
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    onClick={() => setSkinType(item.type)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      skinType === item.type
                        ? 'border-[#B85D3B] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#EAE2D8] hover:border-[#D8CCC0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#181513]">{item.type}</span>
                      {skinType === item.type && (
                        <div className="w-4 h-4 rounded-full bg-[#B85D3B] text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#4A423A]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: PRIMARY CONCERN */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#181513] mb-1">
                  What is your single most important skin goal?
                </h3>
                <p className="text-xs text-[#4A423A]">
                  Our cosmetic chemists prioritize actives that address the root cellular cause.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    goal: 'Hyperpigmentation',
                    label: 'Sun Spots, Melasma & Dark Acne Marks',
                    desc: 'Target tyrosinase with potent 15% Vitamin C and antioxidant synergy.',
                  },
                  {
                    goal: 'Stubborn Texture & Congested Pores',
                    label: 'Blackheads, Bumps & Keratosis',
                    desc: 'Unclog sebum linings using lipophilic 2% salicylic acid.',
                  },
                  {
                    goal: 'Barrier Recovery & Redness Relief',
                    label: 'Post-Procedure, Stinging or Flaking',
                    desc: 'Reset physiological acid mantle with 3:1:1 multi-ceramides.',
                  },
                  {
                    goal: 'Anti-Aging & Collagen Remodeling',
                    label: 'Fine Lines, Loss of Bounce & Firmness',
                    desc: 'Accelerate cellular turnover via micro-encapsulated retinaldehyde.',
                  },
                ].map((item) => (
                  <div
                    key={item.goal}
                    onClick={() => setConcern(item.goal)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      concern === item.goal
                        ? 'border-[#B85D3B] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#EAE2D8] hover:border-[#D8CCC0]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#181513]">{item.label}</span>
                      {concern === item.goal && (
                        <div className="w-4 h-4 rounded-full bg-[#B85D3B] text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#4A423A]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: FINISH PREFERENCE */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#181513] mb-1">
                  What sensorial finish do you prefer on your skin?
                </h3>
                <p className="text-xs text-[#4A423A]">
                  Consistency is everything—the best routine is the one you actually love wearing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    f: 'Weightless Matte',
                    desc: 'Zero shine, fast-absorbing water-gel texture. Great for humid climates.',
                  },
                  {
                    f: 'Dewy Glow',
                    desc: 'Supple, bouncy, Korean glass-skin radiance that catches the light.',
                  },
                  {
                    f: 'Rich Velvety Balm',
                    desc: 'Deep nourishing cocoon that seals dry patches overnight.',
                  },
                ].map((item) => (
                  <div
                    key={item.f}
                    onClick={() => setFinish(item.f)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                      finish === item.f
                        ? 'border-[#B85D3B] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#EAE2D8] hover:border-[#D8CCC0]'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#181513] mb-1">{item.f}</div>
                    <p className="text-xs text-[#4A423A]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: COMPLEXITY */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#181513] mb-1">
                  How many steps fit your daily lifestyle?
                </h3>
                <p className="text-xs text-[#4A423A]">
                  Select your routine cadence. We will balance active strength to avoid over-exfoliation.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    c: 'Targeted 4-Step',
                    badge: 'Recommended',
                    desc: 'The clinical sweet spot: Cleanse, Potent Hero Active, Ceramide Cream, Broad-Spectrum SPF.',
                  },
                  {
                    c: 'Essential 3-Step',
                    badge: 'Minimalist',
                    desc: 'Cleanse, Hydrate, Protect. Zero irritation risk, low maintenance.',
                  },
                  {
                    c: 'Clinical 6-Step',
                    badge: 'Skincare Maximalist',
                    desc: 'Double cleanse, multi-antioxidant network, peptide infusion, night retinal, barrier lock.',
                  },
                ].map((item) => (
                  <div
                    key={item.c}
                    onClick={() => setRoutineComplexity(item.c)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      routineComplexity === item.c
                        ? 'border-[#B85D3B] bg-[#FAF8F5] shadow-xs'
                        : 'border-[#EAE2D8] hover:border-[#D8CCC0]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-[#181513]">{item.c}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E5EDE6] text-[#47604F]">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#4A423A]">{item.desc}</p>
                    </div>
                    {routineComplexity === item.c && (
                      <div className="w-5 h-5 rounded-full bg-[#B85D3B] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-[#EAE2D8] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-xs font-semibold text-[#4A423A] hover:text-[#181513] px-4 py-2 cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 px-6 py-3 rounded-xl font-semibold text-xs text-white bg-[#181513] hover:bg-[#2C2621] transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all shadow-md cursor-pointer animate-pulse"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate My Tailored Regimen</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* GENERATED REGIMEN VIEW */
        <div className="space-y-10 animate-in fade-in duration-300">
          {/* Diagnostic Profile Summary Bar */}
          <div className="bg-white border border-[#EAE2D8] rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#181513]">Your Profile:</span>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE2D8] text-[#181513] font-medium">
                Type: {skinType}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE2D8] text-[#B85D3B] font-medium">
                Goal: {concern}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE2D8] text-[#5C7764] font-medium">
                Finish: {finish}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyRegimen}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF8F5] border border-[#EAE2D8] hover:bg-[#EAE2D8] transition-colors cursor-pointer"
              >
                {copiedSummary ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#4A423A]" />
                    <span>Copy Routine</span>
                  </>
                )}
              </button>
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#4A423A] hover:text-[#181513] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* AM & PM Regimen Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AM ROUTINE COLUMN */}
            <div className="bg-white border border-[#EAE2D8] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F5EFEB]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#181513]">Morning Protocol</h3>
                    <p className="text-xs text-[#4A423A]">Photoprotection & Free Radical Defense</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#4A423A]">
                  {regimen.am.length} Steps
                </span>
              </div>

              <div className="space-y-4">
                {regimen.am.map((step) => {
                  const bestMerchant = step.product.merchants[0];
                  return (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] hover:border-[#B85D3B]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono font-bold text-[#B85D3B]">
                          STEP 0{step.stepNumber} • {step.name}
                        </span>
                        <span className="text-[11px] text-[#4A423A]">{step.product.category}</span>
                      </div>

                      <div className="flex gap-4">
                        <img
                          src={step.product.image}
                          alt={step.product.name}
                          onClick={() => onOpenProduct(step.product)}
                          className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            onClick={() => onOpenProduct(step.product)}
                            className="font-bold text-sm text-[#181513] hover:text-[#B85D3B] transition-colors cursor-pointer truncate"
                          >
                            {step.product.name}
                          </h4>
                          <p className="text-xs text-[#4A423A] mt-0.5 line-clamp-2">
                            {step.instruction}
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EAE2D8]/60">
                            <span className="text-xs font-extrabold text-[#181513]">
                              ${bestMerchant.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => onToggleSave(step.product.id)}
                                className="p-1 rounded text-[#4A423A] hover:text-rose-600 cursor-pointer"
                              >
                                <Heart className={`w-3.5 h-3.5 ${savedIds.includes(step.product.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
                              </button>
                              <button
                                onClick={() => onOpenAffiliate(step.product.name, bestMerchant)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white bg-[#2C2621] hover:bg-[#181513] cursor-pointer"
                              >
                                <span>Shop</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PM ROUTINE COLUMN */}
            <div className="bg-white border border-[#EAE2D8] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#F5EFEB]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#181513]">Evening Protocol</h3>
                    <p className="text-xs text-[#4A423A]">Cellular Renewal & Lipid Shield</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#4A423A]">
                  {regimen.pm.length} Steps
                </span>
              </div>

              <div className="space-y-4">
                {regimen.pm.map((step) => {
                  const bestMerchant = step.product.merchants[0];
                  return (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] hover:border-[#B85D3B]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono font-bold text-[#5C7764]">
                          STEP 0{step.stepNumber} • {step.name}
                        </span>
                        <span className="text-[11px] text-[#4A423A]">{step.product.category}</span>
                      </div>

                      <div className="flex gap-4">
                        <img
                          src={step.product.image}
                          alt={step.product.name}
                          onClick={() => onOpenProduct(step.product)}
                          className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            onClick={() => onOpenProduct(step.product)}
                            className="font-bold text-sm text-[#181513] hover:text-[#B85D3B] transition-colors cursor-pointer truncate"
                          >
                            {step.product.name}
                          </h4>
                          <p className="text-xs text-[#4A423A] mt-0.5 line-clamp-2">
                            {step.instruction}
                          </p>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EAE2D8]/60">
                            <span className="text-xs font-extrabold text-[#181513]">
                              ${bestMerchant.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => onToggleSave(step.product.id)}
                                className="p-1 rounded text-[#4A423A] hover:text-rose-600 cursor-pointer"
                              >
                                <Heart className={`w-3.5 h-3.5 ${savedIds.includes(step.product.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
                              </button>
                              <button
                                onClick={() => onOpenAffiliate(step.product.name, bestMerchant)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white bg-[#2C2621] hover:bg-[#181513] cursor-pointer"
                              >
                                <span>Shop</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Complete Regimen Bundle Card (Affiliate High-Converter) */}
          <div className="bg-[#2C2621] text-[#FAF8F5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59A45] block mb-1">
                Curated Routine Bundle
              </span>
              <h4 className="font-serif text-2xl font-bold text-white mb-1">
                Shop Full {allRoutineProducts.length}-Product Synergistic Regimen
              </h4>
              <p className="text-xs text-[#FAF8F5]/80 max-w-lg">
                Formulated to work in chemical harmony without active clashing or pH destabilization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#FAF8F5]/60 block">Bundle Total</span>
                <span className="text-2xl font-black text-white">${totalBundlePrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  allRoutineProducts.forEach((p) => {
                    if (!savedIds.includes(p.id)) {
                      onToggleSave(p.id);
                    }
                  });
                  confetti({ particleCount: 40 });
                }}
                className="px-6 py-3 rounded-xl font-bold text-xs text-[#181513] bg-[#FAF8F5] hover:bg-white transition-all cursor-pointer shadow-sm"
              >
                Save All {allRoutineProducts.length} Items to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
