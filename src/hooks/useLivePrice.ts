'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLivePrice } from '@/src/lib/pricing';

export function useLivePrice() {
  return useQuery({
    queryKey: ['live-price'],
    queryFn: () => fetchLivePrice(),
    refetchInterval: 60_000,
    staleTime: 30_000
  });
}
