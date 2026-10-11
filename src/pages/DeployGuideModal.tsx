import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  FileCode, 
  ShieldCheck, 
  Server, 
  Terminal, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  DollarSign
} from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hosting' | 'domain' | 'app-ads' | 'future-apps' | 'cost'>('hosting');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090f20] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0b1329]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Publisher Deployment & Custom Domain Manual
              </h3>
              <p className="text-[11px] text-slate-400">
                Complete technical instructions for hosting, DNS, AdMob, and app catalog scaling
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close guide modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="px-6 py-2 border-b border-slate-800 bg-[#0a1124] flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('hosting')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'hosting' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            1. Free / Affordable Hosting
          </button>
          <button
            onClick={() => setActiveTab('domain')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'domain' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            2. Connecting Custom Domain
          </button>
          <button
            onClick={() => setActiveTab('app-ads')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'app-ads' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            3. AdMob app-ads.txt Setup
          </button>
          <button
            onClick={() => setActiveTab('future-apps')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'future-apps' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            4. Adding Future Apps Safely
          </button>
          <button
            onClick={() => setActiveTab('cost')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'cost' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            5. Cost & Platform Requirements
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* TAB 1: HOSTING */}
          {activeTab === 'hosting' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-display">
                  Recommended Free / Affordable Hosting Providers
                </h4>
                <p className="text-xs text-slate-400">
                  Because this website compiles to static HTML, CSS, and JS with zero database overhead, it is 100% free to host forever on top tier global CDNs:
                </p>
              </div>

              {/* Option A: Vercel */}
              <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-cyan-400 text-sm">Option A: Vercel (Easiest & Free)</div>
                  <span className="text-[11px] text-emerald-400 font-semibold">$0 / Month Free Tier</span>
                </div>
                <p className="text-xs text-slate-300">
                  1. Push your repository to GitHub.<br />
                  2. Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">vercel.com</a> and click &ldquo;Add New Project&rdquo; &rarr; Import your GitHub repo.<br />
                  3. Framework Preset: <strong>Vite</strong>. Build Command: <code className="text-white bg-slate-900 px-1 py-0.5 rounded">npm run build</code>. Output Directory: <code className="text-white bg-slate-900 px-1 py-0.5 rounded">dist</code>.<br />
                  4. Click Deploy. Your site and <code className="text-white bg-slate-900 px-1 py-0.5 rounded">/app-ads.txt</code> will be live globally in under 60 seconds with automatic SSL!
                </p>
              </div>

              {/* Option B: Netlify */}
              <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-cyan-400 text-sm">Option B: Netlify (Free)</div>
                  <span className="text-[11px] text-emerald-400 font-semibold">$0 / Month Free Tier</span>
                </div>
                <p className="text-xs text-slate-300">
                  1. Link your GitHub account at <a href="https://netlify.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">netlify.com</a>.<br />
                  2. Select repo, set build command to <code className="text-white bg-slate-900 px-1 py-0.5 rounded">npm run build</code>, and publish directory to <code className="text-white bg-slate-900 px-1 py-0.5 rounded">dist</code>.<br />
                  3. Netlify automatically provides free SSL and instant global edge caching.
                </p>
              </div>

              {/* Option C: GitHub Pages */}
              <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-cyan-400 text-sm">Option C: GitHub Pages (Free)</div>
                  <span className="text-[11px] text-emerald-400 font-semibold">$0 / Month Free</span>
                </div>
                <p className="text-xs text-slate-300">
                  Under your GitHub repo Settings &gt; Pages, set GitHub Actions as the source using the official &ldquo;Static HTML / Vite&rdquo; workflow.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM DOMAIN */}
          {activeTab === 'domain' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-display">
                  Connecting a Custom Domain (e.g. yourstudio.com)
                </h4>
                <p className="text-xs text-slate-400">
                  Google Play and Google AdMob work best when you connect your own custom root domain:
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-2">
                  <div className="font-semibold text-white">Step 1: Purchase Domain Name</div>
                  <p className="text-xs text-slate-400">
                    Buy a domain (e.g. from Namecheap, Cloudflare Registrar, or Google Domains/Squarespace) for ~$10/year.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-3">
                  <div className="font-semibold text-white">Step 2: Configure DNS Records</div>
                  <p className="text-xs text-slate-400">
                    In your domain registrar DNS settings, add the records provided by your host (e.g., Vercel / Netlify):
                  </p>
                  <div className="bg-[#050811] p-3 rounded-lg font-mono text-xs text-cyan-300 space-y-1 border border-slate-800">
                    <div>Type: A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Host: @ &nbsp;&nbsp;&nbsp; Value: 76.76.21.21 (Vercel IP)</div>
                    <div>Type: CNAME &nbsp; Host: www &nbsp; Value: cname.vercel-dns.com</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-2">
                  <div className="font-semibold text-white">Step 3: Free HTTPS / SSL Activation</div>
                  <p className="text-xs text-slate-400">
                    Vercel and Netlify provision free Let&rsquo;s Encrypt SSL certificates automatically. Within 15-30 minutes, your custom domain will load securely via HTTPS.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APP-ADS.TXT */}
          {activeTab === 'app-ads' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-display">
                  Publishing & Testing Google AdMob app-ads.txt
                </h4>
                <p className="text-xs text-slate-400">
                  Your website already includes the exact plain-text file in <span className="font-mono text-cyan-400">public/app-ads.txt</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-2">
                <div className="font-semibold text-emerald-400">Pre-configured AdMob Entry:</div>
                <div className="bg-[#050811] p-3 rounded-lg font-mono text-xs text-emerald-300 border border-slate-800">
                  google.com, pub-5675978954223586, DIRECT, f08c47fec0942fa0
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-semibold text-white">Testing Checklist:</div>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                  <li>Visit <code className="text-white">https://yourdomain.com/app-ads.txt</code> in a private browser window.</li>
                  <li>Verify it opens as pure plain text (not HTML or an error page).</li>
                  <li>In Google Play Console, set your Developer Website URL to <code className="text-white">https://yourdomain.com</code>.</li>
                  <li>In Google AdMob, navigate to <strong>Apps &gt; app-ads.txt &gt; Check for updates</strong>.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: FUTURE APPS */}
          {activeTab === 'future-apps' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-display">
                  How to Add Future Applications Without Breaking Existing Pages
                </h4>
                <p className="text-xs text-slate-400">
                  The website is designed with a strict decoupled architecture. Adding or editing an app will never break layouts, routes, or store links.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-2">
                  <div className="font-semibold text-cyan-400">Method 1: Visual In-Browser Studio</div>
                  <p className="text-xs text-slate-400">
                    Click <strong>&ldquo;App Manager&rdquo;</strong> in the top header &rarr; enter PIN 1234 &rarr; click &ldquo;+ Add Application&rdquo;. Fill in the 11 fields and click Save. The app card, dedicated details page, and search indexing appear instantly.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0b1328] border border-slate-800 space-y-2">
                  <div className="font-semibold text-purple-400">Method 2: Edit `src/data/appsData.ts`</div>
                  <p className="text-xs text-slate-400">
                    Copy the export from the App Manager, or edit <code className="text-white font-mono">src/data/appsData.ts</code> directly in VS Code / GitHub. The TypeScript compiler verifies all fields at build time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COST BREAKDOWN */}
          {activeTab === 'cost' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-display">
                  Transparency: Free vs. Paid Features Breakdown
                </h4>
                <p className="text-xs text-slate-400">
                  You requested clear identification of any features requiring paid hosting, domains, or setups:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-white">100% Free Forever:</span>
                    <p>
                      Website hosting on Vercel/Netlify/GitHub Pages, SSL certificate, fast edge CDN, AdMob <code className="text-white font-mono">app-ads.txt</code> serving, app management, search filtering, and mobile responsiveness. Zero database fee required!
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-white">Optional Paid Services:</span>
                    <p>
                      &bull; <strong>Custom Domain Name:</strong> ~$10–$12 per year (e.g. from Cloudflare Registrar or Namecheap).<br />
                      &bull; <strong>Google Play Developer Account:</strong> One-time $25 registration fee paid directly to Google.<br />
                      &bull; <strong>Backend Database:</strong> Only needed if you wish to allow millions of external users to post public comments/reviews (not needed for developer portfolio).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
