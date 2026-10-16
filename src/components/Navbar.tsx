import React, { useState } from 'react';
import { Search, Heart, Menu, X, Sparkles, ShieldCheck, ChevronRight, Tag } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  savedCount: number;
  onOpenSavedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  savedCount,
  onOpenSavedModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'blog', label: 'The Skincare Blog', badge: 'Articles' },
    { id: 'reviews', label: 'Shoppable Reviews', badge: '8 Tested' },
    { id: 'deals-dupes', label: 'Deals & Dupes', badge: 'Coupons' },
  ];

  const handleTabClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE2D8]">
      {/* FTC Affiliate Transparency Notice Bar */}
      <div className="bg-[#181513] text-[#FAF8F5] text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5C7764] shrink-0" />
            <span className="truncate">
              <strong>Reader Supported:</strong> We independently test every formula. When you purchase through our links, we may earn an affiliate commission at no extra cost to you.
            </span>
          </div>
          <button
            onClick={() => handleTabClick('deals-dupes')}
            className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-[#E5EDE6] hover:text-white shrink-0 ml-4 cursor-pointer"
          >
            <span>View Verified Codes</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleTabClick('home')}
            className="cursor-pointer group flex flex-col"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#181513] group-hover:text-[#B85D3B] transition-colors">
                DERMAVOX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B85D3B]" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#4A423A]/80 -mt-0.5">
              Clinical Skincare Intelligence
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'text-[#181513] font-semibold bg-[#EAE2D8]/60 shadow-2xs'
                      : 'text-[#4A423A] hover:text-[#181513] hover:bg-[#F5EFEB]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isActive
                          ? 'bg-[#B85D3B] text-white'
                          : 'bg-[#EAE2D8] text-[#4A423A]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Write Post, Wishlist, Mobile menu) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => handleTabClick('write')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all cursor-pointer shadow-xs hover:shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Write Article</span>
            </button>

            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#4A423A] bg-white border border-[#EAE2D8] hover:border-[#B85D3B] transition-colors cursor-pointer shadow-2xs"
              aria-label="Open search dialog"
            >
              <Search className="w-4 h-4 text-[#4A423A]" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden sm:inline text-[10px] font-mono bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#EAE2D8] text-[#4A423A]">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={onOpenSavedModal}
              className="relative p-2.5 rounded-xl bg-white border border-[#EAE2D8] text-[#4A423A] hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer shadow-2xs"
              aria-label="Saved products"
              title="Saved items"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white border border-[#EAE2D8] text-[#181513] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE2D8] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#EAE2D8] text-[#181513] font-bold'
                    : 'text-[#4A423A] hover:bg-[#F5EFEB]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-[#B85D3B] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#EAE2D8] space-y-2">
            <button
              onClick={() => handleTabClick('write')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-[#B85D3B]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Write & Publish Article</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-[#181513] bg-white border border-[#EAE2D8]"
            >
              <Search className="w-4 h-4 text-[#B85D3B]" />
              <span>Search Products & Actives</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
