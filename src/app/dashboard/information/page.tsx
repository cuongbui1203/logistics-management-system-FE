'use client';
import { getUserInfo } from '@/api/data';
import MainInformation from '@/components/dashboard/information/mainInfo';
import Preview from '@/components/dashboard/information/preview';
import Security from '@/components/dashboard/information/security';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Information() {
  const [currentPage, setCurrentPage] = useState('mainInformation');
  const session = useSession();
  if (!session.data?.token) {
    return null;
  }

  const dataInfo = getUserInfo(session.data?.token);

  const handleButtonClick = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Row>
        <Col xs="12" md="4">
          <Preview data={dataInfo} />
        </Col>

        <Col>
          <div>
            <button
              type="button"
              className={`btn btn-outline-primary ${currentPage === 'mainInformation' ? 'active' : ''}`}
              onClick={() => handleButtonClick('mainInformation')}
            >
              Thông tin
            </button>
            <button
              type="button"
              className={`btn btn-outline-primary ms-2 ${currentPage === 'security' ? 'active' : ''}`}
              onClick={() => handleButtonClick('security')}
            >
              Bảo mật
            </button>
          </div>
          <div className="row mt-3">
            {currentPage === 'mainInformation' && <MainInformation data={dataInfo} />}
            {currentPage === 'security' && <Security />}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
