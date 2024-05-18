'use client';

import { orderApiRequest } from '@/api/order';
import { GoodsType } from '@/config/Enum';
import { handleErrorApi } from '@/lib/utils';
import { OrderSchemaType } from '@/schema/common.schema';
import { GoodListReq, GoodListReqType } from '@/schema/order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa6';

export default function AddDetailOrder({
  orderId,
  nextStep,
}: {
  orderId: number;
  nextStep: (order: OrderSchemaType) => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<GoodListReqType>({
    resolver: zodResolver(GoodListReq),
    defaultValues: {
      data: [{ type_id: 10, name: '', mass: 0, desc: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
  });

  async function onSubmit(values: GoodListReqType) {
    console.log(values);
    try {
      await orderApiRequest.addGoodOrder(orderId, values).then((res) => {
        if (res.payload.success) {
          nextStep(res.payload.data);
        }
      });
    } catch (error) {
      handleErrorApi({ error, setError, message: 'Tạo đơn hàng thất bại' });
    }
  }

  function onError(err: any) {
    console.log(err);
  }

  const addRow = () => {
    append({ type_id: 10, name: '', mass: 0, desc: '', freight: 1 });
  };

  return (
    <Form className="container" onSubmit={handleSubmit(onSubmit, onError)}>
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
                onClick={addRow}
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
                  <th scope="col">Tên</th>
                  <th scope="col">Khối lượng thực</th>
                  <th scope="col">Chi tiết</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={index}>
                    <td scope="col">{index + 1}</td>
                    <td scope="col">
                      <select {...register(`data.${index}.type_id`)}>
                        {Object.keys(GoodsType).map((key) => {
                          const type = GoodsType[key as keyof typeof GoodsType];
                          return (
                            <option key={type.value} value={type.value}>
                              {type.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td scope="col">
                      <input type="text" {...register(`data.${index}.name`)} />
                    </td>
                    <td scope="col">
                      <input type="number" {...register(`data.${index}.mass`)} />
                    </td>
                    <td scope="col">
                      <input type="text" {...register(`data.${index}.desc`)} />
                    </td>
                    <td scope="col">
                      <button onClick={() => remove(index)} className="btn">
                        <FaTrash className="text-danger" />
                      </button>
                    </td>
                  </tr>
                ))}
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
          {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất'}
        </button>
      </div>
    </Form>
  );
}
