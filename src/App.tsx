/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  SlidersHorizontal,
  Search,
  Sparkles,
  Bookmark,
  CheckCircle,
  X,
  PlusCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { MyBookingsView } from './components/MyBookingsView';
import { CustomQuoteModal } from './components/CustomQuoteModal';
import { OfferServiceModal } from './components/OfferServiceModal';
import { ReviewModal } from './components/ReviewModal';
import { Footer } from './components/Footer';
import { INITIAL_SERVICES, INITIAL_BOOKINGS } from './data/mockServices';
import { ServiceItem, ServiceCategory, BookingRecord, CustomQuoteRequest } from './types/service';

export default function App() {
  // Primary State
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('servicely_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    const saved = localStorage.getItem('servicely_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('servicely_saved_ids');
    return saved ? JSON.parse(saved) : ['srv-brand-02'];
  });

  // Views & Filters
  const [activeView, setActiveView] = useState<'explore' | 'bookings' | 'saved'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price_asc' | 'price_desc'>('featured');
  const [locationFilter, setLocationFilter] = useState<'all' | 'On-site' | 'Remote / Studio' | 'Mobile Unit'>('all');

  // Modals
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [isCustomQuoteOpen, setIsCustomQuoteOpen] = useState(false);
  const [isOfferServiceOpen, setIsOfferServiceOpen] = useState(false);
  const [reviewBookingTarget, setReviewBookingTarget] = useState<BookingRecord | null>(null);

  // Toast System
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('servicely_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('servicely_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('servicely_saved_ids', JSON.stringify(savedIds));
  }, [savedIds]);

  // Wishlist toggle
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      showToast(exists ? 'Service removed from saved' : 'Service saved to favorites');
      return next;
    });
  };

  // Booking confirmed handler
  const handleConfirmBooking = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
    setSelectedServiceForBooking(null);
    setConfirmedBooking(newBooking);
    showToast(`Appointment reserved! Booking #${newBooking.id}`);
  };

  // Cancel booking handler
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
    showToast(`Booking #${bookingId} has been cancelled`);
  };

  // Reschedule booking handler
  const handleRescheduleBooking = (bookingId: string, newDate: string, newSlot: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, date: newDate, timeSlot: newSlot } : b
      )
    );
    showToast(`Booking #${bookingId} rescheduled to ${newDate}`);
  };

  // Submit Review handler
  const handleSubmitReview = (bookingId: string, rating: number, review: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, userRating: rating, userReview: review } : b
      )
    );
    showToast('Verified review submitted. Thank you for your feedback!');
  };

  // Add new service handler
  const handleAddService = (newService: ServiceItem) => {
    setServices((prev) => [newService, ...prev]);
    showToast(`"${newService.title}" is now published on the marketplace!`);
    setActiveView('explore');
  };

  // Submit custom quote handler
  const handleSubmitQuote = (quote: CustomQuoteRequest) => {
    showToast(`Quote request #${quote.id} submitted! Pros are reviewing your scope.`);
  };

  // Scroll to catalog section
  const catalogRef = useRef<HTMLDivElement>(null);
  const handleExploreClick = () => {
    setActiveView('explore');
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered & Sorted Services
  const displayedServices = useMemo(() => {
    let list = [...services];

    // Saved view filter
    if (activeView === 'saved') {
      list = list.filter((s) => savedIds.includes(s.id));
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((s) => s.category === selectedCategory);
    }

    // Location filter
    if (locationFilter !== 'all') {
      list = list.filter((s) => s.locationType === locationFilter);
    }

    // Search keyword query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.provider.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price_desc') return b.basePrice - a.basePrice;
      // Default: featured first, then rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });

    return list;
  }, [services, activeView, savedIds, selectedCategory, locationFilter, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-stone-900 px-4 py-3 text-xs font-medium text-white shadow-xl transition-all animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-stone-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Contract (Wordmark — Nav links — Primary action) */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        bookingsCount={bookings.filter((b) => b.status === 'confirmed').length}
        savedCount={savedIds.length}
        onOpenCustomQuote={() => setIsCustomQuoteOpen(true)}
        onOpenOfferService={() => setIsOfferServiceOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'bookings' ? (
          <MyBookingsView
            bookings={bookings}
            onBackToExplore={() => setActiveView('explore')}
            onCancelBooking={handleCancelBooking}
            onRescheduleBooking={handleRescheduleBooking}
            onOpenReviewModal={(b) => setReviewBookingTarget(b)}
          />
        ) : (
          <>
            {/* Hero Section (only when exploring) */}
            {activeView === 'explore' && (
              <Hero
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onExploreClick={handleExploreClick}
              />
            )}

            {/* Catalog & Filter Section */}
            <div ref={catalogRef} className="py-10 sm:py-14">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Section Title & View Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      {activeView === 'saved' ? 'Saved Collection' : 'Craft Marketplace'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
                      {activeView === 'saved'
                        ? 'Bookmarked Crafts & Specialists'
                        : 'Discover Certified Professional Services'}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">
                      {activeView === 'saved'
                        ? 'Keep track of verified specialists and book when you are ready.'
                        : 'Handpicked independent artisans, engineers, therapists, and mobile master units.'}
                    </p>
                  </div>

                  {/* Active Results Count & Clear Filter Action */}
                  <div className="flex items-center gap-3 text-xs text-stone-600 self-start md:self-auto">
                    <span className="font-mono tabular-nums font-semibold">
                      {displayedServices.length} {displayedServices.length === 1 ? 'service' : 'services'} available
                    </span>
                    {(selectedCategory !== 'all' || searchQuery || locationFilter !== 'all') && (
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSearchQuery('');
                          setLocationFilter('all');
                        }}
                        className="text-stone-900 underline font-medium hover:text-stone-600 cursor-pointer"
                      >
                        Reset filters
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Toolbar: Category Segmented Controls & Dropdowns */}
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-stone-200 pb-5">
                  {/* Category Segmented Control (Interactive buttons per Rule 1A) */}
                  <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl">
                    {[
                      { id: 'all', label: 'All Services' },
                      { id: 'home', label: 'Home & Maintenance' },
                      { id: 'creative', label: 'Creative & Digital' },
                      { id: 'wellness', label: 'Wellness & Health' },
                      { id: 'auto', label: 'Automotive & Mobility' },
                      { id: 'business', label: 'Business & Finance' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id as ServiceCategory)}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                          selectedCategory === tab.id
                            ? 'bg-white text-stone-900 shadow-xs font-semibold'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Secondary Filters: Delivery Location & Sort Order */}
                  <div className="flex items-center gap-3">
                    {/* Delivery type */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <span className="hidden sm:inline text-stone-400">Delivery:</span>
                      <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value as any)}
                        className="rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:border-stone-900 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Delivery Types</option>
                        <option value="On-site">On-site Only</option>
                        <option value="Remote / Studio">Remote / Studio</option>
                        <option value="Mobile Unit">Mobile Unit</option>
                      </select>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1.5 text-xs text-stone-600">
                      <span className="hidden sm:inline text-stone-400">Sort:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:border-stone-900 focus:outline-none cursor-pointer"
                      >
                        <option value="featured">Featured First</option>
                        <option value="rating">Highest Rated</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Service Cards Grid (3-Column Desktop Grid with generous whitespace) */}
                {displayedServices.length === 0 ? (
                  <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center space-y-4">
                    <SlidersHorizontal className="w-10 h-10 text-stone-400 mx-auto" />
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-stone-900">
                        No services matching your criteria
                      </h3>
                      <p className="text-xs text-stone-500 max-w-sm mx-auto">
                        Try clearing your search query, choosing a different craft category, or request a custom quote.
                      </p>
                    </div>
                    <div className="flex justify-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSearchQuery('');
                          setLocationFilter('all');
                        }}
                        className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                      >
                        Clear All Filters
                      </button>
                      <button
                        onClick={() => setIsCustomQuoteOpen(true)}
                        className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 cursor-pointer"
                      >
                        Request Custom Service
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {displayedServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSaved={savedIds.includes(service.id)}
                        onToggleSave={handleToggleSave}
                        onSelect={(s) => setSelectedServiceForBooking(s)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Custom Request Banner Section (Adjacent proof per Rule 11) */}
            <div className="bg-stone-900 text-white py-12 sm:py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Bespoke Commissions & Commercial Contracts
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                      Have a specialized task not listed in the catalog?
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                      Describe your architectural renovation, enterprise brand sprint, or precision engineering requirement. Our Guild Concierge connects you directly with 2 vetted specialists within 2 hours.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-start lg:items-end">
                    <button
                      onClick={() => setIsCustomQuoteOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-stone-900 hover:bg-stone-100 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      <span>Request a Custom Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsOfferServiceOpen(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800/80 px-5 py-3 text-xs font-bold text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Offer Your Craft</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Interactive Booking Configurator Modal */}
      <ServiceBookingModal
        service={selectedServiceForBooking}
        onClose={() => setSelectedServiceForBooking(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Booking Confirmation Receipt Modal */}
      <BookingConfirmationModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        onViewBookings={() => {
          setConfirmedBooking(null);
          setActiveView('bookings');
        }}
      />

      {/* Custom Quote Inquiries Modal */}
      <CustomQuoteModal
        isOpen={isCustomQuoteOpen}
        onClose={() => setIsCustomQuoteOpen(false)}
        onSubmitQuote={handleSubmitQuote}
      />

      {/* Offer a Service Provider Modal */}
      <OfferServiceModal
        isOpen={isOfferServiceOpen}
        onClose={() => setIsOfferServiceOpen(false)}
        onAddService={handleAddService}
      />

      {/* Review & Feedback Modal */}
      <ReviewModal
        booking={reviewBookingTarget}
        onClose={() => setReviewBookingTarget(null)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Universal Quiet Footer */}
      <Footer
        onOpenCustomQuote={() => setIsCustomQuoteOpen(true)}
        onOpenOfferService={() => setIsOfferServiceOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleExploreClick();
        }}
      />
    </div>
  );
}
