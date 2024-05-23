'use client';

import { OrderSchemaType } from '@/schema/common.schema';
import { Button } from 'react-bootstrap';
import { RiSendPlaneFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { orderApiRequest } from '@/api/order';
import { OrderMultiReceiveReqType } from '@/schema/order.schema';

export function ReceiveOrderButton({ listOrder, mutate }: { listOrder: OrderSchemaType[]; mutate: () => void }) {
  const handleReceive = async () => {
    if (listOrder.length === 0) {
      toast.info('Hãy chọn ít nhất một đơn hàng để nhận');
      return;
    }
    try {
      const data = listOrder.map((order) => {
        return {
          id: order.id,
          distance: 12,
        };
      });
      const body: OrderMultiReceiveReqType = {
        data: data,
      };
      await orderApiRequest.receiveOrder(body).then((res) => {
        if (res.payload.success) {
          toast.success('Nhận hàng thành công');
          mutate();
        }
      });
    } catch (error) {}
  };

  return (
    <Button onClick={handleReceive} className="btnCreate">
      <RiSendPlaneFill size={'2em'} />
      Nhận hàng
    </Button>
  );
}
