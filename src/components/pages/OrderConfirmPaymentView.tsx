'use client';

import { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { UploadCloud, CheckCircle, AlertCircle, ImageIcon } from 'lucide-react';
import { CONTACT } from '../../config/site';

const MAX_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export default function OrderConfirmPaymentView() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setError(null);
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.size > MAX_SIZE_BYTES) {
      setError('File too large — please use an image under 4MB.');
      return;
    }
    if (selected.type && !ALLOWED_TYPES.includes(selected.type)) {
      setError('Unsupported file type — please use JPG, PNG, WebP or HEIC.');
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      setError('No order reference provided.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.set('id', id);
      form.set('note', note);
      if (file) form.set('screenshot', file);

      const res = await fetch('/api/order/confirm-payment/', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not submit confirmation.');
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="order-confirm-payment-page" className="max-w-lg mx-auto px-4 sm:px-6 py-12">
      <div className="text-center space-y-2 mb-8">
        <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <UploadCloud className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Confirm Your Payment</h1>
        {id && <p className="text-xs font-mono text-slate-500">Order Reference: {id}</p>}
      </div>

      {submitted ? (
        <div className="text-center space-y-3 py-10 border-2 border-dashed border-emerald-200 bg-emerald-50 rounded-2xl">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
          <h2 className="font-bold text-slate-900 text-lg">Confirmation Received</h2>
          <p className="text-sm text-slate-600 px-6">Our team will verify your payment and dispatch your PDI schedule shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Payment Screenshot (optional)
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-300 hover:border-sky-400 rounded-xl py-6 flex flex-col items-center gap-2 text-slate-500 hover:text-sky-700 transition"
            >
              <ImageIcon className="w-6 h-6" />
              <span className="text-xs font-medium">{file ? file.name : 'Click to select JPG, PNG, WebP or HEIC (max 4MB)'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div>
            <label htmlFor="confirm-note" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Note (optional)
            </label>
            <textarea
              id="confirm-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Paid via bank transfer this morning"
              className="block w-full border border-slate-300 rounded-md p-2 text-sm bg-white text-slate-900 focus:ring-sky-500"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl py-3 text-sm font-bold transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Payment Confirmation'}
          </button>

          <p className="text-[11px] text-slate-400 text-center">
            Prefer WhatsApp? Message us directly or email <a href={`mailto:${CONTACT.email}`} className="text-sky-700 underline">{CONTACT.email}</a>.
          </p>
        </form>
      )}
    </div>
  );
}
