import React, { useState } from 'react';
import { MapPin, Navigation, Eye } from 'lucide-react';
import { PetReport } from '../types.ts';

interface InteractiveMapProps {
  reports: PetReport[];
  onSelectReport: (report: PetReport) => void;
}

// Coordinate mapping relative to Santa Cruz center (approx -17.7833, -63.1821)
// to a clean responsive SVG canvas (width 800, height 600)
function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  const centerLat = -17.7833;
  const centerLng = -63.1821;

  // Scale factors
  const scaleX = 4200;
  const scaleY = 4600;

  const dx = (lng - centerLng) * scaleX;
  const dy = (lat - centerLat) * -scaleY; // Inverted latitude

  const cx = 400;
  const cy = 300;

  return {
    x: Math.max(40, Math.min(760, cx + dx)),
    y: Math.max(40, Math.min(560, cy + dy))
  };
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  reports,
  onSelectReport
}) => {
  const [selectedPet, setSelectedPet] = useState<PetReport | null>(null);
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'lost' | 'found' | 'reunited'>('all');

  const filteredReports = reports.filter((r) => {
    if (activeStatusFilter === 'all') return true;
    if (activeStatusFilter === 'reunited') return r.status === 'reunited' || r.resolved;
    return r.status === activeStatusFilter;
  });

  return (
    <section id="map-section" className="py-16 border-b border-[#e7dbd0] bg-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#806a5b] block mb-2">
              Spatial Neighborhood Sightings
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#4d3930]">
              Santa Cruz de la Sierra Pet Map
            </h2>
            <p className="text-sm text-[#614b3f] mt-1 max-w-xl">
              Locate reported pets across the concentric ring avenues (1er to 4to Anillo) and neighborhoods. Click any marker for instant details.
            </p>
          </div>

          {/* Map Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#fffdf9] rounded-xl border border-[#dac8ba] self-start md:self-auto shadow-xs">
            {(['all', 'lost', 'found', 'reunited'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  activeStatusFilter === status
                    ? 'bg-[#4d3930] text-[#fffdf9]'
                    : 'text-[#614b3f] hover:text-[#4d3930] hover:bg-[#f5eee6]'
                }`}
              >
                {status === 'all' ? 'All Pins' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Map Canvas Card */}
        <div className="relative bg-[#fffdf9] rounded-3xl border border-[#e7dbd0] shadow-sm overflow-hidden">
          {/* Map Canvas Container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[420px] bg-[#f7ecdf]/50 overflow-hidden select-none">
            {/* SVG Base Map depicting Santa Cruz rings & radials */}
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Concentric rings */}
              {/* 1er Anillo */}
              <circle cx="400" cy="300" r="60" fill="none" stroke="#e0cbbe" strokeWidth="2.5" strokeDasharray="3 3" />
              {/* 2do Anillo */}
              <circle cx="400" cy="300" r="130" fill="none" stroke="#d5bead" strokeWidth="3" />
              {/* 3er Anillo */}
              <circle cx="400" cy="300" r="210" fill="none" stroke="#e0cbbe" strokeWidth="2" strokeDasharray="4 4" />
              {/* 4to Anillo */}
              <circle cx="400" cy="300" r="280" fill="none" stroke="#dac8ba" strokeWidth="2.5" />

              {/* Radial Avenues */}
              {/* Cristo Redentor (North) */}
              <line x1="400" y1="300" x2="400" y2="20" stroke="#d5bead" strokeWidth="2.5" />
              {/* San Martín / Equipetrol (North-West) */}
              <line x1="400" y1="300" x2="160" y2="80" stroke="#d5bead" strokeWidth="2" />
              {/* Av. Busch (West) */}
              <line x1="400" y1="300" x2="50" y2="240" stroke="#d5bead" strokeWidth="1.5" />
              {/* Doble Vía / Las Palmas (South-West) */}
              <line x1="400" y1="300" x2="140" y2="520" stroke="#d5bead" strokeWidth="2" />
              {/* Santos Dumont (South) */}
              <line x1="400" y1="300" x2="400" y2="580" stroke="#d5bead" strokeWidth="2" />
              {/* Virgen de Cotoca (East) */}
              <line x1="400" y1="300" x2="750" y2="300" stroke="#d5bead" strokeWidth="2" />

              {/* Rio Piraí representation along western edge */}
              <path
                d="M 60,0 C 100,180 80,360 40,600"
                fill="none"
                stroke="#c5d8ce"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Labels for landmarks & rings */}
              <text x="400" y="296" textAnchor="middle" fill="#806a5b" fontSize="11" fontWeight="700">
                Plaza 24 de Septiembre (Centro)
              </text>
              <text x="400" y="248" textAnchor="middle" fill="#9b8778" fontSize="10" fontWeight="600">
                1er Anillo
              </text>
              <text x="400" y="180" textAnchor="middle" fill="#9b8778" fontSize="10" fontWeight="600">
                2do Anillo
              </text>
              <text x="400" y="100" textAnchor="middle" fill="#9b8778" fontSize="10" fontWeight="600">
                3er Anillo
              </text>
              <text x="400" y="32" textAnchor="middle" fill="#9b8778" fontSize="10" fontWeight="600">
                4to Anillo (Norte)
              </text>

              {/* Zone text labels */}
              <text x="240" y="130" fill="#614b3f" fontSize="12" fontWeight="700">
                Equipetrol
              </text>
              <text x="180" y="260" fill="#614b3f" fontSize="11" fontWeight="600">
                Urbaró
              </text>
              <text x="220" y="440" fill="#614b3f" fontSize="12" fontWeight="700">
                Las Palmas
              </text>
              <text x="630" y="280" fill="#614b3f" fontSize="12" fontWeight="700">
                Villa 1° de Mayo
              </text>
              <text x="560" y="480" fill="#614b3f" fontSize="12" fontWeight="700">
                Plan 3000
              </text>
              <text x="50" y="580" fill="#81947c" fontSize="11" fontWeight="600">
                Río Piraí
              </text>
            </svg>

            {/* Interactive Pins */}
            {filteredReports.map((report) => {
              const coords = report.coordinates || { lat: -17.7833, lng: -63.1821 };
              const pos = geoToSvg(coords.lat, coords.lng);
              const isSelected = selectedPet?.id === report.id;
              const isLost = report.status === 'lost';
              const isFound = report.status === 'found';

              const pinColor = isLost ? 'bg-[#b98f73]' : isFound ? 'bg-[#81947c]' : 'bg-[#39734a]';

              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedPet(report)}
                  style={{
                    left: `${(pos.x / 800) * 100}%`,
                    top: `${(pos.y / 600) * 100}%`
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-200 z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                  aria-label={`Marker for ${report.petName}`}
                >
                  <div
                    className={`w-9 h-9 rounded-full ${pinColor} text-white p-0.5 shadow-md flex items-center justify-center border-2 border-white`}
                  >
                    <img
                      src={report.photoUrl}
                      alt={report.petName}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=100&q=80';
                      }}
                    />
                  </div>
                  {/* Subtle label tooltip on hover */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 text-[10px] font-bold text-white bg-[#4d3930] rounded shadow-md whitespace-nowrap pointer-events-none">
                    {report.petName} ({report.area})
                  </span>
                </button>
              );
            })}

            {/* Selected Pet Floating Popover Card */}
            {selectedPet && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-[#fffdf9] p-4 rounded-2xl border border-[#e7dbd0] shadow-xl z-40 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f2e5da] shrink-0 border border-[#e7dbd0]">
                    <img
                      src={selectedPet.photoUrl}
                      alt={selectedPet.petName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-editorial text-lg font-bold text-[#4d3930] truncate">
                        {selectedPet.petName}
                      </span>
                      <button
                        onClick={() => setSelectedPet(null)}
                        className="text-[#9b8778] hover:text-[#4d3930] text-sm p-1"
                      >
                        ✕
                      </button>
                    </div>
                    <span className="text-xs text-[#806a5b] block capitalize">
                      {selectedPet.status} · {selectedPet.breed || selectedPet.type}
                    </span>
                    <span className="text-xs text-[#4d3930] font-medium block truncate mt-0.5">
                      📍 {selectedPet.area}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#f2e5da] flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      onSelectReport(selectedPet);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#fffdf9] bg-[#4d3930] hover:bg-[#362720] rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Map Footer Legend */}
          <div className="p-4 bg-[#fbf9f5] border-t border-[#e7dbd0] flex flex-wrap items-center justify-between gap-4 text-xs text-[#806a5b]">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-[#4d3930]">Map Legend:</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b98f73]" />
                Lost Pet
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#81947c]" />
                Found Pet
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39734a]" />
                Reunited
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[#9b8778]">
              <Navigation className="w-3 h-3 text-[#b98f73]" />
              <span>Concentric Anillo grid of Santa Cruz de la Sierra</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
