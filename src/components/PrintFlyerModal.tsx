import React from 'react';
import { X, Printer, Phone } from 'lucide-react';
import { PetReport } from '../types.ts';

interface PrintFlyerModalProps {
  report: PetReport | null;
  onClose: () => void;
}

export const PrintFlyerModal: React.FC<PrintFlyerModalProps> = ({
  report,
  onClose
}) => {
  if (!report) return null;

  const isLost = report.status === 'lost';
  const headline = isLost ? '¡SE BUSCA MASCOTA!' : '¡MASCOTA ENCONTRADA!';
  const subtitle = isLost ? 'PLEASE HELP US FIND OUR PET' : 'LOOKING FOR OWNER';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-flyer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-black max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 my-8 border border-neutral-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls (Not printed) */}
        <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span id="print-flyer-title" className="text-sm font-bold text-neutral-800">Printable Emergency Flyer</span>
            <span className="text-xs text-neutral-500">(Optimized for standard letter paper)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-black hover:bg-neutral-800 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Flyer</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Cerrar folleto"
              className="p-2 text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Poster Canvas */}
        <div id="printable-flyer" className="border-4 border-black p-6 bg-white text-center">
          {/* Header */}
          <div className="bg-black text-white py-3 px-4 mb-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
              {headline}
            </h1>
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* Pet Name */}
          <div className="mb-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black">
              "{report.petName}"
            </h2>
            <p className="text-sm font-semibold uppercase text-neutral-700 tracking-wider">
              {report.type} · {report.breed || 'Mestizo'} · {report.color}
            </p>
          </div>

          {/* Photo */}
          <div className="w-full max-w-md mx-auto aspect-[4/3] border-3 border-black mb-4 overflow-hidden bg-neutral-100">
            <img
              src={report.photoUrl}
              alt={report.petName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Reward Box */}
          {report.reward && isLost && (
            <div className="border-3 border-red-600 bg-red-50 text-red-700 py-2 px-4 mb-4 rounded-md">
              <span className="text-xl sm:text-2xl font-black uppercase tracking-wider">
                ★ {report.reward} ★
              </span>
            </div>
          )}

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-left border-2 border-black p-3 mb-4 bg-neutral-50 text-xs sm:text-sm">
            <div>
              <strong>Lugar / Zona:</strong>
              <p className="font-semibold text-neutral-800">{report.area}</p>
              <p className="text-neutral-600 text-[11px]">{report.location}</p>
            </div>
            <div>
              <strong>Fecha:</strong>
              <p className="font-semibold text-neutral-800">{report.lastSeenDate}</p>
              <p className="text-neutral-600 text-[11px]">Santa Cruz de la Sierra</p>
            </div>
          </div>

          {/* Description */}
          {report.distinctiveFeatures && (
            <div className="text-left mb-4 p-3 border border-neutral-300 rounded bg-white">
              <strong className="text-xs uppercase text-neutral-600 block mb-1">
                Rasgos y señas particulares:
              </strong>
              <p className="text-xs sm:text-sm leading-relaxed text-neutral-900 font-medium">
                {report.distinctiveFeatures}
              </p>
            </div>
          )}

          {/* Emergency Contact */}
          <div className="bg-black text-white p-4 mb-6">
            <span className="text-xs uppercase tracking-wider block font-bold">
              Si lo has visto o tienes alguna información, comunícate de inmediato con:
            </span>
            <div className="text-xl sm:text-2xl font-black mt-1 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>{report.contactName}: {report.contactPhone}</span>
            </div>
          </div>

          {/* 8 Tear-Off Contact Slips */}
          <div className="border-t-2 border-dashed border-black pt-3">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-2">
              ✂ Tiras recortables para postes y vitrinas comunitarias ✂
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className="border border-neutral-400 p-1.5 flex flex-col justify-between text-[9px] font-bold rotate-0 min-h-[64px]"
                >
                  <span className="truncate">{report.petName}</span>
                  <span className="text-[10px] font-black text-neutral-900 leading-tight">
                    {report.contactPhone.replace('+591 ', '')}
                  </span>
                  <span className="text-[8px] text-neutral-500">{report.area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-[10px] text-neutral-400">
            Publicado en Santa Cruz Pet Watch · Comunidad de recuperación de mascotas
          </div>
        </div>
      </div>
    </div>
  );
};
