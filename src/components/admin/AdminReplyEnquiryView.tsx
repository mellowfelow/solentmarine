import React, { useState } from 'react';
import { 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquareText, 
  Eye, 
  Sparkles, 
  FileText,
  Anchor,
  Building
} from 'lucide-react';
import { StoredEnquiry } from '../../lib/enquiryStore';
import { REPLY, SITE } from '../../config/site';
import { buildEmailHtml } from '../../lib/emailTemplate';

interface AdminReplyEnquiryViewProps {
  enquiry: StoredEnquiry;
  onBack: () => void;
  onSendReply: (enquiryId: string, replyData: { subject: string; message: string; emailHtml: string }) => Promise<void>;
}

export function AdminReplyEnquiryView({
  enquiry,
  onBack,
  onSendReply,
}: AdminReplyEnquiryViewProps) {
  const [subject, setSubject] = useState<string>(
    enquiry.subject?.startsWith('Re:') ? enquiry.subject : `Re: ${enquiry.subject || 'Enquiry to Solent Marine UK'}`
  );
  const [replyMessage, setReplyMessage] = useState<string>(
    `Hi ${enquiry.name},\n\nThank you for reaching out to Solent Marine Outboards UK.\n\n`
  );
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);

  const quickPresets = [
    {
      label: 'Shaft Length Advice',
      text: `Hi ${enquiry.name},\n\nRegarding your inquiry on the ${enquiry.vesselModel || 'vessel'}, we recommend measuring from the top of the engine mount cutout down to the lowest point of the hull keel:\n- 15" transom height requires a Short Shaft (S)\n- 20" transom height requires a Long Shaft (L)\n- 25" transom height requires an Ultra-Long Shaft (X)\n\nWe have tested this hull geometry extensively in the Solent and can confirm proper anti-ventilation plate immersion.`,
    },
    {
      label: 'Stock & PDI Schedule',
      text: `Hi ${enquiry.name},\n\nWe have units in stock at our Cowes yard. Every motor undergoes a comprehensive Pre-Delivery Inspection (PDI) test tank run and oil-fill signoff before dispatch.\n\nNext available courier / pallet dispatch slot is tomorrow morning with 24-48h delivery across UK Mainland.`,
    },
    {
      label: 'Trade / B2B Quote',
      text: `Hi ${enquiry.name},\n\nThank you for your commercial inquiry. We are pleased to offer commercial fleet terms with tier-1 dealer warranty and zero-VAT export documentation where applicable. Our workshop team can also supply pre-rigged remote kits and control cables cut to length.`,
    },
  ];

  // Composed Light Shell Email HTML
  const generatedEmailHtml = buildEmailHtml({
    title: 'Response from Solent Marine Outboards UK',
    preheader: `Reply regarding your inquiry (${enquiry.id})`,
    intro: `Hello ${enquiry.name},<br>Here is the official update from our technical and customer support desk at Cowes Yacht Haven.`,
    refBadge: enquiry.id,
    rows: [
      { label: 'Enquiry Reference', value: enquiry.id, mono: true },
      { label: 'Customer / Vessel', value: `${enquiry.name}${enquiry.vesselModel ? ` · ${enquiry.vesselModel}` : ''}` },
      { label: 'Support Officer Response', heading: true },
      { label: 'Message', value: replyMessage, block: true },
      { label: 'Original Customer Inquiry', heading: true },
      { label: 'Original Message', value: enquiry.message, block: true },
    ],
    cta: {
      label: 'View Outboard Catalog Online',
      url: `https://${SITE.domain}/shop/`,
    },
    secondaryCta: {
      label: 'Call Cowes Yard Office',
      url: `tel:${REPLY.channels.whatsapp}`,
    },
    footer: 'Solent Marine Outboards UK Ltd · Cowes Yacht Haven, Isle of Wight, PO31 7BD · Official UK Main Dealer',
  });

  const handleSend = async () => {
    if (!replyMessage.trim()) {
      alert('Please enter a reply message before sending.');
      return;
    }
    setIsSending(true);
    try {
      await onSendReply(enquiry.id, {
        subject,
        message: replyMessage,
        emailHtml: generatedEmailHtml,
      });
      setSendSuccess(true);
      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to send reply email.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 border border-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Enquiries</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Enquiry:</span>
          <span className="font-mono font-bold text-sky-400">{enquiry.id}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Customer:</span>
          <span className="text-white font-bold">{enquiry.name}</span>
        </div>
      </div>

      {sendSuccess ? (
        <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-3xl p-12 text-center space-y-4 animate-scale-in">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-white">Reply Sent & Saved!</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            The customer has been emailed with your reply and the conversation history has been logged. Returning to enquiries list...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Composer Controls (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquareText className="w-5 h-5 text-emerald-400" />
                <span>Enquiry Reply Composer</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Draft response to customer enquiry with live email styling.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
                Quick Template Inserts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReplyMessage(preset.text)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-[11px] transition cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Your Reply Message
              </label>
              <textarea
                rows={8}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your official technical or sales response..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Original Enquiry Box */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">
                Original Message from {enquiry.name} ({enquiry.email})
              </span>
              <p className="text-slate-300 italic text-[11px] max-h-24 overflow-y-auto">
                "{enquiry.message}"
              </p>
            </div>

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'Dispatching Reply...' : 'Send Branded Reply Email'}</span>
            </button>

          </div>

          {/* RIGHT: Live Preview (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white">Live Customer Email Preview</h4>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Light Theme Table Layout</span>
            </div>

            <div className="bg-slate-100 rounded-2xl p-4 max-h-[700px] overflow-y-auto border border-slate-300 shadow-inner">
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden text-slate-800 font-sans"
                dangerouslySetInnerHTML={{ __html: generatedEmailHtml }}
              />
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminReplyEnquiryView;
