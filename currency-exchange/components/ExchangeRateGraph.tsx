'use client'

import React, { useEffect, useRef } from 'react'
import { HistoricalData } from '../utils/mockData'
import Chart from 'chart.js/auto'
interface ExchangeRateGraphProps {
  data: HistoricalData[]
  period: string
  onPeriodChange: (period: string) => void
}
export const ExchangeRateGraph: React.FC<ExchangeRateGraphProps> = ({
  data,
  period,
  onPeriodChange,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  useEffect(() => {
    if (!chartRef.current) return
    // Filter data based on selected period
    let filteredData = data
    if (period === '1W') {
      filteredData = data.slice(-7)
    } else if (period === '1M') {
      filteredData = data.slice(-30)
    } else if (period === '3M') {
      filteredData = data.slice(-90)
    }
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }
    // Create new chart
    const ctx = chartRef.current.getContext('2d')
    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: filteredData.map((item) => item.date),
          datasets: [
            {
              label: 'SGD to INR Rate',
              data: filteredData.map((item) => item.rate),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: true,
              pointRadius: 2,
              pointHoverRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function (context) {
                  return `Rate: ₹ ${context.raw}`
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
            y: {
              beginAtZero: false,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)',
              },
              ticks: {
                callback: function (value) {
                  return `₹ ${value}`
                },
              },
            },
          },
        },
      })
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, period])
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Exchange Rate Trend</h2>
        <div className="flex space-x-2">
          {['1W', '1M', '3M', 'All'].map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className={`px-3 py-1 text-sm rounded-md ${period === p ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <canvas ref={chartRef} />
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Historical exchange rates for SGD to INR. Past performance is not
        indicative of future results.
      </p>
    </div>
  )
}