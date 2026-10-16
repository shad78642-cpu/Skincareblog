import React, { useState } from 'react';
import { ArrowRight, Star, Sparkles, Shield, Droplets, CheckCircle2, Tag, Layers, Flame, ExternalLink, Heart } from 'lucide-react';
import { PRODUCTS, DUPE_DATABASE, ReviewItem, AffiliateMerchant } from '../data/skincareData';

import { BlogPost } from '../data/blogData';

interface HomePageProps {
  onSelectTab: (tab: string) => void;
  onOpenProduct: (product: ReviewItem) => void;
  onOpenAffiliate: (productName: string, merchant: AffiliateMerchant) => void;
  onToggleSave: (productId: string) => void;
  savedIds: string[];
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onOpenProduct,
  onOpenAffiliate,
  onToggleSave,
  savedIds,
  posts,
  onSelectPost,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('All');

  const holyGrailProducts = PRODUCTS.slice(0, 4);

  const goalFilteredProducts = selectedGoal === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => {
        if (selectedGoal === 'Barrier Repair') return p.concerns.includes('Barrier Repair');
        if (selectedGoal === 'Acne & Pores') return p.concerns.includes('Acne & Blemishes') || p.concerns.includes('Texture');
        if (selectedGoal === 'Anti-Aging') return p.concerns.includes('Anti-Aging');
        if (selectedGoal === 'Brightening') return p.concerns.includes('Hyperpigmentation') || p.concerns.includes('Dullness');
        return true;
      });

  const featuredDupe = DUPE_DATABASE[0];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-16 overflow-hidden border-b border-[#EAE2D8]">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-10 right-[-10%] w-[500px] h-[500px] bg-[#E5EDE6]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] bg-[#F5EFEB] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EAE2D8] text-xs font-semibold text-[#5C7764] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B85D3B]" />
                <span>The Evidence-First Skincare Publication</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#181513] tracking-tight leading-[1.12]">
                Formulas dissected. <br />
                <span className="italic font-normal text-[#B85D3B]">Unbiased reviews.</span> <br />
                Exclusive reader pricing.
              </h1>

              <p className="text-base sm:text-lg text-[#4A423A] leading-relaxed max-w-xl">
                We independently test active ingredient concentrations, pH bioavailability, and clinical results so you never waste money on over-hyped skincare again.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectTab('blog')}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all shadow-md hover:shadow-lg cursor-pointer group"
                >
                  <span>Read The Skincare Blog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectTab('write')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-[#181513] bg-white border border-[#EAE2D8] hover:border-[#B85D3B] transition-all cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-[#C59A45]" />
                  <span>+ Write & Publish Post</span>
                </button>
              </div>

              {/* Trust Metrics Bar */}
              <div className="pt-6 border-t border-[#EAE2D8] grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl font-extrabold text-[#181513]">140+</div>
                  <div className="text-xs text-[#4A423A]">Lab Formulas Tested</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#5C7764]">100%</div>
                  <div className="text-xs text-[#4A423A]">Independent & Blind</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#B85D3B]">$420k+</div>
                  <div className="text-xs text-[#4A423A]">Reader Savings Tracked</div>
                </div>
              </div>
            </div>

            {/* Right Hero Card: Spotlight Holy Grail */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white border border-[#EAE2D8] rounded-2xl p-6 shadow-xl overflow-hidden group">
                <div className="absolute top-4 right-4 bg-[#B85D3B] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  #1 Holy Grail 2026
                </div>

                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#FAF8F5] mb-5">
                  <img
                    src={holyGrailProducts[0].image}
                    alt={holyGrailProducts[0].name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#181513]/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#C59A45] text-[#C59A45]" />
                    <span className="font-bold">{holyGrailProducts[0].rating}</span>
                    <span className="text-[10px] opacity-75">(1,420 reviews)</span>
                  </div>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-[#B85D3B] mb-1">
                  {holyGrailProducts[0].brand}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#181513] leading-snug mb-2">
                  {holyGrailProducts[0].name}
                </h3>
                <p className="text-xs text-[#4A423A] line-clamp-2 mb-4">
                  {holyGrailProducts[0].tagline}
                </p>

                {/* Retailer affiliate card inside */}
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#4A423A]">Dermstore Exclusive</span>
                    <div className="text-base font-extrabold text-[#181513]">
                      ${holyGrailProducts[0].merchants[0].price.toFixed(2)}
                      <span className="ml-2 text-xs font-mono text-[#5C7764] bg-[#E5EDE6] px-1.5 py-0.5 rounded">
                        15% Off w/ code
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenAffiliate(holyGrailProducts[0].name, holyGrailProducts[0].merchants[0])}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2C2621] hover:bg-[#181513] transition-all cursor-pointer shadow-xs"
                  >
                    <span>Claim</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onOpenProduct(holyGrailProducts[0])}
                    className="text-xs font-semibold text-[#B85D3B] hover:text-[#9E492B] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Clinical Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onToggleSave(holyGrailProducts[0].id)}
                    className="p-1.5 rounded-full text-[#4A423A] hover:text-rose-600 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${savedIds.includes(holyGrailProducts[0].id) ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FRESH FROM THE SKINCARE BLOG (SHOPPABLE GUIDES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D3B] mb-2">
              <Sparkles className="w-4 h-4 text-[#C59A45]" />
              <span>Unfiltered Formula Teardowns</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181513]">
              Fresh From The Skincare Blog
            </h2>
            <p className="text-sm text-[#4A423A] mt-1 max-w-xl">
              I post weekly deep-dives into active ingredients, honest routines, and verified discount links where you can purchase genuine formulas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('write')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FAF8F5] border border-[#EAE2D8] hover:border-[#B85D3B] text-[#181513] transition-colors cursor-pointer"
            >
              + Write New Post
            </button>
            <button
              onClick={() => onSelectTab('blog')}
              className="flex items-center gap-1.5 text-xs font-bold text-[#B85D3B] hover:text-[#9E492B] transition-colors cursor-pointer"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              onClick={() => {
                onSelectPost(post);
                onSelectTab('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-[#EAE2D8] rounded-2xl p-5 hover:border-[#B85D3B]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-[#FAF8F5] mb-4">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#181513]/85 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-xs">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#4A423A] mb-1.5">
                  <span className="text-[#B85D3B] font-semibold">{post.readTime}</span>
                  <span>•</span>
                  <span>{post.publishDate}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#181513] leading-snug group-hover:text-[#B85D3B] transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-[#4A423A] line-clamp-2 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#EAE2D8]"
                  />
                  <span className="text-xs font-semibold text-[#181513]">By {post.author.name}</span>
                </div>

                <span className="text-[11px] font-bold text-[#5C7764] bg-[#E5EDE6] px-2 py-0.5 rounded-md">
                  Includes Buy Links
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. THE EDITORIAL HOLY GRAIL CURATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5C7764] mb-2">
              <Flame className="w-4 h-4 text-[#B85D3B]" />
              <span>Tested & Clinically Proven</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181513]">
              The Holy Grail Hall of Fame
            </h2>
            <p className="text-sm text-[#4A423A] mt-1 max-w-xl">
              Products that have maintained a 9.4+ scientific efficacy rating after 6 weeks of clinical barrier and corneometer evaluations.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('reviews')}
            className="flex items-center gap-2 text-sm font-semibold text-[#B85D3B] hover:text-[#9E492B] transition-colors cursor-pointer self-start md:self-end"
          >
            <span>View All Reviewed Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {holyGrailProducts.map((product) => {
            const bestMerchant = product.merchants[0];
            const isSaved = savedIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="flex flex-col justify-between bg-white border border-[#EAE2D8] rounded-2xl p-5 hover:border-[#B85D3B]/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF8F5] mb-4">
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
                      className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer shadow-xs ${
                        isSaved ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-[#4A423A] hover:text-rose-600'
                      }`}
                      aria-label="Save product"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#B85D3B] uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1 font-bold text-[#181513]">
                      <Star className="w-3.5 h-3.5 fill-[#C59A45] text-[#C59A45]" />
                      <span>{product.rating}</span>
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

                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.heroActives.slice(0, 2).map((act, i) => (
                      <span key={i} className="text-[10px] font-medium bg-[#F5EFEB] text-[#4A423A] px-2 py-0.5 rounded">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Affiliate Trigger */}
                <div className="pt-3 border-t border-[#F5EFEB] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#4A423A] uppercase tracking-wider">From</span>
                      <div className="text-base font-bold text-[#181513]">
                        ${bestMerchant.price.toFixed(2)}
                      </div>
                    </div>
                    {bestMerchant.promoCode && (
                      <span className="text-[10px] font-mono font-bold bg-[#E5EDE6] text-[#47604F] px-2 py-1 rounded">
                        {bestMerchant.promoCode}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenProduct(product)}
                      className="py-2 px-3 rounded-lg text-xs font-semibold text-[#181513] bg-[#FAF8F5] border border-[#EAE2D8] hover:bg-[#EAE2D8] transition-colors cursor-pointer text-center"
                    >
                      Deep Dive
                    </button>
                    <button
                      onClick={() => onOpenAffiliate(product.name, bestMerchant)}
                      className="py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                    >
                      <span>Shop</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE DUPE SPOTLIGHT (Affiliate Conversion Driver) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#EAE2D8] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#B85D3B] mb-2">
              <Layers className="w-4 h-4" />
              <span>Smart Skincare Economics</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181513] leading-tight">
              Why Spend $185 When The $27 Clinical Alternative Has 94% Formula Match?
            </h2>
            <p className="text-sm text-[#4A423A] mt-2">
              Our cosmetic chemists cross-reference molecular concentrations and pH ranges to reveal true dupes that save you hundreds without sacrificing your skin barrier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Luxury Card */}
            <div className="md:col-span-5 bg-white border border-[#EAE2D8] rounded-2xl p-5 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#4A423A] px-2.5 py-1 rounded-md bg-[#FAF8F5]">
                The Luxury Benchmark
              </span>
              <div className="flex gap-4 mt-4">
                <img
                  src={featuredDupe.luxuryProduct.image}
                  alt={featuredDupe.luxuryProduct.name}
                  className="w-20 h-20 rounded-xl object-cover bg-[#F5EFEB] shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-[#B85D3B] uppercase">
                    {featuredDupe.luxuryProduct.brand}
                  </div>
                  <h4 className="text-sm font-bold text-[#181513]">
                    {featuredDupe.luxuryProduct.name}
                  </h4>
                  <div className="text-base font-extrabold text-[#181513] mt-1">
                    ${featuredDupe.luxuryProduct.price}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#4A423A] mt-3 pt-3 border-t border-[#F5EFEB]">
                {featuredDupe.luxuryProduct.keyActives}
              </p>
            </div>

            {/* Middle Savings Badge */}
            <div className="md:col-span-2 text-center py-2">
              <div className="inline-flex flex-col items-center justify-center p-4 rounded-2xl bg-[#E5EDE6] border border-[#5C7764]/20 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#47604F]">You Save</span>
                <span className="text-3xl font-black text-[#47604F]">${featuredDupe.savingsAmount}</span>
                <span className="text-[10px] font-semibold text-[#5C7764]">Per Bottle</span>
              </div>
            </div>

            {/* Smart Dupe Card */}
            <div className="md:col-span-5 bg-white border-2 border-[#5C7764]/40 rounded-2xl p-5 shadow-md relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 px-2.5 py-1 rounded-md bg-[#E5EDE6]">
                  ★ Editor's Smart Dupe (94% Match)
                </span>
                <span className="text-xs font-bold text-[#5C7764]">Fresh Batch Blend</span>
              </div>
              <div className="flex gap-4 mt-2">
                <img
                  src={featuredDupe.smartDupe.image}
                  alt={featuredDupe.smartDupe.name}
                  className="w-20 h-20 rounded-xl object-cover bg-[#F5EFEB] shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-[#5C7764] uppercase">
                    {featuredDupe.smartDupe.brand}
                  </div>
                  <h4 className="text-sm font-bold text-[#181513]">
                    {featuredDupe.smartDupe.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-extrabold text-[#181513]">
                      ${featuredDupe.smartDupe.price}
                    </span>
                    <span className="text-xs line-through text-[#4A423A]/70">$32.00</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#4A423A] mt-3 pt-3 border-t border-[#F5EFEB]">
                {featuredDupe.formulaMatchNotes}
              </p>

              <div className="mt-4 pt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#5C7764]">
                  Code: VOXTIMELESS (15% Off)
                </span>
                <button
                  onClick={() => onOpenAffiliate(featuredDupe.smartDupe.name, featuredDupe.smartDupe.merchant)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#5C7764] hover:bg-[#47604F] transition-all cursor-pointer shadow-xs"
                >
                  <span>Shop Dupe for $27</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onSelectTab('deals-dupes')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B85D3B] hover:text-[#9E492B] cursor-pointer"
            >
              <span>Explore All Verified Skincare Dupes in the Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. GOAL-BASED REGIMEN FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5C7764] block mb-2">
            Targeted Regimens
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181513]">
            What Is Your Skin Craving Right Now?
          </h2>
          <p className="text-sm text-[#4A423A] mt-2">
            Select your primary skincare priority to instantly view vetted clinical solutions.
          </p>
        </div>

        {/* Goal Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {['All', 'Barrier Repair', 'Acne & Pores', 'Anti-Aging', 'Brightening'].map((goal) => (
            <button
              key={goal}
              onClick={() => setSelectedGoal(goal)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedGoal === goal
                  ? 'bg-[#181513] text-white shadow-sm'
                  : 'bg-white border border-[#EAE2D8] text-[#4A423A] hover:border-[#B85D3B]'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>

        {/* Filtered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goalFilteredProducts.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#EAE2D8] rounded-2xl p-5 hover:border-[#B85D3B] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#FAF8F5] mb-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#B85D3B] mb-1">
                  {item.brand}
                </div>
                <h4 className="font-serif text-lg font-bold text-[#181513] mb-2">
                  {item.name}
                </h4>
                <p className="text-xs text-[#4A423A] line-clamp-2 mb-3">
                  {item.tagline}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                <span className="text-base font-extrabold text-[#181513]">
                  ${item.merchants[0].price.toFixed(2)}
                </span>
                <button
                  onClick={() => onOpenProduct(item)}
                  className="text-xs font-semibold text-[#B85D3B] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Review & Retailers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THE DERMAVOX 5-TIER CLINICAL EVALUATION STANDARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C2621] text-[#FAF8F5] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C59A45] block mb-2">
              Our Integrity Guarantee
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              How We Evaluate Skincare: The 5-Point Rubric
            </h2>
            <p className="text-sm text-[#FAF8F5]/80 mt-2">
              We decline 80% of brand partnership requests. Only formulas that score 9.0+ across our independent scientific testing protocol earn our recommendation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Active Concentration',
                desc: 'We verify that hero ingredients meet true clinical efficacy thresholds (e.g. 15% Vitamin C, 2% BHA, 0.05%+ Retinal).'
              },
              {
                step: '02',
                title: 'pH Bioavailability',
                desc: 'Without the correct acidic pH, active molecules cannot permeate stratum corneum lipid bilayers.'
              },
              {
                step: '03',
                title: 'Sensorial Elegance',
                desc: 'A great formula must layer seamlessly under sunscreen and cosmetics without pilling or heavy grease.'
              },
              {
                step: '04',
                title: 'Corneometer Testing',
                desc: 'We measure trans-epidermal water loss (TEWL) and barrier hydration over a 42-day tester cohort.'
              },
              {
                step: '05',
                title: 'Price-to-Volume Ratio',
                desc: 'We benchmark active ingredient cost per milliliter against both mass-market and luxury counterparts.'
              }
            ].map((rubric) => (
              <div key={rubric.step} className="p-4 rounded-xl bg-[#181513]/60 border border-[#3E362F]">
                <span className="font-mono text-sm font-bold text-[#C59A45]">{rubric.step}</span>
                <h4 className="font-serif text-base font-bold mt-2 mb-1.5 text-white">{rubric.title}</h4>
                <p className="text-xs text-[#FAF8F5]/70 leading-relaxed">{rubric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION: SKIN ROUTINE BUILDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#E5EDE6]/50 border border-[#5C7764]/20 rounded-3xl p-8 sm:p-12">
          <Sparkles className="w-8 h-8 text-[#5C7764] mx-auto mb-3" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#181513] mb-3">
            Not Sure Which Actives Your Skin Needs?
          </h2>
          <p className="text-sm text-[#4A423A] max-w-xl mx-auto mb-6">
            Take our 60-second interactive clinical diagnostic. We'll build you a step-by-step AM/PM regimen tailored to your exact skin type and sensitivity profile.
          </p>
          <button
            onClick={() => onSelectTab('routine-builder')}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#5C7764] hover:bg-[#47604F] transition-all cursor-pointer shadow-md hover:shadow-lg"
          >
            Start The Free Diagnostic Quiz
          </button>
        </div>
      </section>
    </div>
  );
};
