import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { ServiceCategory, CustomQuoteRequest } from '../types/service';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuote: (quote: CustomQuoteRequest) => void;
}

export const CustomQuoteModal: React.FC<CustomQuoteModalProps> = ({
  isOpen,
  onClose,
  onSubmitQuote,
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('home');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('$300 – $750');
  const [timeline, setTimeline] = useState('Within this week');
  const [location, setLocation] = useState('Metro Central & Suburbs');
  const [contactEmail, setContactEmail] = useState('kkiruivictor2@gmail.com');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !description.trim()) return;

    const request: CustomQuoteRequest = {
      id: `QR-${Math.floor(1000 + Math.random() * 9000)}`,
      taskTitle,
      category,
      description,
      timeline,
      budgetRange,
      location,
      contactEmail,
      status: 'matched',
      matchedPro: 'Julian Vance & 2 Certified Partners',
      createdAt: 'Just now',
    };

    onSubmitQuote(request);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setTaskTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Bespoke Project Inquiries
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              Request a Custom Service Quote
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-900 border border-stone-200">
              <CheckCircle2 className="h-8 w-8 text-stone-900" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-stone-900">
                Bespoke Request Dispatched
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                We have matched your request with 2 verified guild masters in your zone. You will receive itemized estimates at <span className="font-semibold text-stone-900">{contactEmail}</span> within 2 hours.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="rounded-lg bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Project or Task Headline
              </label>
              <input
                type="text"
                required
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="e.g. Custom hardwood cabinetry install, Full rebrand sprint, etc."
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Primary Craft Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none bg-white"
                >
                  <option value="home">Home & Maintenance</option>
                  <option value="creative">Creative & Digital</option>
                  <option value="wellness">Wellness & Health</option>
                  <option value="auto">Automotive & Mobility</option>
                  <option value="business">Business & Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Expected Budget Range
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none bg-white font-mono tabular-nums"
                >
                  <option value="$150 – $300">$150 – $300</option>
                  <option value="$300 – $750">$300 – $750</option>
                  <option value="$750 – $1,500">$750 – $1,500</option>
                  <option value="$1,500 – $5,000+">$1,500 – $5,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Detailed Scope of Work & Requirements
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your exact requirements, dimensions, materials preferred, or any specific constraints..."
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Timeline / Required Date
                </label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="e.g. Next 3 days, by Oct 20"
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
              <Shield className="w-4 h-4 text-stone-600 shrink-0" />
              <span>Quotes are free and carry no obligation to book. Fully insured pros.</span>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Bespoke Request</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
