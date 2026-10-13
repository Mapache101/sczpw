import React from 'react';
import { FileEdit, MapPinned, HeartHandshake } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: FileEdit,
      step: 'Step 1',
      title: 'Submit or Browse Reports',
      description:
        'Upload a clear photo, specify unique markings, and select your Santa Cruz neighborhood ring. Zero login barriers.'
    },
    {
      icon: MapPinned,
      step: 'Step 2',
      title: 'Locate & Spread the Word',
      description:
        'Sightings appear on our interactive Santa Cruz map. Generate printable emergency posters or share directly on WhatsApp.'
    },
    {
      icon: HeartHandshake,
      step: 'Step 3',
      title: 'Reunite with Care',
      description:
        'Connect directly with the finder or owner with 1-click WhatsApp messaging. Mark the pet as Reunited to celebrate!'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#f5eee6] border-b border-[#e7dbd0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#806a5b] block mb-2">
            Simple Process
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
            How Santa Cruz Pet Watch Works
          </h2>
          <p className="text-sm text-[#614b3f] mt-2">
            Designed for speed and neighborhood solidarity when every hour counts.
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
