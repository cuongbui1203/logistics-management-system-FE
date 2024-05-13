import { Container, Row, Col } from 'react-bootstrap';
import { FaAngleRight } from 'react-icons/fa6';
import Link from 'next/link';
import envConfig from '@/envConfig';
import style from '@/css/footer.module.css';

export function Footer() {
  const company = envConfig.NEXT_PUBLIC_COMPANY_NAME || 'Next.js App';

  return (
    <footer className={style.footer}>
      <Container className={style.container}>
        <Row className="min-w-100">
          <Col xs={12} lg={6}>
            <h3>TỔNG CÔNG TY CHUYỂN PHÁT {company}</h3>
            <p>Địa chỉ: Hà Nội</p>
            <p>Hotline: 0123 456 789</p>
          </Col>

          <Col xs={12} lg={3}>
            <h3>Về {company}</h3>
            <ul className={style.footerMenu}>
              <li>
                <Link href="/">
                  <FaAngleRight />
                  Lịch sử hình thành
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaAngleRight />
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={12} lg={3}>
            <h3>Tra cứu</h3>
            <ul className={style.footerMenu}>
              <li>
                <Link href="/">
                  <FaAngleRight />
                  Tra cứu bưu gửi
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaAngleRight />
                  Tra cứu bưu cục
                </Link>
              </li>
              <li>
                <Link href="/">
                  <FaAngleRight />
                  Ước tính chi phí
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
