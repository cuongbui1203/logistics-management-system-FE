'use client';

import { OrderDetail } from '../../button';
import Pagination from '../pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';
import { addressApiRequest } from '@/api/address';
import { OrderSchemaType } from '@/schema/common.schema';
import { orderStatus } from '@/config/Enum';
import '@/css/dashboard/customTable.css';
import { orderApiRequest } from '@/api/order';

export default function OrderTable({ page, query, showFilter }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // const { dataRes: inforOrders, totalPages: totalPage, itemPerPage: itemPerPage } = getOrder(page || 1, query);
  // const userWorkingPointID = useSession()?.data?.user?.workingPointID;

  // let provinceData: AddressDetailSchemaType[] = [];
  const [listOrder, setListOrder] = useState<OrderSchemaType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await addressApiRequest.getProvinceClient().then((res) => {
        //   provinceData = res.payload.data;
        // });
        await orderApiRequest.getListOrder().then((res) => {
          setListOrder(res.payload.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  if (listOrder.length == 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2 flow-root">
      <div className="inline-block min-w-full">
        <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
          <table className="orderTable w-100">
            <thead>
              <tr>
                <th scope="col" className="col-sm-1">
                  ID
                </th>
                <th scope="col" className="col-md-6">
                  Địa chỉ gửi
                </th>
                <th scope="col" className="col-md-6">
                  Địa chỉ nhận
                </th>
                <th scope="col" className="col-sm-2">
                  Ngày tạo
                </th>
                <th scope="col" className="col-sm-2">
                  Loại
                </th>
                <th scope="col" className="col-sm-1"></th>
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
              {listOrder?.map((order) => {
                // const statusInfo = orderStatus[order?.goodsStatus] || {};
                // const badgeColor = statusInfo.color || 'secondary';
                const badgeColor = 'secondary';
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                      {order.sender_address.ward} - {order.sender_address.district} - {order.sender_address.province}
                    </td>
                    <td>
                      {order.receiver_address.ward} - {order.receiver_address.district} -{' '}
                      {order.receiver_address.province}
                    </td>
                    <td>{order.created_at}</td>
                    <td>
                      <span className={`badge rounded-pill bg-${badgeColor} p-2`}>{order.type?.name}</span>
                    </td>
                    <td className="d-flex justify-content-center">
                      <OrderDetail id={order.id} page={page} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination totalPage={1} />
    </div>
  );
}
