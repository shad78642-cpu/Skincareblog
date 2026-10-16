import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, Heart, ShoppingBag, PlusCircle, Filter } from 'lucide-react';
import { BlogPost } from '../data/blogData';

interface BlogFeedPageProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onOpenWriteModal: () => void;
}

export const BlogFeedPage: React.FC<BlogFeedPageProps> = ({
  posts,
  onSelectPost,
  onOpenWriteModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Product Reviews',
    'Routines & Protocols',
    'Dupes & Economics',
    'Ingredient Science',
    'Barrier Health',
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesExcerpt = p.excerpt.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        return matchesTitle || matchesExcerpt || matchesCategory;
      }
      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Editorial Journal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EAE2D8] pb-8 gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B85D3B]">
            <BookOpen className="w-4 h-4" />
            <span>The Skincare Journal & Shoppable Reviews</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181513]">
            Clinical Notes, Routines & Verified Buying Guides
          </h1>
          <p className="text-sm sm:text-base text-[#4A423A]">
            Read our in-depth formula breakdowns and buy vetted products directly through our authorized retail partner links with exclusive reader discount codes.
          </p>
        </div>

        {/* Action Button: Create New Post */}
        <button
          onClick={onOpenWriteModal}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-[#181513] hover:bg-[#2C2621] transition-all cursor-pointer shadow-sm self-start md:self-end shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#C59A45]" />
          <span>Write & Publish Post</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#181513] text-white shadow-xs'
                  : 'bg-white border border-[#EAE2D8] text-[#4A423A] hover:border-[#B85D3B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & guides..."
            className="w-full text-xs bg-white border border-[#EAE2D8] rounded-xl px-3.5 py-2 text-[#181513] placeholder-[#4A423A]/60 focus:outline-hidden focus:border-[#B85D3B]"
          />
        </div>
      </div>

      {/* 1. FEATURED COVER STORY (if not searching / filtered to another category) */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <section
          onClick={() => {
            onSelectPost(featuredPost);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-white border border-[#EAE2D8] rounded-3xl overflow-hidden hover:border-[#B85D3B]/40 hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 group"
        >
          <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-[#FAF8F5]">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 bg-[#181513]/90 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-xs">
              ★ Cover Story
            </span>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#B85D3B] uppercase tracking-wider">
                <span>{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#4A423A] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#181513] leading-tight group-hover:text-[#B85D3B] transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-sm text-[#4A423A] leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#F5EFEB]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#EAE2D8]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#181513] block">
                      {featuredPost.author.name}
                    </span>
                    <span className="text-[11px] text-[#4A423A]">{featuredPost.publishDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#5C7764] bg-[#E5EDE6] px-3 py-1 rounded-full">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shoppable Article</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#B85D3B]">
                <span>Read Full Article & Buy Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. ARTICLES GRID */}
      <section className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#4A423A]">
          <span>
            Showing <strong>{filteredPosts.length}</strong> published skincare guides
          </span>
          <span className="text-[#5C7764] font-medium">
            All posts include tested affiliate purchase links
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#EAE2D8] rounded-2xl p-8">
            <p className="text-base font-bold text-[#181513] mb-1">No articles found</p>
            <p className="text-xs text-[#4A423A] mb-4">
              Try searching for something else or write a new post to share your skincare wisdom!
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#181513] text-white text-xs font-semibold"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedCategory === 'All' && !searchQuery ? regularPosts : filteredPosts).map(
              (post) => (
                <article
                  key={post.id}
                  onClick={() => {
                    onSelectPost(post);
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
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#B85D3B]" />
                        {post.readTime}
                      </span>
                      <span>•</span>
                      <span>{post.publishDate}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#181513] leading-snug group-hover:text-[#B85D3B] transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#4A423A] line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F5EFEB] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#EAE2D8]"
                      />
                      <span className="text-xs font-semibold text-[#181513]">
                        {post.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-[#B85D3B]">
                      <span>Read & Shop</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
};
