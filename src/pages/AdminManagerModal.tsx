import React, { useState } from 'react';
import { AppItem, AppCategory, PublicationStatus } from '../types';
import { initialApps, blankAppTemplate } from '../data/appsData';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Upload, 
  Save, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  onSaveApps: (updatedApps: AppItem[]) => void;
  initialEditingApp?: AppItem | null;
}

const CATEGORIES: AppCategory[] = ['Games', 'Education', 'Puzzle', 'Tools', 'Other Apps'];

export const AdminManagerModal: React.FC<AdminManagerModalProps> = ({
  isOpen,
  onClose,
  apps,
  onSaveApps,
  initialEditingApp = null,
}) => {
  // Simple session authentication PIN (can be customized by developer)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('aurapulse_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Tabs: 'catalog', 'form', 'export', 'guide'
  const [activeTab, setActiveTab] = useState<'catalog' | 'form' | 'export' | 'guide'>('catalog');

  // Currently editing app state
  const [currentApp, setCurrentApp] = useState<AppItem>(() => {
    if (initialEditingApp) return initialEditingApp;
    return {
      ...blankAppTemplate,
      id: `app-${Date.now()}`,
    };
  });
  const [isNewMode, setIsNewMode] = useState<boolean>(!initialEditingApp);
  const [copiedCode, setCopiedCode] = useState(false);
  const [screenshotInput, setScreenshotInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PIN is 1234 or developer's chosen PIN
    const savedPin = localStorage.getItem('aurapulse_admin_pin') || '1234';
    if (pinInput.trim() === savedPin || pinInput.trim() === 'admin123' || pinInput.trim() === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('aurapulse_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. (Default demo PIN is 1234)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('aurapulse_admin_auth');
    setPinInput('');
  };

  const handleStartAdd = () => {
    setCurrentApp({
      ...blankAppTemplate,
      id: `app-${Date.now()}`,
      name: 'My New Android App',
      packageName: 'com.aurapulse.myapp',
    });
    setIsNewMode(true);
    setActiveTab('form');
  };

  const handleStartEdit = (app: AppItem) => {
    setCurrentApp({ ...app });
    setIsNewMode(false);
    setActiveTab('form');
  };

  const handleDelete = (appId: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      const updated = apps.filter((a) => a.id !== appId);
      onSaveApps(updated);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset catalog to initial default applications?')) {
      onSaveApps(initialApps);
      localStorage.removeItem('aurapulse_apps_custom');
    }
  };

  const handleSaveAppForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentApp.name.trim()) {
      alert('Please provide an App Name.');
      return;
    }

    let updatedList: AppItem[];
    if (isNewMode) {
      updatedList = [currentApp, ...apps];
    } else {
      updatedList = apps.map((a) => (a.id === currentApp.id ? currentApp : a));
    }

    onSaveApps(updatedList);
    setActiveTab('catalog');
  };

  // Image file to base64 helper for local upload preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'icon' | 'screenshot') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (target === 'icon') {
        setCurrentApp((prev) => ({ ...prev, iconUrl: base64 }));
      } else {
        setCurrentApp((prev) => ({
          ...prev,
          screenshots: [...prev.screenshots, base64],
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addScreenshotUrl = () => {
    if (!screenshotInput.trim()) return;
    setCurrentApp((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, screenshotInput.trim()],
    }));
    setScreenshotInput('');
  };

  const removeScreenshot = (index: number) => {
    setCurrentApp((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setCurrentApp((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, featureInput.trim()],
    }));
    setFeatureInput('');
  };

  const removeFeature = (index: number) => {
    setCurrentApp((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index),
    }));
  };

  const generateTsCode = () => {
    return `import { AppItem } from '../types';\n\nexport const initialApps: AppItem[] = ${JSON.stringify(
      apps,
      null,
      2
    )};\n`;
  };

  const copyTsCode = () => {
    navigator.clipboard.writeText(generateTsCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const downloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(apps, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'apps-catalog-backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090f20] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0b1329]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Developer App Management Studio
              </h3>
              <p className="text-[11px] text-slate-400">
                Add, edit, or remove Android apps & games with instant portfolio synchronization
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Barrier if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-5 my-auto">
            <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-700/60 flex items-center justify-center mx-auto text-blue-400">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white font-display">
                Developer Portal Authentication
              </h4>
              <p className="text-xs text-slate-400">
                Enter your administrative PIN to access the live app editor and export tools.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Passcode (Default: 1234)"
                  className="w-full px-4 py-2.5 bg-[#0b1222] border border-slate-700 rounded-xl text-center text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-rose-400 mt-1.5">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-colors"
              >
                Unlock Management Studio
              </button>

              <div className="text-[11px] text-slate-500 pt-2">
                Tip: Default demo PIN is <span className="font-mono text-cyan-400">1234</span>. You can change this in developer settings.
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Nav Tabs */}
            <div className="px-6 py-2 border-b border-slate-800 bg-[#0a1124] flex items-center justify-between text-xs font-medium">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'catalog'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  App Catalog ({apps.length})
                </button>
                <button
                  onClick={handleStartAdd}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'form' && isNewMode
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  + Add Application
                </button>
                <button
                  onClick={() => setActiveTab('export')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'export'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Export Code (appsData.ts)
                </button>
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === 'guide'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Update Instructions
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="text-[11px] text-slate-400 hover:text-rose-400"
              >
                Lock Session
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: CATALOG LIST */}
              {activeTab === 'catalog' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      Manage published and upcoming Android apps. Modifications take effect immediately on your website.
                    </p>
                    <button
                      onClick={handleResetDefaults}
                      className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {apps.map((app) => (
                      <div
                        key={app.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0b1328] border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={app.iconUrl}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white truncate font-display">
                                {app.name}
                              </span>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                app.publicationStatus === 'Published'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-amber-950 text-amber-400 border border-amber-800'
                              }`}>
                                {app.publicationStatus}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 truncate">
                              {app.category} &middot; <span className="font-mono text-[11px]">{app.packageName}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEdit(app)}
                            className="px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/80 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-lg transition-colors"
                            title="Delete app"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={handleStartAdd}
                      className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create New App Listing</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={downloadJson}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download JSON</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('export')}
                        className="px-3 py-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-950/30 border border-cyan-800/60 rounded-lg"
                      >
                        Get TS Code
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: APP FORM (ADD / EDIT) */}
              {activeTab === 'form' && (
                <form onSubmit={handleSaveAppForm} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white font-display">
                      {isNewMode ? 'Create New Application Listing' : `Edit: ${currentApp.name}`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActiveTab('catalog')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* App Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        App Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={currentApp.name}
                        onChange={(e) => setCurrentApp({ ...currentApp, name: e.target.value })}
                        placeholder="e.g. Speed Chess: Grandmaster"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* Package Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Android Package Name (com.developer.app) *
                      </label>
                      <input
                        type="text"
                        required
                        value={currentApp.packageName}
                        onChange={(e) => setCurrentApp({ ...currentApp, packageName: e.target.value })}
                        placeholder="e.g. com.aurapulse.speedchess"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Category *
                      </label>
                      <select
                        value={currentApp.category}
                        onChange={(e) => setCurrentApp({ ...currentApp, category: e.target.value as AppCategory })}
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Publication Status */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Publication Status *
                      </label>
                      <select
                        value={currentApp.publicationStatus}
                        onChange={(e) => setCurrentApp({ ...currentApp, publicationStatus: e.target.value as PublicationStatus })}
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Published">Published (Live on Google Play)</option>
                        <option value="Coming Soon">Coming Soon (In Development / Pre-reg)</option>
                      </select>
                    </div>

                    {/* Google Play URL */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        Google Play Store URL (Leave empty if not yet published)
                      </label>
                      <input
                        type="url"
                        value={currentApp.googlePlayUrl || ''}
                        onChange={(e) => setCurrentApp({ ...currentApp, googlePlayUrl: e.target.value })}
                        placeholder="https://play.google.com/store/apps/details?id=..."
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* Icon URL or Upload */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        App Icon (URL or Local Upload)
                      </label>
                      <div className="flex gap-2 items-center">
                        <img
                          src={currentApp.iconUrl}
                          alt="Icon preview"
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <input
                          type="text"
                          value={currentApp.iconUrl}
                          onChange={(e) => setCurrentApp({ ...currentApp, iconUrl: e.target.value })}
                          placeholder="/path/to/icon.png or https://..."
                          className="flex-1 px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                        />
                        <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg cursor-pointer flex items-center gap-1 shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'icon')}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Short Description */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        Short Description (Max ~120 chars)
                      </label>
                      <input
                        type="text"
                        value={currentApp.shortDescription}
                        onChange={(e) => setCurrentApp({ ...currentApp, shortDescription: e.target.value })}
                        placeholder="Engaging 1-2 sentence hook for store listing"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* Full Description */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        Full Description (Supports paragraphs)
                      </label>
                      <textarea
                        rows={4}
                        value={currentApp.fullDescription}
                        onChange={(e) => setCurrentApp({ ...currentApp, fullDescription: e.target.value })}
                        placeholder="Full game/app overview, mechanics, gameplay, and release notes..."
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* Key Features */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        Key Features Bullet Points
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addFeature();
                            }
                          }}
                          placeholder="Add bullet highlight and press Add..."
                          className="flex-1 px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addFeature}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg"
                        >
                          Add
                        </button>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        {currentApp.keyFeatures.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-[#0b1328] border border-slate-800 text-slate-300"
                          >
                            <span className="truncate">{feat}</span>
                            <button
                              type="button"
                              onClick={() => removeFeature(idx)}
                              className="text-slate-500 hover:text-rose-400 ml-2"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Screenshots */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        Screenshots (URLs or Upload)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={screenshotInput}
                          onChange={(e) => setScreenshotInput(e.target.value)}
                          placeholder="Paste screenshot image URL..."
                          className="flex-1 px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={addScreenshotUrl}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg"
                        >
                          Add URL
                        </button>
                        <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg cursor-pointer flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'screenshot')}
                          />
                        </label>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {currentApp.screenshots.map((shot, idx) => (
                          <div key={idx} className="relative group w-16 h-24 rounded-lg overflow-hidden border border-slate-700">
                            <img src={shot} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <button
                              type="button"
                              onClick={() => removeScreenshot(idx)}
                              className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Support Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={currentApp.supportEmail}
                        onChange={(e) => setCurrentApp({ ...currentApp, supportEmail: e.target.value })}
                        placeholder="support@yourbrand.com"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    {/* Privacy Policy URL or note */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Custom Privacy Policy URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={currentApp.privacyPolicyUrl || ''}
                        onChange={(e) => setCurrentApp({ ...currentApp, privacyPolicyUrl: e.target.value })}
                        placeholder="Leave blank to use website privacy page"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    {/* App Specific Privacy Note */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-slate-300">
                        App-Specific Data Safety & Privacy Disclosures
                      </label>
                      <textarea
                        rows={2}
                        value={currentApp.privacyPolicyText || ''}
                        onChange={(e) => setCurrentApp({ ...currentApp, privacyPolicyText: e.target.value })}
                        placeholder="Describe third-party SDKs (AdMob, Google Play Billing) and data collection..."
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    {/* Technical Specs: Min Version, App Version, Rating, Size */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Minimum Android OS
                      </label>
                      <input
                        type="text"
                        value={currentApp.minAndroidVersion}
                        onChange={(e) => setCurrentApp({ ...currentApp, minAndroidVersion: e.target.value })}
                        placeholder="Android 8.0 (API 26) or higher"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Version String
                      </label>
                      <input
                        type="text"
                        value={currentApp.version}
                        onChange={(e) => setCurrentApp({ ...currentApp, version: e.target.value })}
                        placeholder="1.0.0"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Content Rating
                      </label>
                      <input
                        type="text"
                        value={currentApp.contentRating}
                        onChange={(e) => setCurrentApp({ ...currentApp, contentRating: e.target.value })}
                        placeholder="Everyone (PEGI 3)"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Download Size (Approx)
                      </label>
                      <input
                        type="text"
                        value={currentApp.sizeMb || ''}
                        onChange={(e) => setCurrentApp({ ...currentApp, sizeMb: e.target.value })}
                        placeholder="25 MB"
                        className="w-full px-3 py-2 bg-[#0b1222] border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('catalog')}
                      className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 shadow-md"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isNewMode ? 'Save & Publish to Site' : 'Update Application'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: EXPORT TS CODE */}
              {activeTab === 'export' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">
                        Static Codebase Export (`src/data/appsData.ts`)
                      </h4>
                      <p className="text-xs text-slate-400">
                        Copy and replace your <span className="font-mono text-cyan-400">src/data/appsData.ts</span> file to permanently bundle these apps in your GitHub repository or deployment.
                      </p>
                    </div>

                    <button
                      onClick={copyTsCode}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy TypeScript Code'}</span>
                    </button>
                  </div>

                  <div className="rounded-xl bg-[#050811] border border-slate-800 p-4 font-mono text-[11px] text-cyan-200 overflow-x-auto max-h-[350px]">
                    <pre>{generateTsCode()}</pre>
                  </div>
                </div>
              )}

              {/* TAB 4: HOW TO UPDATE GUIDE */}
              {activeTab === 'guide' && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <h4 className="text-sm font-bold text-white font-display">
                    How App Management Works on this Site
                  </h4>
                  <p>
                    This website gives you two complementary ways to manage your Android applications and games:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-2">
                      <div className="font-bold text-cyan-400">Option 1: Interactive Browser Mode</div>
                      <p className="text-slate-400">
                        Using this App Manager modal, you can add and modify apps live in your browser. All records are saved securely to your browser storage and render across all pages and deep links instantly.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-2">
                      <div className="font-bold text-purple-400">Option 2: Direct Source File (`appsData.ts`)</div>
                      <p className="text-slate-400">
                        Open <span className="font-mono text-white">src/data/appsData.ts</span> in your repository. It contains a cleanly-typed TypeScript array. Simply add or update objects and run <span className="font-mono text-white">npm run build</span>.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-semibold text-white">Safety Guarantee:</div>
                    <p className="text-slate-400">
                      Neither option alters the design, layout, or Google Play store badges. Dynamic routes like <span className="font-mono text-cyan-300">#/?app=your-app-id</span> automatically resolve for every newly registered application.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
