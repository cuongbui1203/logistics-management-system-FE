import MainLayout from '@/components/dashboard/layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
