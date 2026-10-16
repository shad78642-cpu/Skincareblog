import React, { useState } from 'react';
import { ShieldCheck, Mail, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#B85D3B', '#5C7764', '#C59A45']
      });
    }
  };

  return (
    <footer className="bg-[#181513] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2C2621]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Discount Drop Banner */}
        <div className="bg-[#2C2621] border border-[#3E362F] rounded-2xl p-8 md:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B85D3B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-widest font-bold text-[#C59A45] mb-2 block">
                The Sunday Derm Drop
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-3">
                Evidence-Based Skincare Without The Marketing Noise.
              </h3>
              <p className="text-sm text-[#FAF8F5]/80 max-w-xl">
                Get our weekly formula teardowns, hidden luxury dupe alerts, and exclusive 15–25% partner discount codes delivered straight to your inbox. Zero spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="bg-[#FAF8F5] text-[#181513] p-5 rounded-xl border border-[#C59A45]/40 animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Welcome to the Inner Circle!</span>
                  </div>
                  <p className="text-xs text-[#4A423A]">
                    Check your inbox for your welcome email + your exclusive <strong>15% OFF Dermstore & Paula's Choice</strong> code.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FAF8F5]/50" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your personal email..."
                        required
                        className="w-full bg-[#181513] border border-[#4A423A] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#FAF8F5]/40 focus:outline-hidden focus:border-[#B85D3B]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#B85D3B] hover:bg-[#9E492B] transition-all cursor-pointer whitespace-nowrap shadow-sm hover:shadow-md"
                    >
                      Join Free
                    </button>
                  </div>
                  <p className="text-[11px] text-[#FAF8F5]/60">
                    We respect your privacy. Unsubscribe anytime with 1 click.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Column Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2C2621]">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                DERMAVOX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B85D3B]" />
            </div>
            <p className="text-xs text-[#FAF8F5]/70 leading-relaxed">
              DERMAVOX is an independent clinical skincare publishing platform. We dissect active ingredient concentrations, analyze clinical trials, and connect skincare enthusiasts with verified discounts at certified retailers.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C59A45]">
              <ShieldCheck className="w-4 h-4 text-[#5C7764]" />
              <span>Independent Laboratory Testing</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FAF8F5]/50 mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/80">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home / Editorial Index
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Clinical Reviews (Gold Standards)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('routine-builder')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Skin Diagnostic Regimen Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ingredient-vault')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Actives Compatibility Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('deals-dupes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Exclusive Coupons & Luxury Dupes
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Actives */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FAF8F5]/50 mb-4">
              Star Active Guides
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/80">
              <li>
                <button
                  onClick={() => onSelectTab('ingredient-vault')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Encapsulated Retinal vs Retinol
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ingredient-vault')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pure 15% L-Ascorbic Acid (Vitamin C)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ingredient-vault')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  BHA 2% Pore Cleansing Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ingredient-vault')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Physiological 3:1:1 Ceramide Complexes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('ingredient-vault')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Niacinamide (Optimal 2% to 5%)
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Ethics & Standards */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#FAF8F5]/50 mb-4">
              Testing Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/80">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5C7764]" />
                <span>Minimum 6-week blind testing cycle</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5C7764]" />
                <span>Zero sponsored positive reviews</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5C7764]" />
                <span>Corneometer skin barrier hydration verification</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5C7764]" />
                <span>FTC 16 CFR Part 255 compliance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC and Legal Disclaimers */}
        <div className="pt-8 space-y-4 text-[11px] text-[#FAF8F5]/60 leading-relaxed">
          <div className="bg-[#241F1A] border border-[#3E362F] rounded-xl p-4">
            <p className="mb-2">
              <strong className="text-white">Federal Trade Commission (FTC) Affiliate Disclosure:</strong>{' '}
              DERMAVOX participates in affiliate marketing programs, including Sephora, Dermstore, Paula's Choice, Stylevana, YesStyle, and the Amazon Services LLC Associates Program. This means we may earn a small commission when you click and purchase products recommended in our articles at no additional cost to you. In fact, using our reader codes often secures you an exclusive 10%–20% discount. Our editorial recommendations remain completely independent and objective.
            </p>
            <p>
              <strong className="text-white">Medical & Dermatological Disclaimer:</strong> All content, product reviews, ingredient comparisons, and routine recommendations on DERMAVOX are for educational and consumer informational purposes only. They are not intended to substitute for professional medical diagnosis, advice, or treatment by a board-certified dermatologist. Always conduct a 24-hour patch test before introducing new bio-actives.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#2C2621] text-xs text-[#FAF8F5]/50">
            <div>
              © 2026 DERMAVOX Skincare Intelligence. All rights reserved.
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Editorial Independence Code</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
