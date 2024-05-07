import { Metadata } from 'next';
import { Container } from 'react-bootstrap';
import SideBar from '@/components/dashboard/sidebar';
import TopBar from '@/components/dashboard/topbar';
import '@/css/dashboard/dashboard.css';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="layout">
      <SideBar />
      <div id="main">
        <TopBar />
        <main className="p-3">
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}
