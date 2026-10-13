import React, { useState } from 'react';
import { X, Plus, CheckCircle2 } from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types/service';
import homeCareImg from '../assets/images/service_home_care_1791908680446.jpg';
import creativeDigitalImg from '../assets/images/service_creative_digital_1791908681806.jpg';
import wellnessCareImg from '../assets/images/service_wellness_care_1791908682402.jpg';
import autoDetailingImg from '../assets/images/service_auto_detailing_1791908683023.jpg';

interface OfferServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddService: (newService: ServiceItem) => void;
}

export const OfferServiceModal: React.FC<OfferServiceModalProps> = ({
  isOpen,
  onClose,
  onAddService,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('home');
  const [basePrice, setBasePrice] = useState('185');
  const [durationEst, setDurationEst] = useState('2 – 3 hours');
  const [locationType, setLocationType] = useState<'On-site' | 'Remote / Studio' | 'Mobile Unit'>('On-site');
  const [providerName, setProviderName] = useState('David K. Kipsang');
  const [providerRole, setProviderRole] = useState('Certified Master Craftsman');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Pick category image matching type
    let chosenImg = homeCareImg;
    if (category === 'creative') chosenImg = creativeDigitalImg;
    if (category === 'wellness') chosenImg = wellnessCareImg;
    if (category === 'auto') chosenImg = autoDetailingImg;
    if (category === 'business') chosenImg = creativeDigitalImg;

    const parsedPrice = parseInt(basePrice) || 150;

    const newService: ServiceItem = {
      id: `srv-custom-${Date.now()}`,
      title,
      tagline: tagline || 'Certified master craft with meticulous inspection and satisfaction guarantee.',
      category,
      basePrice: parsedPrice,
      priceType: 'from',
      durationEst,
      rating: 5.0,
      reviewsCount: 1,
      image: chosenImg,
      locationType,
      availabilityKicker: 'Newly Listed · Available This Week',
      description,
      inclusions: [
        'Initial technical consultation & scope validation',
        'Direct service delivery using professional equipment',
        'Post-service quality sign-off and 30-day craft warranty'
      ],
      equipmentProvided: [
        'Commercial grade professional toolkit',
        'Clean surface protection runners & disposal supplies'
      ],
      packages: [
        {
          tier: 'Essential',
          name: 'Standard Commission',
          price: parsedPrice,
          duration: durationEst,
          description: 'Fundamental service delivery covering core specifications.',
          features: ['Complete primary execution', 'Standard equipment', 'Written report']
        },
        {
          tier: 'Standard',
          name: 'Comprehensive Craftsmanship',
          price: Math.round(parsedPrice * 1.5),
          duration: `${parseInt(durationEst) + 1 || 4} hours`,
          description: 'Extended depth with multi-point tuning and extended warranty.',
          features: ['Expanded coverage', 'Premium materials', 'Priority schedule', '1-year workmanship warranty']
        },
        {
          tier: 'Master',
          name: 'Master Suite & Overhaul',
          price: Math.round(parsedPrice * 2.2),
          duration: 'Full Day',
          description: 'End-to-end bespoke execution with zero compromises.',
          features: ['VIP master technician', 'White-glove cleanup', 'Complimentary follow-up audit']
        }
      ],
      addons: [
        { id: 'custom-add-1', name: 'Expedited Rush Priority', price: 65, description: 'Direct emergency same-day dispatch.' },
        { id: 'custom-add-2', name: 'Extended Protection Warranty', price: 85, description: 'Full coverage for 24 months.' }
      ],
      provider: {
        name: providerName,
        role: providerRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80',
        rating: 5.0,
        completedJobs: 1,
        responseTime: 'Under 15 min',
        verified: true,
        city: 'Metro Service Zone',
        bio: 'Verified independent guild professional committed to precision craftsmanship.'
      }
    };

    onAddService(newService);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Guild Marketplace Listing
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              List & Offer a New Service
            </h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Publish your craft to thousands of prospective residential and commercial clients.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Service Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master Woodwork Restoration, Mobile Smart Home Hub Setup..."
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Concise Tagline (1 sentence summary)
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Precision hand-crafted furniture repair and antique oil finishing."
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Category
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
              <label className="block font-semibold text-stone-700 mb-1">
                Base Price ($ USD)
              </label>
              <input
                type="number"
                required
                min="20"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Location Delivery
              </label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as any)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none bg-white"
              >
                <option value="On-site">On-site</option>
                <option value="Remote / Studio">Remote / Studio</option>
                <option value="Mobile Unit">Mobile Unit</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Specialist Name
              </label>
              <input
                type="text"
                required
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Professional Title / Role
              </label>
              <input
                type="text"
                required
                value={providerRole}
                onChange={(e) => setProviderRole(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              Detailed Scope & Execution Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain your technical procedure, background experience, materials utilized, and client expectations..."
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-3 border-t border-stone-200">
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Service Listing to Marketplace</span>
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
