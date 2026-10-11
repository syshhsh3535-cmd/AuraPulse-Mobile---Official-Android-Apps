import React from 'react';
import { AppItem } from '../types';
import { ExternalLink, ArrowRight, Smartphone, Clock, CheckCircle2 } from 'lucide-react';

interface AppCardProps {
  app: AppItem;
  onSelect: (appId: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onSelect }) => {
  const isPublished = app.publicationStatus === 'Published';
  const hasPlayLink = Boolean(app.googlePlayUrl && app.googlePlayUrl.trim().length > 0);

  return (
    <div className="bg-[#0b1224] rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg shadow-black/30 group">
      <div className="space-y-4">
        {/* Top header: Icon + Meta */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={app.iconUrl}
              alt={`${app.name} icon`}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border border-slate-700/60 shadow-md group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            {/* Category as unboxed text */}
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <span>{app.category}</span>
              <span aria-hidden="true">&middot;</span>
              <span className={isPublished ? 'text-emerald-400' : 'text-amber-400'}>
                {isPublished ? 'Published' : 'Coming Soon'}
              </span>
            </div>

            <h3 
              onClick={() => onSelect(app.id)}
              className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors cursor-pointer truncate"
              title={app.name}
            >
              {app.name}
            </h3>

            <div className="text-[11px] text-slate-400 font-mono truncate">
              {app.packageName}
            </div>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
          {app.shortDescription}
        </p>

        {/* Key Features preview snippet */}
        {app.keyFeatures && app.keyFeatures.length > 0 && (
          <div className="pt-2 border-t border-slate-800/60">
            <div className="text-[11px] text-slate-400 font-medium mb-1.5">Key Highlights:</div>
            <ul className="space-y-1 text-xs text-slate-300">
              {app.keyFeatures.slice(0, 2).map((feature, idx) => (
                <li key={idx} className="flex items-center gap-1.5 truncate">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                  <span className="truncate">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Footer: Google Play Store Button / Status & View Details */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {hasPlayLink ? (
          <a
            href={app.googlePlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg hover:border-slate-500 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#00E676]" viewBox="0 0 24 24">
              <path d="M3.6 1.8c-.3.4-.5.9-.5 1.6v17.2c0 .7.2 1.2.5 1.6l9.6-9.6L3.6 1.8zm11.2 11.2l2.3-2.3-10.4-6c-.4-.2-.8-.2-1.1 0l9.2 8.3zm0 2l-9.2 8.3c.3.2.7.2 1.1 0l10.4-6-2.3-2.3zm1.4-1.4l2.8 1.6c.9.5.9 1.4 0 2l-2.8 1.6-2.2-2.2 2.2-2.2z" />
            </svg>
            <span>Google Play</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        ) : (
          <span className="text-xs text-slate-400 italic">
            {isPublished ? 'Play Store link pending' : 'Store release soon'}
          </span>
        )}

        <button
          onClick={() => onSelect(app.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 rounded-lg transition-colors ml-auto"
        >
          <span>App Page</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
