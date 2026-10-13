import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.tsx';

export const Resources: React.FC = () => {
  const { t } = useLanguage();

  const tips = [
    {
      number: t.tip1Num,
      title: t.tip1Title,
      description: t.tip1Desc,
      image:
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=90',
      alt: 'Dog sitting outdoors alert'
    },
    {
      number: t.tip2Num,
      title: t.tip2Title,
      description: t.tip2Desc,
      image:
        'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=90',
      alt: 'Cat looking through a window'
    },
    {
      number: t.tip3Num,
      title: t.tip3Title,
      description: t.tip3Desc,
      image:
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=90',
      alt: 'Two dogs outdoors together'
    }
  ];

  return (
    <section id="resources" className="py-20 bg-[#faf6f0] border-b border-[#e7dbd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#806a5b] block mb-2">
            {t.resourcesLabel}
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
            {t.resourcesTitle}
          </h2>
          <p className="text-sm text-[#614b3f] mt-2">
            {t.resourcesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <article
              key={tip.number}
              className="bg-[#fffdf9] rounded-3xl border border-[#e7dbd0] overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#f2e5da]">
                <img
                  src={tip.image}
                  alt={tip.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#b98f73] tracking-widest block mb-1">
                    {tip.number}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-[#4d3930] mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#614b3f] leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
