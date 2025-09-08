export interface BankData {
  name: string;
  rate: number;
  margin: number;
  effectiveRate: number;
  url: string;
  hasLiveRate?: boolean;
}
export interface HistoricalData {
  date: string;
  rate: number;
}
// Mock data for bank rates
export const mockBankData: BankData[] = [
  {
    name: "ICICI Bank",
    rate: 61.85,
    margin: 0.5,
    effectiveRate: 61.54,
    url: 'https://money2india.icicibank.com/newm2iNetSIN',
    hasLiveRate: true
  },
  {
    name: "Western Union",
    rate: 61.80,
    margin: 0.8,
    effectiveRate: 61.31,
    url: 'https://www.westernunion.com/',
    hasLiveRate: true
  },
  {
    name: "DBS Bank",
    rate: 61.95,
    margin: 0.3,
    effectiveRate: 61.76,
    url: 'https://www.dbs.com/digibank/in/send-money/remit-money-to-india'
  },
  {
    name: "SBI Bank",
    rate: 61.70,
    margin: 0.2,
    effectiveRate: 61.58,
    url: 'https://remit.onlinesbi.sbi/'
  },
  {
    name: "HDFC Bank",
    rate: 61.90,
    margin: 0.7,
    effectiveRate: 61.47,
    url: 'https://www.hdfcbank.com/personal/money-transfer/remittance-to-india'
  },
  {
    name: "Axis Bank",
    rate: 61.75,
    margin: 0.4,
    effectiveRate: 61.50,
    url: 'https://www.axisbank.com/retail/forex/axis-forex-online/send-money-to-india'
  }
];
// Generate mock historical data for the past 3 months
export const mockHistoricalData = {
  data: generateHistoricalData(90, mockBankData[0].rate),
  trend: 'up' as 'up' | 'down' | 'stable',
  volatility: 'low' as 'high' | 'medium' | 'low'
};
export function generateHistoricalData(days: number, baseRate: number = 61.5): HistoricalData[] {
  const data: HistoricalData[] = [];
  const today = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // Generate a slightly random rate that trends upward
    const randomFactor = Math.sin(i / 10) * 0.5 + (Math.random() * 0.4 - 0.2);
    const trendFactor = 0.01 * i; // Slight upward trend
    const rate = baseRate + randomFactor + trendFactor;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate: parseFloat(rate.toFixed(2))
    });
  }
  return data;
}