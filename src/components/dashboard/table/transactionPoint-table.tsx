'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../pagination';
import '@/css/dashboard/customTable.css';
import { WorkPlateResType } from '@/schema/workplate.schema';
import { WorkPlateDetail } from '@/components/button';
import { useWorkPlate } from '@/lib/custom-hook';
import { useState } from 'react';
import { WORK_PLATE_PAGE_SIZE } from '@/config/constant';
import Loading from '@/components/loading';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { LuArrowUpDown } from 'react-icons/lu';

interface TransactionPointTableProps {
  page: any;
  query: any;
  type: number;
}

export default function TransactionPointTable({ page, query, type }: TransactionPointTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [sortId, setSortId] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  const { data, error, isLoading, mutate } = useWorkPlate(page, type);

  const url = type === 2 ? '/dashboard/transaction' : '/dashboard/transshipment';

  let filerListWP: WorkPlateResType[] = data?.data || [];

  const total = data?.total || 1;
  const totalPage = Math.floor(total / WORK_PLATE_PAGE_SIZE) + (total % WORK_PLATE_PAGE_SIZE === 0 ? 0 : 1);

  if (sortId) {
    filerListWP = [...filerListWP].sort((a, b) => {
      const multi = sortOrder === 'asc' ? 1 : -1;
      return multi * (a['id'] - b['id']);
    });
  }

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

  const handleHeadName = (e: any) => {};
  const handleName = (e: any) => {};
  const handleAddress = (e: any) => {};
  const handleStartOrdersSort = (e: any) => {};
  const handleEndOrdersSort = (e: any) => {};

  // const handleHeadName = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('headName', term);
  //   } else {
  //     params.delete('headName');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  // const handleName = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('name', term);
  //   } else {
  //     params.delete('name');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  // const handleAddress = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('provinceID', term);
  //   } else {
  //     params.delete('provinceID');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  // const handleStartOrdersSort = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('startOrdersSort', term);
  //     params.delete('endOrdersSort');
  //   } else {
  //     params.delete('startOrdersSort');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);
  // const handleEndOrdersSort = useDebouncedCallback((term) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('endOrdersSort', term);
  //     params.delete('startOrdersSort');
  //   } else {
  //     params.delete('endOrdersSort');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }, 300);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive text-nowrap">
            <table className="transactionTable w-100">
              <thead>
                <tr>
                  <th scope="col" className="col-sm-1" onClick={() => sortFunction('id')}>
                    ID {sortId ? sortOrder === 'desc' ? <FaArrowUp /> : <FaArrowDown /> : <LuArrowUpDown />}
                  </th>
                  <th scope="col" className="col-sm-2">
                    Tên điểm
                  </th>
                  <th scope="col" className="col-sm-2">
                    Trưởng điểm
                  </th>
                  <th scope="col" className="col-sm-6">
                    Địa chỉ
                  </th>
                  <th scope="col"></th>
                  {/* <th scope="col">Đơn hàng đã nhận</th>
                  <th scope="col">Đơn hàng đã chuyển</th> */}
                </tr>
                {/* <tr className="filter">
                  <th scope="col"> </th>
                  <th scope="col">
                    <input onChange={(e) => handleName(e.target.value)} placeholder="Lọc theo tên điểm" />
                  </th>
                  <th scope="col">
                    <input onChange={(e) => handleHeadName(e.target.value)} placeholder="Lọc theo tên trưởng điểm" />
                  </th>
                  <th scope="col">
                    <select onChange={(e) => handleAddress(e.target.value)}>
                      <option value="">Chọn tỉnh/ thành phố</option>
                      {/* {provinceData.map((province) => (
                                                <option
                                                    key={province.provinceIDnceID}
                                                    value={province.provinceID}
                                                >
                                                    {province.name}
                                                </option>
                                            ))}
                    </select>
                  </th>
                  {/* <th scope="col">
                    <select onChange={(e) => handleEndOrdersSort(e.target.value)}>
                      <option value="">Sắp xếp theo</option>
                      <option value="ASC">Tăng</option>
                      <option value="DESC">Giảm</option>
                    </select>
                  </th>
                  <th scope="col">
                    <select onChange={(e) => handleStartOrdersSort(e.target.value)}>
                      <option value="">Sắp xếp theo</option>
                      <option value="ASC">Tăng</option>
                      <option value="DESC">Giảm</option>
                    </select>
                  </th> 
                </tr> */}
              </thead>
              <tbody className="table-group-divider">
                {filerListWP?.map((workPlate) => (
                  <tr key={workPlate.id}>
                    <td>{workPlate.id}</td>
                    <td>{workPlate.name}</td>
                    <td>{workPlate.manager?.name}</td>
                    <td>
                      {workPlate.address.ward}, {workPlate.address.district}, {workPlate.address.province}
                    </td>
                    {/* <td>{workPlate.type.name}</td>
                    <td>{workPlate.id}</td> */}
                    <td className="d-flex justify-content-center gap-1">
                      <WorkPlateDetail id={workPlate?.id} url={url} />
                      {/* <EmployeeDelete id={employee?.id} onRefresh={() => setRefresh(true)} /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalPage={totalPage} />
    </div>
  );
}
