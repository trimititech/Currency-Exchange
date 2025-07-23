'use client'
import React from 'react'
import { Check, TrendingUp } from 'lucide-react'
import { BankData } from '@/utils/mockData'
interface BankComparisonProps {
  banks: BankData[]
  selectedBank: string
  onBankSelect: (bankName: string) => void
  amount: number
}
export const BankComparison: React.FC<BankComparisonProps> = ({
  banks,
  selectedBank,
  onBankSelect,
  amount,
}) => {
  // Sort banks by effective rate (best rate first)
  const sortedBanks = [...banks].sort(
    (a, b) => b.effectiveRate - a.effectiveRate,
  )
  const bestBank = sortedBanks[0]
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Bank Comparison</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bank
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate (1 SGD)
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Margin
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                You Get (INR)
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedBanks.map((bank) => {
              const isBest = bank.name === bestBank.name
              const isSelected = bank.name === selectedBank
              const convertedAmount = amount * bank.effectiveRate
              return (
                <tr
                  key={bank.name}
                  className={`${isBest ? 'bg-green-50' : ''} ${isSelected ? 'bg-blue-50' : ''} hover:bg-gray-50`}
                >
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-900">
                        {bank.name}
                        {isBest && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Best Rate
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ₹ {bank.rate.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{bank.margin}%</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ₹ {convertedAmount.toFixed(2)}
                    </div>
                    {isBest && (
                      <div className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Best value
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onBankSelect(bank.name)}
                      className={`inline-flex items-center px-3 py-1 border ${isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'} rounded-md text-sm font-medium focus:outline-none`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4 mr-1" /> Selected
                        </>
                      ) : (
                        'Select'
                      )}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Note: Rates and margins are indicative and subject to change. Actual
        rates may vary at the time of transaction.
      </p>
    </div>
  )
}
