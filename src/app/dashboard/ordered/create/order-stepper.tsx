'use client';
import '@/css/dashboard/customForm.css';
import '@/css/dashboard/customTable.css';
import { useState } from 'react';
import { AddressDetailSchemaType, OrderSchemaType } from '@/schema/common.schema';
import { TiTick } from 'react-icons/ti';
import '@/css/stepper.css';
import CreateOrderForm from '@/components/dashboard/order/create-order-form';
import AddDetailOrder from '@/components/dashboard/order/add-detail-order';
import Invoice from '@/components/dashboard/order/invoice';

export default function OrderStepper({ listProvince }: { listProvince: AddressDetailSchemaType[] }) {
  const steps = ['Thông tin chung', 'Thông tin các gói hàng', 'Hoá đơn'];
  const [currentStep, setCurrentStep] = useState(1);
  const [orderId, setOrderId] = useState(0);
  const [order, setOrder] = useState<OrderSchemaType>();

  const onStepCreateOrder = (orderId: number) => {
    setOrderId(orderId);
    setCurrentStep(2);
  };

  const onStepAddDetailOrder = (order: OrderSchemaType) => {
    setOrder(order);
    setCurrentStep(3);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && 'active'} ${
              (i + 1 < currentStep || currentStep === step.length) && 'complete'
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || currentStep === step.length ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {currentStep === 1 ? (
        <CreateOrderForm listProvince={listProvince} onSubmit={onStepCreateOrder} />
      ) : currentStep === 2 ? (
        <AddDetailOrder orderId={orderId} nextStep={onStepAddDetailOrder} />
      ) : (
        order && <Invoice order={order} />
      )}
    </>
  );
}
