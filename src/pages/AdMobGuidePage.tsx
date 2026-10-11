import React, { useState, useEffect } from 'react';
import { DeveloperInfo } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  ArrowRight,
  Globe
} from 'lucide-react';

interface AdMobGuidePageProps {
  developerConfig: DeveloperInfo;
}

export const AdMobGuidePage: React.FC<AdMobGuidePageProps> = ({ developerConfig }) => {
  const [copiedLine, setCopiedLine] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<string>('');

  const requiredEntry = developerConfig.admobVerificationLine;
  const currentOrigin = window.location.origin;
  const appAdsUrl = `${currentOrigin}/app-ads.txt`;

  const handleTestAppAdsTxt = async () => {
    setTestStatus('checking');
    try {
      const res = await fetch('/app-ads.txt', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP status ${res.status}: ${res.statusText}`);
      }
      const text = await res.text();
      if (text.includes('pub-5675978954223586') && text.includes('f08c47fec0942fa0')) {
        setTestStatus('success');
        setTestResult(`File successfully verified at /app-ads.txt!\nAuthorized Entry found:\n${text.trim()}`);
      } else {
        setTestStatus('error');
        setTestResult(`File was retrieved, but AdMob Publisher ID or certification tag was missing.\nContent: "${text}"`);
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestResult(`Failed to retrieve /app-ads.txt: ${err.message || err}`);
    }
  };

  // Run initial test on mount
  useEffect(() => {
    handleTestAppAdsTxt();
  }, []);

  const copyToClipboard = (text: string, type: 'line' | 'url') => {
    navigator.clipboard.writeText(text);
    if (type === 'line') {
      setCopiedLine(true);
      setTimeout(() => setCopiedLine(false), 2000);
    } else {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Ad Revenue & Inventory Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Google AdMob <span className="font-mono text-cyan-400">app-ads.txt</span> Verification
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Google AdMob requires an authorized seller file (<span className="font-mono text-cyan-300">app-ads.txt</span>) hosted at the root of your developer website to protect your ad inventory from spoofing and maintain maximum ad revenue.
          </p>
        </div>

        {/* Live File Tester Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0c1328] to-[#090e1c] border border-slate-700/80 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Live <span className="font-mono text-cyan-300">/app-ads.txt</span> Endpoint Status
                </h3>
                <p className="text-xs text-slate-400">
                  Target public address: <a href="/app-ads.txt" target="_blank" className="font-mono text-cyan-400 hover:underline">{appAdsUrl}</a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTestAppAdsTxt}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testStatus === 'checking' ? 'animate-spin' : ''}`} />
                <span>Re-verify Now</span>
              </button>

              <a
                href="/app-ads.txt"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>View Raw Plain-Text</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Test Status Indicator */}
          <div className={`p-4 rounded-xl border ${
            testStatus === 'success'
              ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
              : testStatus === 'checking'
              ? 'bg-blue-950/40 border-blue-800/80 text-blue-200'
              : 'bg-rose-950/40 border-rose-800/80 text-rose-200'
          }`}>
            <div className="flex items-start gap-3">
              {testStatus === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : testStatus === 'checking' ? (
                <RefreshCw className="w-5 h-5 text-blue-400 animate-spin shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 flex-1">
                <div className="text-xs font-bold uppercase tracking-wider">
                  {testStatus === 'success' ? 'Ready for Google AdMob Crawling' : testStatus === 'checking' ? 'Testing endpoint...' : 'Verification Alert'}
                </div>
                <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed opacity-90">
                  {testResult || 'Click Re-verify to execute test.'}
                </pre>
              </div>
            </div>
          </div>

          {/* Authorized Seller Entry Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold">Required AdMob Authorized Entry:</span>
              <button
                onClick={() => copyToClipboard(requiredEntry, 'line')}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
              >
                {copiedLine ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLine ? 'Copied Entry' : 'Copy Line'}</span>
              </button>
            </div>
            <div className="p-3 bg-[#050811] border border-slate-800 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto">
              <code>{requiredEntry}</code>
            </div>
          </div>
        </div>

        {/* Step-by-Step Google AdMob & Google Play Setup Checklist */}
        <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white font-display">
            3-Step Verification Guide for Google AdMob & Google Play
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-base font-bold text-white font-display">
                  Set Your Developer Website in Google Play Console
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  AdMob’s crawler discovers your <span className="font-mono text-cyan-300">app-ads.txt</span> by checking the official developer website listed on your Google Play app page.
                </p>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div>1. Go to <a href="https://play.google.com/console" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Google Play Console</a>.</div>
                  <div>2. In the left navigation, select <strong>Store presence</strong> &rarr; <strong>Store settings</strong>.</div>
                  <div>3. In the <strong>Developer contact details</strong> section, find <strong>Website</strong>.</div>
                  <div>4. Enter your exact root domain: <strong className="text-white font-mono">{currentOrigin}</strong>.</div>
                  <div>5. Save changes. Google Play will update the store listing.</div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-base font-bold text-white font-display">
                  Verify That <span className="font-mono text-cyan-300">app-ads.txt</span> Is Publicly Accessible
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  AdMob crawler requires the file to be served over <strong>HTTPS</strong> directly at the root, returning HTTP 200 with Content-Type <strong>text/plain</strong>.
                </p>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div>&bull; Path must be exactly: <span className="font-mono text-white">/app-ads.txt</span> (not inside /public or a subfolder).</div>
                  <div>&bull; Must not be blocked by any <span className="font-mono text-white">robots.txt</span> directive.</div>
                  <div>&bull; Must not serve an HTML 404 or redirect to an interactive webpage.</div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-base font-bold text-white font-display">
                  Request Verification in Google AdMob Console
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Once your Google Play listing has updated, request Google AdMob to crawl and verify your file.
                </p>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div>1. Sign in to <a href="https://admob.google.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Google AdMob</a>.</div>
                  <div>2. In the sidebar, click <strong>Apps</strong> &rarr; <strong>app-ads.txt</strong>.</div>
                  <div>3. Click <strong>Check for updates</strong> to trigger an immediate crawl scan.</div>
                  <div>4. AdMob will change your app status from &ldquo;Needs attention&rdquo; to <strong>&ldquo;Authorized&rdquo; (Green checkmark)</strong> within 24 hours.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AdMob Inventory Protection FAQs */}
        <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white font-display">
            Frequently Asked Questions: AdMob & app-ads.txt
          </h2>

          <div className="space-y-4 text-xs text-slate-300">
            <div>
              <h4 className="font-semibold text-white mb-1">What happens if app-ads.txt is not implemented?</h4>
              <p className="text-slate-400 leading-relaxed">
                AdMob will flag your account with warnings, and major programmatic ad buyers (demand side platforms) will stop bidding on your impressions, leading to a dramatic drop in eCPM and ad earnings.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <h4 className="font-semibold text-white mb-1">Does this file work with custom domains?</h4>
              <p className="text-slate-400 leading-relaxed">
                Yes! When you connect a custom domain (e.g. <span className="font-mono text-cyan-300">https://yourdomain.com</span>), the file is automatically accessible at <span className="font-mono text-cyan-300">https://yourdomain.com/app-ads.txt</span> without requiring any re-upload.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <h4 className="font-semibold text-white mb-1">How can I add other advertising networks (Unity Ads, AppLovin, ironSource)?</h4>
              <p className="text-slate-400 leading-relaxed">
                Simply open <span className="font-mono text-white">public/app-ads.txt</span> and append their authorized seller lines below the Google AdMob line, one per line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
