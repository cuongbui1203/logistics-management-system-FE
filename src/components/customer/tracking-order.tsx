import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import OrderProgress from './order-progress';
import { OrderSchemaType } from '@/schema/common.schema';
import { OrderStatus } from '@/config/Enum';

export default function OrderTracking({ data }: { data: OrderSchemaType }) {
  console.log(data);
  if (!data) {
    return null;
  }

  return (
    <Container className="lookUpContainer">
      <Row className="d-flex justify-content-between">
        <Col className="text-center mt-3" xs="12" md="auto">
          <Row>
            <strong>Số hiệu bưu gửi</strong>{' '}
          </Row>
          <Row>
            <p className="m-0">{data.id}</p>
          </Row>
        </Col>

        <Col className="text-center  mt-3" xs="6" md="auto">
          <Row>
            <strong>Địa chỉ gửi</strong>{' '}
          </Row>
          <Row>
            <p className="m-0">{data.sender_address.province}</p>
          </Row>
        </Col>

        <Col className="text-center  mt-3" xs="6" md="auto">
          <Row>
            <strong>Địa chỉ nhận</strong>{' '}
          </Row>
          <Row>
            <p className="m-0">{data.receiver_address.province}</p>
          </Row>
        </Col>

        <Col className="text-center  mt-3" xs="6" md="auto">
          <Row>
            <strong>Khối lượng</strong>{' '}
          </Row>
          <Row>
            <p className="m-0">{data.mass}g</p>
          </Row>
        </Col>

        <Col className="text-center  mt-3" xs="6" md="auto">
          <Row>
            <strong>Trạng thái</strong>
          </Row>
          <Row>
            <p>
              <span
                className={`badge rounded-pill bg-${OrderStatus[data.status_id as keyof typeof OrderStatus].color} p-2`}
              >
                {OrderStatus[data.status_id as keyof typeof OrderStatus].name}
              </span>
            </p>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <OrderProgress orderProcesses={data} />
        </Col>
      </Row>
    </Container>
  );
}
