'use client';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/css/customer/lookUp.css';
import { SWRConfig } from 'swr';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const swrOption = [];
  return (
    <div className="lookUp">
      <div className="lookUpHeader">
        <Header />
        <Container>
          <SWRConfig
            value={{
              fetcher: (resource) => fetch(resource).then((res) => res.json()),
            }}
          >
            {children}
          </SWRConfig>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
