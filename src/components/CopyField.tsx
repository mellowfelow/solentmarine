/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyFieldProps {
  label: string;
  value: string;
  displayValue?: string;
  mono?: boolean;
}

export default function CopyField({ label, value, displayValue, mono = true }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Click to copy ${label}`}
      className="group w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-sky-50 hover:border-sky-300 text-left transition cursor-pointer"
    >
      <div className="min-w-0 pr-2">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-sky-700">
          {label}
        </span>
        <span className={`block text-xs text-slate-900 font-semibold truncate ${mono ? 'font-mono' : ''}`}>
          {displayValue || value}
        </span>
      </div>

      <div className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-slate-500 group-hover:text-sky-600">
        {copied ? (
          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
            <Check className="w-3.5 h-3.5" />
            <span>Copied</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-slate-400 group-hover:text-sky-600">
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </span>
        )}
      </div>
    </button>
  );
}
