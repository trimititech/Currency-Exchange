export interface BankData {
  name: string;
  rate: number;
  margin: number;
  effectiveRate: number;
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
    effectiveRate: 61.54
  },
  {
    name: "SBI Bank",
    rate: 61.70,
    margin: 0.2,
    effectiveRate: 61.58
  },
  {
    name: "HDFC Bank",
    rate: 61.90,
    margin: 0.7,
    effectiveRate: 61.47
  },
  {
    name: "Axis Bank",
    rate: 61.75,
    margin: 0.4,
    effectiveRate: 61.50
  },
  {
    name: "DBS Bank",
    rate: 61.95,
    margin: 0.3,
    effectiveRate: 61.76
  },
  {
    name: "HSBC",
    rate: 61.80,
    margin: 0.6,
    effectiveRate: 61.43
  },
  {
    name: "Canara Bank",
    rate: 61.65,
    margin: 0.3,
    effectiveRate: 61.47
  }
];
// Generate mock historical data for the past 3 months
export const mockHistoricalData = {
  data: generateHistoricalData(90),
  trend: 'up' as 'up' | 'down' | 'stable',
  volatility: 'low' as 'high' | 'medium' | 'low'
};
function generateHistoricalData(days: number): HistoricalData[] {
  const data: HistoricalData[] = [];
  const baseRate = 61.5;
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