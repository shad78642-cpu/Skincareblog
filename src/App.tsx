/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogFeedPage } from './pages/BlogFeedPage';
import { SingleArticlePage } from './pages/SingleArticlePage';
import { WritePostPage } from './pages/WritePostPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { DealsDupesPage } from './pages/DealsDupesPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AffiliateModal } from './components/AffiliateModal';
import { SearchModal } from './components/SearchModal';
import { SavedModal } from './components/SavedModal';
import { ReviewItem, AffiliateMerchant } from './data/skincareData';
import { BlogPost, INITIAL_BLOG_POSTS } from './data/blogData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<ReviewItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [affiliateData, setAffiliateData] = useState<{
    productName: string;
    merchant: AffiliateMerchant;
  } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSavedOpen, setIsSavedOpen] = useState<boolean>(false);

  // Persistent blog posts with initial seed
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem('dermavox_blog_posts');
      return stored ? JSON.parse(stored) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dermavox_blog_posts', JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  // Persistent wishlist
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('dermavox_saved_items');
      return stored ? JSON.parse(stored) : ['skinceuticals-ce-ferulic', 'beauty-of-joseon-relief-sun'];
    } catch {
      return ['skinceuticals-ce-ferulic', 'beauty-of-joseon-relief-sun'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dermavox_saved_items', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSave = (productId: string) => {
    setSavedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleOpenAffiliate = (productName: string, merchant: AffiliateMerchant) => {
    setAffiliateData({ productName, merchant });
  };

  const handleSavePost = (savedPost: BlogPost, isEdit: boolean) => {
    if (isEdit) {
      setPosts((prev) => prev.map((p) => (p.id === savedPost.id ? savedPost : p)));
    } else {
      setPosts((prev) => [savedPost, ...prev]);
    }
    setEditingPost(null);
    setSelectedPost(savedPost);
    setCurrentTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setCurrentTab('write');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setSelectedPost(null);
    setCurrentTab('blog');
  };

  const handleSelectPostFromAnywhere = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tab: string) => {
    if (tab === 'blog') {
      setSelectedPost(null); // Show feed when clicking main blog tab
    }
    if (tab === 'write') {
      setEditingPost(null); // Fresh write mode
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F1D1B] selection:bg-[#EAE2D8] selection:text-[#181513]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleNavigateTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        savedCount={savedIds.length}
        onOpenSavedModal={() => setIsSavedOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. HOME */}
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={handleNavigateTab}
            onOpenProduct={(prod) => setSelectedProduct(prod)}
            onOpenAffiliate={handleOpenAffiliate}
            onToggleSave={handleToggleSave}
            savedIds={savedIds}
            posts={posts}
            onSelectPost={handleSelectPostFromAnywhere}
          />
        )}

        {/* 2. THE SKINCARE BLOG & ARTICLE READER */}
        {currentTab === 'blog' && (
          <>
            {selectedPost ? (
              <SingleArticlePage
                post={selectedPost}
                onBack={() => setSelectedPost(null)}
                onOpenAffiliate={handleOpenAffiliate}
                onSelectPost={(p) => setSelectedPost(p)}
                allPosts={posts}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
              />
            ) : (
              <BlogFeedPage
                posts={posts}
                onSelectPost={(p) => setSelectedPost(p)}
                onOpenWriteModal={() => {
                  setEditingPost(null);
                  setCurrentTab('write');
                }}
              />
            )}
          </>
        )}

        {/* 3. WRITE & PUBLISH POST STUDIO */}
        {currentTab === 'write' && (
          <WritePostPage
            initialPost={editingPost}
            onSavePost={handleSavePost}
            onCancel={() => {
              setEditingPost(null);
              setCurrentTab('blog');
            }}
          />
        )}

        {/* 4. SHOPPABLE CLINICAL REVIEWS */}
        {currentTab === 'reviews' && (
          <ReviewsPage
            onOpenProduct={(prod) => setSelectedProduct(prod)}
            onOpenAffiliate={handleOpenAffiliate}
            onToggleSave={handleToggleSave}
            savedIds={savedIds}
          />
        )}

        {/* 5. VERIFIED DEALS & DUPES */}
        {currentTab === 'deals-dupes' && (
          <DealsDupesPage onOpenAffiliate={handleOpenAffiliate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectTab={handleNavigateTab} />

      {/* MODALS */}
      {/* 1. Deep Dive Product Review Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenAffiliate={handleOpenAffiliate}
        onToggleSave={handleToggleSave}
        isSaved={selectedProduct ? savedIds.includes(selectedProduct.id) : false}
      />

      {/* 2. Affiliate Outbound & Promo Copier Modal */}
      {affiliateData && (
        <AffiliateModal
          isOpen={!!affiliateData}
          onClose={() => setAffiliateData(null)}
          productName={affiliateData.productName}
          merchant={affiliateData.merchant}
        />
      )}

      {/* 3. Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => {
          setSelectedProduct(prod);
          setIsSearchOpen(false);
        }}
        onNavigateTab={(tab) => {
          handleNavigateTab(tab);
          setIsSearchOpen(false);
        }}
        posts={posts}
        onSelectPost={(post) => {
          handleSelectPostFromAnywhere(post);
          setIsSearchOpen(false);
        }}
      />

      {/* 4. Saved Wishlist & Regimen Modal */}
      <SavedModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedIds={savedIds}
        onRemoveSaved={handleToggleSave}
        onOpenProduct={(prod) => setSelectedProduct(prod)}
        onOpenAffiliate={handleOpenAffiliate}
      />
    </div>
  );
}
