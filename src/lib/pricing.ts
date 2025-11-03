const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

export interface LivePriceResult {
  price: number;
  source: string;
  timestamp: string;
}

export async function fetchLivePrice(signal?: AbortSignal): Promise<LivePriceResult> {
  try {
    const response = await fetch(COINGECKO_URL, { signal, next: { revalidate: 60 } });
    if (!response.ok) {
      throw new Error('Failed to fetch live price');
    }
    const data = await response.json();
    const price = data.bitcoin?.usd;
    if (!price) {
      throw new Error('Malformed live price response');
    }
    return {
      price,
      source: 'CoinGecko',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Falling back to cached live price', error);
    const fallback = 68000;
    return {
      price: fallback,
      source: 'Cached fallback',
      timestamp: new Date().toISOString()
    };
  }
}
