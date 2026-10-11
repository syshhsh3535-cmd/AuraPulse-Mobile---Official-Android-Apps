import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Menu, X, Shield, PlusCircle, Smartphone } from 'lucide-react';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenAdmin: () => void;
  onOpenDeployGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenAdmin,
  onOpenDeployGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCurrent = (type: PageRoute['type']) => currentRoute.type === type;

  const handleNav = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNav({ type: 'home' })}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
            aria-label="AuraPulse Mobile Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white font-display whitespace-nowrap">
              AuraPulse<span className="text-cyan-400 font-medium">Mobile</span>
            </span>
          </button>

          {/* Zone 2: Single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNav({ type: 'home' })}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                isCurrent('home') ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Apps & Games
            </button>
            <button
              onClick={() => handleNav({ type: 'admob-guide' })}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                isCurrent('admob-guide') ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              app-ads.txt
            </button>
            <button
              onClick={() => handleNav({ type: 'privacy' })}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                isCurrent('privacy') ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav({ type: 'support' })}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                isCurrent('support') ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Support & FAQ
            </button>
            <button
              onClick={() => handleNav({ type: 'about' })}
              className={`whitespace-nowrap transition-colors hover:text-white ${
                isCurrent('about') ? 'text-cyan-400 font-semibold' : 'text-slate-300'
              }`}
            >
              About Studio
            </button>
          </nav>

          {/* Zone 3: Primary Action & Developer Controls */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenDeployGuide}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-md border border-slate-700/60 transition-colors whitespace-nowrap"
              title="Deployment & Custom Domain Manual"
            >
              Deploy Manual
            </button>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-md shadow-md shadow-blue-500/20 transition-all whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>App Manager</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-1.5 text-xs text-white bg-blue-600 hover:bg-blue-500 rounded-md font-medium"
              title="App Manager"
            >
              Manage
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0a0f1d] px-4 pt-3 pb-5 space-y-2 text-sm font-medium">
          <button
            onClick={() => handleNav({ type: 'home' })}
            className={`block w-full text-left py-2 px-3 rounded-md ${
              isCurrent('home') ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            Apps & Games
          </button>
          <button
            onClick={() => handleNav({ type: 'admob-guide' })}
            className={`block w-full text-left py-2 px-3 rounded-md ${
              isCurrent('admob-guide') ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'
            }`}
          >
            Google AdMob (app-ads.txt)
          </button>
          <button
            onClick={() => handleNav({ type: 'privacy' })}
            className={`block w-full text-left py-2 px-3 rounded-md ${
              isCurrent('privacy') ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => handleNav({ type: 'support' })}
            className={`block w-full text-left py-2 px-3 rounded-md ${
              isCurrent('support') ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'
            }`}
          >
            Support & FAQ
          </button>
          <button
            onClick={() => handleNav({ type: 'about' })}
            className={`block w-full text-left py-2 px-3 rounded-md ${
              isCurrent('about') ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'
            }`}
          >
            About Studio
          </button>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 px-3 rounded-md text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500"
            >
              Open App Manager
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeployGuide();
              }}
              className="w-full py-2 px-3 rounded-md text-center text-xs text-slate-300 bg-slate-800/80 hover:bg-slate-700"
            >
              Deployment & Domain Manual
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
