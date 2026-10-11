import React from 'react';
import { ArrowDown, Gamepad2, Layers } from 'lucide-react';

interface HeroProps {
  onExploreApps: () => void;
  onExploreGames: () => void;
  publishedCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreApps,
  onExploreGames,
  publishedCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1024] via-[#070b14] to-[#070b14] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/60">
      {/* Background ambient lighting accents */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-cyan-500/15 blur-3xl pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Unboxed natural kicker */}
            <div className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
              Official Android Developer Studio
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.1] max-w-2xl text-balance">
              Discover Our <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Apps & Games</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Explore fun games, smart tools, and exciting mobile experiences.
            </p>

            {/* CTAs: "Explore Apps" and "Explore Games" */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreApps}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Apps</span>
              </button>

              <button
                onClick={onExploreGames}
                className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-cyan-300 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all hover:-translate-y-0.5"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Explore Games</span>
              </button>
            </div>

            {/* Quiet human metadata row without pill boxes */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span>Google Play Compatible</span>
              <span aria-hidden="true">&middot;</span>
              <span>AdMob Verified (app-ads.txt)</span>
              <span aria-hidden="true">&middot;</span>
              <span>COPPA & GDPR Privacy Compliant</span>
              <span aria-hidden="true">&middot;</span>
              <span>Android 8.0+ Ready</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl shadow-blue-950/40 bg-[#0c1326] group">
              <img
                src="/src/assets/images/hero_mobile_showcase_1791704615584.jpg"
                alt="Showcase of mobile Android applications and games"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-[#070b14]/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 pointer-events-none">
                <span className="font-medium text-white">Mobile Studio Catalog</span>
                <span className="text-cyan-400">Published & Upcoming Titles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
