import React from 'react';
import { Star, Bookmark, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types/service';

interface ServiceCardProps {
  service: ServiceItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (service: ServiceItem) => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  home: 'Home & Maintenance',
  creative: 'Creative & Digital',
  wellness: 'Wellness & Health',
  auto: 'Automotive & Mobility',
  business: 'Business & Finance',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  return (
    <div className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-stone-300">
      <div>
        {/* Card Image Area with Zero-Broken-Image Policy */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-xl bg-stone-100">
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-103"
            onError={(e) => {
              // Graceful fallback to styled neutral surface
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('bg-stone-200', 'flex', 'items-center', 'justify-center');
                const label = document.createElement('span');
                label.className = 'text-xs font-medium text-stone-500 uppercase tracking-wider';
                label.innerText = service.category;
                parent.appendChild(label);
              }
            }}
          />

          {/* Quick Bookmark Toggle (Functional interactive button) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(service.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
              isSaved
                ? 'bg-stone-900 text-amber-400'
                : 'bg-stone-900/40 text-white hover:bg-stone-900/70'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save service'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          {/* Unboxed Metadata (NO PILL BOXES, clean typographic separators) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span>{CATEGORY_NAMES[service.category] || service.category}</span>
            <span aria-hidden="true">·</span>
            <span>{service.locationType}</span>
            <span aria-hidden="true">·</span>
            <span>{service.durationEst}</span>
          </div>

          {/* Service Title & Tagline */}
          <div className="space-y-1">
            <h3
              onClick={() => onSelect(service)}
              className="text-base font-semibold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors cursor-pointer line-clamp-1"
            >
              {service.title}
            </h3>
            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
              {service.tagline}
            </p>
          </div>

          {/* Provider Miniature Row */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={service.provider.avatar}
                alt={service.provider.name}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover shrink-0 border border-stone-200"
              />
              <div className="min-w-0 flex items-center gap-1">
                <span className="font-medium text-stone-800 truncate">
                  {service.provider.name}
                </span>
                {service.provider.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-stone-700 shrink-0" aria-label="Verified pro" />
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 shrink-0 font-mono text-xs tabular-nums text-stone-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{service.rating.toFixed(2)}</span>
              <span className="text-stone-400">({service.reviewsCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Booking CTA Footer */}
      <div className="p-5 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div>
            <div className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">
              {service.priceType === 'from' ? 'Starting at' : service.priceType === 'hourly' ? 'Rate / Hr' : 'Flat Price'}
            </div>
            <div className="text-lg font-bold text-stone-900 font-mono tabular-nums">
              ${service.basePrice}
            </div>
          </div>

          <button
            onClick={() => onSelect(service)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
          >
            <span>Configure & Book</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
