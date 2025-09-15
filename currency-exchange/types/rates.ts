// Type for each rate slab
export type RateSlab = {
  minAmount: number; // minimum SGD in this slab
  maxAmount?: number; // maximum SGD (optional, undefined means "infinity")
  bankRate: number; // rate offered by bank (INR per SGD)
  marginPercent: number; // spread vs mid-market (%)
};

// Type for each bank provider
export type BankProvider = {
  id: string;
  name: string;
  url?: string;
  hasLiveRate: boolean;
  serviceCharge?: string; // e.g. "8 SGD up to 20,000, free after"
  slabs: RateSlab[]; // all the slabs for this bank
};

export interface BankData {
  id:string;
  name: string;
  rate: number;
  margin: number;
  effectiveRate: number;
  url: string;
  hasLiveRate?: boolean;
  slabs: RateSlab[];
}

