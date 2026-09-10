import React, { useState } from 'react';
import { ShieldCheck, Cookie, Lock, Mail, ExternalLink, Sliders } from 'lucide-react';
import { CONTACT_EMAIL } from '../../config/site';
import { CookieSettingsModal } from '../common/CookieSettingsModal';

export const PrivacyPage: React.FC = () => {
  const [showCookieModal, setShowCookieModal] = useState(false);

  return (
    <article className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-10 text-slate-800 animate-in fade-in duration-300">
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency &amp; Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy &amp; Cookie Policy
        </h1>
        <p className="text-sm text-slate-500">
          Effective Date: March 1, 2026 • Last Reviewed: March 2026
        </p>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          At ArchEstate Pro, we prioritize data minimization and user privacy. This policy outlines how our web calculators operate, what information is collected, and how preferences and potential cookies are handled, designed to align with standard privacy practices and transparent consent principles (such as GDPR and CCPA/CPRA guidelines).
        </p>
      </header>

      {/* 1. Client-Side Calculation Privacy */}
      <section aria-labelledby="client-processing-title" className="space-y-3">
        <h2 id="client-processing-title" className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-700" />
          1. Client-Side Calculation Engine &amp; Zero Account Mandate
        </h2>
        <p className="text-slate-700 leading-relaxed">
          All 15 calculators on ArchEstate Pro execute purely client-side within your local web browser using client-side JavaScript. When you input room dimensions, material wastage percentages, loan amounts, or property purchase prices:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
          <li><strong>No Remote Database Storage:</strong> Your mathematical inputs are never transmitted to, recorded by, or stored on our servers.</li>
          <li><strong>Zero Mandatory Accounts:</strong> We do not require user registration, usernames, passwords, or personal profile creation.</li>
          <li><strong>Local Browser Memory:</strong> Temporary state exists only while your browser tab remains active or in your browser's voluntary local cache, which you can purge at any time.</li>
        </ul>
      </section>

      {/* 2. Contact Form & Correspondence */}
      <section aria-labelledby="contact-processing-title" className="space-y-3">
        <h2 id="contact-processing-title" className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-emerald-700" />
          2. Contact Form Communications
        </h2>
        <p className="text-slate-700 leading-relaxed">
          If you voluntarily submit an inquiry through our Contact page, the information you provide (your name, email address, inquiry category, and message text) is transmitted securely via EmailJS directly to our designated support inbox (<a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-700 font-semibold underline">{CONTACT_EMAIL}</a>).
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          We use this information solely to respond to your technical question, formula correction, or partnership inquiry. We do not sell, rent, or distribute your email address to marketing third parties or newsletter databases.
        </p>
      </section>

      {/* 3. Cookies & Google AdSense Disclosures */}
      <section aria-labelledby="cookies-adsense-title" className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 id="cookies-adsense-title" className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-emerald-700" />
            3. Cookies &amp; Google AdSense Advertising Disclosures
          </h2>
          <button
            type="button"
            onClick={() => setShowCookieModal(true)}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-2"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>Manage Cookie Preferences</span>
          </button>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          ArchEstate Pro may display advertisements served by Google AdSense and third-party advertising vendors to fund server hosting and tool development.
        </p>

        <div className="space-y-3 text-sm text-slate-700">
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900">Google DoubleClick &amp; Advertising Cookies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google, as a third-party vendor, uses cookies to serve ads on ArchEstate Pro. Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visits to our site and/or other sites on the Internet.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
            <h3 className="font-bold text-slate-900">Opting Out of Personalized Advertising</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Users may opt out of personalized advertising by visiting Google's{' '}
              <a 
                href="https://adssettings.google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-700 font-semibold underline inline-flex items-center gap-0.5"
              >
                <span>Google Ads Settings</span>
                <ExternalLink className="w-3 h-3" />
              </a>{' '}
              or by visiting{' '}
              <a 
                href="https://www.aboutads.info/choices/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-700 font-semibold underline inline-flex items-center gap-0.5"
              >
                <span>www.aboutads.info</span>
                <ExternalLink className="w-3 h-3" />
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. User Rights Under GDPR & CCPA */}
      <section aria-labelledby="rights-title" className="space-y-3">
        <h2 id="rights-title" className="text-xl font-bold text-slate-900">
          4. Individual Privacy Rights (GDPR &amp; CCPA / CPRA)
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Depending on your location, you hold statutory data protection rights under regulations such as the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA):
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
          <li><strong>Right to Know &amp; Access:</strong> You may request disclosure of any personal data held about you (e.g. past contact correspondence).</li>
          <li><strong>Right to Erasure:</strong> You may request the deletion of past email inquiries sent to our desk.</li>
          <li><strong>Do Not Sell or Share:</strong> ArchEstate Pro does not sell personal information to brokers or third-party marketers.</li>
        </ul>
        <p className="text-sm text-slate-700 leading-relaxed pt-1">
          To exercise any of these rights, please contact our data officer at <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-700 font-semibold underline">{CONTACT_EMAIL}</a>. We respond to verified consumer requests within statutory timelines.
        </p>
      </section>

      {/* 5. Policy Updates */}
      <section aria-labelledby="updates-title" className="space-y-3 border-t border-slate-200 pt-6">
        <h2 id="updates-title" className="text-lg font-bold text-slate-900">
          5. Updates to This Policy
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          We may update this Privacy Policy periodically to reflect technological adjustments, advertising regulations, or newly added calculator modules. Any modifications will be posted here with an updated "Last Reviewed" date.
        </p>
      </section>

      {/* Interactive Cookie Modal */}
      <CookieSettingsModal
        isOpen={showCookieModal}
        onClose={() => setShowCookieModal(false)}
      />
    </article>
  );
};
