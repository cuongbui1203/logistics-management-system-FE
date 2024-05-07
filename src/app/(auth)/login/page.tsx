import { LoginForm } from '@/app/(auth)/login/login-form';
import { Container, Row, Col, Image } from 'react-bootstrap';
import style from '@/css/login.module.css';

export default function Login() {
  return (
    <Container fluid className={style.container}>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={12} lg={6} xl={5} className={style.image}>
          <Image src="/login.png" fluid alt="Sample image" className="w-100 h-100" />
        </Col>
        <Col md={12} lg={6} xl={4} offset-xl-1="true">
          <LoginForm />;
        </Col>
      </Row>
    </Container>
  );
}
