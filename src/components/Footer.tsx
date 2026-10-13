import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface FooterProps {
  onOpenReportForm: () => void;
  onOpenFirebaseConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReportForm,
  onOpenFirebaseConfig
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#f5eee6] text-[#614b3f] border-t border-[#e7dbd0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <a href="#" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4d3930] flex items-center justify-center text-[#fffdf9]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b98f73] block" />
              </div>
              <div className="flex flex-col">
                <span className="font-editorial text-lg font-bold text-[#4d3930] leading-none">
                  Santa Cruz Pet Watch
                </span>
                <span className="text-[11px] text-[#806a5b] font-medium tracking-wide">
                  {t.tagline}
                </span>
              </div>
            </a>
            <p className="text-xs text-[#806a5b] leading-relaxed">
              {t.footerMission}
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h4 className="font-editorial text-sm font-bold text-[#4d3930] mb-3">
              {t.footerExplore}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#reports" className="hover:text-[#4d3930] transition-colors">
                  {t.navReports}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReportForm}
                  className="hover:text-[#4d3930] transition-colors text-left"
                >
                  {t.footerReportPet}
                </button>
              </li>
              <li>
                <a href="#map-section" className="hover:text-[#4d3930] transition-colors">
                  {t.navMap}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#4d3930] transition-colors">
                  {t.navHowItWorks}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="font-editorial text-sm font-bold text-[#4d3930] mb-3">
              {t.footerResources}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#resources" className="hover:text-[#4d3930] transition-colors">
                  {t.navResources}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#4d3930] transition-colors">
                  {t.navFaq}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenFirebaseConfig}
                  className="hover:text-[#4d3930] transition-colors text-left font-medium text-[#b98f73]"
                >
                  {t.footerCloudSetup}
                </button>
              </li>
            </ul>
          </div>

          {/* Santa Cruz Info */}
          <div>
            <h4 className="font-editorial text-sm font-bold text-[#4d3930] mb-3">
              {t.footerCity}
            </h4>
            <div className="space-y-1.5 text-xs text-[#806a5b]">
              <p>{t.footerCityName}</p>
              <p>{t.footerCommunity}</p>
              <p>{t.footerForPets}</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#e7dbd0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#806a5b]">
          <p>{t.footerCopyright}</p>
          <span>Santa Cruz de la Sierra · Bolivia</span>
        </div>
      </div>
    </footer>
  );
};
