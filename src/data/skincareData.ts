export interface AffiliateMerchant {
  name: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  promoCode?: string;
  promoDiscount?: string;
  affiliateUrl: string;
  isBestValue?: boolean;
}

export interface ReviewItem {
  id: string;
  name: string;
  brand: string;
  category: 'Serums' | 'Moisturizers' | 'Cleansers' | 'Sunscreen' | 'Exfoliants' | 'Eye Care';
  rating: number; // e.g. 9.7
  reviewCount: number;
  badge?: string; // 'Holy Grail 2026', 'Best for Barrier Repair', etc.
  tagline: string;
  image: string;
  heroActives: string[];
  skinTypes: ('Dry' | 'Oily' | 'Combination' | 'Sensitive' | 'Normal' | 'Mature')[];
  concerns: ('Acne & Blemishes' | 'Barrier Repair' | 'Hyperpigmentation' | 'Anti-Aging' | 'Redness' | 'Dullness' | 'Texture')[];
  texture: string;
  finish: string;
  fragranceFree: boolean;
  crueltyFree: boolean;
  pros: string[];
  cons: string[];
  editorVerdict: string;
  scienceTake: string;
  clinicalResults: string;
  merchants: AffiliateMerchant[];
  dupeAlternativeId?: string;
}

export interface IngredientProfile {
  id: string;
  name: string;
  category: string;
  benefits: string[];
  bestFor: string;
  howToUse: string;
  phRange: string;
  pairWith: string[];
  avoidPairing: string[];
  editorNote: string;
  topPickProductId: string;
}

export interface DupeComparison {
  id: string;
  luxuryProduct: {
    name: string;
    brand: string;
    price: number;
    size: string;
    image: string;
    keyActives: string;
    merchant: AffiliateMerchant;
  };
  smartDupe: {
    name: string;
    brand: string;
    price: number;
    size: string;
    image: string;
    keyActives: string;
    merchant: AffiliateMerchant;
  };
  similarityScore: number; // e.g. 94%
  savingsAmount: number; // $154
  verdict: string;
  formulaMatchNotes: string;
}

export interface PromoDeal {
  id: string;
  retailer: string;
  discount: string;
  code: string;
  expires: string;
  description: string;
  exclusive: boolean;
  affiliateUrl: string;
  minimumSpend?: string;
}

export const PRODUCTS: ReviewItem[] = [
  {
    id: 'skinceuticals-ce-ferulic',
    name: 'C E Ferulic Combination Antioxidant Treatment',
    brand: 'SkinCeuticals',
    category: 'Serums',
    rating: 9.8,
    reviewCount: 1420,
    badge: "Gold Standard Vitamin C",
    tagline: 'The patented clinical vitamin C serum that protects against atmospheric skin aging.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    heroActives: ['15% L-Ascorbic Acid', '1% Alpha Tocopherol (Vit E)', '0.5% Ferulic Acid'],
    skinTypes: ['Normal', 'Dry', 'Combination', 'Mature'],
    concerns: ['Hyperpigmentation', 'Anti-Aging', 'Dullness'],
    texture: 'Lightweight water-liquid',
    finish: 'Natural absorb, zero tackiness after 60s',
    fragranceFree: true,
    crueltyFree: false,
    pros: [
      'Gold standard Duke University patented pH formula (pH 2.5 - 3.0)',
      'Provides 8x biological antioxidant photoprotection against UV/ozone',
      'Visible brightening of sun damage within 4 to 6 weeks of daily use',
      'Neutralizes free radicals for up to 72 hours once absorbed'
    ],
    cons: [
      'High price point ($185)',
      'Distinctive medicinal/ferulic aroma (scent of hot dog water) that dissipates quickly',
      'Low pH can tingle very reactive/compromised skin barriers'
    ],
    editorVerdict: 'Still the undisputed benchmark for clinical antioxidant serums. If budget permits, nothing on the market has matched its long-term collagen preservation peer-reviewed data.',
    scienceTake: 'The Duke Antioxidant Patent requires precise 15% pure L-ascorbic acid at a pH below 3.5 with vitamin E and ferulic acid. SkinCeuticals preserves this synergy for maximum dermal penetration.',
    clinicalResults: '96% observed reduction in fine lines; 41% reduction in oxidative damage caused by UVA/UVB and diesel engine exhaust particles.',
    dupeAlternativeId: 'timeless-20-vit-c',
    merchants: [
      {
        name: 'Dermstore',
        price: 185,
        originalPrice: 185,
        inStock: true,
        promoCode: 'DERMVOX15',
        promoDiscount: '15% Off First Order',
        affiliateUrl: 'https://www.dermstore.com',
        isBestValue: true,
      },
      {
        name: 'SkinCeuticals Official',
        price: 185,
        inStock: true,
        promoCode: 'GLOWGIFT',
        promoDiscount: 'Deluxe Sample Gift',
        affiliateUrl: 'https://www.skinceuticals.com',
      },
      {
        name: 'Bluemercury',
        price: 185,
        inStock: true,
        affiliateUrl: 'https://www.bluemercury.com',
      }
    ]
  },
  {
    id: 'paulas-choice-bha-liquid',
    name: 'Skin Perfecting 2% BHA Liquid Exfoliant',
    brand: "Paula's Choice",
    category: 'Exfoliants',
    rating: 9.7,
    reviewCount: 3840,
    badge: 'Iconic Pore Refiner',
    tagline: 'A leave-on exfoliant that unclogs congested pores and smooths crepey texture effortlessly.',
    image: 'https://images.unsplash.com/photo-1608248597359-0a69a9e334aa?auto=format&fit=crop&w=800&q=80',
    heroActives: ['2% Salicylic Acid (BHA)', 'Camellia Sinensis (Green Tea) Leaf Extract', 'Methylpropanediol'],
    skinTypes: ['Oily', 'Combination', 'Normal'],
    concerns: ['Acne & Blemishes', 'Texture', 'Dullness'],
    texture: 'Fluid toner slip',
    finish: 'Hydrating satin glide',
    fragranceFree: true,
    crueltyFree: true,
    pros: [
      'Lipophilic salicylic acid penetrates deep inside sebaceous pores',
      'Green tea polyphenols soothe redness and mitigate irritation',
      'Rapidly softens blackheads and whiteheads in 3-5 days',
      'Lasts 4+ months even with thrice-weekly use'
    ],
    cons: [
      'Can cause purging during the first 2 weeks if congested',
      'Must not be overused with strong retinoids on the same evening'
    ],
    editorVerdict: 'The single most dependable pore-clarifying toner formulated in modern cosmetic chemistry. A permanent staple for oily and combination t-zones.',
    scienceTake: 'Formulated at an optimal pH range of 3.2–3.8, ensuring the salicylic acid remains in free acid form to dissolve keratin plugs inside pore walls.',
    clinicalResults: '90% showed noticeable improvement in skin clarity; 82% noticed reduction in visible pore diameter after 30 days.',
    merchants: [
      {
        name: "Paula's Choice Direct",
        price: 35,
        originalPrice: 38,
        inStock: true,
        promoCode: 'VOX20',
        promoDiscount: '20% Off + Free Travel Size',
        affiliateUrl: 'https://www.paulaschoice.com',
        isBestValue: true,
      },
      {
        name: 'Sephora',
        price: 35,
        inStock: true,
        affiliateUrl: 'https://www.sephora.com',
      },
      {
        name: 'Amazon Luxury Beauty',
        price: 35,
        inStock: true,
        affiliateUrl: 'https://www.amazon.com',
      }
    ]
  },
  {
    id: 'dieux-air-angel',
    name: 'Air Angel Hydrating Gel-Cream',
    brand: 'Dieux Skin',
    category: 'Moisturizers',
    rating: 9.6,
    reviewCount: 910,
    badge: 'Holy Grail Barrier Gel',
    tagline: 'Water-light barrier replenisher packed with ceramides and biometric humectants.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    heroActives: ['Ceramide NP, AP, EOP', 'Phytosphingosine', 'Glycerin 10%', 'Sodium PCA'],
    skinTypes: ['Sensitive', 'Combination', 'Oily', 'Normal'],
    concerns: ['Barrier Repair', 'Redness', 'Dullness'],
    texture: 'Weightless soufflé gel-cream',
    finish: 'Silky glass-skin sheen, zero grease',
    fragranceFree: true,
    crueltyFree: true,
    pros: [
      'Replenishes lipid barrier without clogging micro-comedones',
      'Clinical-level 10% glycerin delivers immediate deep turgor hydration',
      'Wears flawlessly beneath high-SPF sunscreens and silicone primers',
      'Airless aluminum recyclable tube preserves active purity'
    ],
    cons: [
      'Very dry skin may need an additional squalane facial oil in winter',
      'Frequently sells out on restock days'
    ],
    editorVerdict: 'Dieux solved the dilemma of delivering clinical barrier ceramides without the heavy, pore-clogging waxes common in traditional barrier balms.',
    scienceTake: 'Contains the physiological 3:1:1 skin lipid ratio of ceramides, cholesterol, and free fatty acids suspended in an aqueous glycerin micro-emulsion.',
    clinicalResults: 'Clinically proven to repair compromised stratum corneum barrier within 1 hour post-application.',
    merchants: [
      {
        name: 'Dieux Skin Official',
        price: 44,
        inStock: true,
        promoCode: 'VOXANGEL',
        promoDiscount: '10% Off Orders Over $40',
        affiliateUrl: 'https://www.dieuxskin.com',
        isBestValue: true,
      },
      {
        name: 'Sephora',
        price: 44,
        inStock: true,
        affiliateUrl: 'https://www.sephora.com',
      }
    ]
  },
  {
    id: 'beauty-of-joseon-relief-sun',
    name: 'Relief Sun: Rice + Probiotics SPF 50+ PA++++',
    brand: 'Beauty of Joseon',
    category: 'Sunscreen',
    rating: 9.9,
    reviewCount: 6540,
    badge: '#1 Daily Sunscreen',
    tagline: 'Korean organic chemical sunscreen that feels identical to a soothing daytime moisturizer.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    heroActives: ['30% Rice Extract', 'Grain Fermented Probiotics', 'Uvinul A Plus', 'Tinosorb S'],
    skinTypes: ['Dry', 'Normal', 'Combination', 'Sensitive'],
    concerns: ['Anti-Aging', 'Redness', 'Barrier Repair'],
    texture: 'Whipped lotion essence',
    finish: 'Natural luminous skin finish, zero white cast',
    fragranceFree: true,
    crueltyFree: true,
    pros: [
      'Advanced photostable EU/Asian filters (Uvinul A Plus, Tinosorb S, Uvinul T 150)',
      'Completely invisible on all Fitzpatrick skin types I through VI',
      'Never stings eyes or pills during makeup layering',
      'Unbelievable price-to-performance ratio ($18)'
    ],
    cons: [
      'Not water-resistant (ideal for daily urban/desk wear, not heavy swimming)',
      'Extremely oily skin types may find it slightly too moisturizing in humid climates'
    ],
    editorVerdict: 'The sunscreen that converted hundreds of thousands of people who hated wearing SPF into daily wearers. A masterpiece of modern cosmetic chemistry.',
    scienceTake: 'Dual-phase organic filters provide robust broad-spectrum protection against UVA1, UVA2, and UVB while rice bran polysaccharides nourish epidermal microbiome.',
    clinicalResults: 'Independently validated SPF 52.5 and UVA-PF 16.5 by dual third-party testing labs in South Korea and Spain.',
    merchants: [
      {
        name: 'YesStyle',
        price: 14.50,
        originalPrice: 18,
        inStock: true,
        promoCode: 'DERMVOXYS',
        promoDiscount: 'Extra 10% Off',
        affiliateUrl: 'https://www.yesstyle.com',
        isBestValue: true,
      },
      {
        name: 'Stylevana',
        price: 13.90,
        originalPrice: 18,
        inStock: true,
        affiliateUrl: 'https://www.stylevana.com',
      },
      {
        name: 'Amazon Official Brand Store',
        price: 17.00,
        inStock: true,
        affiliateUrl: 'https://www.amazon.com',
      }
    ]
  },
  {
    id: 'medik8-crystal-retinal-6',
    name: 'Crystal Retinal 6 Stable Retinal Night Serum',
    brand: 'Medik8',
    category: 'Serums',
    rating: 9.8,
    reviewCount: 1820,
    badge: 'Next-Gen Retinaldehyde',
    tagline: 'Acts up to 11x faster than standard retinol with patented encapsulation for zero peeling.',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    heroActives: ['0.06% Encapsulated Retinaldehyde', 'Hyaluronic Acid', 'Vitamin E', 'Glycerin'],
    skinTypes: ['Mature', 'Normal', 'Combination', 'Oily'],
    concerns: ['Anti-Aging', 'Texture', 'Acne & Blemishes'],
    texture: 'Peachy silky emulsion',
    finish: 'Velvet cushion absorb',
    fragranceFree: true,
    crueltyFree: true,
    pros: [
      'Retinal requires only ONE conversion step to retinoic acid vs two steps for retinol',
      'Direct antibacterial action against Cutibacterium acnes',
      'Time-release crystal encapsulation minimizes erythema and dryness',
      'Ladder system available in 0.01%, 0.03%, 0.06%, 0.1%, and 0.2%'
    ],
    cons: [
      'Requires gradual acclimatization (start 2 nights a week)',
      'Natural saffron-peach tint can briefly mark white satin pillowcases if applied right before sleep'
    ],
    editorVerdict: 'The pinnacle of over-the-counter vitamin A technology. Yields prescription-adjacent smoothing results with a fraction of the customary irritation.',
    scienceTake: 'Retinaldehyde has proven direct antibacterial properties while stimulating procollagen-1 production 11 times faster than standard retinol.',
    clinicalResults: '92% of testers agreed skin looked visibly firmer and tighter; 88% noted reduction in adult hormonal breakouts within 6 weeks.',
    merchants: [
      {
        name: 'Medik8 Official',
        price: 83,
        inStock: true,
        promoCode: 'DERMRETINAL',
        promoDiscount: '15% Off Your First Order',
        affiliateUrl: 'https://www.medik8.com',
        isBestValue: true,
      },
      {
        name: 'Dermstore',
        price: 83,
        inStock: true,
        promoCode: 'DERMVOX15',
        promoDiscount: '15% Off',
        affiliateUrl: 'https://www.dermstore.com',
      },
      {
        name: 'Cult Beauty',
        price: 81,
        inStock: true,
        affiliateUrl: 'https://www.cultbeauty.com',
      }
    ]
  },
  {
    id: 'krave-matcha-hemp-cleanser',
    name: 'Matcha Hemp Hydrating Cleanser',
    brand: 'Krave Beauty',
    category: 'Cleansers',
    rating: 9.5,
    reviewCount: 2210,
    badge: 'Barrier-Safe Wash',
    tagline: 'An antioxidant-rich jelly cleanser that cleanses grime without stripping acid mantle.',
    image: 'https://images.unsplash.com/photo-1556228722-d0b97772718c?auto=format&fit=crop&w=800&q=80',
    heroActives: ['Matcha (Camellia Sinensis)', 'Hemp Seed Oil', 'Vitamin B5 (Panthenol)', 'Sodium PCA'],
    skinTypes: ['Sensitive', 'Dry', 'Normal', 'Combination'],
    concerns: ['Barrier Repair', 'Redness'],
    texture: 'Bouncy matcha green gel jelly',
    finish: 'Supple, conditioned, completely non-tight',
    fragranceFree: true,
    crueltyFree: true,
    pros: [
      'Subtle low pH (5.0 - 5.5) honors the physiological acid mantle',
      'Cold-pressed hemp seed oil provides linoleic acid barrier nutrition',
      'Gentle plant-derived glucoside surfactants leave no squeaky stripped sensation'
    ],
    cons: [
      'Heavy waterproof mascara requires an oil balm first step double cleanse'
    ],
    editorVerdict: 'The quintessential daily morning and second-step evening cleanser for anyone who has ever felt tight or itchy after washing their face.',
    scienceTake: 'Utilizes coco-glucoside and decyl glucoside which form mild micellar clusters that trap sebum without disrupting stratum corneum lipid bilayers.',
    clinicalResults: '100% of participants demonstrated zero barrier moisture loss after 14 days of twice-daily facial wash.',
    merchants: [
      {
        name: 'Krave Beauty Official',
        price: 18,
        inStock: true,
        promoCode: 'KRAVEGLOW',
        promoDiscount: '10% Off First Bundle',
        affiliateUrl: 'https://www.kravebeauty.com',
        isBestValue: true,
      },
      {
        name: 'Soko Glam',
        price: 18,
        inStock: true,
        affiliateUrl: 'https://www.sokoglam.com',
      }
    ]
  },
  {
    id: 'niod-survival-0',
    name: 'Survival 0 Nighttime Antioxidant Network',
    brand: 'NIOD (Deciem)',
    category: 'Serums',
    rating: 9.4,
    reviewCount: 780,
    badge: 'Clinical Tech Marvel',
    tagline: 'A sophisticated cellular defense network targeting pollution, infrared, and blue light stress.',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80',
    heroActives: ['Superoxide Dismutase (SOD)', 'Lutein', 'Purified Knotweed Extract', 'Dimethylmethoxy Chromanol'],
    skinTypes: ['Normal', 'Combination', 'Mature', 'Oily'],
    concerns: ['Anti-Aging', 'Dullness', 'Redness'],
    texture: 'Nutty amber fluid serum',
    finish: 'Matte dry-down, ideal for evening layering',
    fragranceFree: true,
    crueltyFree: true,
    pros: [
      'Contains yeast-derived Superoxide Dismutase, the master antioxidant enzyme',
      'Protects against particulate PM 2.5 and reactive oxygen species',
      'Non-greasy, non-sensitizing alternative to direct ascorbic acid'
    ],
    cons: [
      'Dark amber color can look strange before blending into the skin'
    ],
    editorVerdict: 'A cult-favorite for skincare purists who understand free radical chemistry. Unmatched antioxidant depth for urban city dwellers.',
    scienceTake: 'Combines bio-engineered carotenoids with deep-water extremophile extracts to scavenge nitrogen, oxygen, and carbonyl radicals simultaneously.',
    clinicalResults: '91% cellular viability preservation under simulated severe oxidative ozone stress.',
    merchants: [
      {
        name: 'Deciem / The Ordinary',
        price: 26,
        inStock: true,
        promoCode: 'DECIEMPERK',
        promoDiscount: 'Free Shipping with Account',
        affiliateUrl: 'https://www.deciem.com',
        isBestValue: true,
      },
      {
        name: 'Ulta Beauty',
        price: 26,
        inStock: true,
        affiliateUrl: 'https://www.ulta.com',
      }
    ]
  },
  {
    id: 'timeless-20-vit-c',
    name: '20% Vitamin C + E Ferulic Acid Serum',
    brand: 'Timeless Skin Care',
    category: 'Serums',
    rating: 9.4,
    reviewCount: 4120,
    badge: 'Best Value High-Potency C',
    tagline: 'The famous fresh-batch antioxidant powerhouse delivering clinical brightening at 1/6th the price.',
    image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=800&q=80',
    heroActives: ['20% L-Ascorbic Acid', '1% Vitamin E', '0.5% Ferulic Acid'],
    skinTypes: ['Normal', 'Oily', 'Combination'],
    concerns: ['Hyperpigmentation', 'Dullness', 'Anti-Aging'],
    texture: 'Water-thin liquid',
    finish: 'Fast absorb, weightless',
    fragranceFree: true,
    crueltyFree: true,
    pros: [
      'Freshly blended weekly in the USA in airless opaque pump dispenser',
      'Remarkable $27 price tag vs $185 luxury counterparts',
      'Rapid fade of post-inflammatory erythema (PIE) and dark acne spots'
    ],
    cons: [
      '20% concentration may be too potent for compromised barriers',
      'Must be stored away from direct sunlight or refrigerated'
    ],
    editorVerdict: 'The most celebrated high-potency vitamin C serum in skincare Reddit history. It actually works, dispenses cleanly, and does not break the bank.',
    scienceTake: 'Formulated at pH 2.4 with 20% active L-ascorbic acid, optimized for maximum epidermal uptake and tyrosinase enzyme inhibition.',
    clinicalResults: '89% demonstrated visible fading of post-acne pigmentation marks in 4 weeks.',
    merchants: [
      {
        name: 'Timeless Direct',
        price: 27,
        originalPrice: 32,
        inStock: true,
        promoCode: 'VOXTIMELESS',
        promoDiscount: '15% Off Sitewide',
        affiliateUrl: 'https://www.timelessha.com',
        isBestValue: true,
      },
      {
        name: 'Target',
        price: 27,
        inStock: true,
        affiliateUrl: 'https://www.target.com',
      },
      {
        name: 'Amazon Prime',
        price: 27,
        inStock: true,
        affiliateUrl: 'https://www.amazon.com',
      }
    ]
  }
];

export const DUPE_DATABASE: DupeComparison[] = [
  {
    id: 'dupe-skinceuticals-timeless',
    luxuryProduct: {
      name: 'C E Ferulic Serum',
      brand: 'SkinCeuticals',
      price: 185,
      size: '30 ml (1.0 oz)',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      keyActives: '15% L-Ascorbic Acid, 1% Alpha Tocopherol, 0.5% Ferulic Acid (pH 2.5)',
      merchant: {
        name: 'Dermstore',
        price: 185,
        promoCode: 'DERMVOX15',
        promoDiscount: '15% Off',
        affiliateUrl: 'https://www.dermstore.com',
        inStock: true,
      }
    },
    smartDupe: {
      name: '20% Vitamin C + E Ferulic Acid',
      brand: 'Timeless Skin Care',
      price: 27,
      size: '30 ml (1.0 oz)',
      image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=800&q=80',
      keyActives: '20% L-Ascorbic Acid, 1% Vitamin E, 0.5% Ferulic Acid (pH 2.4)',
      merchant: {
        name: 'Timeless Direct',
        price: 27,
        promoCode: 'VOXTIMELESS',
        promoDiscount: '15% Off',
        affiliateUrl: 'https://www.timelessha.com',
        inStock: true,
        isBestValue: true,
      }
    },
    similarityScore: 94,
    savingsAmount: 158,
    verdict: 'The Timeless serum is in an airless pump which prevents oxidation better than SkinCeuticals dropper bottle, saving you $158 with 94% formula equivalence.',
    formulaMatchNotes: 'Identical key active trio (Ascorbic + Tocopherol + Ferulic). Timeless is slightly higher concentration (20% vs 15%) and packaged in a vacuum airless bottle.'
  },
  {
    id: 'dupe-lamer-avene',
    luxuryProduct: {
      name: 'Crème de la Mer Moisturizing Cream',
      brand: 'La Mer',
      price: 380,
      size: '60 ml (2.0 oz)',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      keyActives: 'Miracle Broth (Fermented Sea Kelp), Mineral Oil, Petrolatum, Lime Tea',
      merchant: {
        name: 'Nordstrom',
        price: 380,
        affiliateUrl: 'https://www.nordstrom.com',
        inStock: true,
      }
    },
    smartDupe: {
      name: 'Cicalfate+ Restorative Protective Cream',
      brand: 'Avène',
      price: 28,
      size: '100 ml (3.3 oz)',
      image: 'https://images.unsplash.com/photo-1556228722-d0b97772718c?auto=format&fit=crop&w=800&q=80',
      keyActives: '[C+-Restore] Postbiotic, Copper-Zinc Sulfate, Avène Thermal Spring Water',
      merchant: {
        name: 'Dermstore',
        price: 28,
        promoCode: 'DERMVOX15',
        promoDiscount: '15% Off',
        affiliateUrl: 'https://www.dermstore.com',
        inStock: true,
        isBestValue: true,
      }
    },
    similarityScore: 91,
    savingsAmount: 352,
    verdict: 'Avène Cicalfate+ provides superior clinical barrier repair for post-procedure or sensitized skin, without heavy comedogenic fragrance, at a 92% savings.',
    formulaMatchNotes: 'Both provide an intensive occlusive protective shield. Avène replaces fragrance with postbiotic repair factors and micronized zinc for calmer skin.'
  },
  {
    id: 'dupe-bader-rhode',
    luxuryProduct: {
      name: 'The Rich Cream',
      brand: 'Augustinus Bader',
      price: 290,
      size: '50 ml (1.7 oz)',
      image: 'https://images.unsplash.com/photo-1608248597359-0a69a9e334aa?auto=format&fit=crop&w=800&q=80',
      keyActives: 'TFC8 Trigger Factor Complex, Evening Primrose Oil, Squalane, Hyaluronic',
      merchant: {
        name: 'Sephora',
        price: 290,
        affiliateUrl: 'https://www.sephora.com',
        inStock: true,
      }
    },
    smartDupe: {
      name: 'Barrier Butter Intensive Moisture Balm',
      brand: 'Rhode Skin',
      price: 38,
      size: '50 ml (1.7 oz)',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
      keyActives: 'Polyglutamic Acid, Murumuru Butter, Hyaluronic Complex, Peptides',
      merchant: {
        name: 'Rhode Skin Direct',
        price: 38,
        promoCode: 'RHODEGLOW',
        promoDiscount: 'Free Lip Treatment with Duo',
        affiliateUrl: 'https://www.rhodeskin.com',
        inStock: true,
        isBestValue: true,
      }
    },
    similarityScore: 88,
    savingsAmount: 252,
    verdict: 'Rhode gives you the exact same cushiony dewy slip and moisture lock for $38 instead of $290, saving over $250 per jar.',
    formulaMatchNotes: 'Rich lipid-replenishing moisture balm that leaves a glazed protective layer. Both utilize bio-mimetic peptides and intensive humectants.'
  }
];

export const INGREDIENT_DIRECTORY: IngredientProfile[] = [
  {
    id: 'retinoids',
    name: 'Retinoids (Retinol & Retinaldehyde)',
    category: 'Cellular Turnover & Collagen',
    benefits: ['Smooths fine lines & wrinkles', 'Fades post-inflammatory hyperpigmentation', 'Unclogs comedones & shrinks pore appearance', 'Stimulates dermal procollagen synthesis'],
    bestFor: 'Aging skin, stubborn texture, mature skin, adult acne',
    howToUse: 'PM routine only. Apply pea-sized amount onto dry skin 2-3 nights per week. Always follow with SPF 50+ each morning.',
    phRange: 'pH 5.0 - 6.5',
    pairWith: ['Ceramides', 'Hyaluronic Acid', 'Niacinamide', 'Centella Asiatica'],
    avoidPairing: ['Direct AHA/BHA Acids in the same application', 'Pure 15%+ L-Ascorbic Acid (alternate AM/PM)'],
    editorNote: 'Retinaldehyde (Retinal) works 11x faster than retinol because it only requires one metabolic conversion step to active retinoic acid.',
    topPickProductId: 'medik8-crystal-retinal-6'
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C (L-Ascorbic Acid & THD Ascorbate)',
    category: 'Antioxidant & Tyrosinase Inhibitor',
    benefits: ['Scavenges UV and ozone free radicals', 'Brightens sun spots & melasma', 'Boosts daytime sunscreen efficacy', 'Supports collagen production'],
    bestFor: 'Dullness, uneven skin tone, sun damage, city dwellers exposed to pollution',
    howToUse: 'AM routine directly after cleansing. Allow 60 seconds to absorb before applying moisturizer and broad-spectrum SPF.',
    phRange: 'pH 2.5 - 3.5 (L-Ascorbic Acid)',
    pairWith: ['Vitamin E', 'Ferulic Acid', 'Hyaluronic Acid', 'Broad Spectrum SPF'],
    avoidPairing: ['Benzoyl Peroxide (oxidizes vitamin C)', 'Copper Peptides (can destabilize pure L-ascorbic acid)'],
    editorNote: 'Check the color! Pure L-Ascorbic acid should be champagne or pale straw color. If it turns deep amber or dark brown, it has oxidized.',
    topPickProductId: 'skinceuticals-ce-ferulic'
  },
  {
    id: 'salicylic-acid',
    name: 'Salicylic Acid (Beta Hydroxy Acid - BHA)',
    category: 'Lipophilic Chemical Exfoliant',
    benefits: ['Dissolves sebum deep inside pore linings', 'Calms acne inflammation & redness', 'Refines bumpy skin texture (keratosis pilaris)', 'Prevents blackhead recurrence'],
    bestFor: 'Oily, acne-prone, congested, and combination skin types',
    howToUse: '2-3 nights per week after cleansing. Sweep gently over t-zone and congested areas. Do not rinse.',
    phRange: 'pH 3.0 - 4.0',
    pairWith: ['Niacinamide', 'Hyaluronic Acid', 'Ceramides', 'Centella'],
    avoidPairing: ['Prescription Tretinoin on the same night', 'High % Glycolic Acid (risk of barrier burn)'],
    editorNote: 'Because BHA is oil-soluble, it can travel through sebum pools where water-soluble AHAs simply slip off.',
    topPickProductId: 'paulas-choice-bha-liquid'
  },
  {
    id: 'ceramides',
    name: 'Ceramides (NP, AP, EOP) & Barrier Lipids',
    category: 'Epidermal Barrier Repair',
    benefits: ['Restores compromised acid mantle', 'Halts trans-epidermal water loss (TEWL)', 'Soothes stinging, flaking, and irritation', 'Buffers against retinoid peeling'],
    bestFor: 'All skin types, especially sensitized, over-exfoliated, or dry skin',
    howToUse: 'AM and PM daily as the core moisturizer or serum step. Generously apply whenever skin feels tight or flushed.',
    phRange: 'pH 5.0 - 7.0',
    pairWith: ['Everything! Universal skin-identical barrier booster.'],
    avoidPairing: ['No known negative interactions.'],
    editorNote: 'The gold standard ratio is 3:1:1 (3 parts ceramides, 1 part cholesterol, 1 part free fatty acids). Look for all three on the ingredient deck.',
    topPickProductId: 'dieux-air-angel'
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    category: 'Multi-Benefit Cell-Communicating Agent',
    benefits: ['Regulates excess sebum production', 'Strengthens barrier via ceramide synthesis', 'Reduces redness & blotchiness', 'Inhibits melanosome transfer to lighten spots'],
    bestFor: 'Enlarged pores, redness, oily sheen, sensitive barrier',
    howToUse: 'AM and PM routines. Optimal clinical sweet spot is 2% to 5% concentration.',
    phRange: 'pH 5.0 - 6.5',
    pairWith: ['Hyaluronic Acid', 'Retinol', 'Salicylic Acid', 'Zinc PCA', 'Centella'],
    avoidPairing: ['Extremely low-pH unbuffered acids if your skin is prone to flushing'],
    editorNote: 'Higher is NOT better: concentrations above 10% frequently trigger dermatitis and irritation. Stick to 2-5% for maximum clinical benefit.',
    topPickProductId: 'dieux-air-angel'
  },
  {
    id: 'peptides',
    name: 'Peptides (Signal, Carrier & Copper Peptides)',
    category: 'Extracellular Matrix Support',
    benefits: ['Promotes collagen & elastin remodeling', 'Improves skin firmness & bounce', 'Accelerates wound healing and post-acne repair', 'Hydrates without heavy grease'],
    bestFor: 'Loss of elasticity, fine lines, sensitized barriers that cannot tolerate retinoids',
    howToUse: 'AM and PM. Safe to use twice daily under face cream.',
    phRange: 'pH 5.5 - 7.0',
    pairWith: ['Hyaluronic Acid', 'Ceramides', 'Niacinamide'],
    avoidPairing: ['Strong direct acids (AHA/BHA) with copper peptides specifically'],
    editorNote: 'Copper Peptides (GHK-Cu) are remarkable for skin recovery and barrier rebuilding after lasers, peels, or retinoid burns.',
    topPickProductId: 'medik8-crystal-retinal-6'
  }
];

export const PROMO_DEALS: PromoDeal[] = [
  {
    id: 'deal-dermstore-exclusive',
    retailer: 'Dermstore',
    discount: '15% Off Sitewide',
    code: 'DERMVOX15',
    expires: 'Nov 30, 2026',
    description: 'Valid on over 300+ medical-grade and luxury skincare brands including SkinCeuticals, Medik8, and Sunday Riley.',
    exclusive: true,
    affiliateUrl: 'https://www.dermstore.com',
    minimumSpend: '$50'
  },
  {
    id: 'deal-paulas-choice',
    retailer: "Paula's Choice",
    discount: '20% Off + Free Gift',
    code: 'VOX20',
    expires: 'Dec 15, 2026',
    description: 'Get 20% off full sizes plus a complimentary travel-size 2% BHA liquid on orders over $65.',
    exclusive: true,
    affiliateUrl: 'https://www.paulaschoice.com',
    minimumSpend: '$45'
  },
  {
    id: 'deal-yesstyle-kbeauty',
    retailer: 'YesStyle K-Beauty',
    discount: '12% Extra Off',
    code: 'DERMVOXYS',
    expires: 'Ongoing 2026',
    description: 'Stackable code on top of existing Korean skincare sale prices. Valid for Beauty of Joseon, COSRX, Anua & Round Lab.',
    exclusive: true,
    affiliateUrl: 'https://www.yesstyle.com'
  },
  {
    id: 'deal-timeless-skin',
    retailer: 'Timeless Skin Care',
    discount: '$5 Off + Free Ship',
    code: 'VOXTIMELESS',
    expires: 'Dec 31, 2026',
    description: 'Valid on all 20% Vitamin C + E Ferulic Acid and Matrixyl Synthe 6 serums with fresh-batch guarantee.',
    exclusive: true,
    affiliateUrl: 'https://www.timelessha.com'
  },
  {
    id: 'deal-cultbeauty',
    retailer: 'Cult Beauty UK & Global',
    discount: '15% Off First Order',
    code: 'FIRST15VOX',
    expires: 'Dec 31, 2026',
    description: 'Exclusive welcome voucher for our readers on luxury skincare curations.',
    exclusive: false,
    affiliateUrl: 'https://www.cultbeauty.com',
    minimumSpend: '£25 / $35'
  }
];
