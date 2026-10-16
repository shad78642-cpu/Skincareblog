import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Heart, Share2, Tag, ExternalLink, ShieldCheck, Check, Copy, ShoppingBag, Sparkles, Edit3, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BlogPost, BlogProductLink } from '../data/blogData';
import { AffiliateMerchant } from '../data/skincareData';

interface SingleArticlePageProps {
  post: BlogPost;
  onBack: () => void;
  onOpenAffiliate: (productName: string, merchant: AffiliateMerchant) => void;
  onSelectPost: (post: BlogPost) => void;
  allPosts: BlogPost[];
  onEditPost: (post: BlogPost) => void;
  onDeletePost?: (postId: string) => void;
}

export const SingleArticlePage: React.FC<SingleArticlePageProps> = ({
  post,
  onBack,
  onOpenAffiliate,
  onSelectPost,
  allPosts,
  onEditPost,
  onDeletePost,
}) => {
  const [likes, setLikes] = useState(post.likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleShopProduct = (featuredProd: BlogProductLink) => {
    const merchant: AffiliateMerchant = {
      name: featuredProd.retailer,
      price: featuredProd.price,
      originalPrice: featuredProd.originalPrice,
      inStock: true,
      promoCode: featuredProd.promoCode,
      promoDiscount: featuredProd.promoDiscount,
      affiliateUrl: featuredProd.affiliateUrl,
      isBestValue: true,
    };
    onOpenAffiliate(featuredProd.name, merchant);
  };

  // Collect all featured products in this post
  const mentionedProducts = post.content.sections
    .map((s) => s.featuredProduct)
    .filter((p): p is BlogProductLink => !!p);

  // Other related posts
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-in fade-in duration-200">
      {/* Back to Blog feed button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A423A] hover:text-[#B85D3B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4 border-b border-[#EAE2D8] pb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE2D8] text-[#B85D3B]">
            {post.category}
          </span>
          <span className="text-xs text-[#4A423A]">•</span>
          <span className="text-xs text-[#4A423A] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181513] leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-[#4A423A] leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F5EFEB]">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#EAE2D8]"
            />
            <div>
              <div className="text-sm font-bold text-[#181513]">{post.author.name}</div>
              <div className="text-xs text-[#4A423A]">{post.author.role} • {post.publishDate}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditPost(post)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF8F5] border border-[#EAE2D8] hover:border-[#B85D3B] text-[#181513] transition-colors cursor-pointer"
              title="Edit this post, update text, prices or links"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#B85D3B]" />
              <span>Edit Article</span>
            </button>

            {onDeletePost && (
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
                    onDeletePost(post.id);
                  }
                }}
                className="p-1.5 rounded-xl text-[#4A423A]/70 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Delete this article"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                hasLiked
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-[#EAE2D8] text-[#4A423A] hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#EAE2D8] text-[#4A423A] hover:border-[#B85D3B] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* FTC Affiliate Disclaimer Box */}
        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] flex items-start gap-2.5 text-xs text-[#4A423A]">
          <ShieldCheck className="w-4 h-4 text-[#5C7764] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#181513]">Affiliate Disclosure:</strong> This article contains affiliate links for products hand-tested by our editorial team. When you click and purchase, we may earn an affiliate commission at no cost to you. We have negotiated reader-exclusive codes so you save 10%–20%.
          </p>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EAE2D8]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="prose prose-stone max-w-none space-y-8 text-[#2C2621] leading-relaxed">
        {/* Intro Paragraphs */}
        <div className="space-y-4 text-base sm:text-lg">
          {post.content.intro.map((p, idx) => (
            <p key={idx} className="first-letter:font-serif first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
              {p}
            </p>
          ))}
        </div>

        {/* Content Sections with Embedded Shoppable Cards */}
        {post.content.sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-5 pt-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#181513]">
              {section.heading}
            </h2>

            {section.paragraphs.map((para, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-base text-[#2C2621]">
                {para}
              </p>
            ))}

            {/* Optional Pull Quote */}
            {section.highlightQuote && (
              <blockquote className="my-6 pl-5 border-l-4 border-[#B85D3B] italic font-serif text-lg sm:text-xl text-[#181513] bg-[#FAF8F5] p-4 rounded-r-xl">
                "{section.highlightQuote}"
              </blockquote>
            )}

            {/* IN-LINE SHOPPABLE AFFILIATE PRODUCT CARD */}
            {section.featuredProduct && (
              <div className="my-8 bg-white border-2 border-[#EAE2D8] hover:border-[#B85D3B]/50 rounded-2xl p-5 sm:p-6 shadow-md transition-all">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D3B] mb-3">
                  <Sparkles className="w-4 h-4 text-[#C59A45]" />
                  <span>Product Mentioned in This Section</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <img
                    src={section.featuredProduct.image}
                    alt={section.featuredProduct.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover bg-[#FAF8F5] border border-[#EAE2D8] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#5C7764] uppercase tracking-wider">
                      {section.featuredProduct.brand}
                    </div>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#181513] mt-0.5">
                      {section.featuredProduct.name}
                    </h4>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl font-extrabold text-[#181513]">
                        ${section.featuredProduct.price.toFixed(2)}
                      </span>
                      {section.featuredProduct.originalPrice && (
                        <span className="text-xs line-through text-[#4A423A]/70">
                          ${section.featuredProduct.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#E5EDE6] text-[#47604F] font-semibold">
                        Verified Partner Price
                      </span>
                    </div>

                    <div className="mt-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE2D8] text-xs">
                      <strong className="text-[#181513] block mb-0.5">Author's Unfiltered Take:</strong>
                      <p className="text-[#4A423A]">{section.featuredProduct.whyEditorLovesIt}</p>
                    </div>

                    {/* Affiliate CTAs & Promo Code */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F5EFEB]">
                      {section.featuredProduct.promoCode ? (
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono font-bold bg-[#FAF8F5] px-2 py-1 rounded border border-[#EAE2D8] text-[#181513]">
                            {section.featuredProduct.promoCode}
                          </code>
                          <button
                            onClick={() => handleCopyCode(section.featuredProduct!.promoCode!)}
                            className="text-xs font-semibold text-[#5C7764] hover:underline cursor-pointer flex items-center gap-1"
                          >
                            {copiedCode === section.featuredProduct.promoCode ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Copied {section.featuredProduct.promoDiscount}!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Code ({section.featuredProduct.promoDiscount})</span>
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-[#5C7764] font-medium">
                          ✨ Reader discount auto-applied at checkout
                        </span>
                      )}

                      <button
                        onClick={() => handleShopProduct(section.featuredProduct!)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <span>Shop at {section.featuredProduct.retailer}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Conclusion */}
        <div className="pt-6 border-t border-[#EAE2D8] space-y-3">
          <h3 className="font-serif text-2xl font-bold text-[#181513]">The Bottom Line</h3>
          <p className="text-sm sm:text-base text-[#2C2621]">
            {post.content.conclusion}
          </p>
        </div>
      </div>

      {/* SUMMARY "SHOP PRODUCTS IN THIS ARTICLE" BANNER */}
      {mentionedProducts.length > 0 && (
        <div className="bg-[#2C2621] text-[#FAF8F5] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C59A45] block mb-1">
                Curated Shopping List
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Shop Products Featured in this Post ({mentionedProducts.length})
              </h3>
            </div>
            <ShoppingBag className="w-6 h-6 text-[#C59A45]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {mentionedProducts.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#181513] border border-[#3E362F]"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-14 h-14 rounded-lg object-cover bg-white shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-bold text-[#C59A45]">{p.brand}</div>
                  <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-white">${p.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleShopProduct(p)}
                      className="ml-auto flex items-center gap-1 text-[11px] font-bold text-[#B85D3B] hover:text-[#C59A45] cursor-pointer"
                    >
                      <span>Buy via {p.retailer}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles Footer */}
      <div className="pt-8 border-t border-[#EAE2D8] space-y-4">
        <h4 className="font-serif text-2xl font-bold text-[#181513]">More From The Journal</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedPosts.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                onSelectPost(rel);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-4 rounded-2xl bg-white border border-[#EAE2D8] hover:border-[#B85D3B] transition-all cursor-pointer flex gap-4"
            >
              <img
                src={rel.coverImage}
                alt={rel.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#B85D3B]">{rel.category}</span>
                <h5 className="font-serif text-sm font-bold text-[#181513] line-clamp-2 mt-1">
                  {rel.title}
                </h5>
                <span className="text-[11px] text-[#4A423A] mt-1 block">{rel.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
