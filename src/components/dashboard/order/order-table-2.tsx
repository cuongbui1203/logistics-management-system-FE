import { ButtonDetail } from '@/components/button';
import { timestampToDate } from '@/lib/utils';
import { OrderSchemaType } from '@/schema/common.schema';

export default function OrderTable2({ listOrder }: { listOrder: OrderSchemaType[] }) {
  return (
    <table className="orderTable w-100">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Địa chỉ gửi</th>
          <th scope="col">Địa chỉ nhận</th>
          <th scope="col">Ngày tạo</th>
          <th scope="col">Loại</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {listOrder?.map((order) => {
          const badgeColor = 'secondary';
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.sender_address.ward} - {order.sender_address.district} - {order.sender_address.province}
              </td>
              <td>
                {order.receiver_address.ward} - {order.receiver_address.district} - {order.receiver_address.province}
              </td>
              <td>{timestampToDate(order.created_at)}</td>
              <td>
                <span className={`badge rounded-pill bg-${badgeColor} p-2`}>{order.type?.name}</span>
              </td>
              <td className="d-flex justify-content-center">
                <ButtonDetail url={`/dashboard/ordered/${order.id}/detail`} />
              </td>
            </tr>
          );
        })}
      </tbody>
      {listOrder.length === 0 ? (
        <caption>Không có đơn hàng nào</caption>
      ) : (
        <caption>Tổng số đơn hàng: {listOrder.length}</caption>
      )}
    </table>
  );
}
