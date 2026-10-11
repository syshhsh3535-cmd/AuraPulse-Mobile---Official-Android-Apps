import React, { useState } from 'react';
import { DeveloperInfo, AppItem } from '../types';
import { ShieldCheck, Mail, Globe, Lock, Info, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyPageProps {
  developerConfig: DeveloperInfo;
  apps: AppItem[];
  selectedAppId?: string;
  onSelectApp: (appId: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  developerConfig,
  apps,
  selectedAppId,
  onSelectApp,
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedAppId || 'general');

  const selectedApp = apps.find((a) => a.id === activeTab);

  return (
    <div className="min-h-screen bg-[#070b14] py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Official Compliance & Data Safety
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: October 2026 &middot; Compliant with Google Play Developer Policy, GDPR, CCPA, and COPPA.
          </p>
        </div>

        {/* Tab Selector: Studio Wide vs Specific Application */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0b1224] border border-slate-800 rounded-xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'general'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            General Studio Policy
          </button>
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => setActiveTab(app.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeTab === app.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>

        {/* App-Specific Notice if selected */}
        {selectedApp && (
          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/80 flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-white">Specific Policy for {selectedApp.name}:</span>
              <p>{selectedApp.privacyPolicyText}</p>
              <div className="font-mono text-[11px] text-cyan-300 pt-1">
                Package ID: {selectedApp.packageName}
              </div>
            </div>
          </div>
        )}

        {/* Policy Content */}
        <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 sm:p-10 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-8">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              1. Overview & Developer Commitment
            </h2>
            <p>
              This Privacy Policy describes the policies and procedures of <strong>{developerConfig.studioName}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), represented by independent developer <strong>{developerConfig.developerName}</strong>, regarding the collection, use, and disclosure of information when you use our Android mobile applications, games, and website (<a href={developerConfig.officialWebsiteUrl} className="text-cyan-400 hover:underline">{developerConfig.officialWebsiteUrl}</a>).
            </p>
            <p>
              We believe in data minimization. We only collect or facilitate collection of the minimal data required to provide reliable gameplay, secure in-app purchases, and sustainable developer operations.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              2. Information We and Third-Party SDKs Collect
            </h2>
            <p>
              Depending on the specific Android app you install, the following categories of data may be processed:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>
                <strong>Device & Hardware Identifiers:</strong> Non-sensitive technical identifiers including device model, operating system version (e.g. Android 13/14), screen resolution, IP address (truncated or anonymized), and mobile network operator for crash diagnosis.
              </li>
              <li>
                <strong>Advertising Identifiers (Google Advertising ID / GAID):</strong> When non-personalized or personalized advertising is enabled, the Google Play Services Advertising ID may be accessed by advertising partners strictly in compliance with Google Play Developer policies.
              </li>
              <li>
                <strong>Local Game State & Preferences:</strong> Player progress, high scores, settings, and unlockable achievements are saved directly to your local Android device storage or via Google Play Games Services if signed in.
              </li>
              <li>
                <strong>Crash & Diagnostic Logs:</strong> Anonymous stack traces and performance metrics captured during unexpected application closures to help us deploy bug fixes.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              3. Third-Party Service Providers & SDK Disclosures
            </h2>
            <p>
              Our applications may integrate trusted third-party SDKs that process information under their respective privacy policies:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-lg bg-[#070c18] border border-slate-800">
                <span className="font-semibold text-white">Google AdMob & Google Mobile Ads SDK</span>
                <p className="text-xs text-slate-400 mt-1">
                  Used to deliver advertisements. Google AdMob may collect device identifiers and usage telemetry to serve contextually relevant ads or enforce fraud prevention. Review Google’s privacy policy at{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-cyan-400 underline">
                    policies.google.com/privacy
                  </a>.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#070c18] border border-slate-800">
                <span className="font-semibold text-white">Google Play Services & In-App Billing</span>
                <p className="text-xs text-slate-400 mt-1">
                  Used for authenticating transactions and game achievements. All payment and billing card processing is managed securely by Google Play. We never receive or store your financial credentials.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              4. Children’s Privacy (COPPA & Google Play Families Policy)
            </h2>
            <p>
              We are committed to protecting the privacy of young players. Our applications designated for family or general audiences do not knowingly harvest personal information from children under the age of 13 (or under the applicable age of consent in your jurisdiction). If ads are presented in child-directed experiences, only contextual, non-personalized advertising certified by Google Play Families self-certified ad networks is utilized.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              5. Your Rights (GDPR & CCPA)
            </h2>
            <p>
              Under global data protection laws including the European Union General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Request information on what data (if any) has been processed.</li>
              <li>Request the deletion of any stored support tickets or email communications.</li>
              <li>Reset your Google Advertising ID at any time via Android Device Settings &gt; Google &gt; Ads.</li>
              <li>Opt out of interest-based ad tracking through Android system preferences.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              6. Data Security & Storage Retention
            </h2>
            <p>
              We employ standard technical measures to protect any transmitted communication against unauthorized access, destruction, or alteration. We do not maintain server-side user profile databases for casual games.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              7. Developer Contact Information
            </h2>
            <p>
              If you have any questions or data requests regarding this Privacy Policy, please contact our designated privacy officer:
            </p>
            <div className="p-4 rounded-xl bg-[#080e1c] border border-slate-800 space-y-1">
              <div className="font-semibold text-white">{developerConfig.studioName}</div>
              <div>Lead Developer: {developerConfig.developerName}</div>
              <div>
                Email:{' '}
                <a href={`mailto:${developerConfig.supportEmail}`} className="text-cyan-400 hover:underline">
                  {developerConfig.supportEmail}
                </a>
              </div>
              <div>Website: <a href={developerConfig.officialWebsiteUrl} className="text-cyan-400 hover:underline">{developerConfig.officialWebsiteUrl}</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
