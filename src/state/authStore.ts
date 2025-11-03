'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

interface AuthState {
  user: UserProfile | null;
  onboardingComplete: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  signup: (payload: { email: string; password: string; username: string }) => Promise<void>;
  logout: () => void;
  markOnboardingComplete: () => void;
}

interface StoredUser extends UserProfile {
  password: string;
}

const USERS_KEY = 'bitcoin-model-users';

const storage = createJSONStorage(() => localStorage);

function loadUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse users', error);
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      onboardingComplete: false,
      async login({ email, password }) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const users = loadUsers();
        const existing = users.find((item) => item.email === email && item.password === password);
        if (!existing) {
          throw new Error('Invalid credentials');
        }
        set({ user: existing, onboardingComplete: true });
      },
      async signup({ email, password, username }) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const users = loadUsers();
        if (users.some((item) => item.email === email)) {
          throw new Error('Account already exists');
        }
        const user: StoredUser = {
          id: nanoid(),
          email,
          username,
          createdAt: new Date().toISOString(),
          password
        };
        users.push(user);
        saveUsers(users);
        set({ user, onboardingComplete: true });
      },
      logout() {
        set({ user: null, onboardingComplete: false });
      },
      markOnboardingComplete() {
        set({ onboardingComplete: true });
      }
    }),
    {
      name: 'auth-store',
      storage,
      partialize: (state) => ({ user: state.user, onboardingComplete: state.onboardingComplete })
    }
  )
);
