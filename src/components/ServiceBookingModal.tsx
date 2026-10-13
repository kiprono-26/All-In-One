import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  MapPin,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { ServiceItem, ServicePackage, ServiceAddon, BookingRecord } from '../types/service';

interface ServiceBookingModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onConfirmBooking: (booking: BookingRecord) => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  service,
  onClose,
  onConfirmBooking,
}) => {
  if (!service) return null;

  // Selected package (default to Standard if exists, or first package)
  const defaultPackage = service.packages[1] || service.packages[0];
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage>(defaultPackage);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Schedule dates generator (Today + next 6 days)
  const now = new Date();
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const fullDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return { dayName, formatted, fullDate };
  });

  const timeSlots = [
    '09:00 AM – 11:30 AM',
    '12:30 PM – 03:00 PM',
    '03:30 PM – 06:00 PM',
  ];

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[1].fullDate);
  const [selectedSlot, setSelectedSlot] = useState<string>(timeSlots[0]);

  // Client Details Form
  const [clientName, setClientName] = useState('Victor Kirui');
  const [clientEmail, setClientEmail] = useState('kkiruivictor2@gmail.com');
  const [clientPhone, setClientPhone] = useState('+1 (555) 234-8901');
  const [address, setAddress] = useState('428 Kensington Ave, Apt 4B');
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'schedule' | 'address'>('details');

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Pricing Math
  const packagePrice = selectedPackage.price;
  const addonsSelected = service.addons.filter((a) => selectedAddonIds.includes(a.id));
  const addonsTotal = addonsSelected.reduce((sum, a) => sum + a.price, 0);
  const subtotal = packagePrice + addonsTotal;
  const serviceFee = Math.round(subtotal * 0.06);
  const grandTotal = subtotal + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setActiveTab('address');
      return;
    }

    const newBooking: BookingRecord = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: service.id,
      serviceTitle: service.title,
      category: service.category,
      serviceImage: service.image,
      provider: service.provider,
      packageTier: `${selectedPackage.tier} (${selectedPackage.name})`,
      addons: addonsSelected.map((a) => ({ id: a.id, name: a.name, price: a.price })),
      date: selectedDate,
      timeSlot: selectedSlot,
      address,
      clientName,
      clientEmail,
      clientPhone,
      notes,
      subtotal,
      serviceFee,
      total: grandTotal,
      status: 'confirmed',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    onConfirmBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-stone-50/80">
          <div>
            <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              {service.locationType} · {service.durationEst}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">
              {service.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Step Tabs */}
        <div className="flex border-b border-stone-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 mr-6 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            1. Package & Inclusions
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 mr-6 transition-colors cursor-pointer ${
              activeTab === 'schedule'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            2. Date & Time Window
          </button>
          <button
            onClick={() => setActiveTab('address')}
            className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'address'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            3. Location & Client Info
          </button>
        </div>

        {/* Content Body & Sticky Pricing Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
          {/* Main Left Content Panel */}
          <div className="lg:col-span-8 p-6 space-y-8">
            {activeTab === 'details' && (
              <div className="space-y-8">
                {/* Provider Mini Bio */}
                <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={service.provider.avatar}
                      alt={service.provider.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-stone-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-semibold text-stone-900 text-sm">
                        <span>{service.provider.name}</span>
                        {service.provider.verified && (
                          <CheckCircle2 className="w-4 h-4 text-stone-800" />
                        )}
                      </div>
                      <div className="text-xs text-stone-600">{service.provider.role}</div>
                      <div className="text-xs text-stone-500 font-mono tabular-nums mt-0.5">
                        {service.provider.rating} rating · {service.provider.completedJobs} completed jobs · Responds {service.provider.responseTime}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-stone-500 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto">
                    <span className="block font-medium text-stone-700">Coverage Zone</span>
                    <span>{service.provider.city}</span>
                  </div>
                </div>

                {/* Package Tiers Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                      Select Service Package Tier
                    </h3>
                    <span className="text-xs text-stone-500">Pick the depth of execution</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {service.packages.map((pkg) => {
                      const isSelected = selectedPackage.tier === pkg.tier;
                      return (
                        <div
                          key={pkg.tier}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                              : 'border-stone-200 bg-white hover:border-stone-400 text-stone-900'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs font-semibold mb-1">
                              <span className={isSelected ? 'text-stone-300' : 'text-stone-500'}>
                                {pkg.tier}
                              </span>
                              <span className="font-mono tabular-nums">{pkg.duration}</span>
                            </div>
                            <h4 className="font-bold text-sm leading-tight mb-2">
                              {pkg.name}
                            </h4>
                            <p
                              className={`text-xs mb-4 leading-relaxed ${
                                isSelected ? 'text-stone-300' : 'text-stone-600'
                              }`}
                            >
                              {pkg.description}
                            </p>
                          </div>

                          <div>
                            <div className="space-y-1.5 mb-3 border-t pt-3 text-xs">
                              {pkg.features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <Check
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isSelected ? 'text-amber-400' : 'text-stone-700'
                                    }`}
                                  />
                                  <span className={isSelected ? 'text-stone-200' : 'text-stone-700'}>
                                    {feat}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="text-base font-bold font-mono tabular-nums pt-1 border-t border-stone-200/20">
                              ${pkg.price}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Available Add-Ons */}
                {service.addons.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                      Optional Add-On Enhancements
                    </h3>

                    <div className="space-y-2">
                      {service.addons.map((addon) => {
                        const isChecked = selectedAddonIds.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                              isChecked
                                ? 'border-stone-900 bg-stone-50'
                                : 'border-stone-200 hover:border-stone-300 bg-white'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                                  isChecked
                                    ? 'bg-stone-900 border-stone-900 text-white'
                                    : 'border-stone-300 bg-white'
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-stone-900">
                                  {addon.name}
                                </h4>
                                <p className="text-xs text-stone-500">{addon.description}</p>
                              </div>
                            </div>
                            <div className="font-mono text-sm font-bold text-stone-900 tabular-nums shrink-0">
                              +${addon.price}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Full Description & What's Included */}
                <div className="space-y-4 pt-4 border-t border-stone-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    Scope of Service & Protocol
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {service.inclusions && service.inclusions.length > 0 && (
                      <div className="rounded-xl border border-stone-200 p-4 space-y-2 bg-stone-50/50">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                          Always Included
                        </span>
                        <ul className="space-y-1.5 text-xs text-stone-600">
                          {service.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-stone-400 mt-0.5">·</span>
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.equipmentProvided && service.equipmentProvided.length > 0 && (
                      <div className="rounded-xl border border-stone-200 p-4 space-y-2 bg-stone-50/50">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                          Specialist Equipment
                        </span>
                        <ul className="space-y-1.5 text-xs text-stone-600">
                          {service.equipmentProvided.map((eq, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-stone-400 mt-0.5">·</span>
                              <span>{eq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('schedule')}
                    className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <span>Proceed to Schedule Slot</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-1">
                    Select Appointment Date
                  </h3>
                  <p className="text-xs text-stone-500">
                    Live schedule synchronized with {service.provider.name}’s calendar
                  </p>
                </div>

                {/* Day selector cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {availableDates.map((item, i) => {
                    const isSelected = selectedDate === item.fullDate;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(item.fullDate)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                            : 'border-stone-200 bg-white hover:border-stone-400 text-stone-800'
                        }`}
                      >
                        <div className={`text-[11px] font-medium uppercase ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                          {item.dayName}
                        </div>
                        <div className="text-sm font-bold mt-1 font-mono tabular-nums">
                          {item.formatted}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Time slot selector */}
                <div className="space-y-3 pt-4 border-t border-stone-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                    Available Time Window
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer font-mono text-xs tabular-nums font-semibold ${
                            isSelected
                              ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                              : 'border-stone-200 bg-white hover:border-stone-400 text-stone-800'
                          }`}
                        >
                          <Clock className={`w-4 h-4 mx-auto mb-1.5 ${isSelected ? 'text-white' : 'text-stone-400'}`} />
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-stone-600 leading-relaxed">
                    Arrival window includes a 15-minute dispatch notification. You can reschedule or
                    cancel for free up to 24 hours prior to appointment time.
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className="rounded-lg border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('address')}
                    className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <span>Proceed to Location & Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-1">
                    Contact & Service Location
                  </h3>
                  <p className="text-xs text-stone-500">
                    Where will the service take place?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email for Confirmation & Invoicing
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Service Address / Unit
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace, Apt 3B"
                      className="w-full rounded-lg border border-stone-300 pl-9 pr-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Special Entry Notes or Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Gate code #4021, elevator on the left, pets in backyard..."
                    className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('schedule')}
                    className="rounded-lg border border-stone-300 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-6 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Reserve Slot Now (${grandTotal})</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sticky Summary & Checkout Sidebar */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-200 bg-stone-50 p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                Reservation Summary
              </h3>

              {/* Service thumbnail */}
              <div className="flex gap-3 items-center pb-4 border-b border-stone-200">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {service.title}
                  </h4>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Pro: {service.provider.name}
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono tabular-nums">
                    {service.provider.rating} ★ ({service.provider.completedJobs} jobs)
                  </div>
                </div>
              </div>

              {/* Selected Tier & Schedule Snapshot */}
              <div className="space-y-2 text-xs text-stone-700">
                <div className="flex justify-between">
                  <span className="text-stone-500">Tier Selected:</span>
                  <span className="font-semibold text-stone-900">{selectedPackage.tier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Est. Duration:</span>
                  <span className="font-mono tabular-nums">{selectedPackage.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Scheduled Date:</span>
                  <span className="font-semibold text-stone-900 font-mono tabular-nums">
                    {selectedDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Time Window:</span>
                  <span className="font-mono tabular-nums">{selectedSlot}</span>
                </div>
              </div>

              {/* Addons List */}
              {addonsSelected.length > 0 && (
                <div className="pt-3 border-t border-stone-200 space-y-1.5">
                  <div className="text-xs font-semibold text-stone-700">
                    Selected Add-ons:
                  </div>
                  {addonsSelected.map((a) => (
                    <div key={a.id} className="flex justify-between text-xs text-stone-600">
                      <span className="truncate pr-2">{a.name}</span>
                      <span className="font-mono tabular-nums font-semibold shrink-0">
                        +${a.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Package Base Price</span>
                  <span className="font-mono tabular-nums">${packagePrice}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Add-ons Total</span>
                    <span className="font-mono tabular-nums">+${addonsTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span className="flex items-center gap-1">
                    <span>Trust, Safety & Insurance</span>
                  </span>
                  <span className="font-mono tabular-nums">${serviceFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums text-base">${grandTotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-2">
                <Shield className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                <span>Zero advance deposit needed. Payment captured on job completion.</span>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-xl bg-stone-900 py-3 text-xs font-semibold text-white hover:bg-stone-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm & Reserve Slot (${grandTotal})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
