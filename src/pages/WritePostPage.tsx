import React, { useState, useEffect } from 'react';
import { Sparkles, Check, ArrowRight, ShoppingBag, Edit3, Save } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BlogPost, BlogProductLink } from '../data/blogData';
import { PRODUCTS } from '../data/skincareData';

interface WritePostPageProps {
  initialPost?: BlogPost | null;
  onSavePost: (post: BlogPost, isEdit: boolean) => void;
  onCancel: () => void;
}

export const WritePostPage: React.FC<WritePostPageProps> = ({
  initialPost,
  onSavePost,
  onCancel,
}) => {
  const isEditMode = !!initialPost;

  const [title, setTitle] = useState(initialPost?.title || '');
  const [category, setCategory] = useState<BlogPost['category']>(
    initialPost?.category || 'Product Reviews'
  );
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [coverImage, setCoverImage] = useState(
    initialPost?.coverImage ||
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
  );
  const [authorName, setAuthorName] = useState(initialPost?.author.name || 'Shad');
  const [readTime, setReadTime] = useState(initialPost?.readTime || '4 min read');

  // Section 1
  const [intro1, setIntro1] = useState(initialPost?.content.intro.join('\n\n') || '');
  const [sec1Heading, setSec1Heading] = useState(
    initialPost?.content.sections[0]?.heading || ''
  );
  const [sec1Para, setSec1Para] = useState(
    initialPost?.content.sections[0]?.paragraphs.join('\n\n') || ''
  );

  // Attached product
  const initialAttachedProd = initialPost?.content.sections[0]?.featuredProduct;
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialAttachedProd?.productId || PRODUCTS[0].id
  );
  const [customEditorTake, setCustomEditorTake] = useState(
    initialAttachedProd?.whyEditorLovesIt || ''
  );
  const [customPrice, setCustomPrice] = useState<string>(
    initialAttachedProd ? initialAttachedProd.price.toString() : ''
  );
  const [customPromoCode, setCustomPromoCode] = useState<string>(
    initialAttachedProd?.promoCode || ''
  );
  const [customAffiliateUrl, setCustomAffiliateUrl] = useState<string>(
    initialAttachedProd?.affiliateUrl || ''
  );

  // Section 2
  const [sec2Heading, setSec2Heading] = useState(
    initialPost?.content.sections[1]?.heading || ''
  );
  const [sec2Para, setSec2Para] = useState(
    initialPost?.content.sections[1]?.paragraphs.join('\n\n') || ''
  );
  const [conclusion, setConclusion] = useState(initialPost?.content.conclusion || '');

  // Keep state updated if initialPost changes
  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setCategory(initialPost.category);
      setExcerpt(initialPost.excerpt);
      setCoverImage(initialPost.coverImage);
      setAuthorName(initialPost.author.name);
      setReadTime(initialPost.readTime);
      setIntro1(initialPost.content.intro.join('\n\n'));
      setSec1Heading(initialPost.content.sections[0]?.heading || '');
      setSec1Para(initialPost.content.sections[0]?.paragraphs.join('\n\n') || '');
      const feat = initialPost.content.sections[0]?.featuredProduct;
      if (feat) {
        setSelectedProductId(feat.productId);
        setCustomEditorTake(feat.whyEditorLovesIt);
        setCustomPrice(feat.price.toString());
        setCustomPromoCode(feat.promoCode || '');
        setCustomAffiliateUrl(feat.affiliateUrl || '');
      }
      setSec2Heading(initialPost.content.sections[1]?.heading || '');
      setSec2Para(initialPost.content.sections[1]?.paragraphs.join('\n\n') || '');
      setConclusion(initialPost.content.conclusion || '');
    }
  }, [initialPost]);

  const presetImages = [
    {
      label: 'Minimal Skincare Jars',
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Serum Dropper Bottle',
      url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Clear Essence & Botanical',
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Clinical Amber Vial',
      url: 'https://images.unsplash.com/photo-1608248597359-0a69a9e334aa?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;

    const matchedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
    const bestMerchant = matchedProduct.merchants[0];

    const parsedPrice = parseFloat(customPrice);
    const finalPrice = !isNaN(parsedPrice) && parsedPrice > 0 ? parsedPrice : bestMerchant.price;

    const attachedProductLink: BlogProductLink = {
      productId: matchedProduct.id,
      name: matchedProduct.name,
      brand: matchedProduct.brand,
      price: finalPrice,
      originalPrice: bestMerchant.originalPrice,
      promoCode: customPromoCode.trim() || bestMerchant.promoCode,
      promoDiscount: bestMerchant.promoDiscount,
      affiliateUrl: customAffiliateUrl.trim() || bestMerchant.affiliateUrl,
      retailer: bestMerchant.name,
      image: matchedProduct.image,
      whyEditorLovesIt:
        customEditorTake.trim() ||
        matchedProduct.editorVerdict ||
        'Independently tested formulation with proven barrier biocompatibility.',
    };

    const savedPost: BlogPost = {
      id: initialPost?.id || `post-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      excerpt,
      coverImage,
      category,
      readTime: readTime || '4 min read',
      publishDate: initialPost?.publishDate || 'Today',
      author: {
        name: authorName || 'Shad',
        role: 'Skincare Researcher & Clinical Editor',
        avatar:
          initialPost?.author.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      featured: initialPost?.featured || false,
      likesCount: initialPost?.likesCount || 12,
      taggedProductIds: [matchedProduct.id],
      content: {
        intro: [
          intro1.trim() ||
            'In today’s guide, I am breaking down an essential active routine that has transformed my skin barrier.',
        ],
        sections: [
          {
            heading: sec1Heading.trim() || 'Why This Formula Works on a Cellular Level',
            paragraphs: [
              sec1Para.trim() ||
                'Most products fail because their active ingredients are packaged at an ineffective pH or in open jars that oxidize within weeks.',
            ],
            featuredProduct: attachedProductLink,
          },
          ...(sec2Heading.trim()
            ? [
                {
                  heading: sec2Heading,
                  paragraphs: [
                    sec2Para.trim() ||
                      'Consistency over 4 to 6 weeks is where the true dermal remodeling takes place.',
                  ],
                },
              ]
            : []),
        ],
        conclusion:
          conclusion.trim() ||
          'Always conduct a patch test and layer with broad-spectrum SPF in the morning. Use our partner link above for the lowest verified price.',
      },
    };

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B85D3B', '#5C7764', '#C59A45'],
    });

    onSavePost(savedPost, isEditMode);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="border-b border-[#EAE2D8] pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D3B] mb-1">
            {isEditMode ? <Edit3 className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span>{isEditMode ? 'Article Update Studio' : 'Skincare Publishing Studio'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#181513]">
            {isEditMode ? 'Edit & Update Your Article' : 'Write & Publish A Shoppable Blog Article'}
          </h1>
          <p className="text-xs sm:text-sm text-[#4A423A] mt-1">
            {isEditMode
              ? 'Update text, change prices, or modify attached affiliate links. Changes will be saved immediately.'
              : 'Publish your skincare routine, product review, or dupe alert with direct affiliate purchase links.'}
          </p>
        </div>

        {isEditMode && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
            Editing Mode
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Article Info Card */}
        <div className="bg-white border border-[#EAE2D8] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#181513]">1. Article Metadata & Hook</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Article Headline / Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., My 4-Step Ceramide Protocol for Flaky, Sensitive Skin"
                required
                className="w-full text-base font-semibold bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-4 py-3 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-3 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
                >
                  <option value="Product Reviews">Product Reviews</option>
                  <option value="Routines & Protocols">Routines & Protocols</option>
                  <option value="Dupes & Economics">Dupes & Economics</option>
                  <option value="Ingredient Science">Ingredient Science</option>
                  <option value="Barrier Health">Barrier Health</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-3 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                  Est. Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-3 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Article Excerpt / Subhead *
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief 1-2 sentence hook explaining what readers will learn..."
                rows={2}
                required
                className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-4 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            {/* Cover image picker */}
            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-2">
                Featured Cover Photography
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {presetImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setCoverImage(img.url)}
                    className={`relative rounded-xl overflow-hidden aspect-16/10 cursor-pointer border-2 transition-all ${
                      coverImage === img.url
                        ? 'border-[#B85D3B] shadow-sm'
                        : 'border-[#EAE2D8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    {coverImage === img.url && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#B85D3B] text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. ATTACH / UPDATE SHOPPABLE AFFILIATE PRODUCT */}
        <div className="bg-[#FAF8F5] border-2 border-[#5C7764]/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#47604F]">
            <ShoppingBag className="w-4 h-4 text-[#5C7764]" />
            <span>2. Embedded Shoppable Affiliate Product</span>
          </div>

          <p className="text-xs text-[#4A423A]">
            Select which tested skincare product to showcase inside your article with purchase links, discounted pricing, and partner discount codes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Choose Product To Recommend:
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full text-xs font-semibold bg-white border border-[#EAE2D8] rounded-xl px-3 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              >
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.brand} — {prod.name} (${prod.merchants[0].price})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Your Personal Editor's Note:
              </label>
              <input
                type="text"
                value={customEditorTake}
                onChange={(e) => setCustomEditorTake(e.target.value)}
                placeholder="e.g. My holy grail for soothing flaking during winter..."
                className="w-full text-xs bg-white border border-[#EAE2D8] rounded-xl px-3 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Override Display Price ($)
              </label>
              <input
                type="text"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                placeholder="Leave blank to use default catalog price"
                className="w-full text-xs bg-white border border-[#EAE2D8] rounded-xl px-3 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Discount / Coupon Code
              </label>
              <input
                type="text"
                value={customPromoCode}
                onChange={(e) => setCustomPromoCode(e.target.value)}
                placeholder="e.g. SHAD15 or VOX20"
                className="w-full text-xs bg-white border border-[#EAE2D8] rounded-xl px-3 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>
          </div>
        </div>

        {/* 3. Article Body Content */}
        <div className="bg-white border border-[#EAE2D8] rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#181513]">3. Article Body & Scientific Take</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Introduction Paragraph
              </label>
              <textarea
                value={intro1}
                onChange={(e) => setIntro1(e.target.value)}
                placeholder="Start by introducing the skin issue and your personal experience..."
                rows={3}
                className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-4 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                  Section 1 Heading
                </label>
                <input
                  type="text"
                  value={sec1Heading}
                  onChange={(e) => setSec1Heading(e.target.value)}
                  placeholder="e.g. The Science Behind This Active"
                  className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-4 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                  Section 2 Heading (Optional)
                </label>
                <input
                  type="text"
                  value={sec2Heading}
                  onChange={(e) => setSec2Heading(e.target.value)}
                  placeholder="e.g. How I Layer It in My Routine"
                  className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-4 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Detailed Analysis / Routine Explanation
              </label>
              <textarea
                value={sec1Para}
                onChange={(e) => setSec1Para(e.target.value)}
                placeholder="Walk through how you use it, wait times, what results you saw after 2-4 weeks..."
                rows={4}
                className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-4 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-[#4A423A] mb-1.5">
                Conclusion / Final Verdict
              </label>
              <textarea
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                placeholder="Final takeaway for readers and reminder about using the affiliate discount..."
                rows={2}
                className="w-full text-xs bg-[#FAF8F5] border border-[#EAE2D8] rounded-xl px-4 py-2.5 text-[#181513] focus:outline-hidden focus:border-[#B85D3B]"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#4A423A] hover:bg-[#EAE2D8] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            {isEditMode ? <Save className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span>{isEditMode ? 'Save & Update Article' : 'Publish Article to Blog'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
