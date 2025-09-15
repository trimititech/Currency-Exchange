import { NextResponse } from "next/server";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  const url = `https://open.er-api.com/v6/latest/sgd`;
  try {
    const response = await axios.get(url, {});
    console.log({ response });
    if (
      !response.data ||
      !response.data.rates ||
      response.data.rates.INR === undefined
    ) {
      return NextResponse.json(
        { error: "INR rate not found in response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ rate: response.data.rates.INR });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          error.response?.data?.message ||
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          error.message ||
          "Internal Server Error",
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      { status: error.response?.status || 500 }
    );
  }
  // return
  // const { searchParams } = new URL(request.url);
  // const fromCurrency = searchParams.get('from');
  // const toCurrency = searchParams.get('to');

  // if (!fromCurrency || !toCurrency) {
  //   return NextResponse.json({ error: 'Missing from or to currency' }, { status: 400 });
  // }

  // try {
  //   const response = await axios.get(`https://open.er-api.com/v6/latest/${fromCurrency}`);
  //   const rates = response.data.rates;
  //   const rate = rates[toCurrency.toUpperCase()];

  //   if (rate) {
  //     return NextResponse.json({ from: fromCurrency, to: toCurrency, rate });
  //   } else {
  //     return NextResponse.json({ error: `Exchange rate for ${toCurrency} not found` }, { status: 404 });
  //   }
  // } catch (error) {
  //   let errorMessage = 'An unknown error occurred';
  //   if (error instanceof Error) {
  //     errorMessage = error.message;
  //   }
  //   console.error('Error fetching exchange rate:', error);
  //   return NextResponse.json({ error: 'Error fetching exchange rate', details: errorMessage }, { status: 500 });
  // }
}
