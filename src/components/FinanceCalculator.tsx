/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Percent, PoundSterling, Calendar } from 'lucide-react';
import { FinancePlan } from '../types';

interface FinanceCalculatorProps {
  productPrice: number;
}

export default function FinanceCalculator({ productPrice }: FinanceCalculatorProps) {
  const [deposit, setDeposit] = useState<number>(Math.round(productPrice * 0.2)); // Default 20%
  const [term, setTerm] = useState<12 | 24 | 36 | 48 | 60>(36);
  const [apr, setApr] = useState<number>(9.9); // UK standard marine rate
  const [plan, setPlan] = useState<FinancePlan | null>(null);

  useEffect(() => {
    // Basic UK Marine Hire Purchase (HP) formulation
    const loanAmount = Math.max(0, productPrice - deposit);
    
    if (loanAmount <= 0) {
      setPlan({
        productPrice,
        depositGbp: deposit,
        termMonths: term,
        aprPercent: apr,
        monthlyPaymentGbp: 0,
        totalPayableGbp: productPrice,
        totalInterestGbp: 0
      });
      return;
    }

    // Monthly interest calculation
    const monthlyRate = (apr / 100) / 12;
    let monthlyPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / term;
    } else {
      monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    }

    const totalPayable = monthlyPayment * term + deposit;
    const totalInterest = Math.max(0, totalPayable - productPrice);

    setPlan({
      productPrice,
      depositGbp: deposit,
      termMonths: term,
      aprPercent: apr,
      monthlyPaymentGbp: parseFloat(monthlyPayment.toFixed(2)),
      totalPayableGbp: parseFloat(totalPayable.toFixed(2)),
      totalInterestGbp: parseFloat(totalInterest.toFixed(2))
    });
  }, [productPrice, deposit, term, apr]);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setDeposit(Math.min(productPrice, value));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(parseInt(e.target.value) || 0);
  };

  return (
    <div id="finance-calculator-container" className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="font-sans font-semibold text-slate-900 text-lg">UK Marine Finance Calculator</h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Customisable Hire Purchase (HP) Terms</p>
        </div>
        <div className="bg-sky-50 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-sky-100 flex items-center gap-1">
          <Percent className="w-3.5 h-3.5" />
          <span>9.9% Representative APR</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Inputs */}
        <div className="space-y-4">
          {/* Engine Price Display */}
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Engine Retail Price (inc. VAT)</label>
            <div className="text-2xl font-bold font-sans text-slate-900">
              £{productPrice.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </div>
          </div>

          {/* Deposit input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-700">Initial Deposit (Min 10%)</label>
              <span className="text-xs text-slate-500">
                ({Math.round((deposit / productPrice) * 100)}% of price)
              </span>
            </div>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PoundSterling className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="number"
                id="finance-deposit-input"
                min={Math.round(productPrice * 0.1)}
                max={productPrice}
                value={deposit}
                onChange={handleDepositChange}
                className="block w-full pl-9 pr-12 h-10 border border-slate-300 rounded-md focus:ring-sky-505 focus:border-sky-500 sm:text-sm bg-white text-slate-900"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-slate-500 sm:text-sm">GBP</span>
              </div>
            </div>
            <input
              type="range"
              id="finance-deposit-slider"
              min={Math.round(productPrice * 0.1)}
              max={productPrice}
              value={deposit}
              onChange={handleSliderChange}
              className="w-full mt-2 accent-sky-600 cursor-pointer"
            />
          </div>

          {/* Term Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Term Duration (Months)</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {([12, 24, 36, 48, 60] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  id={`finance-term-${t}-btn`}
                  onClick={() => setTerm(t)}
                  className={`py-2 text-sm font-medium rounded-md border text-center transition-all ${
                    term === t
                      ? 'bg-sky-900 text-white border-sky-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t}m
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results Panel */}
        <div className="bg-sky-900 text-white rounded-lg p-5 flex flex-col justify-between shadow-inner">
          <div className="space-y-4">
            <div>
              <span className="text-xs text-sky-200 uppercase tracking-wider font-semibold">Estimated Monthly Payment</span>
              <div className="text-4xl font-extrabold font-sans mt-0.5">
                £{plan?.monthlyPaymentGbp.toLocaleString('en-GB') || '0.00'}
                <span className="text-sm font-normal text-sky-100 italic">/m</span>
              </div>
              <p className="text-slate-100 text-xs mt-1 italic">Spread over {term} months</p>
            </div>

            <div className="space-y-2 pt-3 border-t border-sky-800 text-sm">
              <div className="flex justify-between">
                <span className="text-sky-200">Total amount to borrow:</span>
                <span className="font-semibold text-white">
                  £{(productPrice - deposit).toLocaleString('en-GB')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-200">Representative APR:</span>
                <span className="font-semibold text-white">{apr}% APR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-200">Total interest payable:</span>
                <span className="font-semibold text-amber-300">
                  £{plan?.totalInterestGbp.toLocaleString('en-GB') || '0.00'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sky-800 text-xs text-sky-100 space-y-1">
            <div className="flex justify-between">
              <span>Total amount payable:</span>
              <span className="font-semibold text-white">
                £{plan?.totalPayableGbp.toLocaleString('en-GB') || '0.00'}
              </span>
            </div>
            <p className="text-[10px] text-sky-305 leading-relaxed pt-1 select-none">
              * Finance subject to status and credit checks. UK residents 18+ only. Approved partners are regulated by the Financial Conduct Authority (FCA).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
