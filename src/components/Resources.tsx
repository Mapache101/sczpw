import React from 'react';

export const Resources: React.FC = () => {
  const tips = [
    {
      number: '01',
      title: 'Search nearby first',
      description:
        'Check your home, street, nearby parks, familiar walking routes, and places where your pet may hide or seek shade in Santa Cruz.',
      image:
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=90',
      alt: 'Dog sitting outdoors alert'
    },
    {
      number: '02',
      title: 'Share a clear photo',
      description:
        'Use recent photographs that show unique markings, collars, colors, and facial features so neighbors can spot your pet immediately.',
      image:
        'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=90',
      alt: 'Cat looking through a window'
    },
    {
      number: '03',
      title: 'Tell your community',
      description:
        'Ask trusted neighbors, local veterinary clinics, and neighborhood WhatsApp groups across your ring avenue to watch and share.',
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
            Pet Recovery Tips
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
            What to do when a pet goes missing.
          </h2>
          <p className="text-sm text-[#614b3f] mt-2">
            Staying organized, remaining calm, and acting quickly makes all the difference.
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
