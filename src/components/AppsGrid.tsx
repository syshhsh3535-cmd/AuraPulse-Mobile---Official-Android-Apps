import React, { useState, useMemo } from 'react';
import { AppItem, AppCategory } from '../types';
import { AppCard } from './AppCard';
import { Search, Plus, Filter, Smartphone } from 'lucide-react';

interface AppsGridProps {
  apps: AppItem[];
  onSelectApp: (appId: string) => void;
  onOpenAddNew: () => void;
  activeCategoryFilter?: AppCategory | 'All';
  setActiveCategoryFilter?: (cat: AppCategory | 'All') => void;
}

const CATEGORIES: (AppCategory | 'All')[] = [
  'All',
  'Games',
  'Education',
  'Puzzle',
  'Tools',
  'Other Apps',
];

export const AppsGrid: React.FC<AppsGridProps> = ({
  apps,
  onSelectApp,
  onOpenAddNew,
  activeCategoryFilter: externalCategory,
  setActiveCategoryFilter: setExternalCategory,
}) => {
  const [internalCategory, setInternalCategory] = useState<AppCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCategory = externalCategory ?? internalCategory;
  const setSelectedCategory = setExternalCategory ?? setInternalCategory;

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesCategory =
        selectedCategory === 'All' ? true : app.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        app.name.toLowerCase().includes(q) ||
        app.shortDescription.toLowerCase().includes(q) ||
        app.packageName.toLowerCase().includes(q) ||
        (app.tags && app.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [apps, selectedCategory, searchQuery]);

  return (
    <section id="catalog" className="py-12 lg:py-16 bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              Portfolio & Store Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Android Applications & Games
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddNew}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New App</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Category Filter segmented tabs */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between p-2 rounded-xl bg-[#0b1224] border border-slate-800">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps by name, keyword, or package..."
              className="w-full pl-10 pr-4 py-2 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* App Cards Grid */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} onSelect={onSelectApp} />
            ))}

            {/* Template / Add App Card Placeholder */}
            <div 
              onClick={onOpenAddNew}
              className="border border-dashed border-slate-700/80 hover:border-cyan-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-900/40 transition-all min-h-[260px] group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 mb-3 transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Add New App
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
                Easily publish a new Android application or mobile game to your portfolio.
              </p>
              <span className="mt-4 px-3 py-1 text-[11px] font-medium text-cyan-400 bg-cyan-950/40 rounded-md">
                Launch Creator
              </span>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center space-y-3 bg-[#0a0f1e] rounded-2xl border border-slate-800">
            <Smartphone className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-semibold text-white">No applications found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No apps matched your query &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-2 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
