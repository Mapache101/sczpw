import { useState, useEffect, useMemo, useRef } from 'react';
import { PetReport, FilterOptions } from './types.ts';
import { fetchPetReports, updatePetReportStatus } from './services/firebase.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { PetFilterBar } from './components/PetFilterBar.tsx';
import { PetCard } from './components/PetCard.tsx';
import { PetDetailModal } from './components/PetDetailModal.tsx';
import { PrintFlyerModal } from './components/PrintFlyerModal.tsx';
import { InteractiveMap } from './components/InteractiveMap.tsx';
import { ReportPetForm } from './components/ReportPetForm.tsx';
import { FirebaseConfigModal } from './components/FirebaseConfigModal.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { Resources } from './components/Resources.tsx';
import { CommunityBanner } from './components/CommunityBanner.tsx';
import { Faq } from './components/Faq.tsx';
import { Footer } from './components/Footer.tsx';
import { CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from './i18n/LanguageContext.tsx';

export default function App() {
  const { t, language } = useLanguage();
  const [reports, setReports] = useState<PetReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncSource, setSyncSource] = useState<'cloud' | 'local'>('local');
  const [visibleCount, setVisibleCount] = useState(6);

  // Modal states
  const [detailReport, setDetailReport] = useState<PetReport | null>(null);
  const [flyerReport, setFlyerReport] = useState<PetReport | null>(null);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    species: 'all',
    area: 'all'
  });

  const reportFormRef = useRef<HTMLDivElement>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchPetReports();
      setReports(res.reports);
      setSyncSource(res.source);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleReportCreated = (newReport: PetReport) => {
    setReports((prev) => [newReport, ...prev.filter((r) => r.id !== newReport.id)]);
    const msg =
      language === 'es'
        ? `¡El reporte de "${newReport.petName}" ha sido enviado y publicado en el muro!`
        : `Report for "${newReport.petName}" has been submitted and added to the feed!`;
    showToast(msg);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Scroll to reports
    setTimeout(() => {
      const el = document.getElementById('reports');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  const handleMarkReunited = async (report: PetReport) => {
    try {
      const updated = await updatePetReportStatus(report.id, 'reunited');
      setReports(updated);
      if (detailReport && detailReport.id === report.id) {
        setDetailReport({ ...detailReport, status: 'reunited', resolved: true });
      }
      const msg =
        language === 'es'
          ? `¡Celebración! "${report.petName}" ha sido marcado como Reunido con su familia.`
          : `Celebration! "${report.petName}" has been marked as Reunited.`;
      showToast(msg);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Failed to mark as reunited:', err);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('report-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered reports calculation
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      // Status filter
      if (filters.status !== 'all') {
        if (filters.status === 'reunited' && !(r.status === 'reunited' || r.resolved)) {
          return false;
        }
        if (filters.status !== 'reunited' && r.status !== filters.status) {
          return false;
        }
      }

      // Species filter
      if (filters.species !== 'all' && r.type !== filters.species) {
        return false;
      }

      // Area filter
      if (filters.area !== 'all' && r.area !== filters.area) {
        return false;
      }

      // Search query filter
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = r.petName.toLowerCase().includes(query);
        const matchesBreed = r.breed.toLowerCase().includes(query);
        const matchesColor = r.color.toLowerCase().includes(query);
        const matchesLocation = r.location.toLowerCase().includes(query);
        const matchesArea = r.area.toLowerCase().includes(query);
        const matchesFeatures = r.distinctiveFeatures.toLowerCase().includes(query);

        return (
          matchesName ||
          matchesBreed ||
          matchesColor ||
          matchesLocation ||
          matchesArea ||
          matchesFeatures
        );
      }

      return true;
    });
  }, [reports, filters]);

  const visibleReports = filteredReports.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#4d3930] flex flex-col font-sans selection:bg-[#b98f73]/20 selection:text-[#4d3930]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-[#4d3930] text-[#fffdf9] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#b98f73] animate-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#b98f73]" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar Contract */}
      <Navbar
        onOpenReportForm={scrollToForm}
        onOpenFirebaseConfig={() => setIsFirebaseModalOpen(true)}
        syncSource={syncSource}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero reports={reports} onReportClick={scrollToForm} />

        {/* Pet Reports Feed Section */}
        <section id="reports" className="py-16 sm:py-20 border-b border-[#e7dbd0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-[#806a5b] block mb-2">
                  {t.feedLabel}
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
                  {t.feedTitle}
                </h2>
                <p className="text-sm text-[#614b3f] mt-1 max-w-xl">
                  {t.feedSubtitle}
                </p>
              </div>

              {/* Status pill indicating storage mode */}
              <div className="text-xs text-[#806a5b] bg-[#fffdf9] px-3.5 py-1.5 rounded-xl border border-[#dac8ba] self-start md:self-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#81947c]" />
                <span>
                  {syncSource === 'cloud'
                    ? t.cloudSynced
                    : t.localStorageActive}
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <PetFilterBar
              filters={filters}
              onFilterChange={setFilters}
              totalMatches={filteredReports.length}
            />

            {/* Reports Grid */}
            {isLoading ? (
              <div className="py-20 text-center text-[#806a5b] bg-[#fffdf9] rounded-3xl border border-[#e7dbd0]">
                <div className="w-8 h-8 border-3 border-[#b98f73] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm font-medium">{t.loadingReports}</p>
              </div>
            ) : visibleReports.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleReports.map((report) => (
                  <PetCard
                    key={report.id}
                    report={report}
                    onViewDetails={(r) => setDetailReport(r)}
                    onPrintFlyer={(r) => setFlyerReport(r)}
                    onMarkReunited={handleMarkReunited}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#fffdf9] rounded-3xl border border-[#e7dbd0] p-8">
                <span className="text-3xl block mb-2">🐾</span>
                <h3 className="font-editorial text-xl font-bold text-[#4d3930] mb-2">
                  {t.noReportsTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#806a5b] max-w-md mx-auto mb-6">
                  {t.noReportsSubtitle}
                </p>
                <button
                  onClick={() =>
                    setFilters({ search: '', status: 'all', species: 'all', area: 'all' })
                  }
                  className="px-5 py-2.5 text-xs font-semibold text-[#4d3930] bg-[#f5eee6] hover:bg-[#ead8c8] rounded-xl border border-[#dac8ba] transition-colors"
                >
                  {t.clearFilters}
                </button>
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < filteredReports.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-[#4d3930] bg-[#fffdf9] hover:bg-[#f5eee6] border border-[#dac8ba] rounded-xl shadow-xs transition-colors"
                >
                  <span>{t.loadMore}</span>
                  <ChevronDown className="w-4 h-4 text-[#806a5b]" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Interactive Santa Cruz Map Section */}
        <InteractiveMap
          reports={reports}
          onSelectReport={(r) => setDetailReport(r)}
        />

        {/* Report Pet Form Section */}
        <div ref={reportFormRef}>
          <ReportPetForm onSuccess={handleReportCreated} />
        </div>

        {/* How It Works Section */}
        <HowItWorks />

        {/* Pet Recovery Tips & Resources */}
        <Resources />

        {/* Community Callout Banner */}
        <CommunityBanner />

        {/* Frequently Asked Questions */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer
        onOpenReportForm={scrollToForm}
        onOpenFirebaseConfig={() => setIsFirebaseModalOpen(true)}
      />

      {/* Modals */}
      <PetDetailModal
        report={detailReport}
        onClose={() => setDetailReport(null)}
        onPrintFlyer={(r) => {
          setDetailReport(null);
          setFlyerReport(r);
        }}
        onMarkReunited={handleMarkReunited}
      />

      <PrintFlyerModal
        report={flyerReport}
        onClose={() => setFlyerReport(null)}
      />

      <FirebaseConfigModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
        syncSource={syncSource}
        onConfigUpdated={loadData}
      />
    </div>
  );
}
