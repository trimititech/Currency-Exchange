import { BankProvider } from "@/types/rates";

export const bankProviders: BankProvider[] = [
  {
    name: "ICICI Bank",
    id: "icici_bank",
    hasLiveRate: true,
    serviceCharge: "8 SGD up to 20,000, free after",
    slabs: [
      { minAmount: 0, maxAmount: 1999, bankRate: 68.1, marginPercent: 1.05 },
      {
        minAmount: 2000,
        maxAmount: 4999,
        bankRate: 68.15,
        marginPercent: 0.97,
      },
      { minAmount: 5000, maxAmount: 9999, bankRate: 68.2, marginPercent: 0.9 },
      {
        minAmount: 10000,
        maxAmount: 24999,
        bankRate: 68.25,
        marginPercent: 0.81,
      },
      {
        minAmount: 25000,
        maxAmount: 49999,
        bankRate: 68.3,
        marginPercent: 0.75,
      },
      {
        minAmount: 50000,
        maxAmount: 99999,
        bankRate: 68.35,
        marginPercent: 0.69,
      },
      { minAmount: 100000, bankRate: 68.45, marginPercent: 0.54 },
    ],
  },
  {
    name: "HDFC Bank",
    id: "hdfc_bank",
    hasLiveRate: false,
    serviceCharge: "Not specified",
    slabs: [
      { minAmount: 0, bankRate: 68.19, marginPercent: 1.17 }, // Single observed rate
    ],
  },
  {
    name: "SBI Singapore",
    id: "sbi_singapore",
    hasLiveRate: false,
    serviceCharge: "Not specified",
    slabs: [
      { minAmount: 0, maxAmount: 99999, bankRate: 67.81, marginPercent: 0.61 },
      { minAmount: 100000, bankRate: 67.89, marginPercent: 0.73 },
    ],
  },
  {
    name: "DBS Bank",
    id: "dbs_bank",
    hasLiveRate: true,
    serviceCharge: "Varies by service",
    slabs: [
      { minAmount: 0, bankRate: 68.15, marginPercent: 1.11 }, // Estimated rate
    ],
  },
  {
    name: "Western Union",
    id: "western_union",
    hasLiveRate: true,
    serviceCharge: "Varies by transfer and country",
    slabs: [
      { minAmount: 0, bankRate: 68.17, marginPercent: 1.14 }, // Approx. from online converter
    ],
  },
];

export const bankRateSlabs = {
  icici_bank: {
    name: "ICICI Bank",
    id: "icici_bank",
    hasLiveRate: true,
    serviceCharge: "8 SGD up to 20,000, free after",
    slabs: [
      { minAmount: 0, maxAmount: 1999, bankRate: 68.1, marginPercent: 1.05 },
      {
        minAmount: 2000,
        maxAmount: 4999,
        bankRate: 68.15,
        marginPercent: 0.97,
      },
      { minAmount: 5000, maxAmount: 9999, bankRate: 68.2, marginPercent: 0.9 },
      {
        minAmount: 10000,
        maxAmount: 24999,
        bankRate: 68.25,
        marginPercent: 0.81,
      },
      {
        minAmount: 25000,
        maxAmount: 49999,
        bankRate: 68.3,
        marginPercent: 0.75,
      },
      {
        minAmount: 50000,
        maxAmount: 99999,
        bankRate: 68.35,
        marginPercent: 0.69,
      },
      { minAmount: 100000, bankRate: 68.45, marginPercent: 0.54 },
    ],
  },
  hdfc_bank: {
    name: "HDFC Bank",
    id: "hdfc_bank",
    hasLiveRate: false,
    serviceCharge: "Not specified",
    slabs: [
      { minAmount: 0, bankRate: 68.19, marginPercent: 1.17 }, // Single observed rate
    ],
  },
  sbi_singapore: {
    name: "SBI Singapore",
    id: "sbi_singapore",
    hasLiveRate: false,
    serviceCharge: "Not specified",
    slabs: [
      { minAmount: 0, maxAmount: 99999, bankRate: 67.81, marginPercent: 0.61 },
      { minAmount: 100000, bankRate: 67.89, marginPercent: 0.73 },
    ],
  },
  dbs_bank: {
    name: "DBS Bank",
    id: "dbs_bank",
    hasLiveRate: true,
    serviceCharge: "Varies by service",
    slabs: [
      { minAmount: 0, bankRate: 68.15, marginPercent: 1.11 }, // Estimated rate
    ],
  },
  western_union: {
    name: "Western Union",
    id: "western_union",
    hasLiveRate: true,
    serviceCharge: "Varies by transfer and country",
    slabs: [
      { minAmount: 0, bankRate: 68.17, marginPercent: 1.14 }, // Approx. from online converter
    ],
  },
};