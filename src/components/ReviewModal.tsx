import React, { useState } from 'react';
import { X, Star, Check } from 'lucide-react';
import { BookingRecord } from '../types/service';

interface ReviewModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
  onSubmitReview: (bookingId: string, rating: number, review: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  booking,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!booking) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmitReview(booking.id, rating, comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-stone-200 shadow-2xl p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">
              Service Rating & Feedback
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              Review {booking.provider.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-xs text-stone-600">
            For service:{' '}
            <span className="font-semibold text-stone-900">{booking.serviceTitle}</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-115 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-mono tabular-nums font-bold text-stone-700 ml-2">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Your Review & Comments
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the punctuality, craftsmanship, cleanliness, and overall satisfaction..."
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-stone-900 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Submit Verified Review
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
