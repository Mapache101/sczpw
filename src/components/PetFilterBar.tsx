import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { FilterOptions, PetStatus, PetSpecies } from '../types.ts';
import { SANTA_CRUZ_AREAS } from '../data/seedData.ts';

interface PetFilterBarProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  totalMatches: number;
}

export const PetFilterBar: React.FC<PetFilterBarProps> = ({
  filters,
  onFilterChange,
  totalMatches
}) => {
  const statusTabs: { label: string; value: PetStatus | 'all' }[] = [
    { label: 'All Reports', value: 'all' },
    { label: 'Lost', value: 'lost' },
    { label: 'Found', value: 'found' },
    { label: 'Reunited', value: 'reunited' }
  ];

  const speciesOptions: { label: string; value: PetSpecies | 'all' }[] = [
    { label: 'All Pets', value: 'all' },
    { label: 'Dogs', value: 'dog' },
    { label: 'Cats', value: 'cat' },
    { label: 'Other', value: 'other' }
  ];

  const hasActiveFilters =
    filters.search.trim() !== '' ||
    filters.status !== 'all' ||
    filters.species !== 'all' ||
    filters.area !== 'all';

  const resetFilters = () => {
    onFilterChange({
      search: '',
      status: 'all',
      species: 'all',
      area: 'all'
    });
  };

  return (
    <div className="bg-[#fffdf9] p-6 rounded-3xl border border-[#e7dbd0] shadow-sm mb-8 space-y-5">
      {/* Search Input and Status Tabs row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9b8778]" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search by name, breed, color, street, or feature..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#faf6f0] border border-[#dac8ba] rounded-xl text-[#4d3930] placeholder-[#9b8778] focus:outline-none focus:ring-2 focus:ring-[#b98f73]/50 focus:border-[#b98f73] transition-all"
          />
        </div>

        {/* Status segmented tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#f5eee6] rounded-xl border border-[#e7dbd0] self-start lg:self-auto overflow-x-auto max-w-full">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onFilterChange({ ...filters, status: tab.value })}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                filters.status === tab.value
                  ? 'bg-[#4d3930] text-[#fffdf9] shadow-sm'
                  : 'text-[#614b3f] hover:text-[#4d3930] hover:bg-[#ead8c8]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Second filter row: Species and Santa Cruz Area */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#f2e5da]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Species Pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[#806a5b] mr-1">Pet Type:</span>
            {speciesOptions.map((sp) => (
              <button
                key={sp.value}
                onClick={() => onFilterChange({ ...filters, species: sp.value })}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
                  filters.species === sp.value
                    ? 'bg-[#b98f73] text-[#fffdf9] border-[#b98f73]'
                    : 'bg-[#faf6f0] text-[#614b3f] border-[#dac8ba] hover:bg-[#f5eee6]'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>

          {/* Area Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-[#806a5b] mr-1">Neighborhood:</span>
            <select
              value={filters.area}
              onChange={(e) => onFilterChange({ ...filters, area: e.target.value })}
              aria-label="Neighborhood filter"
              className="px-3 py-1 text-xs font-medium bg-[#faf6f0] text-[#4d3930] border border-[#dac8ba] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b98f73]"
            >
              <option value="all">All Santa Cruz Areas</option>
              {SANTA_CRUZ_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3 text-xs text-[#806a5b]">
          <span className="font-medium tabular-nums">
            {totalMatches} {totalMatches === 1 ? 'report found' : 'reports found'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-[#b98f73] hover:text-[#4d3930] font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
