import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fromCurrency = searchParams.get('from');
  const toCurrency = searchParams.get('to');

  if (!fromCurrency || !toCurrency) {
    return NextResponse.json({ error: 'Missing from or to currency' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
    const rates = response.data.rates;
    const rate = rates[toCurrency.toUpperCase()];

    if (rate) {
      return NextResponse.json({ from: fromCurrency, to: toCurrency, rate });
    } else {
      return NextResponse.json({ error: `Exchange rate for ${toCurrency} not found` }, { status: 404 });
    }
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error fetching exchange rate:', error);
    return NextResponse.json({ error: 'Error fetching exchange rate', details: errorMessage }, { status: 500 });
  }
}
