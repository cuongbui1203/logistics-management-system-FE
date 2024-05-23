'use client';

import { OrderSchemaType } from '@/schema/common.schema';
import { Button } from 'react-bootstrap';
import { RiSendPlaneFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { orderApiRequest } from '@/api/order';
import { OrderMultiLeaveReqType } from '@/schema/order.schema';

export function LeaveOrderButton({ listOrder, mutate }: { listOrder: OrderSchemaType[]; mutate: () => void }) {
  const handleReceive = async () => {
    if (listOrder.length === 0) {
      toast.info('Hãy chọn ít nhất một đơn hàng để chuyển đi');
      return;
    }
    try {
      const data = listOrder.map((order) => {
        return order.id;
      });
      const body: OrderMultiLeaveReqType = {
        data: data,
      };
      await orderApiRequest.leaveOrder(body).then((res) => {
        if (res.payload.success) {
          toast.success('Chuyển đi thành công');
          mutate();
        }
      });
    } catch (error) {}
  };

  return (
    <Button onClick={handleReceive} className="btnCreate">
      <RiSendPlaneFill size={'2em'} />
      Chuyển hàng
    </Button>
  );
}
