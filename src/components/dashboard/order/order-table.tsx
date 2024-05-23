'use client';

import { ButtonDetail } from '../../button';
import Pagination from '../pagination';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { OrderSchemaType } from '@/schema/common.schema';
import { useOrder } from '@/lib/custom-hook';
import { ORDER_PAGE_SIZE } from '@/config/constant';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { LuArrowUpDown } from 'react-icons/lu';
// import style from '@/css/dashboard/table/ordered.module.css';
import { timestampToDate } from '@/lib/utils';
import { OrderStatus, OrderStatusEnum, OrderTableType, UserRole } from '@/config/Enum';
import '@/css/dashboard/customTable.css';
import { SendOrderButton } from './send-order-button';
import { OrderDeleteButton } from './delete-order-button';
import { ReceiveOrderButton } from './receive-order-button';
import { useAppContext } from '@/app/app-provider';
import { LeaveOrderButton } from './leave-order-button';

interface OrderTableProps {
  showFilter: boolean;
  type: OrderTableType;
}

export default function OrderTable({ type }: OrderTableProps) {
  const searchParams = useSearchParams();
  const [sortId, setSortId] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<OrderSchemaType[]>([]);

  const { user } = useAppContext();
  const role = user?.role.name;

  const page = Number(searchParams.get('page') || 1);

  const { data, error, isLoading, mutate } = useOrder(type, page);

  const total = data?.total || 1;
  const totalPage = Math.floor(total / ORDER_PAGE_SIZE) + (total % ORDER_PAGE_SIZE === 0 ? 0 : 1);

  const sortFunction = (f: string) => {
    if (f === 'id') {
      if (sortId) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortId(true);
        setSortOrder('asc');
      }
    }
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  let filerListOrder: OrderSchemaType[] = data?.data || [];

  if (sortId) {
    filerListOrder = [...filerListOrder].sort((a, b) => {
      const multi = sortOrder === 'asc' ? 1 : -1;
      return multi * (a['id'] - b['id']);
    });
  }

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    if (isCheckAll) {
      setIsCheck([]);
    } else {
      setIsCheck([...filerListOrder]);
    }
  };

  const handleClick = (e: any, order: OrderSchemaType) => {
    const { checked } = e.target;

    // setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== order));
    } else {
      setIsCheck([...isCheck, order]);
    }
  };

  console.log(isCheck.length);

  let title = '';
  let button = null;

  switch (type) {
    case OrderTableType.Waiting:
      title = 'Danh sách đơn hàng chờ gửi';
      button = <SendOrderButton listOrder={isCheck} mutate={mutate} />;
      break;
    case OrderTableType.Receiving:
      title = 'Danh sách đơn hàng chờ nhận';
      button = <ReceiveOrderButton listOrder={isCheck} mutate={mutate} />;
      break;
    case OrderTableType.Leave:
      title = 'Danh sách đơn hàng chuyển đi';
      button = role === UserRole.Driver ? <LeaveOrderButton listOrder={isCheck} mutate={mutate} /> : null;
      break;
    case OrderTableType.History:
      title = 'Lịch sử đơn hàng';
      break;
  }

  return (
    <div className="tableContainer">
      <div className="row">
        <div className="col">
          <h3>{title}</h3>
        </div>

        <div className={`col btnContainer`}>{button}</div>
      </div>

      <div className="row mt-2">
        <div className="mt-2 flow-root">
          <div className="inline-block min-w-full">
            <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
              <table className="orderTable w-100">
                <thead>
                  <tr>
                    <th scope="col">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isCheckAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th scope="col" onClick={() => sortFunction('id')}>
                      ID {sortId ? sortOrder === 'desc' ? <FaArrowUp /> : <FaArrowDown /> : <LuArrowUpDown />}
                    </th>
                    <th scope="col">Địa chỉ gửi</th>
                    <th scope="col">Địa chỉ nhận</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {filerListOrder?.map((order) => {
                    const statusId = order.notifications[order.notifications.length - 1].status_id;
                    const statusColor = OrderStatus[statusId as keyof typeof OrderStatus].color;
                    const badgeColor = 'secondary';
                    return (
                      <tr key={order.id}>
                        <td scope="row">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isCheck.includes(order)}
                            onChange={(e) => {
                              handleClick(e, order);
                            }}
                          />
                        </td>
                        <td>{order.id}</td>
                        <td>
                          {order.sender_address.ward} - {order.sender_address.district} -{' '}
                          {order.sender_address.province}
                        </td>
                        <td>
                          {order.receiver_address.ward} - {order.receiver_address.district} -{' '}
                          {order.receiver_address.province}
                        </td>
                        <td>{timestampToDate(order.created_at)}</td>
                        <td>
                          <span className={`badge rounded-pill bg-${badgeColor} p-2`}>{order.type?.name}</span>
                        </td>
                        <td>
                          <span className={`badge rounded-pill bg-${statusColor} p-2`}>
                            {OrderStatus[statusId as keyof typeof OrderStatus].name}
                          </span>
                        </td>
                        <td className="d-flex justify-content-center gap-1">
                          <ButtonDetail url={`/dashboard/ordered/${order.id}/detail`} />
                          <OrderDeleteButton id={order.id} refresh={mutate} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {filerListOrder.length === 0 ? (
                  <caption>Không có đơn hàng nào</caption>
                ) : (
                  <caption>Tổng số đơn hàng: {total}</caption>
                )}
              </table>
            </div>
          </div>
          <Pagination totalPage={totalPage} />
        </div>
      </div>
    </div>
  );
}
