import React, { useState } from 'react';
import { 
  Send, 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  Coins, 
  MessageSquare, 
  Mail, 
  Sparkles, 
  Eye, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import type { StoredOrder } from '../../lib/orderStore';
import { REPLY } from '../../config/site';
import { paymentMethodParts, instructionsParts, parsePaymentDetail, ParsedPaymentField } from '../../lib/order';
import { paymentDetailsEmail, escapeHtml } from '../../lib/emailTemplates';
import { WhatsAppSendPanel } from './WhatsAppSendPanel';
import { waPaymentDetailsMessage } from '../../lib/whatsapp';

interface AdminSendPaymentEmailViewProps {
  order: StoredOrder;
  onBack: () => void;
  onPaymentSent: (orderId: string, methodId: string, detail: string) => Promise<void>;
}

export function AdminSendPaymentEmailView({
  order,
  onBack,
  onPaymentSent,
}: AdminSendPaymentEmailViewProps) {
  const [selectedMethodId, setSelectedMethodId] = useState<string>(order.paymentMethodId || 'bacs');
  const [mode, setMode] = useState<'template' | 'paste'>('template');
  const [customPasteDetails, setCustomPasteDetails] = useState<string>(
    `Account Name: Solent Marine Outboards UK Ltd\nBank: Barclays UK Commercial\nSort Code: 20-45-45\nAccount Number: 83920194\nReference: ${order.id}`
  );
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);

  const selectedMethod = REPLY.paymentMethods.find((m) => m.id === selectedMethodId) || REPLY.paymentMethods[0];
  const parts = paymentMethodParts(selectedMethodId, order.total, order.id);

  // The raw detail the server will receive — empty in template mode (no real account info yet).
  const detail = mode === 'paste' ? customPasteDetails : '';

  // Parsed, individually-copyable fields from the admin's pasted blob — shown as a live
  // preview here; the same parser runs server-side when the email actually sends.
  const parsedFields: ParsedPaymentField[] = mode === 'paste' ? parsePaymentDetail(customPasteDetails) : [];

  // Exactly what the server will build and send — this preview can never drift from the
  // real email, since both call the same instructionsParts()/paymentDetailsEmail() pair.
  const instructions = instructionsParts(parts.opening, detail, parts.closing);
  const instructionsHtml = escapeHtml(instructions).replace(/\n/g, '<br>');
  const generatedEmailHtml = paymentDetailsEmail({
    orderNumber: order.id,
    amountDue: order.total,
    customerName: order.customerName,
    instructionsHtml
  }).html;

  // WhatsApp message body — mirrors the email using the same parsed fields (content parity rule)
  const waBodyLines = waPaymentDetailsMessage({
    orderRef: order.id,
    amountDue: order.total,
    opening: parts.opening,
    fields: parsedFields,
    closing: parts.closing
  });

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      await onPaymentSent(order.id, selectedMethodId, detail);
      setSendSuccess(true);
      setTimeout(() => {
        onBack();
      }, 2500);
    } catch (err) {
      console.error(err);
      alert('Failed to send email. Please check server mailer logs.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 border border-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Order:</span>
          <span className="font-mono font-bold text-sky-400">{order.id}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Customer:</span>
          <span className="text-white font-bold">{order.customerName}</span>
        </div>
      </div>

      {sendSuccess ? (
        <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-3xl p-12 text-center space-y-4 animate-scale-in">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-white">Payment Details Dispatched!</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Payment instructions have been formatted with official Solent Marine light-theme branding and logged in the order database. Returning to dashboard...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Composer Controls (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sky-400" />
                <span>Payment Details Composer</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Configure payment method and customized bank/transfer instructions.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                Select Payment Rail
              </label>
              <div className="space-y-2">
                {REPLY.paymentMethods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMethodId(m.id)}
                    className={`w-full p-3 rounded-xl text-xs font-medium border text-left transition flex items-center justify-between cursor-pointer ${
                      selectedMethodId === m.id
                        ? 'bg-sky-950 text-white border-sky-500 shadow-md shadow-sky-950'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{m.label}</span>
                    {selectedMethodId === m.id && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Template vs Custom Paste Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">
                  Instruction Mode
                </label>
                <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setMode('template')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                      mode === 'template' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Template Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('paste')}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                      mode === 'paste' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Paste Custom Details
                  </button>
                </div>
              </div>

              {mode === 'paste' && (
                <div className="space-y-1.5 animate-fade-in">
                  <span className="text-[11px] text-slate-400 block">
                    Paste raw account/wallet details below. Automated framing & terms will be wrapped around it:
                  </span>
                  <textarea
                    rows={4}
                    value={customPasteDetails}
                    onChange={(e) => setCustomPasteDetails(e.target.value)}
                    placeholder={'Account name: ...\nSort code: ...\nAccount number: ...\nReference: ' + order.id}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                  {parsedFields.length > 0 && (
                    <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-3 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                        Parsed into {parsedFields.length} copyable field{parsedFields.length === 1 ? '' : 's'}
                      </span>
                      {parsedFields.map((f, i) => (
                        <div key={i} className="flex justify-between text-[11px] font-mono">
                          <span className="text-slate-400">{f.label}</span>
                          <span className="text-slate-100">{f.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recipient Details Confirmation */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider block">Recipient</span>
              <p className="text-white font-bold">{order.customerName}</p>
              <p className="text-slate-300">{order.customerEmail}</p>
              {order.customerPhone && <p className="text-slate-400 text-[11px]">WhatsApp: {order.customerPhone}</p>}
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={isSending}
              className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-sky-950/60 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'Sending via Mailer...' : 'Send Official Payment Email'}</span>
            </button>

            {/* WhatsApp Send Panel */}
            <div className="pt-2 border-t border-slate-800">
              <WhatsAppSendPanel
                recipientName={order.customerName}
                recipientPhone={order.customerPhone || REPLY.channels.whatsapp}
                bodyLines={waBodyLines}
                onSent={() => onPaymentSent(order.id, selectedMethodId, detail)}
              />
            </div>

          </div>

          {/* RIGHT: Live Preview (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-sky-400" />
                <h4 className="text-sm font-bold text-white">Live Light-Shell Email Preview</h4>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">100% Inverted-Theme Safe</span>
            </div>

            {/* Sandboxed HTML Email Container — email markup is a fixed-width table (real
                email clients don't reflow), so this scrolls both axes rather than
                letting it blow out the mobile layout. */}
            <div className="bg-slate-100 rounded-2xl p-4 max-h-[700px] overflow-auto border border-slate-300 shadow-inner">
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden text-slate-800 font-sans w-[600px] max-w-none"
                dangerouslySetInnerHTML={{ __html: generatedEmailHtml }}
              />
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminSendPaymentEmailView;
