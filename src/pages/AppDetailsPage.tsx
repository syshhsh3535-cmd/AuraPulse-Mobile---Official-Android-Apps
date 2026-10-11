import React, { useState } from 'react';
import { AppItem, PageRoute } from '../types';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Info,
  Download,
  Share2,
  Calendar,
  Sparkles,
  X
} from 'lucide-react';

interface AppDetailsPageProps {
  app: AppItem;
  allApps: AppItem[];
  onBack: () => void;
  onSelectApp: (appId: string) => void;
  onNavigate: (route: PageRoute) => void;
  onEditApp?: (app: AppItem) => void;
}

export const AppDetailsPage: React.FC<AppDetailsPageProps> = ({
  app,
  allApps,
  onBack,
  onSelectApp,
  onNavigate,
  onEditApp,
}) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const relatedApps = allApps
    .filter((a) => a.id !== app.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const isPublished = app.publicationStatus === 'Published';
  const hasPlayLink = Boolean(app.googlePlayUrl && app.googlePlayUrl.trim().length > 0);

  return (
    <div className="min-h-screen bg-[#070b14] py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Apps & Games</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
              title="Copy link to this app"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{copyFeedback ? 'Link Copied!' : 'Share'}</span>
            </button>

            {onEditApp && (
              <button
                onClick={() => onEditApp(app)}
                className="px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 rounded-lg transition-colors"
              >
                Edit App Details
              </button>
            )}
          </div>
        </div>

        {/* Hero Section of the App */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0e162d] via-[#0b1222] to-[#070b14] border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8">
            {/* App Icon */}
            <img
              src={app.iconUrl}
              alt={`${app.name} Icon`}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border border-slate-700/80 shadow-2xl shadow-cyan-950/50 shrink-0"
              referrerPolicy="no-referrer"
            />

            {/* Title & Metadata */}
            <div className="flex-1 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
                <span>{app.category}</span>
                <span aria-hidden="true">&middot;</span>
                <span className={isPublished ? 'text-emerald-400' : 'text-amber-400'}>
                  {isPublished ? 'Published on Google Play' : 'Coming Soon'}
                </span>
                {app.releaseDate && (
                  <>
                    <span aria-hidden="true">&middot;</span>
                    <span className="text-slate-400">{app.releaseDate}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                {app.name}
              </h1>

              <div className="text-xs text-slate-400 font-mono">
                {app.packageName}
              </div>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed pt-1">
                {app.shortDescription}
              </p>

              {/* Action Buttons: Google Play & Support */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                {hasPlayLink ? (
                  <a
                    href={app.googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 hover:border-cyan-400 shadow-xl transition-all"
                  >
                    <svg className="w-5 h-5 fill-current text-[#00E676]" viewBox="0 0 24 24">
                      <path d="M3.6 1.8c-.3.4-.5.9-.5 1.6v17.2c0 .7.2 1.2.5 1.6l9.6-9.6L3.6 1.8zm11.2 11.2l2.3-2.3-10.4-6c-.4-.2-.8-.2-1.1 0l9.2 8.3zm0 2l-9.2 8.3c.3.2.7.2 1.1 0l10.4-6-2.3-2.3zm1.4-1.4l2.8 1.6c.9.5.9 1.4 0 2l-2.8 1.6-2.2-2.2 2.2-2.2z" />
                    </svg>
                    <span>Get it on Google Play</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-1" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Store Link: {isPublished ? 'Configurable in App Manager' : 'Pre-register / Launch Pending'}</span>
                  </div>
                )}

                <button
                  onClick={() => onNavigate({ type: 'privacy', appId: app.id })}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Privacy Policy</span>
                </button>

                <a
                  href={`mailto:${app.supportEmail}?subject=Support Inquiry: ${encodeURIComponent(app.name)}`}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Support Contact</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Overview & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Screenshots Gallery */}
            {app.screenshots && app.screenshots.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-display">
                  Screenshots & Gameplay
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {app.screenshots.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedScreenshot(imgSrc)}
                      className="cursor-pointer rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500 bg-[#0c1222] transition-all group aspect-[9/16] relative flex items-center justify-center"
                    >
                      <img
                        src={imgSrc}
                        alt={`${app.name} preview screenshot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-medium">
                        Click to enlarge
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white font-display">
                About this Application
              </h3>
              <div className="rounded-2xl bg-[#0b1224] border border-slate-800/80 p-6 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {app.fullDescription}
              </div>
            </div>

            {/* Key Features */}
            {app.keyFeatures && app.keyFeatures.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-display">
                  Key Features
                </h3>
                <div className="rounded-2xl bg-[#0b1224] border border-slate-800/80 p-6 space-y-3">
                  {app.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800/80 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* App Privacy Note */}
            <div className="rounded-2xl bg-[#091122] border border-cyan-900/40 p-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Data Safety & Privacy Summary</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {app.privacyPolicyText || 'This application operates strictly under our developer privacy policy. No sensitive personal information is harvested or sold.'}
              </p>
              <button
                onClick={() => onNavigate({ type: 'privacy', appId: app.id })}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline"
              >
                Read Full Privacy Disclosure &rarr;
              </button>
            </div>
          </div>

          {/* Sidebar: App Specifications & Developer Support */}
          <div className="lg:col-span-4 space-y-6">
            {/* Technical Specifications Card */}
            <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider text-slate-200">
                Application Specifications
              </h4>

              <div className="space-y-3 text-xs divide-y divide-slate-800/80">
                <div className="pt-2 flex justify-between gap-2">
                  <span className="text-slate-400">Package Name</span>
                  <span className="text-slate-200 font-mono text-right truncate max-w-[180px]">
                    {app.packageName}
                  </span>
                </div>

                <div className="pt-2 flex justify-between gap-2">
                  <span className="text-slate-400">Current Version</span>
                  <span className="text-slate-200 font-mono">{app.version}</span>
                </div>

                <div className="pt-2 flex justify-between gap-2">
                  <span className="text-slate-400">Requires Android</span>
                  <span className="text-slate-200 text-right">{app.minAndroidVersion}</span>
                </div>

                <div className="pt-2 flex justify-between gap-2">
                  <span className="text-slate-400">Content Rating</span>
                  <span className="text-slate-200">{app.contentRating}</span>
                </div>

                {app.sizeMb && (
                  <div className="pt-2 flex justify-between gap-2">
                    <span className="text-slate-400">Download Size</span>
                    <span className="text-slate-200 font-mono">{app.sizeMb}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-between gap-2">
                  <span className="text-slate-400">Category</span>
                  <span className="text-cyan-400">{app.category}</span>
                </div>

                <div className="pt-2 flex justify-between gap-2">
                  <span className="text-slate-400">Status</span>
                  <span className={isPublished ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                    {app.publicationStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Developer Support Card */}
            <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 space-y-3">
              <h4 className="text-sm font-bold text-white font-display">
                Need Help or Have Feedback?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contact our support team for bug reports, device compatibility inquiries, or suggestions.
              </p>
              <div className="pt-1">
                <a
                  href={`mailto:${app.supportEmail}?subject=${encodeURIComponent(`Feedback on ${app.name}`)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Developer</span>
                </a>
              </div>
            </div>

            {/* Related Applications */}
            {relatedApps.length > 0 && (
              <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 space-y-4">
                <h4 className="text-sm font-bold text-white font-display">
                  More from this Developer
                </h4>
                <div className="space-y-3">
                  {relatedApps.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectApp(rel.id)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/60 cursor-pointer transition-colors group"
                    >
                      <img
                        src={rel.iconUrl}
                        alt={rel.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700/60 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300 truncate">
                          {rel.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {rel.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Screenshot Lightbox Modal */}
      {selectedScreenshot && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div className="relative max-w-sm sm:max-w-md w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute -top-10 right-0 text-white hover:text-cyan-400 p-1"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedScreenshot}
              alt="Enlarged screenshot preview"
              className="rounded-2xl max-h-[85vh] w-auto object-contain border border-slate-700 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
