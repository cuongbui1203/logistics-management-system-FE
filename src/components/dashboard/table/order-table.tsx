'use client';

import { OrderDetail } from '../button';
import Pagination from '../pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from 'react';
import { addressApiRequest } from '@/api/address';
import { AddressDetailSchemaType } from '@/schema/common.schema';
import { orderStatus } from '@/config/Enum';
import '@/css/dashboard/customTable.css';

export default function OrderTable({ page, query, showFilter }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  // const { dataRes: inforOrders, totalPages: totalPage, itemPerPage: itemPerPage } = getOrder(page || 1, query);
  // const userWorkingPointID = useSession()?.data?.user?.workingPointID;

  let provinceData: AddressDetailSchemaType[] = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await addressApiRequest.getProvinceClient().then((res) => {
          provinceData = res.payload.data;
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const debounce = (type: string) =>
    useDebouncedCallback((term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set(type, term);
      } else {
        params.delete(type);
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);

  const handleID = debounce('orderID');
  const handleStartAd = debounce('startAddress');
  const handleEndAd = debounce('endAddress');

  const handleTimeCreate = debounce('timeCreate');
  const handleStatus = debounce('status');

  // const formatDateTime = (dateTimeString: any) => {
  //   const options = {
  //     year: 'numeric',
  //     month: 'numeric',
  //     day: 'numeric',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric',
  //   };
  //   const formattedDateTime = new Date(dateTimeString).toLocaleDateString('en-US', options);
  //   return formattedDateTime;
  // };

  return (
    <div className="mt-2 flow-root table">
      <div className="inline-block min-w-full ">
        <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive ">
          <table className="orderTable w-100">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Địa chỉ gửi</th>
                <th scope="col">Địa chỉ nhận</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Trạng thái</th>
                <th scope="col"></th>
              </tr>
              {showFilter && (
                <tr className="filter">
                  <th scope="col"></th>
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
                          {/* {orderStatus[statusKey].now} */}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col"></th>
                </tr>
              )}
            </thead>
            <tbody className="table-group-divider">
              {/* {inforOrders?.map((data, index) => {
                const statusInfo = orderStatus[data?.goodsStatus] || {};
                const badgeColor = statusInfo.color || 'secondary';
                return (
                  <tr key={data?.orderID}>
                    <td>{index + 1}</td>
                    <td>{data?.orderID}</td>
                    <td>{data?.startTransactionProvince}</td>
                    <td>{data?.endTransactionProvince}</td>
                    <td>{formatDateTime(data?.createdAt)}</td>
                    <td>
                      <span className={`badge rounded-pill bg-${badgeColor} p-2`}>{statusInfo.now}</span>
                    </td>
                    <td className="d-flex justify-content-center">
                      <OrderDetail id={data?.orderID} page={page} />
                    </td>
                  </tr>
                );
              })} */}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination totalPage={1} />
    </div>
  );
}
