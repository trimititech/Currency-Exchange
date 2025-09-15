'use client'
import React from 'react'
import { Check, TrendingUp } from 'lucide-react'
import { BankData } from '@/types/rates'

// import { AlertTriangle } from 'lucide-react';

interface BankComparisonProps {
  banks: BankData[];
  selectedBank: string;
  onBankSelect: (bankName: string) => void;
  amount: number;
  // liveRates: Record<string, number | null> | null;
  // liveFlags: Record<string, boolean> | null;
}
function findSlabForAmount(slabs: BankData['slabs'], amount: number) {
  return (
    slabs.find(
      (slab) =>
        amount >= slab.minAmount &&
        (slab.maxAmount === undefined || amount <= slab.maxAmount)
    ) ?? slabs[0]
  )
}
export const BankComparison: React.FC<BankComparisonProps> = ({
  banks,
  selectedBank,
  onBankSelect,
  amount,
  // liveRates,
  // liveFlags,
}) => {
   const banksWithDynamicRates = banks.map((bank) => {
    if (!bank.slabs || bank.slabs.length === 0) {
      return { ...bank, rate: 0, margin: 0, effectiveRate: 0 }
    }

    const slab = findSlabForAmount(bank.slabs, amount)
    const effectiveRate = slab.bankRate * (1 + slab.marginPercent / 100)

    return {
      ...bank,
      rate: slab.bankRate,
      margin: slab.marginPercent,
      effectiveRate,
    }
  })
  // Sort banks by 'You Get (INR)' descending
  const sortedBanks = [...banksWithDynamicRates].sort((a, b) => {
    const aGet = amount * a.effectiveRate;
    const bGet = amount * b.effectiveRate;
    return bGet - aGet;
  });
  const bestBank = sortedBanks[0];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Exchange Sources</h2>
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
              {/* <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Margin
              </th> */}
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                You Get (INR)
              </th>
              {/* <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Live Rate
              </th> */}
              {/* <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th> */}
              {/* <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visit
              </th> */}
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
                  className={`hover:cursor-pointer ${isBest ? 'bg-green-50' : ''} ${isSelected ? 'bg-blue-50' : ''} hover:bg-gray-50`}
                  onClick={()=>onBankSelect(bank.name)}
                >
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-900">
                        {bank.name}
                        {/* {bank.hasLiveRate && '*'} */}
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
                  {/* <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{bank.margin}%</div>
                  </td> */}
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
                  {/* <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                   {bank.hasLiveRate && liveRates && liveRates[bank.name] ? (
                        <>
                          ₹ {liveRates[bank.name]?.toFixed(4)}
                          {liveFlags && liveFlags[bank.name] === false && (
                            <span title="This rate is not live (fallback value)">
                              <AlertTriangle className="w-4 h-4 text-yellow-500 ml-1 inline" />
                            </span>
                          )}
                        </>
                      ) : (
                        '-'
                      )} 
                    </div>
                  </td> */}
                  {/* <td className="px-3 py-4 whitespace-nowrap"
                  
                  >
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
                  </td> */}
                  {/* <td className="px-3 py-4 whitespace-nowrap">
                    <a href={bank.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title={`Visit ${bank.name} website`}>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </td> */}
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
