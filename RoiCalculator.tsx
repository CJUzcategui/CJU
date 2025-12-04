import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { RoiState } from '../../types';

export const RoiCalculator: React.FC = () => {
  // Default values based on Hotel 101 specs
  // Price: 208,000
  // Yield: 7% Annual = 14,560/year = 1,213.33/month
  // Fees: 0
  const [values, setValues] = useState<RoiState>({
    purchasePrice: 208000,
    monthlyRent: 1213, 
    annualFees: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const roi = useMemo(() => {
    const { purchasePrice, monthlyRent, annualFees } = values;
    if (purchasePrice === 0) return 0;
    const annualIncome = monthlyRent * 12;
    const netIncome = annualIncome - annualFees;
    return (netIncome / purchasePrice) * 100;
  }, [values]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="text-gold-500 w-6 h-6" />
        <h3 className="text-xl font-bold text-slate-900">ROI Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Purchase Price (€)</label>
          <input 
            type="number" 
            name="purchasePrice"
            value={values.purchasePrice}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-gold-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Projected Monthly Rent (€)</label>
          <div className="relative">
            <input 
                type="number" 
                name="monthlyRent"
                value={values.monthlyRent}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-gold-500 focus:outline-none"
            />
            <span className="absolute right-3 top-2 text-xs text-slate-400">~7% Yield</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">Annual HOA/Fees (€)</label>
          <input 
            type="number" 
            name="annualFees"
            value={values.annualFees}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-900 focus:ring-2 focus:ring-gold-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <span className="block text-sm text-slate-400 uppercase tracking-wide">Estimated Annual ROI</span>
        <span className="block text-4xl font-bold text-gold-600 mt-2">{roi.toFixed(2)}%</span>
        <span className="block text-xs text-slate-400 mt-2">*Based on projected rental income vs price.</span>
      </div>
    </div>
  );
};