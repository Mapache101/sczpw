import React from 'react';
import { Database, ShieldCheck, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface NavbarProps {
  onOpenReportForm: () => void;
  onOpenFirebaseConfig: () => void;
  syncSource: 'cloud' | 'local';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReportForm,
  onOpenFirebaseConfig,
  syncSource
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#faf6f0]/95 backdrop-blur-md border-b border-[#e7dbd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand title */}
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-full bg-[#4d3930] flex items-center justify-center text-[#fffdf9] shadow-sm transition-transform group-hover:scale-105">
            <span className="w-3.5 h-3.5 rounded-full bg-[#b98f73] block"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-xl font-bold tracking-tight text-[#4d3930] leading-tight whitespace-nowrap">
              Santa Cruz Pet Watch
            </span>
            <span className="text-xs text-[#806a5b] font-medium tracking-wide whitespace-nowrap">
              {t.tagline}
            </span>
          </div>
        </a>

        {/* Zone 2: Concise navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#614b3f]">
          <a
            href="#reports"
            className="hover:text-[#4d3930] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#b98f73] underline-offset-4"
          >
            {t.navReports}
          </a>
          <a
            href="#map-section"
            className="hover:text-[#4d3930] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#b98f73] underline-offset-4"
          >
            {t.navMap}
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#4d3930] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#b98f73] underline-offset-4"
          >
            {t.navHowItWorks}
          </a>
          <a
            href="#resources"
            className="hover:text-[#4d3930] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#b98f73] underline-offset-4"
          >
            {t.navResources}
          </a>
          <a
            href="#faq"
            className="hover:text-[#4d3930] transition-colors whitespace-nowrap shrink-0 hover:underline decoration-[#b98f73] underline-offset-4"
          >
            {t.navFaq}
          </a>
        </nav>

        {/* Zone 3: Primary Action, Language Switch & Storage Status */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Toggle: ES | EN */}
          <div className="flex items-center bg-[#f5eee6] p-1 rounded-xl border border-[#dac8ba] text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-[#806a5b] ml-1.5 mr-1" />
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded-lg transition-all ${
                language === 'es'
                  ? 'bg-[#4d3930] text-[#fffdf9] shadow-xs'
                  : 'text-[#614b3f] hover:text-[#4d3930]'
              }`}
              title="Cambiar a Español"
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-[#4d3930] text-[#fffdf9] shadow-xs'
                  : 'text-[#614b3f] hover:text-[#4d3930]'
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          <button
            onClick={onOpenFirebaseConfig}
            title="Configure Cloudinary photo storage & database"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#614b3f] bg-[#f5eee6] hover:bg-[#ead8c8] border border-[#dac8ba] rounded-lg transition-colors whitespace-nowrap"
          >
            {syncSource === 'cloud' ? (
              <ShieldCheck className="w-3.5 h-3.5 text-[#39734a]" />
            ) : (
              <Database className="w-3.5 h-3.5 text-[#b98f73]" />
            )}
            <span className="hidden xl:inline">{t.navCloudSettings}</span>
          </button>

          <button
            onClick={onOpenReportForm}
            className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#fffdf9] bg-[#4d3930] hover:bg-[#362720] rounded-xl shadow-sm transition-all hover:shadow active:scale-95 whitespace-nowrap shrink-0"
          >
            {t.navReportButton}
          </button>
        </div>
      </div>
    </header>
  );
};
