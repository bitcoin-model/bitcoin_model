export type Session = {
  user: { id: string; email: string; plan: 'free' | 'pro' };
  token: string;
} | null;

let mockSession: Session = null;

export const setMockSession = (session: Session) => {
  mockSession = session;
};

export const getSession = async (): Promise<Session> => {
  return mockSession;
};
