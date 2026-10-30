import React, { useState, useMemo, useEffect } from 'react';
import { 
  TOUR_PACKAGES, 
  HOTEL_TIERS 
} from './data/packages';
import { 
  getStoredAgencyConfig, 
  buildWhatsAppLink 
} from './data/config';
import { 
  TourPackage, 
  HotelTierId, 
  AgencyConfig 
} from './types/tour';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PackageCard } from './components/PackageCard';
import { PackageDetailModal } from './components/PackageDetailModal';
import { EnquiryFormModal } from './components/EnquiryFormModal';
import { PackageCompareModal } from './components/PackageCompareModal';
import { TravelGuideModal } from './components/TravelGuideModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { Footer } from './components/Footer';

import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  MessageCircle, 
  Compass, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Car, 
  Hotel,
  Award
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<AgencyConfig>(getStoredAgencyConfig);
  const [selectedDurationFilter, setSelectedDurationFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state - all strictly closed by default on initial page load
  const [detailModalPkg, setDetailModalPkg] = useState<TourPackage | null>(null);
  const [enquiryModalState, setEnquiryModalState] = useState<{
    isOpen: boolean;
    pkg: TourPackage | null;
    tier: HotelTierId;
  }>({
    isOpen: false,
    pkg: null,
    tier: 'deluxe',
  });
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isTravelGuideOpen, setIsTravelGuideOpen] = useState(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState(false);

  // Guarantee clean initial homepage load: ensure no modal opens on fresh load
  useEffect(() => {
    setIsCompareOpen(false);
    setIsTravelGuideOpen(false);
    setIsDeploymentGuideOpen(false);
    setDetailModalPkg(null);
    setEnquiryModalState({ isOpen: false, pkg: null, tier: 'deluxe' });
  }, []);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter packages based on duration filter and search
  const filteredPackages = useMemo(() => {
    return TOUR_PACKAGES.filter((pkg) => {
      // Duration filter
      if (selectedDurationFilter !== 'all') {
        if (selectedDurationFilter === '3n4d' && pkg.id !== 'sikkim-3n4d') return false;
        if (selectedDurationFilter === '4n5d' && pkg.id !== 'sikkim-4n5d') return false;
        if (selectedDurationFilter === '5n6d' && pkg.id !== 'sikkim-5n6d') return false;
        if (selectedDurationFilter === '6n7d' && pkg.id !== 'sikkim-6n7d') return false;
        if (selectedDurationFilter === '7n8d' && pkg.id !== 'sikkim-7n8d') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = pkg.title.toLowerCase().includes(query);
        const matchesDest = pkg.destinations.some((d) => d.toLowerCase().includes(query));
        const matchesOverview = pkg.overview.toLowerCase().includes(query);
        const matchesRoute = pkg.routeSummary.some((r) => r.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDest && !matchesOverview && !matchesRoute) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDurationFilter, searchQuery]);

  const handleOpenEnquiry = (pkg: TourPackage, tier: HotelTierId = 'deluxe') => {
    setEnquiryModalState({
      isOpen: true,
      pkg,
      tier,
    });
  };

  const handleOpenGeneralEnquiry = () => {
    setEnquiryModalState({
      isOpen: true,
      pkg: TOUR_PACKAGES[2], // Default 5N/6D
      tier: 'deluxe',
    });
  };

  const handleSelectPackageFromCompare = (pkgId: string) => {
    const found = TOUR_PACKAGES.find((p) => p.id === pkgId);
    if (found) {
      setDetailModalPkg(found);
    }
  };

  const faqs = [
    {
      q: 'Why do Sikkim tour packages show "Price on Request"?',
      a: 'In Sikkim, tour rates vary based on seasonal tourist car union fuel tariffs (higher during peak snow/flower seasons), group size (whether you need a 4-seater hatchback, 6-seater Innova, or 4x4 Bolero), and your chosen hotel category (Standard 2-star to Luxury Heritage 5-star). Providing "Price on Request" ensures you receive an accurate, customized quote with zero hidden charges or last-minute surprises.'
    },
    {
      q: 'How does permit processing work for Nathula Pass & North Sikkim?',
      a: 'Areas such as Tsomgo Lake, Nathula Pass, Lachen, and Gurudongmar Lake are sensitive border zones requiring Protected Area Permits (PAP) from the Sikkim Police & Indian Army. All paperwork is completed on your behalf by MySikkimTrip. You only need to share your Voter ID or Passport along with passport-size photographs.'
    },
    {
      q: 'Can senior citizens and young children visit Gurudongmar Lake (17,800 ft)?',
      a: 'Gurudongmar Lake is situated at a very high altitude (17,800 ft). We recommend that children under 5 years and seniors with severe cardiopulmonary issues consult their physician beforehand. For family trips with young children or elders, our 3N/4D (Gangtok & Tsomgo) or 4N/5D (Gangtok & Pelling) packages are very comfortable and easy-paced.'
    },
    {
      q: 'Can these 5 packages be further customized?',
      a: 'Yes, 100%! All itineraries can be adjusted to add extra nights in Lachung, include Darjeeling tea estate homestays, arrange a honeymoon candlelight dinner & cake, or book an exclusive vehicle. Just click the WhatsApp enquiry button and tell us your preferences.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        config={config}
        onOpenTravelGuide={() => setIsTravelGuideOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenGeneralEnquiry={handleOpenGeneralEnquiry}
      />

      <main className="flex-1">
        {/* Hero Section with Search & Duration Filter */}
        <Hero
          config={config}
          selectedDurationFilter={selectedDurationFilter}
          onSelectDurationFilter={setSelectedDurationFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenGeneralEnquiry={handleOpenGeneralEnquiry}
        />

        {/* Value & Info Strip */}
        <section className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <Compass className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>Sikkim Tour Packages Demo:</strong> Transparent itineraries with flexible vehicle & hotel tiers.</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-500 hidden md:inline">Have questions?</span>
              <a
                href={buildWhatsAppLink(config.whatsAppNumber, `Hello ${config.agencyName}, I need quick assistance with Sikkim tour packages.`) || `https://wa.me/919749947625`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-700 text-emerald-700" />
                <span>Chat with Sikkim Specialist on {config.displayPhone}</span>
              </a>
            </div>
          </div>
        </section>

        {/* PACKAGES SHOWCASE SECTION */}
        <section id="packages-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>Interactive Sikkim Holiday Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Explore Our 5 Signature Sikkim Packages
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Select your preferred tour duration below. Each package includes day-by-day itineraries, customizable hotel tiers, and instant WhatsApp booking quotes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Showing {filteredPackages.length} of {TOUR_PACKAGES.length} packages
              </span>
              {selectedDurationFilter !== 'all' && (
                <button
                  onClick={() => setSelectedDurationFilter('all')}
                  className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  Show All
                </button>
              )}
            </div>
          </div>

          {/* Package Cards Grid */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  config={config}
                  onViewDetails={setDetailModalPkg}
                  onOpenEnquiry={(p, tier) => handleOpenEnquiry(p, tier)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
              <p className="text-base font-semibold text-slate-800">
                No tour packages matched your search "{searchQuery}"
              </p>
              <p className="text-xs text-slate-500">
                Try searching for 'Gurudongmar', 'Gangtok', 'Pelling', or clear your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDurationFilter('all');
                }}
                className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* HOTEL CATEGORIES BREAKDOWN SECTION */}
        <section className="bg-white border-y border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-center gap-1.5">
                <Hotel className="w-3.5 h-3.5 text-emerald-700" />
                <span>Tailored Accommodation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                4 Transparent Hotel Categories
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                From cozy mountain view budget hotels to royal heritage luxury resorts with spa and private fireplaces.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HOTEL_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col justify-between space-y-3 hover:border-emerald-500/60 transition-all shadow-2xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                        {tier.badge}
                      </span>
                      <span className="text-xs text-amber-600 font-bold">★ {tier.starRating.split(' ')[0]}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base font-heading">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 space-y-2 text-xs">
                    <div className="text-emerald-900 font-semibold bg-white p-2 rounded-lg border border-slate-200/80">
                      🍽️ Meal Plan: {tier.mealPlan}
                    </div>
                    <div className="text-slate-600">
                      <strong className="text-slate-900">Properties:</strong> {tier.popularHotelsExample.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIKKIM TRAVEL HIGHLIGHTS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Itinerary Highlights & Logistics
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
                What These 5 Sikkim Tours Offer
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clear itinerary planning, guidance on protected area border permits, and dedicated high-clearance mountain transport suited for high-altitude terrain.
              </p>
              <div>
                <button
                  onClick={handleOpenGeneralEnquiry}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Request Custom Quotation</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Protected Border Permits Guidance</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear documentation assistance for Protected Area Permits (PAP) required at Tsomgo Lake, Nathula Pass, and North Sikkim checkposts.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Dedicated Mountain Transport</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Commercial tourist vehicles (Innova, Xylo, Scorpio, Bolero) driven by mountain drivers experienced with hill road conditions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Transparent Price on Request</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Itemized pricing tailored to your group size, travel season, and selected hotel tier without surprise hidden surcharges.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Direct Trip Coordination</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct coordination from pickup at Bagdogra/NJP through Gangtok, North Sikkim, Pelling, and Darjeeling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section className="bg-slate-100/70 border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 font-heading">
                Everything You Need to Know Before Visiting Sikkim
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Global Modals - Only mounted and rendered when explicitly opened by user */}
      {detailModalPkg && (
        <PackageDetailModal
          pkg={detailModalPkg}
          config={config}
          onClose={() => setDetailModalPkg(null)}
          onOpenEnquiry={(p, tier) => handleOpenEnquiry(p, tier)}
        />
      )}

      {enquiryModalState.isOpen && (
        <EnquiryFormModal
          isOpen={enquiryModalState.isOpen}
          onClose={() => setEnquiryModalState({ isOpen: false, pkg: null, tier: 'deluxe' })}
          config={config}
          initialPackage={enquiryModalState.pkg}
          initialTier={enquiryModalState.tier}
        />
      )}

      {isCompareOpen && (
        <PackageCompareModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          config={config}
          onSelectPackage={handleSelectPackageFromCompare}
        />
      )}

      {isTravelGuideOpen && (
        <TravelGuideModal
          isOpen={isTravelGuideOpen}
          onClose={() => setIsTravelGuideOpen(false)}
          config={config}
        />
      )}

      {isDeploymentGuideOpen && (
        <DeploymentGuideModal
          isOpen={isDeploymentGuideOpen}
          onClose={() => setIsDeploymentGuideOpen(false)}
        />
      )}

      {/* Footer & Floating WhatsApp Widget */}
      <Footer
        config={config}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenTravelGuide={() => setIsTravelGuideOpen(true)}
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
        onOpenGeneralEnquiry={handleOpenGeneralEnquiry}
      />
    </div>
  );
}
