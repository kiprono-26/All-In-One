import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenCustomQuote: () => void;
  onOpenOfferService: () => void;
  onSelectCategory: (category: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCustomQuote,
  onOpenOfferService,
  onSelectCategory,
}) => {
  return (
    <footer className="border-t border-stone-200 bg-stone-100 text-stone-600 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-base font-bold font-display text-stone-900 block">
              Servicely
            </span>
            <p className="text-stone-600 max-w-sm leading-relaxed">
              The premier marketplace connecting discerning clients with rigorously vetted
              independent specialists across home maintenance, creative craft, kinetic wellness,
              and automotive engineering.
            </p>
            <div className="flex items-center gap-2 text-stone-700 pt-1">
              <ShieldCheck className="w-4 h-4 text-stone-800" />
              <span className="font-medium">$5M Bonded Insurance Coverage</span>
            </div>
          </div>

          {/* Service Disciplines */}
          <div className="md:col-span-3 space-y-2.5">
            <span className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] block">
              Disciplines
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectCategory('home')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Home & Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('creative')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Creative & Digital Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('wellness')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Wellness & Kinetic Therapy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('auto')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Automotive & Mobile Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('business')}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Business & Financial Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Actions */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] block">
              Join or Commission
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={onOpenOfferService}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Offer a Service as a Master
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCustomQuote}
                  className="hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Request a Bespoke Quote
                </button>
              </li>
              <li>
                <span className="text-stone-500">Standards & Quality Charter</span>
              </li>
              <li>
                <span className="text-stone-500">Dispute & Guarantee Protection</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with quiet copyright */}
        <div className="border-t border-stone-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
          <div>
            © {new Date().getFullYear()} Servicely. All verified craft rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Trust & Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
