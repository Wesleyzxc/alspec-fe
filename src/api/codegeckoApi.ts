import { UseQueryOptions } from 'react-query';

export interface CoinDTO {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: IRoiDTO | null;
  last_updated: string;
}

interface IRoiDTO {
  times: number;
  currency: string;
  percentage: number;
}

const GetCoinsKey = 'GetCoins';
export const getCoins = (config?: UseQueryOptions<any>) => ({
  queryKey: GetCoinsKey,
  queryFn: async () => {
    const results = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    return results;
  },
  ...config,
  staleTime: Infinity,
});
