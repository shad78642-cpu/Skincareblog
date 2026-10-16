import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, ArrowRight, Tag, BookOpen, Layers, Newspaper } from 'lucide-react';
import { PRODUCTS, INGREDIENT_DIRECTORY, DUPE_DATABASE, ReviewItem, IngredientProfile, DupeComparison } from '../data/skincareData';
import { BlogPost } from '../data/blogData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ReviewItem) => void;
  onNavigateTab: (tab: string) => void;
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onNavigateTab,
  posts,
  onSelectPost,
}) => {
  const [query, setQuery] = useState('');

  const filteredBlogPosts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query, posts]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.heroActives.some(a => a.toLowerCase().includes(q)) ||
        p.concerns.some(c => c.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredIngredients = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INGREDIENT_DIRECTORY.filter(
      ing =>
        ing.name.toLowerCase().includes(q) ||
        ing.category.toLowerCase().includes(q) ||
        ing.benefits.some(b => b.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredDupes = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return DUPE_DATABASE.filter(
      d =>
        d.luxuryProduct.name.toLowerCase().includes(q) ||
        d.smartDupe.name.toLowerCase().includes(q) ||
        d.luxuryProduct.brand.toLowerCase().includes(q) ||
        d.smartDupe.brand.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#EAE2D8] rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-5 py-4 border-b border-[#EAE2D8] bg-white">
          <Search className="w-5 h-5 text-[#4A423A] mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, actives (Retinol, Vitamin C, BHA), concerns, dupes..."
            className="w-full bg-transparent text-[#181513] text-base placeholder-[#4A423A]/60 focus:outline-hidden"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#4A423A] hover:bg-[#FAF8F5] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase font-semibold text-[#4A423A] hover:text-[#181513] px-2 py-1 rounded bg-[#F5EFEB]"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Tags when no query */}
        {!query && (
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#4A423A] mb-3">
              Popular Skincare Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Vitamin C',
                'Retinal',
                'Barrier Repair',
                'Dieux Air Angel',
                'Salicylic BHA',
                'SPF 50',
                'SkinCeuticals Dupe',
                'Hyperpigmentation'
              ].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(tag)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white border border-[#EAE2D8] text-[#181513] hover:border-[#B85D3B] hover:text-[#B85D3B] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#EAE2D8] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4A423A]">
              <div
                onClick={() => {
                  onClose();
                  onNavigateTab('routine-builder');
                }}
                className="p-3 rounded-xl bg-white border border-[#EAE2D8] hover:border-[#B85D3B] transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <strong className="text-[#181513] block">Skin Diagnostic Quiz</strong>
                  <span>Build your customized AM/PM routine</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B85D3B]" />
              </div>
              <div
                onClick={() => {
                  onClose();
                  onNavigateTab('ingredient-vault');
                }}
                className="p-3 rounded-xl bg-white border border-[#EAE2D8] hover:border-[#B85D3B] transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <strong className="text-[#181513] block">Active Matrix Guide</strong>
                  <span>Check ingredient compatibility</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B85D3B]" />
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-[460px] overflow-y-auto p-4 space-y-5">
            {filteredProducts.length === 0 &&
              filteredIngredients.length === 0 &&
              filteredDupes.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-sm text-[#4A423A]">No matches found for "{query}".</p>
                  <p className="text-xs text-[#4A423A]/70 mt-1">
                    Try searching for ingredients like "Niacinamide", "Retinoid", or brands like "Medik8".
                  </p>
                </div>
              )}

            {/* Blog Articles Found */}
            {filteredBlogPosts.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#B85D3B] mb-2 flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Skincare Blog Articles ({filteredBlogPosts.length})</span>
                </h4>
                <div className="space-y-2">
                  {filteredBlogPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        onClose();
                        onSelectPost(post);
                        onNavigateTab('blog');
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#EAE2D8] hover:border-[#B85D3B] transition-colors cursor-pointer"
                    >
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#B85D3B] uppercase">{post.category}</span>
                        <h5 className="text-xs font-bold text-[#181513] truncate">{post.title}</h5>
                        <p className="text-[11px] text-[#4A423A] truncate">{post.excerpt}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B85D3B] shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products Found */}
            {filteredProducts.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C7764] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Reviewed Products ({filteredProducts.length})
                </h4>
                <div className="space-y-2">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#EAE2D8] hover:border-[#B85D3B] hover:shadow-xs transition-all cursor-pointer"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#F5EFEB] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-[#B85D3B] uppercase tracking-wider">
                            {prod.brand}
                          </span>
                          <span className="text-xs text-[#4A423A]">• {prod.category}</span>
                        </div>
                        <h5 className="text-sm font-bold text-[#181513] truncate">{prod.name}</h5>
                        <p className="text-xs text-[#4A423A] truncate">{prod.tagline}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold text-[#181513]">
                          ${prod.merchants[0]?.price.toFixed(2)}
                        </span>
                        <div className="text-[10px] text-[#5C7764] font-medium">★ {prod.rating}/10</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients Found */}
            {filteredIngredients.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#B85D3B] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Active Ingredients ({filteredIngredients.length})
                </h4>
                <div className="space-y-2">
                  {filteredIngredients.map((ing) => (
                    <div
                      key={ing.id}
                      onClick={() => {
                        onClose();
                        onNavigateTab('ingredient-vault');
                      }}
                      className="p-3 rounded-xl bg-white border border-[#EAE2D8] hover:border-[#B85D3B] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <h5 className="text-sm font-bold text-[#181513]">{ing.name}</h5>
                        <p className="text-xs text-[#4A423A]">{ing.category} • {ing.bestFor}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B85D3B]" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dupes Found */}
            {filteredDupes.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C59A45] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Verified Dupes ({filteredDupes.length})
                </h4>
                <div className="space-y-2">
                  {filteredDupes.map((dupe) => (
                    <div
                      key={dupe.id}
                      onClick={() => {
                        onClose();
                        onNavigateTab('deals-dupes');
                      }}
                      className="p-3 rounded-xl bg-white border border-[#EAE2D8] hover:border-[#B85D3B] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <h5 className="text-sm font-bold text-[#181513]">
                          {dupe.smartDupe.name} vs {dupe.luxuryProduct.name}
                        </h5>
                        <p className="text-xs text-[#5C7764] font-medium">
                          Saves ${dupe.savingsAmount} • {dupe.similarityScore}% Formula Match
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B85D3B]" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
