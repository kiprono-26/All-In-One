import { ServiceItem, BookingRecord } from '../types/service';

import homeCareImg from '../assets/images/service_home_care_1791908680446.jpg';
import creativeDigitalImg from '../assets/images/service_creative_digital_1791908681806.jpg';
import wellnessCareImg from '../assets/images/service_wellness_care_1791908682402.jpg';
import autoDetailingImg from '../assets/images/service_auto_detailing_1791908683023.jpg';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-plumb-01',
    title: 'Architectural Plumbing & Hydro-Diagnostic Inspection',
    tagline: 'Comprehensive acoustic leak detection, pressure balancing & luxury fixture servicing.',
    category: 'home',
    basePrice: 165,
    priceType: 'from',
    durationEst: '1.5 – 3 hours',
    rating: 4.96,
    reviewsCount: 148,
    image: homeCareImg,
    locationType: 'On-site',
    availabilityKicker: 'Today · 2 slots left',
    featured: true,
    description:
      'Master licensed technicians equipped with thermal imaging cameras, acoustic sonic probes, and non-invasive pressure gauges. We troubleshoot concealed pressure drops, install high-flow Italian brassware, and certify residential line integrity.',
    inclusions: [
      'Digital ultrasonic & thermal leak sweep',
      'Static & dynamic water pressure calibration',
      'Inline valve descaling and gasket refurbishment',
      'Comprehensive digital compliance report & 12-month warranty'
    ],
    equipmentProvided: [
      'FLIR E8 thermal imaging apparatus',
      'Ridgid digital micro-camera snake',
      'Rothenberger electro-hydraulic crimping kit',
      'High-grade protective shoe & surface runners'
    ],
    packages: [
      {
        tier: 'Essential',
        name: 'Targeted Diagnostic & Valve Tune',
        price: 165,
        duration: '90 min',
        description: 'Single-zone troubleshooting, flow-rate benchmarking, and mechanical seals replacement.',
        features: ['Up to 2 fixture examinations', 'Gasket & seal replacement included', 'Written diagnostic report']
      },
      {
        tier: 'Standard',
        name: 'Whole-Residence Hydraulic Audit',
        price: 280,
        duration: '2.5 hrs',
        description: 'Complete inspection of main lines, relief valves, water filtration loops, and pressure regulators.',
        features: ['Up to 6 wet zones covered', 'Pressure valve recalibration', 'Thermal camera pipe sweep', '1-year workmanship warranty']
      },
      {
        tier: 'Master',
        name: 'Luxury Fixture Overhaul & Descaling',
        price: 450,
        duration: '4 hrs',
        description: 'End-to-end refurbishment of premium concealed mixer bodies, cartridge swaps, and high-pressure descaling.',
        features: ['Full residence coverage', 'Premium cartridge rebuild kit', 'Water softening analysis', '24/7 emergency dispatch priority']
      }
    ],
    addons: [
      { id: 'add-1', name: 'Microbial Water Purity Lab Test', price: 65, description: 'Sample sent to certified lab with turnaround in 48h.' },
      { id: 'add-2', name: 'Hot Water Tank Anode Inspection & Flush', price: 95, description: 'Prevents galvanic corrosion and restores thermal transfer efficiency.' },
      { id: 'add-3', name: 'High-Torque Quiet Garbage Disposal Tune', price: 45, description: 'Precision balance and biological odor deodorization.' }
    ],
    provider: {
      name: 'Julian Vance',
      role: 'Master Plumber & Hydronic Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80',
      rating: 4.97,
      completedJobs: 412,
      responseTime: 'Under 15 min',
      verified: true,
      city: 'Metro Central & Greater West',
      bio: 'Over 14 years restoring architectural residences and high-end residential plumbing. Licensed, insured ($5M), and zero-mess guarantee.'
    }
  },
  {
    id: 'srv-brand-02',
    title: 'Brand Identity & Visual System Architecture',
    tagline: 'Bespoke corporate identities, responsive typography systems & Figma tokens.',
    category: 'creative',
    basePrice: 520,
    priceType: 'flat',
    durationEst: '4 – 7 business days',
    rating: 4.98,
    reviewsCount: 92,
    image: creativeDigitalImg,
    locationType: 'Remote / Studio',
    availabilityKicker: 'Starts Monday',
    featured: true,
    description:
      'Engineered brand identities tailored for tech startups, boutique retail, and discerning founders. Delivered with production-ready vector assets, fluid typography hierarchies, and strict WCAG token systems.',
    inclusions: [
      '3 distinct visual direction moodboards & typography studies',
      'Primary, secondary, and badge lockups (SVG, PDF, EPS)',
      'Complete typography hierarchy and web font licensing guide',
      'Interactive Figma design token repository & 40-page brand manual'
    ],
    equipmentProvided: [
      'Color-calibrated Eizo ColorEdge 4K hardware monitors',
      'Native vector precision crafting in Figma & Adobe Illustrator',
      'Semantic token exports for Tailwind CSS and CSS variables'
    ],
    packages: [
      {
        tier: 'Essential',
        name: 'Brand Foundations Sprint',
        price: 520,
        duration: '4 days',
        description: 'Primary wordmark, symbol mark, 3-color palette, typography pairings, and clean exports.',
        features: ['2 revision rounds', 'Figma file delivery', 'Vector exports (SVG/EPS/PNG)', 'Digital style sheet']
      },
      {
        tier: 'Standard',
        name: 'Comprehensive Identity System',
        price: 890,
        duration: '7 days',
        description: 'Complete brand ecosystem including 3D badges, icon set, stationery templates, and social system.',
        features: ['3 revision rounds', 'Full brand guidelines PDF', 'Social kit (12 templates)', 'Tailwind color & type tokens']
      },
      {
        tier: 'Master',
        name: 'Enterprise Visual Design Architecture',
        price: 1450,
        duration: '12 days',
        description: 'Full-spectrum identity with interactive web component library, motion logo stings, and pitch deck template.',
        features: ['Unlimited sprint revisions', 'Lottie animation logo sting', 'Investor presentation deck', 'Live handoff video session']
      }
    ],
    addons: [
      { id: 'add-b1', name: 'Custom App Icon & Favicon Suite', price: 120, description: 'All iOS, Android, macOS, and retina web sizes pixel-perfected.' },
      { id: 'add-b2', name: 'Social Media Launch Kit (18 Assets)', price: 210, description: 'Ready-to-post high-conversion announcement layouts.' },
      { id: 'add-b3', name: '3-Day Expedited Delivery Guarantee', price: 280, description: 'Priority studio scheduling with daily sync.' }
    ],
    provider: {
      name: 'Astrid Lindholm',
      role: 'Principal Brand Architect & Art Director',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&h=240&q=80',
      rating: 4.98,
      completedJobs: 178,
      responseTime: 'Within 1 hour',
      verified: true,
      city: 'Global Remote & Studio',
      bio: 'Former creative agency director specializing in minimalist Scandinavian design aesthetics and modular typography.'
    }
  },
  {
    id: 'srv-wellness-03',
    title: 'Deep Tissue & Kinetic Myofascial Therapy',
    tagline: 'In-home clinical musculoskeletal recovery, active trigger point release & posture alignment.',
    category: 'wellness',
    basePrice: 140,
    priceType: 'flat',
    durationEst: '75 – 120 min',
    rating: 4.99,
    reviewsCount: 231,
    image: wellnessCareImg,
    locationType: 'On-site',
    availabilityKicker: 'Tomorrow afternoon available',
    featured: true,
    description:
      'Licensed restorative therapists bring a luxury hydraulic table, heated organic linen, and custom botanicals directly to your residence. Ideal for athletes, chronic desk stiffness, or intensive stress decompression.',
    inclusions: [
      'Pre-session postural analysis & joint mobility screening',
      'Clinical trigger-point myofascial release with organic oils',
      'Hypervolt percussion therapy integration',
      'Targeted post-session mobility drills and home stretches'
    ],
    equipmentProvided: [
      'Oakworks Pro ergonomic heated massage table',
      'Organic botanical essential oils (Cold-pressed Jojoba, Argan & Arnica)',
      'Hyperice Hypervolt 2 Pro percussion device',
      'Bose acoustic ambient soundscape kit'
    ],
    packages: [
      {
        tier: 'Essential',
        name: 'Targeted Focus Session',
        price: 140,
        duration: '60 min',
        description: 'Concentrated attention on neck, shoulders, lumbar spine, and thoracic decompression.',
        features: ['Specific focal area relief', 'Deep tissue technique', 'Warm towel compression']
      },
      {
        tier: 'Standard',
        name: 'Full Body Restorative Ritual',
        price: 195,
        duration: '90 min',
        description: 'Comprehensive kinetic release head-to-toe with assisted PNF stretches and warm river stones.',
        features: ['Full body coverage', 'Warm basalt stones', 'Percussion therapy', 'Custom aromatherapy blend']
      },
      {
        tier: 'Master',
        name: 'Executive Performance & Recovery Suite',
        price: 260,
        duration: '120 min',
        description: 'Extended deep tissue therapy combined with foot reflexology, facial acupressure, and postural coaching.',
        features: ['Complete structural reboot', 'Reflexology & scalp release', 'Take-home magnesium recovery balm', 'Detailed posture assessment']
      }
    ],
    addons: [
      { id: 'add-w1', name: 'Hot Basalt Volcanic Stone Integration', price: 35, description: 'Polished geothermal stones to melt deep muscular knots.' },
      { id: 'add-w2', name: 'Pure CBD Muscle Salve Treatment (1000mg)', price: 40, description: 'Targeted botanical anti-inflammatory application.' },
      { id: 'add-w3', name: 'Partner / Dual Session Add-on (Back to Back)', price: 130, description: 'Convenient back-to-back booking for your partner or guest.' }
    ],
    provider: {
      name: 'Marcus Chen, LMT',
      role: 'Neuromuscular & Sports Recovery Therapist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80',
      rating: 4.99,
      completedJobs: 560,
      responseTime: 'Under 30 min',
      verified: true,
      city: 'Urban Metro & Coastal Hills',
      bio: 'Former sports therapist for collegiate triathletes with 11+ years clinical practice. Certified in active myofascial release.'
    }
  },
  {
    id: 'srv-auto-04',
    title: 'Multi-Stage Paint Correction & 5-Year Ceramic Coat',
    tagline: 'Mobile precision detailing with rotary dual-action polish and 9H SiO2 ceramic armor.',
    category: 'auto',
    basePrice: 380,
    priceType: 'from',
    durationEst: '4 – 8 hours',
    rating: 4.95,
    reviewsCount: 114,
    image: autoDetailingImg,
    locationType: 'Mobile Unit',
    availabilityKicker: 'This weekend available',
    featured: true,
    description:
      'Fully self-contained mobile detailing rig equipped with deionized spot-free water, Rupes dual-action polishers, and climate-controlled curing lamps. We eliminate swirl marks, spider-webbing, and oxidation before locking in gloss with certified 9H ceramic coating.',
    inclusions: [
      'Two-bucket pH-neutral snow foam hand wash & chemical decontamination',
      'Clay bar mechanical pull of bonded environmental pollutants',
      'Two-stage machine compound & micro-finishing jewel polish',
      'Certified 9H SiO2 ceramic coating on paintwork, plastics & wheel faces',
      'Interior leather conditioning & electrostatic cabin sanitization'
    ],
    equipmentProvided: [
      'Rupes BigFoot LHR21 Mark III dual-action polishers',
      'Scangrip Sunmatch multi-spectrum LED inspection lighting',
      'Deionized zero-TDS filtration water tank system',
      'CarPro CQuartz 9H Professional ceramic formulations'
    ],
    packages: [
      {
        tier: 'Essential',
        name: 'Single-Stage Gloss Enhancement & 1-Year Sealant',
        price: 380,
        duration: '4 hrs',
        description: 'Removes light haze and up to 60% of superficial micro-scratches with durable hydrophobic sealant.',
        features: ['Full exterior decontamination', 'Single-pass polish', '12-month synthetic seal', 'Full glass ceramic coating']
      },
      {
        tier: 'Standard',
        name: 'Two-Stage Paint Correction & 3-Year Ceramic',
        price: 640,
        duration: '6.5 hrs',
        description: 'Eliminates 85%+ defects, swirls, and etching. Hand-applied professional 9H ceramic layer.',
        features: ['Heavy cut compound + jewel finish', 'CarPro 9H Ceramic layer', 'Wheel barrel & face coating', 'Leather cleaner & conditioner']
      },
      {
        tier: 'Master',
        name: 'Concourse Multi-Stage & 5-Year Dual-Layer Armor',
        price: 980,
        duration: '8.5 hrs',
        description: 'Concourse-grade perfection. Base ceramic coat + sacrificial hydrophobic topcoat + full engine bay detail.',
        features: ['95%+ defect eradication', 'Dual-layer 5-year warranty', 'Full engine bay steam clean', 'Interior leather ceramic shielding']
      }
    ],
    addons: [
      { id: 'add-a1', name: 'Windshield Glass Ceramic Hydrophobic Coating', price: 60, description: 'Extreme water beading and wiper-free rain driving above 45mph.' },
      { id: 'add-a2', name: 'High-Temperature Wheel Caliper Ceramic', price: 85, description: 'Resists 800°C brake dust burn-in and makes cleaning effortless.' },
      { id: 'add-a3', name: 'Ozone Cabin Sterilization & AC Evaporator Clean', price: 55, description: 'Neutralizes smoke, pet odors, and deep-seated bacteria.' }
    ],
    provider: {
      name: 'Darius Vance',
      role: 'Master Automotive Preservationist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80',
      rating: 4.96,
      completedJobs: 320,
      responseTime: 'Under 20 min',
      verified: true,
      city: 'Greater Metropolitan Area',
      bio: 'Certified by the International Detailing Association (IDA). Restores exotic supercars, vintage classics, and daily drivers with surgical care.'
    }
  },
  {
    id: 'srv-clean-05',
    title: 'Whole-Home Deep Micro-Sanitization & HEPA Air Purge',
    tagline: 'Hospitality-grade deep cleaning using plant-based hospital surfactants & 0.1-micron HEPA scrubbers.',
    category: 'home',
    basePrice: 190,
    priceType: 'from',
    durationEst: '3 – 5 hours',
    rating: 4.94,
    reviewsCount: 382,
    image: homeCareImg,
    locationType: 'On-site',
    availabilityKicker: 'Today · Afternoon',
    description:
      'Rigorous whole-home deep cleaning deploying certified eco-surfactants, steam degreasers, and sealed 0.1-micron HEPA air scrubbers. Reaches deep into cabinet interiors, appliances, baseboards, and HVAC air return grilles.',
    inclusions: [
      'Multi-pass baseboard, door molding, and switch plate sanitization',
      'Tile grout rotary deep-scrub and biological lime descaling',
      'High-filtration HEPA vacuuming with air dust reduction pass',
      'Full kitchen appliance exterior & countertop seal condition'
    ],
    equipmentProvided: [
      'Kärcher commercial thermal steam decontamination system',
      'Miele hospital-grade HEPA AirClean canister units',
      'Plant-based biodegradable EPA Safer Choice certified solutions'
    ],
    packages: [
      {
        tier: 'Essential',
        name: 'Essential Deep Refresh (Up to 2 Bedrooms)',
        price: 190,
        duration: '3 hrs',
        description: 'Deep wipe of all vertical baseboards, appliance exteriors, tile grout scrubbing, and bathroom disinfection.',
        features: ['Up to 2 Bed / 2 Bath', 'Baseboards & doors wiped', 'Eco plant-based products', 'HEPA vacuum scrub']
      },
      {
        tier: 'Standard',
        name: 'Whole-Residence Detailed Restoration (3–4 Beds)',
        price: 310,
        duration: '4.5 hrs',
        description: 'Interior oven & microwave degreasing, refrigerator pull-out sanitization, and interior window tracks.',
        features: ['Up to 4 Bed / 3 Bath', 'Inside oven & fridge included', 'Under-furniture vacuuming', 'UV-C light disinfection pass']
      },
      {
        tier: 'Master',
        name: 'Move-in / Deep Post-Renovation Overhaul',
        price: 490,
        duration: '6.5 hrs',
        description: 'Comprehensive removal of fine gypsum dust, paint overspray, high ceilings, cabinetry interiors, and air scrubbing.',
        features: ['Complete residence coverage', 'Every cabinet inside & out', 'Air scrubber run during service', 'Passes strict landlord inspection']
      }
    ],
    addons: [
      { id: 'add-c1', name: 'Interior Refrigerator & Freezer Deep Scrub', price: 40, description: 'Food-safe steam sterilization of all drawers and door seals.' },
      { id: 'add-c2', name: 'Interior Windows & Tracks Detailing', price: 65, description: 'Streak-free optical glass wash and frame vacuuming.' },
      { id: 'add-c3', name: 'Balcony or Patio Pressure Wash', price: 75, description: 'Restores outdoor stone, composite decking, and railings.' }
    ],
    provider: {
      name: 'Elena Rostova',
      role: 'Lead Hygiene Director, CleanCraft',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&h=240&q=80',
      rating: 4.95,
      completedJobs: 820,
      responseTime: 'Under 10 min',
      verified: true,
      city: 'Metro & Suburbs',
      bio: 'Rigorous hotel-trained hygiene teams. Background checked, bonded, and bringing commercial grade German vacuum machinery.'
    }
  },
  {
    id: 'srv-ev-06',
    title: 'Level 2 EV Charger Electrical Infrastructure Install',
    tagline: 'Hardwired 48A / 240V circuit commissioning with panel load calculation & city permitting.',
    category: 'auto',
    basePrice: 420,
    priceType: 'from',
    durationEst: '3 – 5 hours',
    rating: 4.97,
    reviewsCount: 88,
    image: autoDetailingImg,
    locationType: 'On-site',
    availabilityKicker: 'Wednesday slots open',
    description:
      'Certified electrical contractors specializing in Tesla Wall Connector, ChargePoint Home Flex, and universal J1772 chargers. We run conduit, verify breaker ampacity, and ensure surge protection.',
    inclusions: [
      'Panel load calculation & thermal breaker audit',
      'Up to 30 feet of heavy-gauge copper conduit run',
      'Dual-pole 50A or 60A breaker installation in main panel',
      'Digital Wi-Fi commissioning & app pairing check',
      'City compliance sign-off guarantee'
    ],
    equipmentProvided: [
      'Fluke digital multimeter and insulation resistance tester',
      'Greenlee conduit benders and knockout punches',
      'EMT metallic conduits and UL-listed fittings',
      'Type 2 surge protective device'
    ],
    packages: [
      {
        tier: 'Essential',
        name: 'Adjacent Wall Run (<10ft from Panel)',
        price: 420,
        duration: '3 hrs',
        description: 'Direct short run installation within same wall perimeter as main or sub-panel.',
        features: ['Includes up to 10ft conduit', '60A dedicated breaker', 'Permit paperwork prepared', '3-year warranty']
      },
      {
        tier: 'Standard',
        name: 'Standard Garage Extension (10–35ft Run)',
        price: 680,
        duration: '4.5 hrs',
        description: 'Concealed or surface conduit run across garage perimeter to vehicle parking bay.',
        features: ['Up to 35ft conduit run', 'Drywall penetration seals', 'GFCI protection certified', 'Whole-home surge test']
      },
      {
        tier: 'Master',
        name: 'Complex Trenching or Subpanel Upgrade',
        price: 1150,
        duration: '7 hrs',
        description: 'For detached garages, outdoor pedestals, or installations requiring an auxiliary 100A sub-panel.',
        features: ['Subpanel or exterior pedestal', 'Heavy-duty weather enclosure', 'Full load shedding module', 'Lifetime electrical warranty']
      }
    ],
    addons: [
      { id: 'add-e1', name: 'Whole-Home Whole-Panel Surge Protector', price: 175, description: 'Protects expensive EV electronics and home appliances from grid spikes.' },
      { id: 'add-e2', name: 'Cable Retractor & Holster Mounting', price: 55, description: 'Keeps charging cable suspended cleanly off the floor.' }
    ],
    provider: {
      name: 'Viktor Kane, PE',
      role: 'Master Electrician & Renewable Tech Specialist',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&h=240&q=80',
      rating: 4.97,
      completedJobs: 215,
      responseTime: 'Under 30 min',
      verified: true,
      city: 'Metro Tri-County',
      bio: 'Licensed electrical engineer with over 15 years in residential clean energy systems, solar integration, and high-voltage circuits.'
    }
  },
  {
    id: 'srv-dev-07',
    title: 'High-Fidelity Web Engineering & React Modernization',
    tagline: 'Production-ready full-stack engineering, performance audits & API integrations.',
    category: 'creative',
    basePrice: 650,
    priceType: 'from',
    durationEst: '1 – 2 weeks',
    rating: 4.99,
    reviewsCount: 76,
    image: creativeDigitalImg,
    locationType: 'Remote / Studio',
    availabilityKicker: 'Next availability: Monday',
    description:
      'Senior engineers building responsive, accessible, ultra-fast web applications. Zero slop, strict TypeScript, tailored CSS architectures, and 98+ Lighthouse scores.',
    inclusions: [
      'Tailwind CSS v4 & React modern architecture',
      'WCAG AA accessible markup with keyboard navigation',
      'Full TypeScript strict mode definitions',
      'Automated CI/CD build configuration & deployment setup'
    ],
    equipmentProvided: [
      'Automated Playwright test suites',
      'Lighthouse CI performance benchmarking',
      'GitHub pull request review workflow'
    ],
    packages: [
      {
        tier: 'Essential',
        name: 'Landing Page & Performance Sprint',
        price: 650,
        duration: '4 days',
        description: 'Responsive high-conversion marketing page with interactive components and 100 Lighthouse score.',
        features: ['Single-page application', 'Zero layout shifts (CLS < 0.05)', 'Dark/light mode support', 'Analytics & forms wired']
      },
      {
        tier: 'Standard',
        name: 'Multi-View Web Application',
        price: 1200,
        duration: '8 days',
        description: 'Complete web application with dynamic filters, state management, modal workflows, and responsive layout.',
        features: ['Up to 5 functional views', 'Complex client state', 'API endpoint contracts', '14 days post-launch support']
      },
      {
        tier: 'Master',
        name: 'Full-Stack Platform Architecture',
        price: 2400,
        duration: '14 days',
        description: 'Complete full-stack platform with backend endpoints, authentication integration, and database schema.',
        features: ['Full-stack TypeScript', 'Database schema & migrations', 'Comprehensive test suite', '30 days priority engineering support']
      }
    ],
    addons: [
      { id: 'add-d1', name: 'SEO & Structured JSON-LD Data Suite', price: 150, description: 'Rich Google schema snippets for products and services.' },
      { id: 'add-d2', name: 'Stripe / Payment Gateway Integration', price: 280, description: 'End-to-end checkout flow with webhook handlers.' }
    ],
    provider: {
      name: 'Nico Takahashi',
      role: 'Staff Frontend Engineer & System Architect',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=240&h=240&q=80',
      rating: 4.99,
      completedJobs: 98,
      responseTime: 'Under 45 min',
      verified: true,
      city: 'Remote Worldwide',
      bio: '12 years building software used by millions. Obsessed with micro-interactions, speed, and clean code.'
    }
  },
  {
    id: 'srv-biz-08',
    title: 'Fractional Controller, Audit & Tax Health Review',
    tagline: 'Executive GAAP bookkeeping audit, cash runway modeling & regulatory tax compliance.',
    category: 'business',
    basePrice: 340,
    priceType: 'flat',
    durationEst: '2 – 4 business days',
    rating: 4.96,
    reviewsCount: 64,
    image: creativeDigitalImg,
    locationType: 'Remote / Studio',
    availabilityKicker: 'Immediate onboarding',
    description:
      'Certified CPAs and financial controllers conduct a deep review of chart of accounts, tax liabilities, recurring SaaS overhead, and cash flow projections.',
    inclusions: [
      'Comprehensive balance sheet & income statement reconciliation',
      'Identification of uncaptured write-offs and tax deductions',
      'Dynamic 12-month rolling cash runway model (Google Sheets/Excel)',
      '1-on-1 60-minute executive presentation with findings'
    ],
    equipmentProvided: [
      'Encrypted client vault with SOC 2 compliance',
      'Automated reconciliation pipelines (QuickBooks, Xero, Stripe, Mercury)'
    ],
    packages: [
      {
        tier: 'Essential',
        name: 'Single Entity Balance Sheet Audit',
        price: 340,
        duration: '2 days',
        description: 'Reconcile last 4 quarters, correct categorization errors, and quantify tax leakages.',
        features: ['Up to 5 bank/credit feeds', 'Deduction discovery report', '60-min advisory call']
      },
      {
        tier: 'Standard',
        name: 'Growth Stage Controller Sprint',
        price: 590,
        duration: '4 days',
        description: 'Complete GAAP clean-up, multi-currency reconciliations, and financial forecasting model.',
        features: ['Multi-entity or international feeds', 'Cash flow runway model', 'Board-ready slide deck', 'Sales tax audit']
      },
      {
        tier: 'Master',
        name: 'Quarterly Controller Retainer (Ongoing)',
        price: 1100,
        duration: 'Quarterly',
        description: 'End-of-month book close, payroll tax filings, and ongoing vendor contract optimization.',
        features: ['Monthly book close in 5 days', 'Continuous financial advisory', 'Direct Slack channel access', 'Audit defense support']
      }
    ],
    addons: [
      { id: 'add-f1', name: 'SaaS Vendor Contract Renegotiation Audit', price: 120, description: 'Scans subscriptions and benchmarks market rates to reduce waste.' },
      { id: 'add-f2', name: 'R&D Tax Credit Calculation Study', price: 290, description: 'Identifies qualifying software & hardware development activities.' }
    ],
    provider: {
      name: 'Camilla Sterling, CPA',
      role: 'Principal Financial Strategist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&h=240&q=80',
      rating: 4.97,
      completedJobs: 135,
      responseTime: 'Under 2 hours',
      verified: true,
      city: 'Financial District & Remote',
      bio: 'Ex-Big 4 audit manager helping startups, agencies, and small businesses gain institutional clarity over capital.'
    }
  }
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'BK-8921',
    serviceId: 'srv-plumb-01',
    serviceTitle: 'Architectural Plumbing & Hydro-Diagnostic Inspection',
    category: 'home',
    serviceImage: homeCareImg,
    provider: INITIAL_SERVICES[0].provider,
    packageTier: 'Standard (Whole-Residence Audit)',
    addons: [{ id: 'add-1', name: 'Microbial Water Purity Lab Test', price: 65 }],
    date: 'Oct 16, 2026',
    timeSlot: '10:00 AM – 12:30 PM',
    address: '428 Kensington Ave, Apt 4B',
    clientName: 'Victor Kirui',
    clientEmail: 'kkiruivictor2@gmail.com',
    clientPhone: '+1 (555) 234-8901',
    notes: 'Please buzz Unit 4B at arrival. Main shutoff is in basement corridor.',
    subtotal: 345,
    serviceFee: 24,
    total: 369,
    status: 'confirmed',
    createdAt: 'Oct 12, 2026'
  },
  {
    id: 'BK-7840',
    serviceId: 'srv-wellness-03',
    serviceTitle: 'Deep Tissue & Kinetic Myofascial Therapy',
    category: 'wellness',
    serviceImage: wellnessCareImg,
    provider: INITIAL_SERVICES[2].provider,
    packageTier: 'Standard (Full Body Restorative Ritual)',
    addons: [{ id: 'add-w1', name: 'Hot Basalt Volcanic Stone Integration', price: 35 }],
    date: 'Oct 04, 2026',
    timeSlot: '03:00 PM – 04:30 PM',
    address: '428 Kensington Ave, Apt 4B',
    clientName: 'Victor Kirui',
    clientEmail: 'kkiruivictor2@gmail.com',
    clientPhone: '+1 (555) 234-8901',
    notes: 'Focus on lower back tension from running marathon.',
    subtotal: 230,
    serviceFee: 16,
    total: 246,
    status: 'completed',
    createdAt: 'Sep 29, 2026',
    userRating: 5,
    userReview: 'Exceptional treatment! Marcus brought all top-tier equipment and the heated stones made an immense difference. Felt completely restored.'
  }
];
