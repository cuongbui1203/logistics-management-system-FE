import { Container } from 'react-bootstrap';
import '@/css/customer/lookUp.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lookUp">
      <div className="lookUpHeader">
        <Header />
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  );
}
