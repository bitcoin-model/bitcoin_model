import { AuthenticatedShell } from '@/src/components/layout/AuthenticatedShell';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedShell>{children}</AuthenticatedShell>;
}
