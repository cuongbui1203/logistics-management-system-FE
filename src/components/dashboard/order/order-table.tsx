'use client';

import { ButtonDetail, SendOrder } from '../../button';
import Pagination from '../pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { OrderSchemaType } from '@/schema/common.schema';
import { useOrder } from '@/lib/custom-hook';
import { ORDER_PAGE_SIZE } from '@/config/constant';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { LuArrowUpDown } from 'react-icons/lu';
// import style from '@/css/dashboard/table/ordered.module.css';
import { timestampToDate } from '@/lib/utils';
import { OrderStatusEnum } from '@/config/Enum';
import '@/css/dashboard/customTable.css';

interface OrderTableProps {
  showFilter: boolean;
  status: number;
}

export default function OrderTable({ showFilter, status }: OrderTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [sortId, setSortId] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<OrderSchemaType[]>([]);

  const page = Number(searchParams.get('page') || 1);

  const { data, error, isLoading, mutate } = useOrder(status, page);

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

  const useDebounce = (type: string) =>
    useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set(type, term);
      } else {
        params.delete(type);
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);

  const handleID = useDebounce('orderID');
  const handleStartAd = useDebounce('startAddress');
  const handleEndAd = useDebounce('endAddress');

  const handleTimeCreate = useDebounce('timeCreate');
  const handleStatus = useDebounce('status');

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('name');
    params.delete('id');
    params.delete('address');
    params.delete('role');
    replace(`${pathname}?${params.toString()}`);
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

  const listCheck: any = [];

  function handleCheckBox(e: any, order: any) {
    if (e.target.checked) {
      listCheck.push(order.id);
    } else if (!e.target.checked && listCheck.length > 0) {
      const index = listCheck.indexOf(order.id);
      listCheck.splice(index, 1);
    }
    console.log(listCheck);
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

  let title = 'Danh sách đơn hàng chờ gửi';

  switch (status) {
    case OrderStatusEnum.WAIT_F_DELIVERY:
      title = 'Danh sách đơn hàng chờ gửi';
      break;
    case OrderStatusEnum.R_DELIVERY || OrderStatusEnum.DONE:
      title = 'Lịch sử đơn hàng';
      break;
  }

  return (
    <div className="tableContainer">
      <div className="row">
        <div className="col">
          <h3>{title}</h3>
        </div>

        <div className={`col btnContainer`}>
          <SendOrder listOrder={isCheck} />
        </div>
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
                    <th scope="col"></th>
                  </tr>
                  {/* {showFilter && (
                <tr className="filter">
                  <th scope="col">
                    <input placeholder="Lọc theo mã đơn hàng" onChange={(e) => handleID(e.target.value)} />
                  </th>
                  <th scope="col">
                    <select defaultValue={query?.startAddress} onChange={(e) => handleStartAd(e.target.value)}>
                      <option disabled>Chọn tỉnh/ thành phố</option>
                      {provinceData.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <select defaultValue={query?.endAddress} onChange={(e) => handleEndAd(e.target.value)}>
                      <option value={''}>Chọn tỉnh/ thành phố</option>
                      {provinceData.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <input
                      type="date"
                      onChange={(e) => {
                        const date = String(e.target.value).replaceAll('-', '');
                        handleTimeCreate(date);
                      }}
                    />
                  </th>
                  <th scope="col">
                    <select defaultValue={query?.status} onChange={(e) => handleStatus(e.target.value)}>
                      <option value={''}>Trạng thái</option>
                      {Object.keys(orderStatus).map((statusKey) => (
                        <option key={statusKey} value={statusKey}>
                          {orderStatus[statusKey].now}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col"></th>
                </tr>
              )} */}
                </thead>
                <tbody className="table-group-divider">
                  {filerListOrder?.map((order) => {
                    // const statusInfo = orderStatus[order?.goodsStatus] || {};
                    // const badgeColor = statusInfo.color || 'secondary';
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
                        <td className="d-flex justify-content-center">
                          <ButtonDetail url={`/dashboard/ordered/${order.id}/detail`} />
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
