import React from 'react';
import { MapPin, Phone, MessageSquare, Printer, CheckCircle2 } from 'lucide-react';
import { PetReport } from '../types.ts';
import { useLanguage } from '../i18n/LanguageContext.tsx';

interface PetCardProps {
  report: PetReport;
  onViewDetails: (report: PetReport) => void;
  onPrintFlyer: (report: PetReport) => void;
  onMarkReunited: (report: PetReport) => void;
}

export const PetCard: React.FC<PetCardProps> = ({
  report,
  onViewDetails,
  onPrintFlyer,
  onMarkReunited
}) => {
  const { language, t } = useLanguage();
  const isLost = report.status === 'lost';
  const isFound = report.status === 'found';
  const isReunited = report.status === 'reunited' || report.resolved;

  const timeAgo = (timestamp: number, dateStr?: string) => {
    const diffMs = Date.now() - (timestamp || new Date(dateStr || '').getTime() || Date.now());
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    if (hours < 1) return t.timeJustNow;
    if (hours === 1) return t.time1HourAgo;
    if (hours < 24) return t.timeHoursAgo.replace('{n}', String(hours));
    const days = Math.floor(hours / 24);
    if (days === 1) return t.time1DayAgo;
    if (days < 30) return t.timeDaysAgo.replace('{n}', String(days));
    return new Date(timestamp).toLocaleDateString(language === 'es' ? 'es-BO' : 'en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const whatsappMessage = encodeURIComponent(
    language === 'es'
      ? `¡Hola ${report.contactName}! Vi el reporte en Santa Cruz Pet Watch sobre ${report.petName} (${report.breed || report.type}) en ${report.area}. Quería contactarte sobre esto.`
      : `Hello ${report.contactName}! I saw your report on Santa Cruz Pet Watch about ${report.petName} (${report.breed || report.type}) in ${report.area}. Reaching out to you about this.`
  );

  const cleanWhatsappNumber = report.contactWhatsapp
    ? report.contactWhatsapp.replace(/\D/g, '')
    : report.contactPhone.replace(/\D/g, '');

  return (
    <article className="bg-[#fffdf9] rounded-3xl border border-[#e7dbd0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
      {/* Photo with status indicator and quick actions */}
      <div className="relative aspect-[4/3] w-full bg-[#f2e5da] overflow-hidden">
        <img
          src={report.photoUrl}
          alt={`${report.petName} - ${report.breed || report.type}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Status Tag Overlay */}
        <div className="absolute top-3.5 left-3.5">
          {isLost && (
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-[#b98f73] text-[#fffdf9] rounded-lg shadow-sm">
              {t.badgeLost}
            </span>
          )}
          {isFound && (
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-[#81947c] text-[#fffdf9] rounded-lg shadow-sm">
              {t.badgeFound}
            </span>
          )}
          {isReunited && (
            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase bg-[#39734a] text-[#fffdf9] rounded-lg shadow-sm">
              {t.badgeReunited}
            </span>
          )}
        </div>

        {/* Reward pill if any */}
        {report.reward && isLost && (
          <div className="absolute top-3.5 right-3.5">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-[#fffdf9]/95 text-[#4d3930] rounded-md shadow-sm border border-[#e7dbd0]">
              {report.reward}
            </span>
          </div>
        )}

        {/* Time ago unboxed metadata */}
        <div className="absolute bottom-3 right-3 bg-[#4d3930]/80 backdrop-blur-sm text-[#fffdf9] text-[11px] px-2.5 py-1 rounded-md font-medium">
          {timeAgo(report.createdAt, report.lastSeenDate)}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Pet Name & Species/Breed */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-editorial text-2xl font-bold text-[#4d3930] group-hover:text-[#b98f73] transition-colors truncate">
              {report.petName}
            </h3>
            <span className="text-xs font-medium text-[#806a5b] capitalize shrink-0">
              {report.type}
            </span>
          </div>

          <div className="text-xs text-[#806a5b] font-medium mb-3 flex items-center gap-1.5">
            <span>{report.breed || 'Mestizo'}</span>
            <span aria-hidden="true">·</span>
            <span>{report.color}</span>
          </div>

          {/* Location with Neighborhood */}
          <div className="flex items-start gap-1.5 text-xs text-[#614b3f] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#b98f73] mt-0.5 shrink-0" />
            <span className="line-clamp-1">
              <strong>{report.area}</strong> — {report.location}
            </span>
          </div>

          {/* Markings excerpt */}
          {report.distinctiveFeatures && (
            <p className="text-xs text-[#806a5b] line-clamp-2 leading-relaxed mb-4 italic bg-[#faf6f0] p-2.5 rounded-xl border border-[#f2e5da]">
              "{report.distinctiveFeatures}"
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#f2e5da] flex items-center justify-between gap-2">
          {/* WhatsApp Direct Chat */}
          {cleanWhatsappNumber ? (
            <a
              href={`https://wa.me/${cleanWhatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Send WhatsApp message"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#fffdf9] bg-[#25D366] hover:bg-[#20ba5a] rounded-xl shadow-xs transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.whatsappButton}</span>
            </a>
          ) : (
            <a
              href={`tel:${report.contactPhone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#fffdf9] bg-[#4d3930] hover:bg-[#362720] rounded-xl transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t.callButton}</span>
            </a>
          )}

          <div className="flex items-center gap-1.5">
            {/* Print Flyer Button */}
            <button
              onClick={() => onPrintFlyer(report)}
              title={t.printPosterButton}
              className="p-2 text-[#614b3f] hover:text-[#4d3930] hover:bg-[#f5eee6] rounded-xl border border-[#dac8ba] transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Mark as Reunited if not yet */}
            {!isReunited && (
              <button
                onClick={() => onMarkReunited(report)}
                title={t.markReunitedTooltip}
                className="p-2 text-[#81947c] hover:text-[#39734a] hover:bg-[#e5ece2] rounded-xl border border-[#dac8ba] transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}

            {/* View Full Details */}
            <button
              onClick={() => onViewDetails(report)}
              className="px-3.5 py-2 text-xs font-semibold text-[#4d3930] bg-[#f5eee6] hover:bg-[#ead8c8] rounded-xl border border-[#dac8ba] transition-colors whitespace-nowrap"
            >
              {t.detailsButton}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
