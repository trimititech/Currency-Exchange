'use client'

import React, { useEffect, useState } from "react";
// import { Layout } from './components/Layout'
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { BankComparison } from "@/components/BankComparison";
import { ExchangeRateGraph } from "@/components/ExchangeRateGraph";
import { TransferSuggestion } from "@/components/TransferSuggestion";

import { mockBankData, mockHistoricalData, generateHistoricalData } from "@/utils/mockData";
export default function Home() {
  const [amount, setAmount] = useState<number>(1000);
  const [selectedBank, setSelectedBank] = useState<string>(
    mockBankData[0].name
  );
  const [period, setPeriod] = useState<string>("1M");
  const [graphData, setGraphData] = useState(mockHistoricalData.data);
  const [liveRates, setLiveRates] = useState<Record<string, number | null> | null>(null);
  const [liveFlags, setLiveFlags] = useState<Record<string, boolean> | null>(null);
  // Find the bank with the best effective rate (considering margins)
  const bestBank = mockBankData.reduce((prev, current) =>
    current.effectiveRate > prev.effectiveRate ? current : prev
  );
  useEffect(() => {
    // Set the best bank as selected by default
    setSelectedBank(bestBank.name);
  }, [bestBank.name]);

  // Automatically select the bank with the highest 'You Get (INR)' value
  useEffect(() => {
    if (!mockBankData.length) return;
    // Use liveRates if available, otherwise use effectiveRate
    const getConverted = (bank: typeof mockBankData[0]) => {
      return amount * bank.effectiveRate;
    };
    const bestBank = [...mockBankData].sort((a, b) => getConverted(b) - getConverted(a))[0];
    setSelectedBank(bestBank.name);
  }, [amount, liveRates]);

  useEffect(() => {
    const selectedBankData = mockBankData.find(bank => bank.name === selectedBank);
    if (selectedBankData) {
      const newGraphData = generateHistoricalData(90, selectedBankData.rate);
      setGraphData(newGraphData);
    }
  }, [selectedBank]);

  useEffect(() => {
    const fetchLiveRates = async () => {
      try {
        const response = await fetch('/api/live-rates');
        const data = await response.json();
        setLiveRates(data.rates);
        setLiveFlags(data.liveFlags);
      } catch (error) {
        console.error('Error fetching live rates:', error);
      }
    };

    fetchLiveRates();
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
            <BankComparison
              banks={mockBankData}
              selectedBank={selectedBank}
              onBankSelect={handleBankSelect}
              amount={amount}
              liveRates={liveRates}
              liveFlags={liveFlags}
            />
            <ExchangeRateGraph
              data={graphData}
              period={period}
              onPeriodChange={handlePeriodChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
