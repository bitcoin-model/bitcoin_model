'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fadeInUp } from '@bitcoin24/ui';
import { usePricingStore, selectLatestPrice } from '../stores/pricingStore';
import { fetchLatestPrice } from '../lib/pricing';

export const PricingTicker = () => {
  const setLatest = usePricingStore((state) => state.setLatest);
  const latest = usePricingStore(selectLatestPrice);

  const { data, isFetching } = useQuery({
    queryKey: ['pricing', 'latest'],
    queryFn: fetchLatestPrice,
    refetchInterval: 30_000
  });

  useEffect(() => {
    if (data) {
      setLatest(data);
    }
  }, [data, setLatest]);

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex w-full items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">Live Price</p>
        <p className="font-display text-2xl text-[var(--color-text-primary)]">
          {latest ? `$${latest.priceUsd.toLocaleString()}` : 'Loading...'}
        </p>
      </div>
      <span className="text-xs text-[var(--color-text-secondary)]">{isFetching ? 'Refreshing' : latest?.source ?? 'API'}</span>
    </motion.div>
  );
};
