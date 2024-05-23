'use client';

import React from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { OrderStatus } from '@/config/Enum';
import { useRouter, useSearchParams } from 'next/navigation';
import '@/css/dashboard/customTable.css';
import '@/css/dashboard/customForm.css';
import { useOrderDetail } from '@/lib/custom-hook';
import { timestampToDateTime } from '@/lib/utils';
import Spinning from '@/components/common/spinning';

export default function OrderDetail({ id }: { id: string }) {
  const page = useSearchParams().get('page');
  const router = useRouter();

  const { data: order, error, isLoading } = useOrderDetail(id);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <Spinning />;
  }

  return (
    <Container>
      {/* === Thông tin đơn hàng === */}
      <div className="formContainer">
        <Row>
          <h3>Thông tin đơn hàng</h3>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Mã đơn hàng</Form.Label>
              <Form.Control type="text" value={id} disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Loại đơn hàng</Form.Label>
              <Form.Control type="text" disabled value={order?.type.name} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12} md={6}>
            <Form.Group controlId="creator">
              <Form.Label>Nhân viên tạo đơn</Form.Label>
              <Form.Control type="text" value={order?.created_by.name} disabled />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="timeCreate">
              <Form.Label>Thời gian tạo</Form.Label>
              <Form.Control type="text" value={timestampToDateTime(order?.created_at || 0)} disabled />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Form.Group>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control
              type="text"
              value={OrderStatus[order?.status_id as keyof typeof OrderStatus]?.name}
              disabled
            />
          </Form.Group>
        </Row>
        {/* {orderStatus[order?.order?.goodsStatus]?.next && order?.order?.goodsStatus !== 'forwarded' && ( */}
        {/* <Row>
          <Col>
            <Button
              variant="warning"
              className="w-100 mt-3"
              // onClick={() => {
              //   updateProcessesOrder(
              //     order?.order?.processes?.pop()?.processID,
              //     orderStatus[order?.order?.goodsStatus].next.code
              //   );
              //   mutate(`https://magicpost-uet.onrender.com/api/order/getall/?page=${page}`);
              //   router.push(`/employees/list_ordered/?page=${page}`);
              // }}
            >
              {/* {orderStatus[order?.order?.goodsStatus]?.next.name} */}
        {/*  </Button>
          </Col>
        </Row> */}
        {/* )} */}
        {/* {orderStatus[order?.order?.goodsStatus]?.next && order?.order?.goodsStatus === 'forwarded' && onEndTran && ( */}
        {/* <Row>
          {orderStatus['forwarded'].next.map((e) => {
            return (
              <Col>
                <Button
                  variant="warning"
                  className="w-100 mt-3"
                  // onClick={() => {
                  //   updateProcessesOrder(order?.order?.processes?.pop()?.processID, e.code);
                  //   mutate(`https://magicpost-uet.onrender.com/api/order/getall/?page=${page}`);
                  //   router.push(`/employees/list_ordered/?page=${page}`);
                  // }}
                >
                  {e.name}
                </Button>
              </Col>
            );
          })}
        </Row> */}
        {/* )} */}
      </div>

      <div>
        <Row>
          <Col xs={12} md={6}>
            <div className="formContainer">
              <Row>
                <h3>Thông tin người gửi</h3>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="senderName">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control type="text" value={order?.sender_name} disabled />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="senderPhoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" value={order?.sender_phone} disabled />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Form.Group controlId="addressDetail">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        order?.sender_address.ward +
                        ', ' +
                        order?.sender_address.district +
                        ', ' +
                        order?.sender_address.province
                      }
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="formContainer">
              <Row>
                <h3>Thông tin người nhận</h3>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group controlId="receiverName">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control type="text" value={order?.receiver_name} disabled />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="receiverPhoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" value={order?.receiver_phone} disabled />
                  </Form.Group>
                </Col>
              </Row>

              {/* Dia chi chi tiet */}
              <Row className="mt-2">
                <Col>
                  <Form.Group controlId="addressDetail">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      value={
                        order?.receiver_address.ward +
                        ', ' +
                        order?.receiver_address.district +
                        ', ' +
                        order?.receiver_address.province
                      }
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      {/* Thong tin hang hoa */}
      <div className="formContainer">
        <Row>
          <Col>
            <h3>Thông tin hàng hóa</h3>
          </Col>
        </Row>

        <Row className="p-2 table-responsive">
          <table className="createOrderTable table-hover table-bordered table-stripe">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên hàng hóa</th>
                {/* <th>Loại hàng hóa</th> */}
                {/* <th>Số lượng</th> */}
                <th>Khối lượng thực</th>
                <th>Mô tả</th>
                {/* <th>Khối lượng chuyển đổi</th> */}
                {/* <th>Đính kèm</th> */}
              </tr>
            </thead>
            <tbody>
              {order?.details?.map((good, index) => (
                <tr key={good.id}>
                  <td>{index + 1}</td>
                  <td>{good.name}</td>
                  <td>{good.mass}</td>
                  <td>{good.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      </div>
    </Container>
  );
}
