import React from 'react';
import { Search, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import heroImg from '../assets/images/hero_services_hub_1791908681193.jpg';
import { ServiceCategory } from '../types/service';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ServiceCategory;
  setSelectedCategory: (cat: ServiceCategory) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  onExploreClick,
}) => {
  return (
    <section className="relative border-b border-stone-200 bg-stone-50 pt-8 pb-12 sm:pt-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2-Column Balanced Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Value Proposition & Interactive Search */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-wider">
                <span>Verified Artisan & Master Guild</span>
                <span aria-hidden="true">·</span>
                <span>On-Demand & Scheduled</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-[1.12] [text-wrap:balance]">
                Specialized Services Offered by Certified Masters.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                From precision home repairs and technical automotive preservation to brand
                identity engineering and clinical body therapy. Upfront pricing, vetted background
                checks, and verified execution.
              </p>
            </div>

            {/* Quick Search & Filter Console */}
            <div className="rounded-xl border border-stone-200 bg-white p-2.5 sm:p-3 shadow-xs">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onExploreClick();
                }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by craft, task, or specialist (e.g. plumbing, ceramic, brand)..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 rounded-lg bg-stone-50/80 border border-transparent focus:border-stone-300 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 transition-colors shrink-0 text-center cursor-pointer shadow-xs"
                >
                  Find Services
                </button>
              </form>

              {/* Popular Discovery Shortcuts */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <span className="font-medium text-stone-500">Popular:</span>
                <button
                  onClick={() => {
                    setSelectedCategory('home');
                    onExploreClick();
                  }}
                  className="hover:text-stone-950 hover:underline transition-colors cursor-pointer"
                >
                  Plumbing Diagnostic
                </button>
                <span className="text-stone-300">·</span>
                <button
                  onClick={() => {
                    setSelectedCategory('auto');
                    onExploreClick();
                  }}
                  className="hover:text-stone-950 hover:underline transition-colors cursor-pointer"
                >
                  Ceramic Coating
                </button>
                <span className="text-stone-300">·</span>
                <button
                  onClick={() => {
                    setSelectedCategory('creative');
                    onExploreClick();
                  }}
                  className="hover:text-stone-950 hover:underline transition-colors cursor-pointer"
                >
                  Brand Design
                </button>
                <span className="text-stone-300">·</span>
                <button
                  onClick={() => {
                    setSelectedCategory('wellness');
                    onExploreClick();
                  }}
                  className="hover:text-stone-950 hover:underline transition-colors cursor-pointer"
                >
                  In-Home Therapy
                </button>
              </div>
            </div>

            {/* Social Trust Markers */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                <span>$5M Workmanship Insurance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-stone-700" />
                <span>Rigorous 7-Point Vetting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-stone-700" />
                <span>Transparent Hourly & Flat Rates</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Editorial Visual (Stretch to Match) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative h-full min-h-[300px] sm:min-h-[380px] w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm group">
              <img
                src={heroImg}
                alt="Architect and service specialist collaborating in studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
              
              {/* Overlay Caption with Verified Credentials */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center justify-between text-xs text-stone-200 mb-1">
                  <span className="font-medium">Guild Craft Studio</span>
                  <div className="flex items-center gap-1 font-mono tabular-nums text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>4.98 Rating</span>
                  </div>
                </div>
                <p className="text-sm font-semibold tracking-tight text-white line-clamp-1">
                  Master Crafts & Architectural Engineering
                </p>
                <p className="text-xs text-stone-300 mt-0.5">
                  Over 1,200 residential & enterprise commissions completed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Trust Strip (Full-Width Row Below the Split, per Rule 13) */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-stone-200">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono tabular-nums">
              99.4%
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Verified Client Satisfaction
            </div>
            <div className="text-[11px] text-stone-400">
              Based on 4,800+ authenticated reviews
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono tabular-nums">
              &lt; 20 min
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Average Specialist Response
            </div>
            <div className="text-[11px] text-stone-400">
              Direct dispatch & calendar confirmation
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Transparent Upfront Pricing
            </div>
            <div className="text-[11px] text-stone-400">
              No hidden travel fees or surprise add-ons
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono tabular-nums">
              $5,000,000
            </div>
            <div className="text-xs text-stone-600 font-medium">
              Bonded Liability Coverage
            </div>
            <div className="text-[11px] text-stone-400">
              Every on-site service appointment protected
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
