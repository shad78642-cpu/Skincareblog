export interface BlogProductLink {
  productId: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  promoCode?: string;
  promoDiscount?: string;
  affiliateUrl: string;
  retailer: string;
  image: string;
  whyEditorLovesIt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: 'Product Reviews' | 'Routines & Protocols' | 'Dupes & Economics' | 'Ingredient Science' | 'Barrier Health';
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured: boolean;
  content: {
    intro: string[];
    sections: {
      heading: string;
      paragraphs: string[];
      highlightQuote?: string;
      featuredProduct?: BlogProductLink;
    }[];
    conclusion: string;
  };
  taggedProductIds: string[];
  likesCount: number;
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'why-i-stopped-buying-180-vitamin-c',
    title: 'Why I Stopped Buying $180 Vitamin C Serums (And The $27 Dupe I Buy In Bulk)',
    excerpt: 'For four years, I swore by high-end antioxidant serums. Then our lab tested the chemical stability of fresh-batch L-Ascorbic acid in airless pumps. Here is what happened to my skin.',
    coverImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
    category: 'Dupes & Economics',
    readTime: '5 min read',
    publishDate: 'Oct 14, 2026',
    author: {
      name: 'Shad',
      role: 'Skincare Researcher & Clinical Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    featured: true,
    likesCount: 248,
    taggedProductIds: ['timeless-20-vit-c', 'skinceuticals-ce-ferulic'],
    content: {
      intro: [
        'If you have been in the skincare community for longer than five minutes, you already know the gospel of Vitamin C. It is the premier morning active for neutralizing free radicals, brightening sun damage, and stimulating collagen synthesis.',
        'For years, the gold standard has been SkinCeuticals C E Ferulic. At $185 a bottle, it holds the famous Duke patent. But here is the dirty secret the beauty industry does not want you to think about: L-ascorbic acid oxidizes the second it contacts ambient air.'
      ],
      sections: [
        {
          heading: 'The Dropper Bottle Dilemma',
          paragraphs: [
            'Every single time you unscrew a standard glass dropper, oxygen enters the bottle. Within six to eight weeks, that champagne-gold liquid turns a deep rust color. Once vitamin C oxidizes into dehydroascorbic acid, it no longer provides antioxidant photoprotection—in fact, it can generate pro-oxidant cellular stress.',
            'Spending nearly two hundred dollars on a product that starts degrading the moment you break the seal began feeling less like an investment and more like a tax.'
          ],
          highlightQuote: 'Vitamin C is only as good as the seal keeping oxygen out of the bottle.'
        },
        {
          heading: 'The Fresh Batch Airless Pump Winner',
          paragraphs: [
            'Enter Timeless 20% Vitamin C + E Ferulic Acid. Rather than using an open dropper, Timeless packages their formula inside a true vacuum-sealed airless pump with an opaque wall.',
            'The formula features 20% pure L-ascorbic acid formulated at a bioavailable pH of 2.4, buffered with 1% alpha tocopherol (Vitamin E) and 0.5% ferulic acid. They blend fresh batches weekly in the USA, meaning you receive an active bottle that stays crystal pale for months.'
          ],
          featuredProduct: {
            productId: 'timeless-20-vit-c',
            name: '20% Vitamin C + E Ferulic Acid Serum',
            brand: 'Timeless Skin Care',
            price: 27,
            originalPrice: 32,
            promoCode: 'VOXTIMELESS',
            promoDiscount: '15% Off Sitewide',
            retailer: 'Timeless Direct',
            affiliateUrl: 'https://www.timelessha.com',
            image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=800&q=80',
            whyEditorLovesIt: 'Airless vacuum pump keeps the formula stable for 4+ months. Fades post-acne dark marks at 1/6th the cost of luxury serums.'
          }
        },
        {
          heading: 'How To Layer It For Maximum Morning Photoprotection',
          paragraphs: [
            'Apply 4 pumps onto freshly cleansed, towel-dried skin. Give it approximately 60 to 90 seconds to absorb into your stratum corneum before applying your moisturizer.',
            'Because Vitamin C provides biological photoprotection from within the skin cells, pairing it underneath a broad-spectrum SPF 50 creates an impenetrable shield against both UVB burns and deep UVA collagen breakdown.'
          ]
        }
      ],
      conclusion: 'Save the $158 difference and spend it on dermatologist treatments or a year supply of Japanese/Korean sunscreen. Your skin—and your bank account—will thank you.'
    }
  },
  {
    id: 'post-2',
    slug: 'the-retinoid-guide-without-peeling',
    title: 'How To Start A Retinoid Without Destroying Your Barrier (The 2026 Protocol)',
    excerpt: 'Retinaldehyde acts 11x faster than retinol with zero the flaking. Here is the exact sandwich technique and product pairings I recommend to our readers.',
    coverImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=80',
    category: 'Routines & Protocols',
    readTime: '6 min read',
    publishDate: 'Oct 11, 2026',
    author: {
      name: 'Shad',
      role: 'Skincare Researcher & Clinical Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    featured: false,
    likesCount: 312,
    taggedProductIds: ['medik8-crystal-retinal-6', 'dieux-air-angel'],
    content: {
      intro: [
        'Almost everyone who abandons vitamin A does so for the same reason: the dreaded retinoid purge, paired with tight, flaky skin that burns when applying even the gentlest moisturizer.',
        'It does not have to be this way. Modern cosmetic chemistry has evolved past unstable, irritating retinol formulations.'
      ],
      sections: [
        {
          heading: 'Why Retinaldehyde (Retinal) Changes The Game',
          paragraphs: [
            'Standard retinol requires TWO metabolic conversion steps inside your skin cells: Retinol -> Retinaldehyde -> Retinoic Acid. Every conversion step loses potency and triggers free-radical byproducts on the skin surface.',
            'Retinaldehyde is only ONE conversion step away from active retinoic acid. It works up to 11 times faster than retinol, yet because it requires fewer conversion enzymes, clinical studies show it triggers significantly less erythema and dryness.'
          ],
          featuredProduct: {
            productId: 'medik8-crystal-retinal-6',
            name: 'Crystal Retinal 6 Stable Retinal Night Serum',
            brand: 'Medik8',
            price: 83,
            promoCode: 'DERMRETINAL',
            promoDiscount: '15% Off Reader Exclusive',
            retailer: 'Medik8 Direct',
            affiliateUrl: 'https://www.medik8.com',
            image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
            whyEditorLovesIt: 'Patented crystal encapsulation releases active retinal over 8 hours while you sleep. Yields prescription-grade smoothness without flaking.'
          }
        },
        {
          heading: 'The Ceramide Buffer "Sandwich" Method',
          paragraphs: [
            'If you have sensitive or dry skin, never apply pure retinoids directly onto bare damp skin. Damp skin increases trans-follicular absorption velocity, which spikes stinging.',
            'Instead, apply a thin layer of a water-light, ceramide-rich gel-cream first. Let it dry for 3 minutes, apply your pea-sized retinal, and seal with a second light layer. This slows active release and protects the lipid bilayers.'
          ],
          featuredProduct: {
            productId: 'dieux-air-angel',
            name: 'Air Angel Hydrating Gel-Cream',
            brand: 'Dieux Skin',
            price: 44,
            promoCode: 'VOXANGEL',
            promoDiscount: '10% Off Orders Over $40',
            retailer: 'Dieux Skin Official',
            affiliateUrl: 'https://www.dieuxskin.com',
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
            whyEditorLovesIt: 'Packed with 10% glycerin and a 3:1:1 ceramide complex. Cushions skin against active peeling without clogging pores.'
          }
        }
      ],
      conclusion: 'Remember the golden rule: slow is smooth, and smooth is fast. Start two evenings a week for 14 days before graduating to every other night.'
    }
  },
  {
    id: 'post-3',
    slug: 'the-daily-sunscreen-that-feels-like-water',
    title: 'I Hate Sunscreen. Here Is The Only Korean SPF 50 I Wear Daily.',
    excerpt: 'White cast, stinging eyes, and greasy shine make daily sun protection a chore. This $15 rice-ferment sunscreen feels identical to a cloud moisturizer.',
    coverImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    category: 'Product Reviews',
    readTime: '4 min read',
    publishDate: 'Oct 08, 2026',
    author: {
      name: 'Shad',
      role: 'Skincare Researcher & Clinical Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    featured: false,
    likesCount: 189,
    taggedProductIds: ['beauty-of-joseon-relief-sun'],
    content: {
      intro: [
        'Dermatologists agree: 90% of visible skin aging (collagen breakdown, fine lines, dark pigmentation spots) is caused by daily ultraviolet exposure. You can spend thousands on serums, but if you do not wear SPF daily, you are pouring water into a leaky bucket.',
        'The problem is that most Western mineral or old-school chemical sunscreens feel awful. They leave an embarrassing chalky white cast on darker skin tones, burn your eyes when you sweat, or pill underneath foundation.'
      ],
      sections: [
        {
          heading: 'The Korean UV Filter Revolution',
          paragraphs: [
            'While US sunscreen regulations have been stalled since the 1990s, Asian and European labs have access to next-generation organic filters like Uvinul A Plus and Tinosorb S. These filters are photostable, have much larger molecular sizes that do not penetrate into bloodstream pathways, and leave zero white ghost cast.',
            'Beauty of Joseon combined these filters with 30% fermented rice bran extract and grain probiotics.'
          ],
          featuredProduct: {
            productId: 'beauty-of-joseon-relief-sun',
            name: 'Relief Sun: Rice + Probiotics SPF 50+ PA++++',
            brand: 'Beauty of Joseon',
            price: 14.50,
            originalPrice: 18,
            promoCode: 'DERMVOXYS',
            promoDiscount: 'Extra 10% Off',
            retailer: 'YesStyle K-Beauty',
            affiliateUrl: 'https://www.yesstyle.com',
            image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
            whyEditorLovesIt: 'Dissolves instantly like a dewy daytime lotion. Zero eye sting, zero white cast on all skin tones, costs under $15.'
          }
        }
      ],
      conclusion: 'If you struggle to apply sunscreen every single morning, this single product will cure your hesitation. Keep one tube in your bathroom and one in your work bag.'
    }
  },
  {
    id: 'post-4',
    slug: 'the-bha-solution-for-stubborn-blackheads',
    title: 'Blackheads vs Sebaceous Filaments: The 2% BHA Solution That Works In 5 Days',
    excerpt: 'Those tiny dark dots on your nose are probably not blackheads. Here is how to dissolve them using lipophilic salicylic acid without over-stripping your barrier.',
    coverImage: 'https://images.unsplash.com/photo-1608248597359-0a69a9e334aa?auto=format&fit=crop&w=1200&q=80',
    category: 'Ingredient Science',
    readTime: '5 min read',
    publishDate: 'Oct 04, 2026',
    author: {
      name: 'Shad',
      role: 'Skincare Researcher & Clinical Editor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    featured: false,
    likesCount: 215,
    taggedProductIds: ['paulas-choice-bha-liquid'],
    content: {
      intro: [
        'Notice those tiny greyish dots covering your nose and chin? Squeezing them in the mirror feels satisfying for about twelve minutes until they refill the next morning.',
        'Those are sebaceous filaments—natural channels that conduct sebum to your skin surface. You cannot permanently erase them, but you can dissolve the oxidized surface plug with oil-soluble salicylic acid.'
      ],
      sections: [
        {
          heading: 'Why AHAs Fail Where BHA Succeeds',
          paragraphs: [
            'Glycolic and lactic acids (AHAs) are water-soluble. When they encounter an oily pore filled with sebum, they literally slip right off the surface.',
            'Salicylic acid (BHA) is lipid-soluble. It travels down into the sebaceous follicle, dissolving the sticky mixture of hardened sebum and dead keratinocytes from the inside out.'
          ],
          featuredProduct: {
            productId: 'paulas-choice-bha-liquid',
            name: 'Skin Perfecting 2% BHA Liquid Exfoliant',
            brand: "Paula's Choice",
            price: 35,
            originalPrice: 38,
            promoCode: 'VOX20',
            promoDiscount: '20% Off + Free Travel Size',
            retailer: "Paula's Choice Direct",
            affiliateUrl: 'https://www.paulaschoice.com',
            image: 'https://images.unsplash.com/photo-1608248597359-0a69a9e334aa?auto=format&fit=crop&w=800&q=80',
            whyEditorLovesIt: 'The undisputed holy grail pore exfoliant formulated at the precise pH of 3.2 to 3.8 for maximum unclogging.'
          }
        }
      ],
      conclusion: 'Use it 3 evenings a week with clean hands. Pat it directly onto your t-zone and follow with your moisturizer.'
    }
  }
];
