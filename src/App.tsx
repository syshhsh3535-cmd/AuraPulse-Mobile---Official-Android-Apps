import React, { useState, useEffect } from 'react';
import { PageRoute, AppItem, AppCategory } from './types';
import { initialApps } from './data/appsData';
import { initialDeveloperConfig } from './data/developerConfig';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { FeaturedSection } from './components/FeaturedSection';
import { AppsGrid } from './components/AppsGrid';
import { AppDetailsPage } from './pages/AppDetailsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { SupportPage } from './pages/SupportPage';
import { AboutPage } from './pages/AboutPage';
import { TermsPage } from './pages/TermsPage';
import { AdMobGuidePage } from './pages/AdMobGuidePage';
import { AdminManagerModal } from './pages/AdminManagerModal';
import { DeployGuideModal } from './pages/DeployGuideModal';

export default function App() {
  // App catalog state with localStorage persistence
  const [apps, setApps] = useState<AppItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurapulse_apps_custom');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved apps from localStorage', e);
    }
    return initialApps;
  });

  // Category filter state
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<AppCategory | 'All'>('All');

  // Modals state
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [deployGuideOpen, setDeployGuideOpen] = useState(false);
  const [editingAppTarget, setEditingAppTarget] = useState<AppItem | null>(null);

  // Routing state
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    // Parse initial hash from URL
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash.startsWith('app/')) {
      const appId = hash.replace('app/', '');
      return { type: 'app-details', appId };
    }
    if (hash === 'privacy') return { type: 'privacy' };
    if (hash === 'support') return { type: 'support' };
    if (hash === 'about') return { type: 'about' };
    if (hash === 'terms') return { type: 'terms' };
    if (hash === 'admob-guide' || hash === 'app-ads.txt') return { type: 'admob-guide' };
    return { type: 'home' };
  });

  // Sync route changes with window hash
  const navigate = (route: PageRoute) => {
    setCurrentRoute(route);
    let newHash = '';
    switch (route.type) {
      case 'home':
        newHash = '';
        break;
      case 'app-details':
        newHash = `app/${route.appId}`;
        break;
      case 'privacy':
        newHash = route.appId ? `privacy/${route.appId}` : 'privacy';
        break;
      case 'support':
        newHash = route.appId ? `support/${route.appId}` : 'support';
        break;
      case 'about':
        newHash = 'about';
        break;
      case 'terms':
        newHash = 'terms';
        break;
      case 'admob-guide':
        newHash = 'admob-guide';
        break;
    }
    window.location.hash = newHash ? `#/${newHash}` : '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser forward/backward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('app/')) {
        const appId = hash.replace('app/', '');
        setCurrentRoute({ type: 'app-details', appId });
      } else if (hash.startsWith('privacy')) {
        const parts = hash.split('/');
        setCurrentRoute({ type: 'privacy', appId: parts[1] });
      } else if (hash.startsWith('support')) {
        const parts = hash.split('/');
        setCurrentRoute({ type: 'support', appId: parts[1] });
      } else if (hash === 'about') {
        setCurrentRoute({ type: 'about' });
      } else if (hash === 'terms') {
        setCurrentRoute({ type: 'terms' });
      } else if (hash === 'admob-guide' || hash === 'app-ads.txt') {
        setCurrentRoute({ type: 'admob-guide' });
      } else {
        setCurrentRoute({ type: 'home' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save apps handler
  const handleSaveApps = (updated: AppItem[]) => {
    setApps(updated);
    try {
      localStorage.setItem('aurapulse_apps_custom', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save apps to localStorage', e);
    }
  };

  const handleOpenAdd = () => {
    setEditingAppTarget(null);
    setAdminModalOpen(true);
  };

  const handleOpenEdit = (app: AppItem) => {
    setEditingAppTarget(app);
    setAdminModalOpen(true);
  };

  const handleExploreApps = () => {
    setActiveCategoryFilter('All');
    if (currentRoute.type !== 'home') {
      navigate({ type: 'home' });
    }
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleExploreGames = () => {
    setActiveCategoryFilter('Games');
    if (currentRoute.type !== 'home') {
      navigate({ type: 'home' });
    }
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Find currently selected app for app-details route
  const currentApp = currentRoute.type === 'app-details'
    ? apps.find((a) => a.id === currentRoute.appId) || apps[0]
    : null;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenAdmin={() => {
          setEditingAppTarget(null);
          setAdminModalOpen(true);
        }}
        onOpenDeployGuide={() => setDeployGuideOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentRoute.type === 'home' && (
          <>
            <Hero
              onExploreApps={handleExploreApps}
              onExploreGames={handleExploreGames}
              publishedCount={apps.filter((a) => a.publicationStatus === 'Published').length}
            />

            <FeaturedSection
              apps={apps}
              onSelectApp={(appId) => navigate({ type: 'app-details', appId })}
              onNavigate={navigate}
            />

            <AppsGrid
              apps={apps}
              onSelectApp={(appId) => navigate({ type: 'app-details', appId })}
              onOpenAddNew={handleOpenAdd}
              activeCategoryFilter={activeCategoryFilter}
              setActiveCategoryFilter={setActiveCategoryFilter}
            />
          </>
        )}

        {currentRoute.type === 'app-details' && currentApp && (
          <AppDetailsPage
            app={currentApp}
            allApps={apps}
            onBack={() => navigate({ type: 'home' })}
            onSelectApp={(appId) => navigate({ type: 'app-details', appId })}
            onNavigate={navigate}
            onEditApp={handleOpenEdit}
          />
        )}

        {currentRoute.type === 'privacy' && (
          <PrivacyPolicyPage
            developerConfig={initialDeveloperConfig}
            apps={apps}
            selectedAppId={currentRoute.appId}
            onSelectApp={(appId) => navigate({ type: 'app-details', appId })}
          />
        )}

        {currentRoute.type === 'support' && (
          <SupportPage
            developerConfig={initialDeveloperConfig}
            apps={apps}
            preselectedAppId={currentRoute.appId}
          />
        )}

        {currentRoute.type === 'about' && (
          <AboutPage developerConfig={initialDeveloperConfig} />
        )}

        {currentRoute.type === 'terms' && (
          <TermsPage developerConfig={initialDeveloperConfig} />
        )}

        {currentRoute.type === 'admob-guide' && (
          <AdMobGuidePage developerConfig={initialDeveloperConfig} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigate}
        developerConfig={initialDeveloperConfig}
        onOpenDeployGuide={() => setDeployGuideOpen(true)}
        onOpenAdmin={() => {
          setEditingAppTarget(null);
          setAdminModalOpen(true);
        }}
      />

      {/* Admin App Manager Modal */}
      <AdminManagerModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        apps={apps}
        onSaveApps={handleSaveApps}
        initialEditingApp={editingAppTarget}
      />

      {/* Deployment & Custom Domain Guide Modal */}
      <DeployGuideModal
        isOpen={deployGuideOpen}
        onClose={() => setDeployGuideOpen(false)}
      />
    </div>
  );
}
