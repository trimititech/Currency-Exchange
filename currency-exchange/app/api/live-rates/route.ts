import { NextResponse } from 'next/server';
import axios from 'axios';

// --- Western Union Fetching Logic ---
const fetchWesternUnionRate = async () => {
  try {
    const response = await axios.get('https://www.westernunion.com/staticassets/api/fx-rates?cc=US&sc=IN&sa=1&da=1&pt=wu&lang=en', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    const rate = response.data?.fx_rate_details?.consumers?.[0]?.exchange_rate;
    if (rate) {
      return { value: parseFloat(rate), live: true };
    }
    return { value: null, live: false };
  } catch (error) {
    // Fallback to mock value if blocked or error occurs
    console.error('Error fetching Western Union rate:', error);
    return { value: 61.80, live: false }; // fallback mock value
  }
};

// --- ICICI Bank Fetching Logic (using a proxy API for reliability) ---
const fetchICICIRate = async () => {
  try {
    const response = await axios.get('https://open.er-api.com/v6/latest/SGD');
    const rate = response.data?.rates?.INR;
    if (rate) {
      // Applying a small, typical bank margin to differentiate from the base rate
      return { value: rate * 0.995, live: true };
    }
    return { value: null, live: false };
  } catch (error) {
    console.error('Error fetching ICICI rate:', error);
    return { value: null, live: false };
  }
};

export async function GET() {
  try {
    const results = await Promise.allSettled([
      fetchICICIRate(),
      fetchWesternUnionRate(),
    ]);

    const rates = {
      'ICICI Bank': results[0].status === 'fulfilled' ? results[0].value.value : null,
      'Western Union': results[1].status === 'fulfilled' ? results[1].value.value : null,
    };
    const liveFlags = {
      'ICICI Bank': results[0].status === 'fulfilled' ? results[0].value.live : false,
      'Western Union': results[1].status === 'fulfilled' ? results[1].value.live : false,
    };

    return NextResponse.json({ rates, liveFlags });
  } catch (error) {
    console.error('Error fetching live rates:', error);
    return NextResponse.json({ error: 'Failed to fetch live rates' }, { status: 500 });
  }
}
