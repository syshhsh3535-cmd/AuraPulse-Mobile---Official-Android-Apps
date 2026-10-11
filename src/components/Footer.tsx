import React from 'react';
import { PageRoute, DeveloperInfo } from '../types';
import { Smartphone, ExternalLink, ShieldCheck, FileText, HelpCircle, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  developerConfig: DeveloperInfo;
  onOpenDeployGuide: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  developerConfig,
  onOpenDeployGuide,
  onOpenAdmin,
}) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050811] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Studio Brand and Description */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white font-display">
                {developerConfig.studioName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {developerConfig.brandTagline}
            </p>
            <div className="text-xs text-slate-500 pt-2">
              Official Google Play Developer Portfolio & Catalog
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Applications
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'home' })}
                  className="hover:text-cyan-400 transition-colors"
                >
                  All Apps & Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'app-details', appId: 'math-master-trivia' })}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Math Master: Trivia Challenge
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'app-details', appId: 'glow-circuit-light-puzzle' })}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Glow Circuit: Light Puzzle
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-cyan-400 transition-colors text-blue-400"
                >
                  + Add / Edit Applications
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Compliance & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'privacy' })}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'terms' })}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Terms of Use</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'admob-guide' })}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-emerald-400 font-mono text-[11px]">app-ads.txt</span>
                  <span className="text-slate-400">AdMob Setup</span>
                </button>
              </li>
              <li>
                <a
                  href="/app-ads.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-400 font-mono text-[11px]"
                >
                  <span>Raw /app-ads.txt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Developer & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-200">
              Developer Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'support' })}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>Help & FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-cyan-400 transition-colors"
                >
                  About Developer
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeployGuide}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Hosting & Custom Domain Guide
                </button>
              </li>
              <li className="pt-1">
                <a
                  href={`mailto:${developerConfig.supportEmail}`}
                  className="text-slate-300 hover:text-white flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{developerConfig.supportEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Unboxed Clean Metadata */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {developerConfig.developerName} &middot; {developerConfig.studioName}. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Google Play is a trademark of Google LLC.</span>
            <span aria-hidden="true">&middot;</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-500 hover:text-slate-300 underline"
            >
              Developer Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
