import React, { useState } from 'react';
import { X, Shield, FileText, CheckCircle, Mail, Send, Copy, Check, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_ihh81up';
const EMAILJS_TEMPLATE_ID = 'template_78vfjg';

const getEmailJsPublicKey = (): string => {
  if (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { VITE_EMAILJS_PUBLIC_KEY?: string } }).env?.VITE_EMAILJS_PUBLIC_KEY) {
    return (import.meta as unknown as { env?: { VITE_EMAILJS_PUBLIC_KEY?: string } }).env!.VITE_EMAILJS_PUBLIC_KEY || '';
  }
  if (typeof process !== 'undefined' && process.env?.VITE_EMAILJS_PUBLIC_KEY) {
    return process.env.VITE_EMAILJS_PUBLIC_KEY || '';
  }
  return '';
};

interface LegalModalProps {
  isOpen: boolean;
  type: 'contact' | 'privacy' | 'terms' | 'about' | 'methodology' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('General Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen || !type) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact15archestate@gmail.com');
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
      setErrorMessage('Please complete all required fields.');
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
      subject: contactSubject,
      inquiry_category: contactSubject,
      message: trimmedMessage,
    };

    try {
      const publicKey = getEmailJsPublicKey();
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        publicKey || undefined
      );

      setIsSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setErrorMessage(null);
    } catch (err) {
      console.error('EmailJS submit error:', err);
      setErrorMessage(
        'Unable to send your message right now. Please try again or contact us directly at contact15archestate@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      role="dialog"
      aria-modal="true"
      id="legal-modal-dialog"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            {type === 'contact' && <Mail className="w-5 h-5 text-emerald-600" />}
            {type === 'privacy' && <Shield className="w-5 h-5 text-emerald-600" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-slate-700" />}
            {type === 'about' && <CheckCircle className="w-5 h-5 text-emerald-600" />}
            {type === 'methodology' && <FileText className="w-5 h-5 text-amber-600" />}
            <h2 className="text-lg font-bold text-slate-900 capitalize">
              {type === 'contact' && 'Contact Us — ArchEstate Pro'}
              {type === 'privacy' && 'Privacy Policy & Data Security'}
              {type === 'terms' && 'Terms of Service & Usage Agreement'}
              {type === 'about' && 'About ArchEstate Pro'}
              {type === 'methodology' && 'Calculation Methodology Standard'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            id="close-legal-modal-btn"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-sm text-slate-600 leading-relaxed">
          {type === 'contact' && (
            <div className="space-y-6">
              {/* Direct email card */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Official Email
                    </span>
                    <p className="text-sm font-bold text-slate-900">
                      contact15archestate@gmail.com
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold rounded-lg transition-colors shrink-0 shadow-2xs"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Inquiry department pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="font-bold text-slate-800">General Support</p>
                  <p className="text-[11px] text-slate-500">Usage &amp; general questions</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="font-bold text-slate-800">Technical Feedback</p>
                  <p className="text-[11px] text-slate-500">Formulas &amp; custom features</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="font-bold text-slate-800">Partnership / Media</p>
                  <p className="text-[11px] text-slate-500">Advertising &amp; integrations</p>
                </div>
              </div>

              {/* Interactive Form */}
              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Message sent successfully</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you for contacting ArchEstate Pro. Your inquiry has been sent to our desk, and our team will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setErrorMessage(null);
                    }}
                    className="mt-2 text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5 pt-1">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                      <div className="flex-1">
                        <p className="font-semibold">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        disabled={isSubmitting}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g., Alex Miller"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      name="subject"
                      disabled={isSubmitting}
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden disabled:opacity-60"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Technical Feedback & Formula Verification">Technical Feedback &amp; Formula Verification</option>
                      <option value="Feature Request">New Calculator Request</option>
                      <option value="Partnership & Advertising">Partnership &amp; Advertising</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      disabled={isSubmitting}
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your question, project specifications, or feedback in detail..."
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-emerald-600 focus:outline-hidden disabled:opacity-60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-600/70 disabled:cursor-not-allowed text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message to ArchEstate Pro</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {type === 'privacy' && (
            <>
              <p><strong>1. Zero Data Collection:</strong> ArchEstate Pro operates 100% client-side in your web browser. We do not store, transmit, or monetize your project dimensions, property financial values, or calculation logs on remote servers.</p>
              <p><strong>2. Local Browser Memory:</strong> Temporary saved calculations, active inputs, and presets remain strictly inside your browser’s local session state.</p>
              <p><strong>3. Advertising Disclosure:</strong> We adhere to standard Google AdSense publisher privacy guidelines. Contextual advertisements are clearly delineated and non-intrusive.</p>
              <p><strong>4. Privacy Inquiries:</strong> Contact our privacy officer directly at <a href="mailto:contact15archestate@gmail.com" className="text-emerald-700 font-semibold underline">contact15archestate@gmail.com</a>.</p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p><strong>1. Planning Estimates Only:</strong> All calculations provided by ArchEstate Pro are intended strictly as mathematical planning tools. They do not constitute formal architectural blueprints, licensed structural engineering stamps, formal mortgage underwriting approvals, or legal tax advice.</p>
              <p><strong>2. Limitation of Liability:</strong> ArchEstate Pro and its contributors accept no liability for discrepancies between computed planning quantities and actual on-site contractor purchase orders, supplier shortages, or financial terms.</p>
              <p><strong>3. Verification Requirement:</strong> Always verify dimensions, material specifications, load-bearing requirements, and legal tax rates with certified professionals before committing capital or purchasing inventory.</p>
              <p><strong>4. Contact:</strong> For inquiries regarding terms or usage: <a href="mailto:contact15archestate@gmail.com" className="text-emerald-700 font-semibold underline">contact15archestate@gmail.com</a>.</p>
            </>
          )}

          {type === 'about' && (
            <>
              <p><strong>ArchEstate Pro</strong> is an international Architecture + Construction + Real Estate Technology Platform engineered for architects, general contractors, interior remodelers, quantity surveyors, property developers, and homeowners.</p>
              <p>Our platform unites 15 precision calculators across 3 core disciplines: <strong>False Ceilings &amp; Drywall</strong>, <strong>Construction &amp; Finishes</strong>, and <strong>Real Estate &amp; Financial Analytics</strong>.</p>
              <p>All computational models calculate instantly on the client side with zero latency, zero sign-ups, and zero paywalls.</p>
              <p><strong>Official Contact:</strong> <a href="mailto:contact15archestate@gmail.com" className="text-emerald-700 font-semibold underline">contact15archestate@gmail.com</a></p>
            </>
          )}

          {type === 'methodology' && (
            <>
              <p><strong>Mathematical Rigor:</strong> Every calculator in ArchEstate Pro utilizes peer-reviewed construction geometry, manufacturer standard formulas (e.g., Knauf/USG drywall standards, ASTM/EN concrete curing constants), and conventional real estate underwriting algorithms (e.g., Fannie Mae 28/36 ratio frameworks).</p>
              <p><strong>Wastage Modeling:</strong> Real construction requires cut-and-fit tolerances. Each construction tool includes adjustable wastage factors (typically 5% to 15%) calibrated to actual site handling standards.</p>
              <p><strong>Methodology Review:</strong> If you have technical feedback or suggested formula refinements, contact our engineering team at <a href="mailto:contact15archestate@gmail.com" className="text-emerald-700 font-semibold underline">contact15archestate@gmail.com</a>.</p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

