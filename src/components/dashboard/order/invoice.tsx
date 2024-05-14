'use client';

import { Container, Row, Col, Table, Image } from 'react-bootstrap';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import '@/css/dashboard/invoice.css';
import envConfig from '@/envConfig';
import { timestampToDateTime } from '@/lib/utils';

export default function Invoice({ data }: any) {
  const company = envConfig.NEXT_PUBLIC_COMPANY_NAME || 'Next.js App';
  let orderData: any;
  if (data) {
    orderData = data;
  } else {
    orderData = tempData;
  }
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
                <p className="fw-bold m-0">Ngày đơn hàng: {timestampToDateTime(orderData?.created_at)}</p>
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
              <p>{orderData?.data?.goodsList[0]?.goodsType === 'goods' ? 'Hàng hóa' : 'Giấy tờ'}</p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Khối lượng</th>
                    <th className="text-center">Nội dung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{orderData?.details[0]?.name}</td>
                    <td className="text-center">{orderData?.details[0].mass}</td>
                    <td className="text-center">{orderData?.details[0].desc}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>

            <Row className="mt-2">
              <h5 className="fw-bold">Chỉ dẫn của người gửi khi không phát được bưu gửi</h5>
              <p>{orderData?.data?.order?.failChoice === 'return' ? 'Hoàn trả' : 'Khác'}</p>
            </Row>

            <Row className="mt-2">
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
                  {/* Khối lượng thực tế: {orderData?.data?.goodsList.reduce((total, item) => total + item.realWeight, 0)} */}
                </p>
                <p className="mb-1">
                  Khối lượng quy đổi:{' '}
                  {/* {orderData?.data?.goodsList.reduce((total, item) => total + item.convertedWeight, 0)} */}
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
            </Row>

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

const tempData = {
  id: 1,
  sender_name: 'Hazel Stoltenberg',
  sender_phone: '(609) 718-2517',
  receiver_name: 'Mrs. Nettie Swift MD',
  receiver_phone: '+1-562-924-4269',
  created_at: 1715595292,
  updated_at: 1715595292,
  vehicle_id: null,
  type_id: 10,
  status_id: 10,
  mass: 105455951,
  sender_address: {
    provinceCode: '25',
    districtCode: '232',
    wardCode: '08164',
    province: 'Tỉnh Phú Thọ',
    district: 'Huyện Thanh Ba',
    ward: 'Xã Hanh Cù',
    address: 'hn',
  },
  receiver_address: {
    provinceCode: '25',
    districtCode: '232',
    wardCode: '08164',
    province: 'Tỉnh Phú Thọ',
    district: 'Huyện Thanh Ba',
    ward: 'Xã Hanh Cù',
    address: 'hn',
  },
  type: {
    id: 10,
    name: 'normal',
  },
  notifications: [
    {
      id: 1,
      order_id: 1,
      from_id: 1,
      to_id: 1,
      status_id: 10,
      description: 'tét',
      created_at: '2024-05-13T10:14:52.000000Z',
      updated_at: '2024-05-13T10:14:52.000000Z',
      from_address: {
        provinceCode: '25',
        districtCode: '232',
        wardCode: '08164',
        province: 'Tỉnh Phú Thọ',
        district: 'Huyện Thanh Ba',
        ward: 'Xã Hanh Cù',
        address: 'hn',
      },
      to_address: {
        provinceCode: '25',
        districtCode: '232',
        wardCode: '08164',
        province: 'Tỉnh Phú Thọ',
        district: 'Huyện Thanh Ba',
        ward: 'Xã Hanh Cù',
        address: 'hn',
      },
    },
  ],
  details: [
    {
      id: 1,
      created_at: '2024-05-13T10:14:52.000000Z',
      updated_at: '2024-05-13T10:14:52.000000Z',
      order_id: 1,
      name: 'Nicola Goyette DDS',
      mass: 9704555,
      desc: 'Quas dicta quia dolores reiciendis qui dolorem. Delectus ipsa nemo cupiditate tenetur repudiandae sunt. Totam sint et aut esse alias doloribus corporis. Assumenda vitae maiores ut.',
      image_id: null,
    },
  ],
};
