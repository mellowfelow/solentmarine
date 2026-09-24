import React, { useState } from 'react';
import { MessageSquare, ExternalLink, Copy, Check, Send, PhoneCall } from 'lucide-react';
import { waLink } from '../../lib/whatsapp';

interface WhatsAppSendPanelProps {
  recipientPhone: string;
  recipientName: string;
  messageText: string;
  onSent?: () => void;
}

export function WhatsAppSendPanel({
  recipientPhone,
  recipientName,
  messageText,
  onSent,
}: WhatsAppSendPanelProps) {
  const [copied, setCopied] = useState(false);

  const directWaUrl = waLink(recipientPhone, messageText);

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    // Open synchronously to avoid popup blockers
    window.open(directWaUrl, '_blank', 'noopener,noreferrer');
    if (onSent) onSent();
  };

  return (
    <div className="bg-slate-900 border border-emerald-900/60 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[#25D366] flex items-center justify-center">
            <MessageSquare className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">WhatsApp Dispatch Panel</h4>
            <p className="text-[11px] text-slate-400">Recipient: <span className="text-slate-200 font-semibold">{recipientName}</span> ({recipientPhone || 'Default Yard'})</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition flex items-center gap-1.5 border border-slate-700"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Text' : 'Copy Message'}</span>
        </button>
      </div>

      {/* WhatsApp Message Preview Bubble */}
      <div className="bg-[#0b141a] border border-[#202c33] rounded-xl p-3.5 text-xs text-[#e9edef] font-sans leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto font-mono text-[11px] shadow-inner">
        {messageText}
      </div>

      {/* Action CTA button */}
      <button
        type="button"
        onClick={handleOpenWhatsApp}
        className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
      >
        <Send className="w-4 h-4 fill-current" />
        <span>Open WhatsApp & Send Pre-filled Message</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
      </button>
    </div>
  );
}

export default WhatsAppSendPanel;
