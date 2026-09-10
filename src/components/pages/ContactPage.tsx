import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  AlertCircle, 
  Loader2, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CONTACT_EMAIL } from '../../config/site';

const EMAILJS_PUBLIC_KEY = 'W8ZJS348A46uem5Gv';
const EMAILJS_SERVICE_ID = 'service_ihh81up';
const EMAILJS_TEMPLATE_ID = 'template_78vfjig';

const getEmailJsPublicKey = (): string => {
  const envKey = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_EMAILJS_PUBLIC_KEY?: string } }).env?.VITE_EMAILJS_PUBLIC_KEY) ||
                 (typeof process !== 'undefined' && process.env?.VITE_EMAILJS_PUBLIC_KEY);
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
    return envKey.trim();
  }
  return EMAILJS_PUBLIC_KEY;
};

export const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCategory, setContactCategory] = useState('Technical Feedback & Formula Verification');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const key = getEmailJsPublicKey();
      if (key) {
        emailjs.init({ publicKey: key });
      }
    } catch (e) {
      console.warn('EmailJS initialization:', e);
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    const trimmedMessage = contactMessage.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please complete all required fields (Name, Email, Message).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const templateParams = {
      name: trimmedName,
      from_name: trimmedName,
      user_name: trimmedName,
      email: trimmedEmail,
      from_email: trimmedEmail,
      user_email: trimmedEmail,
      reply_to: trimmedEmail,
      subject: contactCategory,
      inquiry_category: contactCategory,
      message: trimmedMessage,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        getEmailJsPublicKey()
      );

      setIsSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMessage(
        `Unable to dispatch your message via the automated form. Please write directly to our desk at ${CONTACT_EMAIL}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 space-y-12 text-slate-800 animate-in fade-in duration-300">
      {/* Page Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
          <Mail className="w-3.5 h-3.5" />
          <span>Engineering Desk &amp; Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact ArchEstate Pro
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
          Have a question about a calculation formula, spotted a mathematical edge-case, or interested in advertising or tool integration? Reach our engineering and editorial team directly below.
        </p>
      </header>

      {/* Direct Contact Card & Response Time Disclosures */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="sm:col-span-2 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-4 shadow-md">
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold block">
            Direct Email Access
          </span>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-lg sm:text-xl font-mono font-bold text-white break-all">
              {CONTACT_EMAIL}
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-2 shadow-xs shrink-0"
              title="Copy email to clipboard"
            >
              {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our editorial desk monitors this inbox daily for formula suggestions, bugs, and partnership inquiries.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Response Time</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We typically review and reply to all technical inquiries within <strong>24 to 48 business hours</strong> (Monday through Friday).
            </p>
          </div>
          <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Direct correspondence only, no marketing spam</span>
          </div>
        </div>
      </div>

      {/* Inquiry Channels Guide */}
      <section aria-labelledby="channels-title" className="space-y-3">
        <h2 id="channels-title" className="text-lg font-bold text-slate-900">
          How We Route Your Message
        </h2>
        <div className="grid sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
            <p className="font-bold text-slate-900">Formula Verification</p>
            <p className="text-slate-500 leading-relaxed">Review of code standards, metric conversions, or specific trade edge cases.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
            <p className="font-bold text-slate-900">Tool Requests</p>
            <p className="text-slate-500 leading-relaxed">Suggest new calculators or trade estimators to add to the public suite.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
            <p className="font-bold text-slate-900">Partnership &amp; Ads</p>
            <p className="text-slate-500 leading-relaxed">Advertising placements, educational syndication, and API integrations.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
            <p className="font-bold text-slate-900">Privacy &amp; Data</p>
            <p className="text-slate-500 leading-relaxed">Inquiries regarding consent, cookies, or GDPR/CCPA consumer rights.</p>
          </div>
        </div>
      </section>

      {/* Interactive Working Form */}
      <section aria-labelledby="form-title" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-200 pb-4">
          <h2 id="form-title" className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            Send a Direct Message
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Fill out the fields below to dispatch your message straight to our team inbox.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Message Received</h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Thank you for reaching out to ArchEstate Pro. Our engineering and editorial team has received your message and will review it within 24 to 48 business hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setErrorMessage(null);
              }}
              className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <p className="font-semibold leading-relaxed">{errorMessage}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-slate-800 mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden disabled:opacity-60 transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-slate-800 mb-1.5">
                  Your Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden disabled:opacity-60 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-category" className="block text-xs font-bold text-slate-800 mb-1.5">
                Inquiry Category
              </label>
              <select
                id="contact-category"
                disabled={isSubmitting}
                value={contactCategory}
                onChange={(e) => setContactCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden disabled:opacity-60 transition-all"
              >
                <option value="Technical Feedback & Formula Verification">Technical Feedback &amp; Formula Verification</option>
                <option value="New Calculator Suggestion">New Calculator / Feature Suggestion</option>
                <option value="Commercial & Advertising Partnerships">Commercial &amp; Advertising Partnerships</option>
                <option value="Privacy Policy & Consent Inquiries">Privacy Policy &amp; Consent Inquiries</option>
                <option value="General Question / Feedback">General Question / Feedback</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold text-slate-800 mb-1.5">
                Your Detailed Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                disabled={isSubmitting}
                rows={5}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Include relevant calculator name, dimensions, formulas, or proposal details..."
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-hidden disabled:opacity-60 transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600/60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to ArchEstate Pro</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Security notice */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Please do not include confidential passwords, personal banking credentials, or proprietary blueprints in public contact submissions. All incoming correspondence is handled in accordance with our{' '}
          <a href="/privacy" className="text-emerald-700 font-semibold underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};
