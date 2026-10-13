import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { BookingRecord } from '../types/service';

interface BookingConfirmationModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
  onViewBookings: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
  onViewBookings,
}) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-900 border border-stone-200">
          <CheckCircle className="h-8 w-8 text-stone-900" />
        </div>

        {/* Title & Ref ID */}
        <div className="space-y-1">
          <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">
            Booking ID: #{booking.id}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
            Appointment Reserved & Confirmed
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            {booking.provider.name} has been notified and holds your time slot. A receipt and calendar invitation have been sent to {booking.clientEmail}.
          </p>
        </div>

        {/* Summary Card */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/80 p-4 text-left space-y-3 text-xs">
          <div className="flex justify-between items-start border-b border-stone-200/70 pb-2.5">
            <div>
              <span className="font-bold text-stone-900 text-sm block">
                {booking.serviceTitle}
              </span>
              <span className="text-stone-500">{booking.packageTier}</span>
            </div>
            <span className="font-mono tabular-nums font-bold text-stone-900 text-sm">
              ${booking.total}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-stone-700">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span className="font-mono tabular-nums">{booking.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span className="font-mono tabular-nums">{booking.timeSlot}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-stone-700 pt-1">
            <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="truncate">{booking.address}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onViewBookings();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
          >
            <span>Manage in My Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
