import React from 'react';
import { DeveloperInfo } from '../types';
import { Smartphone, Code, ShieldCheck, Heart, ExternalLink, Cpu, Sparkles } from 'lucide-react';

interface AboutPageProps {
  developerConfig: DeveloperInfo;
}

export const AboutPage: React.FC<AboutPageProps> = ({ developerConfig }) => {
  return (
    <div className="min-h-screen bg-[#070b14] py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            About The Studio & Developer
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Building Meaningful Android Experiences
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Welcome to the official developer home of <strong>{developerConfig.studioName}</strong>. We design, program, and release engaging Android mobile games and productivity utilities published on Google Play.
          </p>
        </div>

        {/* Studio Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0b1224] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Native Android Craft
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every app is engineered with responsive layouts, fluid 60fps animations, and low battery consumption across all screen sizes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b1224] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Privacy First
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We collect no unnecessary user data. Zero bloat, zero tracking SDKs beyond transparent Google AdMob monetization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b1224] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Player-Centered Fun
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Games built for pure joy and mental stimulation, devoid of aggressive paywalls or punitive energy systems.
            </p>
          </div>
        </div>

        {/* Developer Bio & Details */}
        <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Developer Profile
              </h2>
              <div className="text-xs text-slate-400 mt-1">
                Lead Developer & Creator: <span className="text-white font-semibold">{developerConfig.developerName}</span>
              </div>
            </div>

            <a
              href={developerConfig.googlePlayDeveloperUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Google Play Developer Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              I am an independent mobile application developer passionate about constructing polished, responsive experiences for the Android ecosystem. From mental agility quiz titles like <em>Math Master: Trivia Challenge</em> to ambient geometric brainteasers like <em>Glow Circuit: Light Puzzle</em>, each release represents a commitment to high design standards and reliable engineering.
            </p>
            <p>
              This website serves as our central home on the web, fulfilling all Google Play Store developer requirements, providing verified <span className="font-mono text-cyan-300">app-ads.txt</span> hosting for Google AdMob programmatic ad buyers, and offering a direct line of communication for player support and privacy requests.
            </p>
          </div>

          {/* Technical Toolkit */}
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Technology Stack & Tooling
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-md bg-[#080e1c] border border-slate-800 text-slate-300">Android SDK & Jetpack Compose</span>
              <span className="px-3 py-1 rounded-md bg-[#080e1c] border border-slate-800 text-slate-300">Kotlin & Java</span>
              <span className="px-3 py-1 rounded-md bg-[#080e1c] border border-slate-800 text-slate-300">Google Play Console</span>
              <span className="px-3 py-1 rounded-md bg-[#080e1c] border border-slate-800 text-slate-300">Google AdMob (app-ads.txt Authorized)</span>
              <span className="px-3 py-1 rounded-md bg-[#080e1c] border border-slate-800 text-slate-300">Firebase Diagnostics</span>
              <span className="px-3 py-1 rounded-md bg-[#080e1c] border border-slate-800 text-slate-300">React & TypeScript (Web Showcase)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
