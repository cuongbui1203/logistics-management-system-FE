'use client';

import { OrderSchemaType, WorkPlateSchemaType } from '@/schema/common.schema';
import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { RiSendPlaneFill } from 'react-icons/ri';
import OrderTable2 from './order-table-2';
import { toast } from 'react-toastify';
import style from '@/css/dashboard/order/send-order-button.module.css';
import { orderApiRequest } from '@/api/order';
import { OrderMultiSendReqType } from '@/schema/order.schema';

export function SendOrderButton({ listOrder, mutate }: { listOrder: OrderSchemaType[]; mutate: () => void }) {
  const [show, setShow] = useState(false);
  const [listWp, setListWp] = useState<WorkPlateSchemaType[]>([]);
  const [wpId, setWpId] = useState(0);

  const onSelectWp = (e: any) => {
    setWpId(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    if (listOrder.length === 0) {
      toast.info('Hãy chọn ít nhất một đơn hàng để gửi');
    } else {
      setShow(true);
      const listIds = listOrder.map((order) => order.id);
      console.log(listIds.join(','));
      await orderApiRequest.getNextPosition(listIds.join(',')).then((res) => {
        if (res.payload.success) {
          const data = res.payload.data;
          let listNoDuplicate: WorkPlateSchemaType[] = [];
          data.forEach((wp) => {
            if (!listNoDuplicate.some((item) => item.id === wp.id)) {
              listNoDuplicate.push(wp);
            }
          });
          setListWp(listNoDuplicate);
        }
      });
    }
  };

  const handleSend = async () => {
    try {
      if (wpId === 0) {
        toast.info('Hãy chọn địa điểm gửi hàng');
        return;
      }
      console.log(wpId);

      const data = listOrder.map((order) => {
        return {
          orderId: order.id,
          to_id: wpId,
        };
      });
      const body: OrderMultiSendReqType = {
        data: data,
      };
      await orderApiRequest.sendOrder(body).then((res) => {
        if (res.payload.success) {
          toast.success('Gửi hàng thành công');
          setShow(false);
          mutate();
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <Button onClick={handleShow} className="btnCreate">
        <RiSendPlaneFill size={'2em'} />
        Gửi hàng
      </Button>
      <Modal show={show} onHide={handleClose} size="xl" keyboard={false} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Gửi hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mt-2">
            <Col>
              <Form.Group className="col-sm-12 col-form-Form.Group">
                <Form.Label htmlFor="workplate">
                  <h5>Chọn địa điểm gửi hàng</h5>
                </Form.Label>
                <select id="workplate" className="form-select" defaultValue={'0'} onChange={onSelectWp}>
                  <option key={0} disabled value={'0'}>
                    Chọn địa điểm gửi hàng
                  </option>
                  {listWp?.map((wp) => (
                    <option key={wp.id} value={wp.id}>
                      {wp.name} - {wp.address.province}, {wp.address.district}, {wp.address.ward}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h5>Danh sách hàng hóa</h5>
              <OrderTable2 listOrder={listOrder} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
