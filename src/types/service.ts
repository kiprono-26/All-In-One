export type ServiceCategory = 'all' | 'home' | 'creative' | 'wellness' | 'auto' | 'business';

export interface ServicePackage {
  tier: 'Essential' | 'Standard' | 'Master';
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ServiceProvider {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  completedJobs: number;
  responseTime: string;
  verified: boolean;
  city: string;
  bio: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  category: ServiceCategory;
  basePrice: number;
  priceType: 'flat' | 'hourly' | 'from';
  durationEst: string;
  rating: number;
  reviewsCount: number;
  image: string;
  locationType: 'On-site' | 'Remote / Studio' | 'Mobile Unit';
  availabilityKicker: string;
  description: string;
  inclusions: string[];
  equipmentProvided: string[];
  packages: ServicePackage[];
  addons: ServiceAddon[];
  provider: ServiceProvider;
  featured?: boolean;
}

export interface BookingRecord {
  id: string;
  serviceId: string;
  serviceTitle: string;
  category: ServiceCategory;
  serviceImage: string;
  provider: ServiceProvider;
  packageTier: string;
  addons: { id: string; name: string; price: number }[];
  date: string;
  timeSlot: string;
  address: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  subtotal: number;
  serviceFee: number;
  total: number;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  userRating?: number;
  userReview?: string;
}

export interface CustomQuoteRequest {
  id: string;
  taskTitle: string;
  category: ServiceCategory;
  description: string;
  timeline: string;
  budgetRange: string;
  location: string;
  contactEmail: string;
  status: 'matched' | 'reviewing';
  matchedPro?: string;
  createdAt: string;
}
