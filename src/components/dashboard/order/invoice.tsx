'use client';

import { Container, Row, Col, Table, Image } from 'react-bootstrap';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import '@/css/dashboard/invoice.css';
import envConfig from '@/envConfig';
import { timestampToDateTime } from '@/lib/utils';
import { useOrderDetail } from '@/lib/custom-hook';
import { OrderSchemaType } from '@/schema/common.schema';

export default function Invoice({ order: orderData }: { order: OrderSchemaType }) {
  const company = envConfig.NEXT_PUBLIC_COMPANY_NAME || 'Next.js App';

  const componentRef = useRef<HTMLDivElement>(null);
  return (
    <div id="invoice">
      <Container className="bg-white rounded shadow">
        <div ref={componentRef} className="p-5">
          <div className="p-5">
            <Row className="text-center">
              <h1 className="fw-bold">{company}</h1>
            </Row>

            <Row className="mt-2">
              <Col xs="3" className="d-flex justify-content-center">
                <Image src="/demoQR.png" alt="demo" className="w-50" />
              </Col>

              <Col className="text-end d-flex flex-column justify-content-center">
                <p className="fw-bold m-0">Mã đơn hàng: {orderData?.id}</p>
                <p className="fw-bold m-0">Ngày đơn hàng: {timestampToDateTime(orderData?.created_at || 0)}</p>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col>
                <h5 className="fw-bold">Người gửi: {orderData?.sender_name}</h5>
                <p className="mb-1">
                  Địa chỉ: {orderData?.sender_address?.address}, {orderData?.sender_address?.ward},{' '}
                  {orderData?.sender_address?.district}, {orderData?.sender_address?.province}
                </p>
                <p className="mb-1">Điện thoại: {orderData?.sender_phone}</p>
              </Col>
              <Col className="text-end">
                <h5 className="fw-bold">Người nhận: {orderData?.receiver_name}</h5>
                <p className="mb-1">
                  Địa chỉ: {orderData?.receiver_address?.address}, {orderData?.receiver_address?.ward},{' '}
                  {orderData?.receiver_address?.district}, {orderData?.receiver_address?.province}
                </p>
                <p className="mb-1">Điện thoại: {orderData?.receiver_phone}</p>
              </Col>
            </Row>

            <Row className="mt-2">
              <h5 className="fw-bold">Loại hàng gửi</h5>
              <p>{orderData?.type.name}</p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Khối lượng</th>
                    <th className="text-center">Nội dung</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.details.map((detail, index) => (
                    <tr key={index}>
                      <td>{detail.name}</td>
                      <td className="text-center">{detail.mass}</td>
                      <td className="text-center">{detail.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>

            {/* <Row className="mt-2">
              <Col>
                <h5 className="fw-bold">Cước</h5>
                <p className="mb-1">Cước chính: {orderData?.data?.order?.mainPostage}</p>
                <p className="mb-1">Phụ phí: {orderData?.data?.order?.addedPostage}</p>
                <p className="mb-1">Cước GTGT: {orderData?.data?.order?.VATFee}</p>
                <p className="mb-1">
                  Tổng cước:{' '}
                  {orderData?.data?.order?.mainPostage +
                    orderData?.data?.order?.addedPostage +
                    orderData?.data?.order?.VATFee}
                </p>
                <p className="mb-1">
                  Tổng thu:{' '}
                  {orderData?.data?.order?.mainPostage +
                    orderData?.data?.order?.addedPostage +
                    orderData?.data?.order?.VATFee}
                </p>
              </Col>
              <Col className="text-end">
                <h5 className="fw-bold">Khối lượng </h5>
                <p className="mb-1">
                  {/* Khối lượng thực tế: {orderData?.data?.goodsList.reduce((total, item) => total + item.realWeight, 0)} 
                </p>
                <p className="mb-1">
                  Khối lượng quy đổi:{' '}
                  {/* {orderData?.data?.goodsList.reduce((total, item) => total + item.convertedWeight, 0)} 
                </p>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col>
                <h5 className="fw-bold">Thu của người nhận</h5>
                <p className="mb-1">COD: {orderData?.data?.order?.receiverCOD}</p>
                <p className="mb-1">Thu khác: {orderData?.data?.order?.receiverOtherFee}</p>
                <p className="mb-1">
                  Tổng thu: {orderData?.data?.order?.receiverCOD + orderData?.data?.order?.receiverOtherFee}
                </p>
              </Col>
              <Col className="text-end">
                <h5 className="fw-bold">Chữ kí của người gửi</h5>
              </Col>
            </Row> */}

            <Row className="text-center mt-5">
              <h5>Hotline: 302131</h5>
            </Row>
          </div>
        </div>
      </Container>
      <div className="d-flex justify-content-center m-3">
        <ReactToPrint
          trigger={() => <button className="btn btn-primary rounded-pill">In hóa đơn</button>}
          content={() => componentRef.current}
        />
        <button onClick={() => window.history.back()} className="btn btn-secondary ms-2 rounded-pill">
          Quay lại
        </button>
      </div>
    </div>
  );
}
