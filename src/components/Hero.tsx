import React from 'react';
import { PetReport } from '../types.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface HeroProps {
  reports: PetReport[];
  onReportClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ reports, onReportClick }) => {
  const { t } = useLanguage();
  const lostCount = reports.filter(r => r.status === 'lost').length;
  const foundCount = reports.filter(r => r.status === 'found').length;
  const reunitedCount = reports.filter(r => r.status === 'reunited' || r.resolved).length;
  const areasCount = new Set(reports.map(r => r.area)).size;

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#e7dbd0]">
      {/* Subtle organic decorative background shape */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#f2e5da]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#ead8c8]/30 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-[#806a5b] mb-4">
            {t.heroLabel}
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#4d3930] leading-[1.15] mb-6 text-balance">
            {t.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-[#614b3f] leading-relaxed mb-8 max-w-2xl">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onReportClick}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-[#fffdf9] bg-[#4d3930] hover:bg-[#362720] rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              {t.heroReportCta}
            </button>
            <a
              href="#reports"
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-[#4d3930] bg-[#fffdf9] hover:bg-[#f7ecdf] border border-[#dac8ba] rounded-xl shadow-sm transition-all whitespace-nowrap"
            >
              {t.heroExploreCta}
            </a>
          </div>
        </div>

        {/* 4-column KPI strip below the hero copy */}
        <div className="mt-14 pt-10 border-t border-[#e7dbd0] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#e7dbd0] shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#b98f73] tabular-nums">
              {lostCount}
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#806a5b] mt-1">
              {t.kpiMissing}
            </div>
          </div>

          <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#e7dbd0] shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#81947c] tabular-nums">
              {foundCount}
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#806a5b] mt-1">
              {t.kpiFound}
            </div>
          </div>

          <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#e7dbd0] shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#39734a] tabular-nums">
              {reunitedCount}
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#806a5b] mt-1">
              {t.kpiReunited}
            </div>
          </div>

          <div className="bg-[#fffdf9] p-5 rounded-2xl border border-[#e7dbd0] shadow-sm">
            <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#4d3930] tabular-nums">
              {areasCount}
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#806a5b] mt-1">
              {t.kpiAreas}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
