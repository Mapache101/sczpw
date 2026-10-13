import React from 'react';

export const CommunityBanner: React.FC = () => {
  return (
    <section className="py-20 bg-[#4d3930] text-[#fffdf9] relative overflow-hidden">
      {/* Decorative monogram background */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[140px] font-black text-[#fffdf9]/5 pointer-events-none select-none font-editorial">
        SC
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest font-bold text-[#b98f73] block mb-3">
            It Takes a Community · Santa Cruz de la Sierra
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            One person can make the difference.
          </h2>
          <p className="text-sm sm:text-base text-[#ead8c8] leading-relaxed">
            If you see a pet wandering alone in your neighborhood or ring avenue, don't scroll past. Check active reports, share the picture with your neighbors, and help someone get their best friend home.
          </p>
        </div>

        <a
          href="#reports"
          className="px-8 py-4 text-sm font-bold text-[#4d3930] bg-[#fffdf9] hover:bg-[#faf6f0] rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap shrink-0"
        >
          Explore Active Reports
        </a>
      </div>
    </section>
  );
};
