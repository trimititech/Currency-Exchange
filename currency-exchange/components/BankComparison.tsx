'use client'
import React from 'react'
import { Check, TrendingUp, ExternalLink } from 'lucide-react'
import { BankData } from '@/utils/mockData'

interface BankComparisonProps {
  banks: BankData[];
  selectedBank: string;
  onBankSelect: (bankName: string) => void;
  amount: number;
  liveRates: Record<string, number | null> | null;
}

export const BankComparison: React.FC<BankComparisonProps> = ({
  banks,
  selectedBank,
  onBankSelect,
  amount,
  liveRates,
}) => {
  // Find the bank with the best effective rate
  const bestBank = [...banks].sort((a, b) => b.effectiveRate - a.effectiveRate)[0];

  // Create a sorted list with the best bank at the top, and the rest sorted by their base rate
  const sortedBanks = [
    bestBank,
    ...[...banks]
      .filter((bank) => bank.name !== bestBank.name)
      .sort((a, b) => a.rate - b.rate),
  ];

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
                Live Rate
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visit
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
                        {bank.name}{bank.hasLiveRate && '*'}
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
                    <div className="text-sm text-gray-900">
                      {bank.hasLiveRate && liveRates && liveRates[bank.name] ? `₹ ${liveRates[bank.name]?.toFixed(4)}` : '-'}
                    </div>
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
                  <td className="px-3 py-4 whitespace-nowrap">
                    <a href={bank.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title={`Visit ${bank.name} website`}>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        * Live rates are fetched from a real-time API and may differ from the bank&apos;s indicative rates.
      </p>
    </div>
  )
}
