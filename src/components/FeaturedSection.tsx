import React from 'react';
import { AppItem, PageRoute } from '../types';
import { Sparkles, ArrowRight, Smartphone, Check } from 'lucide-react';

interface FeaturedSectionProps {
  apps: AppItem[];
  onSelectApp: (appId: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  apps,
  onSelectApp,
}) => {
  const featuredApps = apps.filter(a => a.featured).slice(0, 2);

  if (featuredApps.length === 0) return null;

  return (
    <section className="py-12 border-b border-slate-800/60 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              Spotlight Highlights
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Featured Titles
            </h2>
          </div>
          <div className="text-xs text-slate-400">
            Handpicked titles engineered for smooth Android performance
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredApps.map((app) => (
            <div
              key={app.id}
              className="relative rounded-2xl bg-gradient-to-br from-[#0e162d] to-[#0a1020] border border-slate-800/90 p-6 sm:p-8 flex flex-col justify-between hover:border-cyan-500/50 transition-all group"
            >
              <div className="space-y-5">
                {/* Header row: Icon & Titles */}
                <div className="flex items-start gap-4">
                  <img
                    src={app.iconUrl}
                    alt={`${app.name} icon`}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl shadow-cyan-950/40 object-cover border border-slate-700/60 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-1 min-w-0">
                    <div className="text-xs text-cyan-400 font-medium">
                      {app.category}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors truncate">
                      {app.name}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {app.publicationStatus === 'Published' ? 'Available on Google Play' : 'In Active Development &middot; Pre-Register'}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {app.shortDescription}
                </p>

                {/* Key Features preview */}
                <ul className="space-y-1.5 text-xs text-slate-300 pt-1">
                  {app.keyFeatures.slice(0, 2).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {app.packageName}
                </span>

                <button
                  onClick={() => onSelectApp(app.id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600/90 hover:bg-blue-600 rounded-lg transition-colors group-hover:bg-cyan-600"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
