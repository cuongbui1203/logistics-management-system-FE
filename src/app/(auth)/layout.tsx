import { Container, Row, Col, Image } from 'react-bootstrap';
import style from '@/css/login.module.css';
import { Suspense } from 'react';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container fluid className={style.container}>
      <Suspense>
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col md={12} lg={6} xl={5} className={style.image}>
            <Image src="/login.png" fluid alt="Sample image" className="w-100 h-100" />
          </Col>
          <Col md={12} lg={6} xl={4} offset-xl-1="true">
            {children}
          </Col>
        </Row>
      </Suspense>
    </Container>
  );
}
