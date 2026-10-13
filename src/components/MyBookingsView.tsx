import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Star,
  RotateCcw,
  XCircle,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  X
} from 'lucide-react';
import { BookingRecord } from '../types/service';

interface MyBookingsViewProps {
  bookings: BookingRecord[];
  onBackToExplore: () => void;
  onCancelBooking: (bookingId: string) => void;
  onRescheduleBooking: (bookingId: string, newDate: string, newSlot: string) => void;
  onOpenReviewModal: (booking: BookingRecord) => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onBackToExplore,
  onCancelBooking,
  onRescheduleBooking,
  onOpenReviewModal,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [reschedulingBooking, setReschedulingBooking] = useState<BookingRecord | null>(null);
  const [receiptBooking, setReceiptBooking] = useState<BookingRecord | null>(null);

  // Filter logic
  const filtered = bookings.filter((b) => {
    if (filterTab === 'all') return true;
    if (filterTab === 'active') return b.status === 'confirmed' || b.status === 'in_progress';
    if (filterTab === 'completed') return b.status === 'completed';
    if (filterTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  // Reschedule date options
  const now = new Date();
  const rescheduleDates = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + i + 2);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  });
  const rescheduleSlots = [
    '09:00 AM – 11:30 AM',
    '12:30 PM – 03:00 PM',
    '03:30 PM – 06:00 PM',
  ];
  const [newSelectedDate, setNewSelectedDate] = useState(rescheduleDates[0]);
  const [newSelectedSlot, setNewSelectedSlot] = useState(rescheduleSlots[0]);

  return (
    <div className="py-8 sm:py-12 bg-stone-50 min-h-[calc(100vh-4.5rem)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={onBackToExplore}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Services Marketplace</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
              My Service Bookings
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Manage your upcoming appointments, review completed services, and download receipts.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-lg self-start sm:self-auto text-xs font-medium">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setFilterTab('active')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterTab === 'active'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterTab('completed')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterTab === 'completed'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterTab('cancelled')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterTab === 'cancelled'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-stone-900">
                No bookings found in this view
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Ready to schedule a verified specialist? Explore our catalog of home, creative, wellness, and automotive crafts.
              </p>
            </div>
            <button
              onClick={onBackToExplore}
              className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 transition-all hover:border-stone-300 space-y-4 shadow-2xs"
              >
                {/* Header status row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-stone-500 font-semibold">
                      #{item.id}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-500">Booked on {item.createdAt}</span>
                  </div>

                  {/* Status Indicator (Clean non-pill text with indicator dot) */}
                  <div className="flex items-center gap-1.5 font-medium">
                    {item.status === 'confirmed' && (
                      <span className="text-stone-900 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-700" />
                        Confirmed & Scheduled
                      </span>
                    )}
                    {item.status === 'in_progress' && (
                      <span className="text-amber-700 flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        In Progress
                      </span>
                    )}
                    {item.status === 'completed' && (
                      <span className="text-stone-700 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-600" />
                        Completed & Certified
                      </span>
                    )}
                    {item.status === 'cancelled' && (
                      <span className="text-stone-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" />
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  {/* Service info */}
                  <div className="md:col-span-8 flex gap-4">
                    <img
                      src={item.serviceImage}
                      alt={item.serviceTitle}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-stone-200 shrink-0"
                    />
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-base font-bold text-stone-900 leading-snug">
                        {item.serviceTitle}
                      </h3>
                      <div className="text-xs text-stone-600">
                        {item.packageTier}
                      </div>
                      
                      {/* Addons list */}
                      {item.addons.length > 0 && (
                        <div className="text-xs text-stone-500">
                          Add-ons: {item.addons.map((a) => a.name).join(', ')}
                        </div>
                      )}

                      {/* Specialist */}
                      <div className="flex items-center gap-2 pt-1 text-xs text-stone-700">
                        <img
                          src={item.provider.avatar}
                          alt={item.provider.name}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover border border-stone-200"
                        />
                        <span className="font-medium">Specialist: {item.provider.name}</span>
                        <span className="text-stone-300">·</span>
                        <span className="text-stone-500">{item.provider.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Schedule & Location */}
                  <div className="md:col-span-4 bg-stone-50 rounded-lg p-3.5 space-y-2 text-xs border border-stone-200/60">
                    <div className="flex items-center gap-2 text-stone-800">
                      <Calendar className="w-4 h-4 text-stone-600 shrink-0" />
                      <span className="font-semibold font-mono tabular-nums">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <Clock className="w-4 h-4 text-stone-500 shrink-0" />
                      <span className="font-mono tabular-nums">{item.timeSlot}</span>
                    </div>
                    <div className="flex items-start gap-2 text-stone-600 pt-0.5">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.address}</span>
                    </div>
                  </div>
                </div>

                {/* Client review card if completed */}
                {item.userReview && (
                  <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-xs space-y-1">
                    <div className="flex items-center gap-1 font-mono text-amber-500">
                      {Array.from({ length: item.userRating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-stone-700 font-semibold ml-1">Your Verified Feedback</span>
                    </div>
                    <p className="text-stone-600 italic">"{item.userReview}"</p>
                  </div>
                )}

                {/* Footer Actions & Price */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500">Total Charged:</span>
                    <span className="text-base font-bold text-stone-900 font-mono tabular-nums">
                      ${item.total}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setReceiptBooking(item)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>

                    {item.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => {
                            setReschedulingBooking(item);
                            setNewSelectedDate(rescheduleDates[0]);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reschedule</span>
                        </button>

                        <button
                          onClick={() => onCancelBooking(item.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      </>
                    )}

                    {item.status === 'completed' && !item.userReview && (
                      <button
                        onClick={() => onOpenReviewModal(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span>Leave Review</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reschedule Modal */}
        {reschedulingBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white border border-stone-200 p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-stone-900">
                  Reschedule Appointment
                </h3>
                <button
                  onClick={() => setReschedulingBooking(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-stone-600">
                Rescheduling #{reschedulingBooking.id} for{' '}
                <span className="font-semibold text-stone-900">{reschedulingBooking.serviceTitle}</span>.
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select New Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {rescheduleDates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setNewSelectedDate(d)}
                      className={`p-2.5 rounded-lg border text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                        newSelectedDate === d
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select New Time Window
                </label>
                <div className="space-y-2">
                  {rescheduleSlots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewSelectedSlot(s)}
                      className={`w-full p-2.5 rounded-lg border text-xs font-mono tabular-nums text-left transition-colors cursor-pointer ${
                        newSelectedSlot === s
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onRescheduleBooking(reschedulingBooking.id, newSelectedDate, newSelectedSlot);
                    setReschedulingBooking(null);
                  }}
                  className="flex-1 rounded-lg bg-stone-900 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Save New Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setReschedulingBooking(null)}
                  className="rounded-lg border border-stone-200 px-4 py-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Receipt View Modal */}
        {receiptBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <div className="w-full max-w-lg rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex justify-between items-start border-b border-stone-200 pb-4">
                <div>
                  <div className="text-lg font-bold font-display text-stone-900">
                    Servicely Tax Invoice & Receipt
                  </div>
                  <div className="text-xs text-stone-500 font-mono">
                    Ref: #{receiptBooking.id} · Issued {receiptBooking.createdAt}
                  </div>
                </div>
                <button
                  onClick={() => setReceiptBooking(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-stone-400 block font-medium uppercase text-[10px]">Client</span>
                    <span className="font-semibold text-stone-900 block">{receiptBooking.clientName}</span>
                    <span className="text-stone-600 block">{receiptBooking.clientEmail}</span>
                    <span className="text-stone-600 block">{receiptBooking.clientPhone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium uppercase text-[10px]">Service Provider</span>
                    <span className="font-semibold text-stone-900 block">{receiptBooking.provider.name}</span>
                    <span className="text-stone-600 block">{receiptBooking.provider.role}</span>
                    <span className="text-stone-600 block">{receiptBooking.provider.city}</span>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-4 space-y-2">
                  <div className="flex justify-between font-medium text-stone-800">
                    <span>{receiptBooking.serviceTitle} ({receiptBooking.packageTier})</span>
                    <span className="font-mono tabular-nums">${receiptBooking.subtotal}</span>
                  </div>
                  {receiptBooking.addons.map((a, i) => (
                    <div key={i} className="flex justify-between text-stone-600 pl-2">
                      <span>Add-on: {a.name}</span>
                      <span className="font-mono tabular-nums">+${a.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-stone-600">
                    <span>Bonded Safety & Dispatch Fee (6%)</span>
                    <span className="font-mono tabular-nums">${receiptBooking.serviceFee}</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 text-sm border-t border-stone-200 pt-2">
                    <span>Total Paid</span>
                    <span className="font-mono tabular-nums">${receiptBooking.total}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-[11px] text-stone-500 space-y-1">
                  <div>Scheduled Slot: {receiptBooking.date} ({receiptBooking.timeSlot})</div>
                  <div>Service Address: {receiptBooking.address}</div>
                  <div>Status: {receiptBooking.status.toUpperCase()}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 rounded-lg bg-stone-900 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 cursor-pointer"
                >
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setReceiptBooking(null)}
                  className="rounded-lg border border-stone-200 px-4 py-2.5 text-xs font-medium text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
