import React from 'react';
import { X, MapPin, Calendar, Phone, MessageSquare, Printer, CheckCircle2, Award } from 'lucide-react';
import { PetReport } from '../types.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';
import confetti from 'canvas-confetti';

interface PetDetailModalProps {
  report: PetReport | null;
  onClose: () => void;
  onPrintFlyer: (report: PetReport) => void;
  onMarkReunited: (report: PetReport) => void;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({
  report,
  onClose,
  onPrintFlyer,
  onMarkReunited
}) => {
  const { language, t } = useLanguage();
  if (!report) return null;

  const isLost = report.status === 'lost';
  const isFound = report.status === 'found';
  const isReunited = report.status === 'reunited' || report.resolved;

  const cleanWhatsappNumber = report.contactWhatsapp
    ? report.contactWhatsapp.replace(/\D/g, '')
    : report.contactPhone.replace(/\D/g, '');

  const whatsappMessage = encodeURIComponent(
    language === 'es'
      ? `¡Hola ${report.contactName}! Vi el reporte en Santa Cruz Pet Watch sobre ${report.petName} (${report.breed || report.type}) en ${report.area}. Quería contactarte sobre esto.`
      : `Hello ${report.contactName}! I saw your report on Santa Cruz Pet Watch about ${report.petName} (${report.breed || report.type}) in ${report.area}. Reaching out to you about this.`
  );

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    onMarkReunited(report);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#19231e]/70 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#fffdf9] rounded-3xl border border-[#e7dbd0] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t.closeModal}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#fffdf9]/90 backdrop-blur-sm border border-[#e7dbd0] text-[#4d3930] hover:bg-[#fffdf9] flex items-center justify-center shadow-md transition-all active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto">
          {/* Photo Header */}
          <div className="relative aspect-[16/10] w-full bg-[#f2e5da]">
            <img
              src={report.photoUrl}
              alt={report.petName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80';
              }}
            />

            <div className="absolute top-4 left-4 flex gap-2">
              {isLost && (
                <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#b98f73] text-[#fffdf9] rounded-lg shadow-sm">
                  {t.badgeLost}
                </span>
              )}
              {isFound && (
                <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#81947c] text-[#fffdf9] rounded-lg shadow-sm">
                  {t.badgeFound}
                </span>
              )}
              {isReunited && (
                <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#39734a] text-[#fffdf9] rounded-lg shadow-sm">
                  {t.badgeReunited}
                </span>
              )}
            </div>

            {report.reward && isLost && (
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-[#fffdf9] text-[#4d3930] rounded-lg shadow-md border border-[#e7dbd0]">
                  <Award className="w-4 h-4 text-[#b98f73]" />
                  {report.reward}
                </span>
              </div>
            )}
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h2 id="pet-detail-title" className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
                  {report.petName}
                </h2>
                <span className="text-sm font-semibold text-[#806a5b] capitalize">
                  {report.type} · {report.breed || 'Mestizo'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#806a5b]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#b98f73]" />
                  <strong>{report.area}</strong> — {report.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#806a5b]" />
                  {report.lastSeenDate}
                </span>
              </div>
            </div>

            {/* Description & Markings */}
            <div className="space-y-4 pt-4 border-t border-[#f2e5da]">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#806a5b] mb-1">
                  {t.characteristicsTitle}
                </h4>
                <p className="text-sm text-[#4d3930] font-medium leading-relaxed">
                  {report.color}
                </p>
              </div>

              {report.distinctiveFeatures && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#806a5b] mb-1">
                    {t.markingsTitle}
                  </h4>
                  <p className="text-sm text-[#614b3f] leading-relaxed bg-[#faf6f0] p-4 rounded-2xl border border-[#e7dbd0]">
                    {report.distinctiveFeatures}
                  </p>
                </div>
              )}

              {report.contactNotes && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#806a5b] mb-1">
                    {t.instructionsTitle}
                  </h4>
                  <p className="text-sm text-[#614b3f] leading-relaxed">
                    {report.contactNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Contact Person Box */}
            <div className="bg-[#f5eee6] p-5 rounded-2xl border border-[#e7dbd0] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-[#806a5b] block">
                    {t.contactPersonTitle}
                  </span>
                  <span className="text-base font-bold text-[#4d3930]">
                    {report.contactName}
                  </span>
                </div>
                <span className="text-xs text-[#806a5b]">Santa Cruz de la Sierra</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {cleanWhatsappNumber && (
                  <a
                    href={`https://wa.me/${cleanWhatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#fffdf9] bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                )}

                {report.contactPhone && (
                  <a
                    href={`tel:${report.contactPhone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#fffdf9] bg-[#4d3930] hover:bg-[#362720] rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t.callNow} ({report.contactPhone})</span>
                  </a>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-[#f2e5da] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  onClose();
                  onPrintFlyer(report);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#4d3930] bg-[#faf6f0] hover:bg-[#f2e5da] border border-[#dac8ba] rounded-xl transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>{t.generateFlyerButton}</span>
              </button>

              {!isReunited && (
                <button
                  onClick={handleCelebrate}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#fffdf9] bg-[#81947c] hover:bg-[#39734a] rounded-xl shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.markAsReunitedButton}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
