import { BankProvider, BankData } from "@/types/rates";

/**
 * Find slab for given amount
 */
function findSlabForAmount(slabs: BankProvider["slabs"], amount: number) {
  return (
    slabs.find(
      (slab) =>
        amount >= slab.minAmount &&
        (slab.maxAmount === undefined || amount <= slab.maxAmount)
    ) ?? slabs[0]
  );
}

/**
 * Map banks with slab rates/margins based on amount and midMarketRate
 * Returns BankData array with updated rates and margins
 */
export function mapBankRatesByAmount(
  bankProviders: BankData[],
  amount: number,
  midMarketRate: number
): BankData[] {
  return bankProviders.map((bank) => {
    const slab = findSlabForAmount(bank.slabs, amount);

    // Calculate effective rate based on midMarketRate and marginPercent
    const effectiveRate = midMarketRate * (1 + slab.marginPercent / 100);

    return {
      name: bank.name,
      id:bank.id,
    //   Not sure for this logic
      rate: effectiveRate, // official slab bankRate (may differ slightly from midMarketRate based)
      margin: slab.marginPercent,
      effectiveRate,
      url: bank.url ?? "",
      hasLiveRate: bank.hasLiveRate,
      slabs:bank.slabs
    };
  });
}