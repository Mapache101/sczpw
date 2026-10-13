import React from 'react';
import { FileEdit, MapPinned, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.tsx';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: FileEdit,
      step: t.step1Tag,
      title: t.step1Title,
      description: t.step1Desc
    },
    {
      icon: MapPinned,
      step: t.step2Tag,
      title: t.step2Title,
      description: t.step2Desc
    },
    {
      icon: HeartHandshake,
      step: t.step3Tag,
      title: t.step3Title,
      description: t.step3Desc
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#f5eee6] border-b border-[#e7dbd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#806a5b] block mb-2">
            {t.howItWorksLabel}
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm text-[#614b3f] mt-2">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#fffdf9] p-8 rounded-3xl border border-[#e7dbd0] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#faf6f0] border border-[#dac8ba] flex items-center justify-center text-[#b98f73] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#806a5b] tracking-wider uppercase block mb-1">
                    {item.step}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-[#4d3930] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#614b3f] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
