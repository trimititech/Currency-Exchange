'use client'

import React from 'react'

import { BankData } from '../utils/mockData'

interface CurrencyConverterProps {
  amount: number
  onAmountChange: (value: number) => void
  banks: BankData[]
  selectedBank: string
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  amount,
  onAmountChange,
  banks,
  selectedBank,
}) => {
  const selectedBankData =
    banks.find((bank) => bank.name === selectedBank) || banks[0]

  const realTimeConvertedAmount = amount * selectedBankData.effectiveRate

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Currency Converter</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="sgd-amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount (SGD)
          </label>
          <input
            id="sgd-amount"
            type="number"
            value={amount === 0 ? '' : amount}
            onChange={(e) => {
              onAmountChange(parseFloat(e.target.value) || 0)
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            placeholder="Enter amount in SGD"
          />
        </div>

        {/* <div className="flex items-center justify-center py-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
            <ArrowRight className="w-5 h-5 text-primary" />
          </div>
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Converted Amount (INR)
          </label>
          <div
            className={`w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-lg font-medium h-[50px] flex items-center ${
              amount > 0 ? 'text-green-600' : 'text-gray-500'
            }`} // Conditionally apply text color
          >
            {amount > 0
              ? `₹ ${realTimeConvertedAmount.toFixed(2)}`
              : '-'}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Using {selectedBankData.name} rate: 1 SGD = ₹ {selectedBankData.rate.toFixed(2)}
            {selectedBankData.margin > 0 &&
              ` (Margin: ${selectedBankData.margin}%)`}
          </p>
          {amount > 0 && (
             <p className="text-xs text-blue-600 mt-1">
               Effective rate including margin: 1 SGD = ₹ {selectedBankData.effectiveRate.toFixed(2)}
             </p>
          )}
        </div>
      </div>
    </div>
  )
}