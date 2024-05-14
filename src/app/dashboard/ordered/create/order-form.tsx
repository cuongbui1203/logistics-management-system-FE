'use client';
import '@/css/dashboard/customForm.css';
import '@/css/dashboard/customTable.css';
import { useEffect, useState } from 'react';
// import {
//   getDistrictByProvinceID,
//   getCommuneByDistrictID,
//   getAllProvince,
// } from "@/api/data";
// import { createOrder, estimateFee } from "@/api/action";
import { FaTrash } from 'react-icons/fa';
import { Row, Col, Form } from 'react-bootstrap';
import PopUp from '../../../../components/dashboard/popup';
import { OrderCreateReq, OrderCreateReqType } from '@/schema/order.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { orderApiRequest } from '@/api/order';
import { handleErrorApi } from '@/lib/utils';
import { addressApiRequest } from '@/api/address';
import { toast } from 'react-toastify';
import AddressForm from '@/components/address-form';

const order = {
  order: {
    sender: {
      fullname: '',
      phoneNumber: '',
      address: {
        detail: '',
        communeID: '',
        districtID: '',
        provinceID: '',
      },
    },
    receiver: {
      fullname: '',
      phoneNumber: '',
      address: {
        detail: '',
        communeID: '',
        districtID: '',
        provinceID: '',
      },
    },
    failChoice: 'return',
    receiverCOD: 0,
    receiverOtherFee: 0,
    specialService: 'Some special services',
  },
  goodsList: [],
};
export default function OrderForm({ listProvince }: { listProvince: AddressDetailSchemaType[] }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OrderCreateReqType>({
    resolver: zodResolver(OrderCreateReq),
  });

  async function onSubmit(values: OrderCreateReqType) {
    console.log(values);
    try {
      // await orderApiRequest.createOrder(values).then((res) => {
      //   if (res.payload.success) {
      //     toast.success('Tạo đơn hàng thành công');
      //     // router.push('/dashboard/employee?created=true');
      //   }
      // });
    } catch (error) {
      handleErrorApi({ error, setError, message: 'Tạo đơn hàng thất bại' });
    }
  }
  // const [receiverCommune, setreceiverCommune] = useState();

  // const [addGoods, setAddGoods] = useState(false);

  // const [goodsList, setGoodsList] = useState([
  //   {
  //     id: 1,
  //     goodsType: "",
  //     realWeight: "",
  //     convertedWeight: "",
  //     quantity: "",
  //     attached: "",
  //   },
  // ]);

  // const addRow = () => {
  //   const newRow = {
  //     id: goodsList.length + 1,
  //     goodsType: "",
  //     realWeight: "",
  //     convertedWeight: "",
  //     quantity: "",
  //     attached: "",
  //   };
  //   setGoodsList([...goodsList, newRow]);
  // };

  // const removeRow = (id) => {
  //   const updatedGoodsList = goodsList.filter((row) => row.id !== id);
  //   setGoodsList(updatedGoodsList);
  // };

  const [popup, setPopup] = useState(false);
  const [estimateCost, setEstimateCost] = useState();
  const [receiverFee, setReceiverFee] = useState({
    receiverCOD: 0,
    receiverOtherFee: 0,
  });
  const [print, setPrint] = useState(false);

  return (
    <>
      {print || (
        <Form className="container" onSubmit={handleSubmit(onSubmit)}>
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
                  <AddressForm listProvince={listProvince} register={register} fieldName="sender_address_id" />
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
                  <Form.Label>Trường hợp vận chuyển thất bại</Form.Label>
                  <Form.Select defaultValue={'return'}>
                    <option value={'return'}>Hoàn trả</option>
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
          <div>
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
                          value={Number(receiverFee.receiverCOD) + Number(receiverFee.receiverOtherFee)}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          {/* === Thông tin hàng hóa === */}
          <div className="formContainer">
            <Row>
              <Col>
                <h3>Thông tin hàng hóa</h3>
              </Col>
              <Col>
                <div className="col btnContainer">
                  <button
                    type="button"
                    className="btn btn-primary btnCreate"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => {
                      // setAddGoods(true);
                      // addRow();
                    }}
                  >
                    Thêm hàng hóa
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="table-responsive">
                <table className="createOrderTable w-100 mt-2">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Loại hàng hóa</th>
                      <th scope="col">Đính kèm</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Khối lượng thực</th>
                      <th scope="col">Khối lượng chuyển đổi</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {goodsList.map((goods, index) => (
                      <tr key={goods.id}>
                        <td scope="col">{index + 1}</td>
                        <td scope="col">
                          <select
                            onChange={(e) => {
                              const updatedGoodsList = [...goodsList];
                              updatedGoodsList[index].goodsType =
                                e.target.value;
                              setGoodsList(updatedGoodsList);
                            }}
                          >
                            <option>Loại hàng hóa</option>
                            <option value="goods">Hàng hóa</option>
                            <option value="document">Tài liệu</option>
                          </select>
                        </td>
                        <td scope="col">
                          <input
                            // type="number"
                            value={goods.attached}
                            onChange={(e) => {
                              const updatedGoodsList = [...goodsList];
                              updatedGoodsList[index].attached = e.target.value;
                              setGoodsList(updatedGoodsList);
                            }}
                          />
                        </td>
                        <td scope="col">
                          <input
                            type="number"
                            value={goods.quantity}
                            onChange={(e) => {
                              const updatedGoodsList = [...goodsList];
                              updatedGoodsList[index].quantity = e.target.value;
                              setGoodsList(updatedGoodsList);
                            }}
                          />
                        </td>{" "}
                        <td scope="col">
                          <input
                            type="number"
                            value={goods.realWeight}
                            onChange={(e) => {
                              const updatedGoodsList = [...goodsList];
                              updatedGoodsList[index].realWeight =
                                e.target.value;
                              setGoodsList(updatedGoodsList);
                            }}
                          />
                        </td>
                        <td scope="col">
                          <input
                            type="number"
                            value={goods.convertedWeight}
                            onChange={(e) => {
                              const updatedGoodsList = [...goodsList];
                              updatedGoodsList[index].convertedWeight =
                                e.target.value;
                              setGoodsList(updatedGoodsList);
                            }}
                          />
                        </td>
                        <td scope="col">
                          <button
                            onClick={() => removeRow(goods.id)}
                            className="btn"
                          >
                            <FaTrash className="text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </Row>
          </div>
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
      )}
      {/* <PopUp
        isOpen={popup}
        setIsOpen={setPopup}
        infor={10000}
        functionCreate={createOrder}
        dataCreate={order}
        print={print}
        setPrint={setPrint}
      /> */}
    </>
  );
}
