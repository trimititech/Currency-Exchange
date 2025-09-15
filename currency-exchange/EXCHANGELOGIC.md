Perfect 👌 This is the kind of content you want in your **README or internal wiki** — clear, structured, and explaining the "why" behind your app’s logic.
Here’s a properly formatted documentation draft you can drop into your repo:

---

# 💱 How Global Money Transfer Works (and How Our App Calculates Rates)

This document explains the core logic behind our remittance comparison app.
The goal is to help developers (and contributors) understand **why exchange rates differ** between banks and how we calculate the **effective amount** for users.

---

## 🌍 Global Money Transfer Basics

1. **Mid-Market Rate (Benchmark)**

   * Every currency pair (e.g., SGD → INR, USD → EUR) has a “true” rate at any moment.
   * This rate comes from the **foreign exchange (FX) market**, where banks and institutions trade.
   * APIs like **Frankfurter, OpenExchangeRates, or XE** can provide this data.

   **Example:**

   ```
   Mid-market rate = 1 SGD = 61.85 INR
   ```

2. **Bank/Provider Margins**

   * Banks and money transfer companies **don’t give customers the raw mid-market rate**.
   * They add a **margin/spread** (profit), usually 0.5%–3%.

   **Example:**

   ```
   ICICI shows = 1 SGD = 61.50 INR
   Margin ≈ 0.56%
   ```

3. **Transaction Fees**

   * Some providers charge a **flat fee** (e.g., ₹500 per transfer).
   * Some advertise “zero fees” but hide profit inside the exchange rate margin.
   * Fintechs like **Wise** or **Revolut** separate the two (transparent pricing).

4. **Liquidity & Partnerships**

   * Banks source INR (or any currency) through different partners.
   * Costs for compliance, hedging, and regulatory processes affect final rates.

---

## 💡 Why Rates Differ Between Providers

* **Business model**

  * ICICI might subsidize rates to attract more inbound remittances.
  * Western Union focuses on global convenience → higher margin.

* **Volume & liquidity**

  * Big FX banks (DBS, Citi) handle higher trade volumes and can pass on better rates.

* **Regulation**

  * Some corridors (e.g., SGD → INR) are heavily regulated, raising costs.

* **Competition**

  * Common corridors (USD → INR) have tighter margins.
  * Niche corridors (SGD → Nepal) see bigger spreads.

---

## 🔧 How Our App Works

1. **Fetch Mid-Market Rate**

   * Use **Frankfurter API** (or similar) to get live rates, e.g.:

     ```
     GET https://api.frankfurter.app/latest?from=SGD&to=INR
     ```

2. **Estimate Bank/Provider Rates**

   * We maintain a **margin + fee config** for each provider.
   * Alternatively, rates can be scraped directly from providers’ official “send money” pages.

3. **Calculate Effective Amount**

   Formula:

   ```
   EffectiveRate = MidMarketRate - (MidMarketRate * Margin%)
   EffectiveAmount = TransferAmount * EffectiveRate - Fees
   ```

   Example:

   ```
   MidMarketRate = 61.85
   ICICI margin = 0.5%
   EffectiveRate = 61.85 - (61.85 * 0.005) = 61.54
   For 1,000 SGD → 61,540 INR
   ```

4. **Rank Providers**

   * After calculating for all banks/providers, we sort them by **EffectiveAmount**.
   * The user sees: *“Who gives you the most INR for 1,000 SGD?”*

5. **Web Scrapper**
    * Scrape Exchange Rates per 3 hours.