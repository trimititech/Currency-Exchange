"use client";

import React, { useEffect, useState } from "react";
// import { Layout } from './components/Layout'
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { BankComparison } from "@/components/BankComparison";
import { ExchangeRateGraph } from "@/components/ExchangeRateGraph";
import { TransferSuggestion } from "@/components/TransferSuggestion";

import {
  // mockBankData,
  mockHistoricalData,
  generateHistoricalData,
} from "@/utils/mockData";
import { BankData, BankProvider } from "@/types/rates";
import { useLiveExchangeRate } from "@/hooks/use-live-exchangerate";
import { bankProviders } from "@/data/bank-data";
const mapProviderToBank = (bank: BankProvider) => {
  const firstSlab = bank.slabs[0];
  const rate = firstSlab.bankRate;
  const margin = firstSlab.marginPercent;
  // Calculate effectiveRate = rate after applying margin (assuming margin is positive % spread)
  // Effective rate could mean the cost rate after margin, but since bankRate already includes margin,
  // here effectiveRate just equals the bankRate
  const effectiveRate = rate;
  return {
    name: bank.name,
    rate,
    margin,
    effectiveRate,
    url: "", // Assuming url can be optional and may exist
    hasLiveRate: bank.hasLiveRate,
    id: bank.id,
    slabs: bank.slabs,
  };
};

export default function Home() {
  const [amount, setAmount] = useState<number>(1000);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [period, setPeriod] = useState<string>("1M");
  const [graphData, setGraphData] = useState(mockHistoricalData.data);
  // const [liveRates, setLiveRates] = useState<Record<
  //   string,
  //   number | null
  // > | null>(null);
  // const [liveFlags, setLiveFlags] = useState<Record<string, boolean> | null>(
  //   null
  // );
  const { rate: midMarketRate, loading } = useLiveExchangeRate();
  const [bankList, setBankList] = useState<BankData[]>(
    bankProviders.map(mapProviderToBank)
  );

  useEffect(() => {
    if (loading || midMarketRate === null) return;

    const updatedBanks = bankProviders.map((provider) => {
      const firstSlab = provider.slabs[0];
      const marginPercent = firstSlab.marginPercent;
      // Calculate bank rate from mid-market rate + margin
      const updatedRate = midMarketRate * (1 + marginPercent / 100);

      return {
        name: provider.name,
        margin: marginPercent,
        rate: updatedRate,
        effectiveRate: updatedRate,
        url: provider.url ?? "",
        hasLiveRate: provider.hasLiveRate,
        slabs: provider.slabs,
        id: provider.id,
      };
    });

    setBankList(updatedBanks);
  }, [midMarketRate, loading]);

  // Automatically select the bank with the highest effective rate
  useEffect(() => {
    if (!bankList.length) return;

    const bestBank = [...bankList].sort(
      (a, b) => b.effectiveRate - a.effectiveRate
    )[0];

    setSelectedBank(bestBank.name);
  }, [bankList]);

  useEffect(() => {
    const selectedBankData = bankList.find(
      (bank) => bank.name === selectedBank
    );
    if (selectedBankData) {
      const newGraphData = generateHistoricalData(90, selectedBankData.rate);
      setGraphData(newGraphData);
    }
  }, [selectedBank, bankList]);
 
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
              banks={bankList}
              selectedBank={selectedBank}
            />
            <TransferSuggestion
              trend={mockHistoricalData.trend}
              volatility={mockHistoricalData.volatility}
            />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <BankComparison
              banks={bankList}
              selectedBank={selectedBank}
              onBankSelect={handleBankSelect}
              amount={amount}
              // liveRates={liveRates}
              // liveFlags={liveFlags}
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
