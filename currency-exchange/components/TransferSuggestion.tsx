import React from 'react'
import { TrendingUp, TrendingDown, Clock, AlertTriangle } from 'lucide-react'
interface TransferSuggestionProps {
  trend: 'up' | 'down' | 'stable'
  volatility: 'high' | 'medium' | 'low'
}
export const TransferSuggestion: React.FC<TransferSuggestionProps> = ({
  trend,
  volatility,
}) => {
  let suggestion = ''
  let icon = null
  let color = ''
  if (trend === 'up' && volatility !== 'high') {
    suggestion = 'INR has been strengthening. Consider transferring soon.'
    icon = <TrendingUp className="w-6 h-6" />
    color = 'text-amber-600 bg-amber-50 border-amber-200'
  } else if (trend === 'down' && volatility !== 'high') {
    suggestion =
      'INR has been weakening. You might get a better rate by waiting, if possible.'
    icon = <TrendingDown className="w-6 h-6" />
    color = 'text-blue-600 bg-blue-50 border-blue-200'
  } else if (trend === 'stable') {
    suggestion =
      'Rates are stable. Monitor for better opportunities or transfer if urgent.'
    icon = <Clock className="w-6 h-6" />
    color = 'text-gray-600 bg-gray-50 border-gray-200'
  } else if (volatility === 'high') {
    suggestion =
      'Market is volatile. Consider your risk tolerance before transferring.'
    icon = <AlertTriangle className="w-6 h-6" />
    color = 'text-red-600 bg-red-50 border-red-200'
  }
  // If INR is strengthening (good for those converting from SGD)
  if (trend === 'up' && volatility === 'low') {
    suggestion = 'Rates are favorable. Good time to transfer!'
    icon = <TrendingUp className="w-6 h-6" />
    color = 'text-green-600 bg-green-50 border-green-200'
  }
  return (
    <div className={`p-6 rounded-lg shadow-md border ${color}`}>
      <h2 className="text-xl font-semibold mb-3">Transfer Timing</h2>
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 ${color.split(' ')[0]}`}>{icon}</div>
        <div>
          <p className="font-semibold text-lg">{suggestion}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Based on recent trends and current market conditions
          </p>
        </div>
      </div>
    </div>
  )
}
