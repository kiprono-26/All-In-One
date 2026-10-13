import React from 'react';
import { CalendarCheck2, Bookmark, PlusCircle } from 'lucide-react';

interface NavbarProps {
  activeView: 'explore' | 'bookings' | 'saved';
  setActiveView: (view: 'explore' | 'bookings' | 'saved') => void;
  bookingsCount: number;
  savedCount: number;
  onOpenCustomQuote: () => void;
  onOpenOfferService: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  bookingsCount,
  savedCount,
  onOpenCustomQuote,
  onOpenOfferService,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-stone-50/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark (single element, clean typography) */}
        <button
          onClick={() => setActiveView('explore')}
          className="text-xl font-bold tracking-tight text-stone-900 transition-opacity hover:opacity-85 whitespace-nowrap shrink-0 text-left font-display cursor-pointer"
        >
          Servicely
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setActiveView('explore')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'explore'
                ? 'text-stone-900 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            Explore Services
          </button>
          <button
            onClick={() => setActiveView('bookings')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'bookings'
                ? 'text-stone-900 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            <span>My Bookings</span>
            {bookingsCount > 0 && (
              <span className="font-mono text-xs tabular-nums text-stone-500">
                ({bookingsCount})
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveView('saved')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'saved'
                ? 'text-stone-900 font-semibold'
                : 'hover:text-stone-900'
            }`}
          >
            <span>Saved Crafts</span>
            {savedCount > 0 && (
              <span className="font-mono text-xs tabular-nums text-stone-500">
                ({savedCount})
              </span>
            )}
          </button>
          <button
            onClick={onOpenCustomQuote}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Custom Quote
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile shortcut for bookings */}
          <button
            onClick={() => setActiveView('bookings')}
            className="md:hidden relative p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-200/60"
            aria-label="View bookings"
          >
            <CalendarCheck2 className="w-5 h-5" />
            {bookingsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-stone-900"></span>
            )}
          </button>
          <button
            onClick={() => setActiveView('saved')}
            className="md:hidden relative p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-200/60"
            aria-label="View saved services"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-stone-900"></span>
            )}
          </button>

          <button
            onClick={onOpenOfferService}
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Offer a Service</span>
          </button>
        </div>
      </div>
    </header>
  );
};
