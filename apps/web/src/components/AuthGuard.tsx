'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, selectIsAuthenticated, selectAuthToken } from '../stores/authStore';

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const token = useAuthStore(selectAuthToken);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated || !token) {
    return null;
  }

  return <>{children}</>;
};
