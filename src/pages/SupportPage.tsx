import React, { useState } from 'react';
import { DeveloperInfo, AppItem } from '../types';
import { Mail, HelpCircle, Send, CheckCircle2, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

interface SupportPageProps {
  developerConfig: DeveloperInfo;
  apps: AppItem[];
  preselectedAppId?: string;
}

export const SupportPage: React.FC<SupportPageProps> = ({
  developerConfig,
  apps,
  preselectedAppId,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedApp, setSelectedApp] = useState(preselectedAppId || (apps[0]?.id ?? 'general'));
  const [subject, setSubject] = useState('Bug Report');
  const [message, setMessage] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setMessage('');
  };

  const faqs = [
    {
      q: 'How do I restore in-app purchases on a new Android device?',
      a: 'All digital purchases made through Google Play are permanently bound to your Google account. Ensure you are signed into the same Google Play account on your new device, open the application, and tap "Restore Purchases" in the app settings.'
    },
    {
      q: 'Can I play your games offline without an internet connection?',
      a: 'Yes! Math Master: Trivia Challenge and Glow Circuit: Light Puzzle are designed with offline-first gameplay. You can play without Wi-Fi or cellular data. An internet connection is only required when checking for updates or optional leaderboards.'
    },
    {
      q: 'What should I do if an app crashes or freezes?',
      a: 'First, check Google Play to ensure you are running the latest version. Try clearing the app cache via Android Settings > Apps > [App Name] > Storage > Clear Cache. If the issue persists, submit a crash report below with your Android OS version and device model.'
    },
    {
      q: 'How do I request a refund for an accidental purchase?',
      a: 'Because transactions are processed directly by Google Play, refund requests are managed through Google Play Support within 48 hours of purchase. Visit support.google.com/googleplay or contact our support email with your GPA order receipt.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Player & User Assistance
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">
            App Support & Contact Us
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Have questions about our Android applications or mobile games? Encountered a technical glitch? We are here to help.
          </p>
        </div>

        {/* Support Grid: Contact Form & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0b1224] border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-display">
                Submit a Support Inquiry
              </h2>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">
                  Message Dispatched!
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. We have logged your request and our developer team will reply to <strong>{email}</strong> within 24-48 business hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Application *</label>
                    <select
                      value={selectedApp}
                      onChange={(e) => setSelectedApp(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="general">General Inquiry</option>
                      {apps.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-300">Inquiry Topic *</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Bug Report">Technical Bug / Crash</option>
                      <option value="Billing">In-App Purchase / Billing</option>
                      <option value="Feature Request">Gameplay Idea / Feedback</option>
                      <option value="Privacy">Privacy & Data Request</option>
                      <option value="Other">Other Question</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">
                    Device Model & Android Version (Optional, helpful for bugs)
                  </label>
                  <input
                    type="text"
                    value={deviceInfo}
                    onChange={(e) => setDeviceInfo(e.target.value)}
                    placeholder="e.g. Samsung Galaxy S23, Android 14"
                    className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Detailed Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please explain the steps to reproduce the issue or details of your inquiry..."
                    className="w-full px-3 py-2 bg-[#080d1a] border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Support Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Email & FAQ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 space-y-3">
              <h3 className="text-sm font-bold text-white font-display">
                Direct Developer Email
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prefer sending an email directly from your email client? Reach out anytime:
              </p>
              <div className="pt-1">
                <a
                  href={`mailto:${developerConfig.supportEmail}?subject=Support%20Request`}
                  className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/80 px-3 py-2 rounded-lg"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{developerConfig.supportEmail}</span>
                </a>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="rounded-2xl bg-[#0b1224] border border-slate-800 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-display">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-4 divide-y divide-slate-800/80 text-xs">
                {faqs.map((faq, idx) => (
                  <div key={idx} className={idx > 0 ? 'pt-3 space-y-1' : 'space-y-1'}>
                    <h4 className="font-semibold text-slate-200">{faq.q}</h4>
                    <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
