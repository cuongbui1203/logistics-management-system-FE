'use client';

import { Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { OrderCreateReq, OrderCreateReqType } from '@/schema/order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleErrorApi } from '@/lib/utils';
import AddressForm from '@/components/address-form';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { GoodsType } from '@/config/Enum';
import { orderApiRequest } from '@/api/order';
import { useAppContext } from '@/app/app-provider';

export default function CreateOrderForm({
  listProvince,
  onSubmit: nextStep,
}: {
  listProvince: AddressDetailSchemaType[];
  onSubmit: (orderId: number) => void;
}) {
  const { user } = useAppContext();
  const defaultValues = {
    provinceCode: user?.address?.provinceCode || '0',
    districtCode: user?.address?.districtCode || '0',
    wardCode: user?.address?.wardCode || '0',
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OrderCreateReqType>({
    resolver: zodResolver(OrderCreateReq),
    defaultValues: {
      sender_address_id: user?.address?.wardCode,
      type_id: 10,
    },
  });

  async function onSubmit(values: OrderCreateReqType) {
    console.log(values);
    try {
      await orderApiRequest.createOrder(values).then((res) => {
        if (res.payload.success) {
          nextStep(res.payload.data.id);
        }
      });
    } catch (error) {
      handleErrorApi({ error, setError, message: 'Tạo đơn hàng thất bại' });
    }
  }

  function onError(err: any) {
    console.log(err);
  }

  return (
    <Form className="container" onSubmit={handleSubmit(onSubmit, onError)}>
      {/* === Thông tin người gửi  ===*/}
      <div className="formContainer">
        <Row>
          <h3>Thông tin người gửi</h3>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="senderName">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" placeholder="Họ và tên" {...register('sender_name')} />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="senderPhoneNumber">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type="text" placeholder="Số điện thoại" {...register('sender_phone')} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-2">
          <Form.Group controlId="senderAddress">
            <Form.Label>Địa chỉ</Form.Label>
            <Row>
              <AddressForm
                listProvince={listProvince}
                register={register}
                fieldName="sender_address_id"
                defaultValues={defaultValues}
                disabledProvince
              />
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Control type="text" placeholder="Chi tiết" {...register('sender_address')} />
              </Col>
            </Row>
          </Form.Group>
        </Row>
      </div>

      {/* === Thông tin người nhận === */}
      <div className="formContainer">
        <Row>
          <h3>Thông tin người nhận</h3>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="receiverName">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" placeholder="Họ và tên" {...register('receiver_name')} />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="receiverPhoneNumber">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type="text" placeholder="Số điện thoại" {...register('receiver_phone')} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Form.Group controlId="receiverAddress">
            <Form.Label>Địa chỉ</Form.Label>
            <Row>
              <AddressForm listProvince={listProvince} register={register} fieldName="receiver_address_id" />
            </Row>
            <Row className="mt-2">
              <Col>
                <Form.Control type="text" placeholder="Chi tiết" {...register('receiver_address')} />
              </Col>
            </Row>
          </Form.Group>
        </Row>
      </div>
      <div className="formContainer">
        <Row>
          <h3>Các thông tin khác</h3>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Loại hàng</Form.Label>
              <Form.Select defaultValue={10} {...register('type_id')}>
                {Object.keys(GoodsType).map((key) => {
                  const type = GoodsType[key as keyof typeof GoodsType];
                  return (
                    <option key={type.value} value={type.value}>
                      {type.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Dịch vụ đặc biệt</Form.Label>
              <Form.Control placeholder="Dịch vụ đặc biệt" />
            </Form.Group>
          </Col>
        </Row>
      </div>
      {/* <div>
        <Row className="mb-4">
          <Col xs={12} md={6} className="mt-2">
            <div className="formContainer h-100 pb-0">
              <Row>
                <Col>
                  {' '}
                  <h3>Cước</h3>
                </Col>
                <Col>
                  <div className="col btnContainer">
                    <button
                      type="button"
                      className="btn btn-primary btnCreate"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={async () => {
                        // const res = await estimateFee(order);
                        // setEstimateCost(res);
                        // console.log(estimateCost);
                      }}
                    >
                      Ước tính chi phí
                    </button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Cước chính</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cước chính"
                      disabled
                      // value={estimateCost?.mainPostage}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Phụ phí</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phụ phí"
                      disabled
                      // value={estimateCost?.addedPostage}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Cước GTGT</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cước GTGT"
                      disabled
                      // value={estimateCost?.addedPostage}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Tổng cước</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tổng cước"
                      disabled
                      // value={estimateCost?.addedPostage}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Thu khác</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Cước GTGT"
                      disabled
                      // value={estimateCost?.addedPostage}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Tổng thu</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tổng thu"
                      disabled
                      // value={estimateCost?.addedPostage}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} md={6} className="mt-2">
            <div className="formContainer h-100">
              <Row>
                <h3>Thu của người nhận</h3>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>COD</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      placeholder="COD"
                      onChange={(e) => {
                        // order.order.receiverCOD = e.target.value;
                        // setReceiverFee({
                        //   receiverCOD: e.target.value,
                        //   receiverOtherFee: receiverFee.receiverOtherFee,
                        // });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Thu khác</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      placeholder="Thu khác"
                      onChange={(e) => {
                        // order.order.receiverOtherFee = e.target.value;
                        // setReceiverFee({
                        //   receiverCOD: receiverFee.receiverCOD,
                        //   receiverOtherFee: e.target.value,
                        // });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col>
                  <Form.Group>
                    <Form.Label>Tổng thu</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tổng thu"
                      // value={Number(receiverFee.receiverCOD) + Number(receiverFee.receiverOtherFee)}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div> */}

      <div className="btnContainer">
        <button
          className="btn btn-primary btnCreate"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang xử lý...' : 'Tạo đơn hàng'}
        </button>
      </div>
    </Form>
  );
}
