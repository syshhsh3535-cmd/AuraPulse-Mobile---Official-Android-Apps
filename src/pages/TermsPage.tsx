import React from 'react';
import { DeveloperInfo } from '../types';
import { FileText, Shield, AlertCircle } from 'lucide-react';

interface TermsPageProps {
  developerConfig: DeveloperInfo;
}

export const TermsPage: React.FC<TermsPageProps> = ({ developerConfig }) => {
  return (
    <div className="min-h-screen bg-[#070b14] py-10 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-400">
            Effective Date: October 2026 &middot; Applicable to all applications published by {developerConfig.studioName}.
          </p>
        </div>

        {/* Content Box */}
        <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 sm:p-10 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              1. Acceptance of Terms
            </h2>
            <p>
              By downloading, installing, or accessing any mobile application, game, or website published by <strong>{developerConfig.studioName}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please uninstall and discontinue use of our applications immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              2. Limited End-User License
            </h2>
            <p>
              We grant you a personal, revocable, non-exclusive, non-transferable, limited license to download, install, and use the application on personal Android devices solely for non-commercial, personal entertainment and educational purposes in accordance with these Terms and Google Play Terms of Service.
            </p>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>Reverse engineer, decompile, disassemble, or derive source code from our APKs or app bundles.</li>
              <li>Modify, distribute, resell, or sublicense any part of the applications or artwork.</li>
              <li>Bypass or disable any security safeguards, licensing checks, or advertisement delivery mechanisms.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              3. In-App Purchases & Virtual Content
            </h2>
            <p>
              Certain applications may provide optional in-app purchases (such as cosmetic items, ad-free upgrades, or hint packages). All payments are processed securely through Google Play Billing. Prices are displayed in your local currency as determined by Google Play. All sales are final, except where refunds are mandated by local consumer legislation or approved under Google Play refund policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              4. Intellectual Property
            </h2>
            <p>
              All game mechanics, illustrations, code, trademarks, game titles (including <em>Math Master: Trivia Challenge</em> and <em>Glow Circuit: Light Puzzle</em>), audio tracks, and graphic assets are the exclusive intellectual property of {developerConfig.developerName} and {developerConfig.studioName}.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              5. Disclaimer of Warranties
            </h2>
            <p>
              Our applications are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. We do not warrant that the application will operate error-free, uninterrupted, or compatible with every individual Android hardware configuration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall {developerConfig.studioName} or its developers be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use our applications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-white font-display">
              7. Contact Information
            </h2>
            <p>
              For any questions regarding these Terms of Use, please reach out via email:
            </p>
            <div className="p-4 rounded-xl bg-[#080e1c] border border-slate-800 text-xs">
              <div><strong>{developerConfig.studioName}</strong></div>
              <div>Lead Developer: {developerConfig.developerName}</div>
              <div>Email: <a href={`mailto:${developerConfig.supportEmail}`} className="text-cyan-400 hover:underline">{developerConfig.supportEmail}</a></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
