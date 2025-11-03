import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  roles: string[];
};

export type AuthState = {
  user: UserProfile | null;
  token: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error?: string;
  login: (payload: { user: UserProfile; token: string }) => void;
  logout: () => void;
  setLoading: () => void;
  setError: (message: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      status: 'idle',
      login: ({ user, token }) => set({ user, token, status: 'authenticated', error: undefined }),
      logout: () => set({ user: null, token: null, status: 'idle' }),
      setLoading: () => set({ status: 'loading', error: undefined }),
      setError: (message) => set({ status: 'error', error: message })
    }),
    { name: 'bitcoin24-auth' }
  )
);

export const selectIsAuthenticated = (state: AuthState) => state.status === 'authenticated' && !!state.user;
export const selectAuthToken = (state: AuthState) => state.token;
export const selectUserProfile = (state: AuthState) => state.user;
