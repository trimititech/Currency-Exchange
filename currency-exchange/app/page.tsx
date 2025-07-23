'use client'

import React, { useEffect, useState } from "react";
// import { Layout } from './components/Layout'
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { BankComparison } from "@/components/BankComparison";
import { ExchangeRateGraph } from "@/components/ExchangeRateGraph";
import { TransferSuggestion } from "@/components/TransferSuggestion";
import { mockBankData, mockHistoricalData } from "@/utils/mockData";
export default function Home() {
  const [amount, setAmount] = useState<number>(1000);
  const [selectedBank, setSelectedBank] = useState<string>(
    mockBankData[0].name
  );
  const [period, setPeriod] = useState<string>("1M");
  // Find the bank with the best effective rate (considering margins)
  const bestBank = mockBankData.reduce((prev, current) =>
    current.effectiveRate > prev.effectiveRate ? current : prev
  );
  useEffect(() => {
    // Set the best bank as selected by default
    setSelectedBank(bestBank.name);
  }, []);
  const handleAmountChange = (value: number) => {
    setAmount(value);
  };
  const handleBankSelect = (bankName: string) => {
    setSelectedBank(bankName);
  };
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };
  return (
    <>
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8 bg-background min-h-screen">
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            SGD to INR Converter
          </h1>
          <p className="text-muted-foreground mt-2">
            Compare rates, analyze trends, and find the best time to transfer
          </p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <CurrencyConverter
              amount={amount}
              onAmountChange={handleAmountChange}
              banks={mockBankData}
              selectedBank={selectedBank}
            />
            <TransferSuggestion
              trend={mockHistoricalData.trend}
              volatility={mockHistoricalData.volatility}
            />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <ExchangeRateGraph
              data={mockHistoricalData.data}
              period={period}
              onPeriodChange={handlePeriodChange}
            />
            <BankComparison
              banks={mockBankData}
              selectedBank={selectedBank}
              onBankSelect={handleBankSelect}
              amount={amount}
            />
          </div>
        </div>
      </div>
    </>
  );
}
