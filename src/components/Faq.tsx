import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What information should I include in a report?',
      answer:
        'Include a recent, clear photo in good daylight, pet type, color, distinctive markings (ear notches, collars, scars), exact neighborhood or ring avenue, date last seen, and your WhatsApp number so neighbors can reach out instantly.'
    },
    {
      question: 'What should I do if I find a lost pet in Santa Cruz?',
      answer:
        'Keep the pet in a secure, shaded area with water. Check active lost pet reports on this site. If not found, submit a "Found Pet" report and share the link in local neighborhood WhatsApp or Facebook groups.'
    },
    {
      question: 'Should I share my exact home address number?',
      answer:
        'No. For your safety and privacy, avoid posting your exact house or apartment number. Listing your neighborhood (e.g. Equipetrol, Urbaró, Villa 1° de Mayo) and a general intersection or landmark is ideal.'
    },
    {
      question: 'How can I help if I haven’t lost or found a pet?',
      answer:
        'You can help immensely by sharing reports on social networks, printing flyers for community bulletin boards, or browsing sightings in your neighborhood so you can recognize a pet if you see one on your street.'
    },
    {
      question: 'How does report storage work on GitHub Pages?',
      answer:
        'Reports are synchronized with Firebase Firestore cloud storage and backed up securely in your browser storage. You can also export the full community database to JSON at any time.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#faf6f0] border-b border-[#e7dbd0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-[#806a5b] block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
            Good to know.
          </h2>
          <p className="text-sm text-[#614b3f] mt-2">
            Answers to common questions about reporting, safety, and community pet recovery.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#fffdf9] rounded-2xl border border-[#e7dbd0] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-editorial text-base sm:text-lg font-bold text-[#4d3930] hover:text-[#b98f73] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#806a5b] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#b98f73]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#614b3f] leading-relaxed border-t border-[#f2e5da] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
