import { Container, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

export default function LookUpBanner({ title }: { title: string }) {
  return (
    <Container className="lookUpBanner">
      <Row>
        <Col md={5} xl={6} xxl={5} className="itemBanner">
          <h1>{title}</h1>
        </Col>
        <Col md={7} xl={6} xxl={7} className="itemBanner">
          <Image src="/look-up-banner.png" alt="look-up-banner" className="w-75"></Image>
        </Col>
      </Row>
    </Container>
  );
}
