'use client';

import accountApiRequest from '@/api/account';
import { EmployeeDelete, EmployeeDetail } from '@/components/button';
import Pagination from '@/components/dashboard/pagination';
import { AccountList } from '@/schema/auth.schema';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import '@/css/dashboard/customTable.css';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import useSWR from 'swr';
import Loading from '@/components/loading';

interface EmployeeTableProps {
  page?: number;
  query?: any;
  showFilter?: boolean;
}

export default function EmployeeTable({ page, query, showFilter }: EmployeeTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [listEmployees, setListEmployees] = useState<AccountList>([]);
  const [refresh, setRefresh] = useState(false);
  let totalPage = 1;

  const fetchData = () =>
    accountApiRequest.listAccountClient().then((res) => {
      // return res.payload.data;
      setListEmployees(res.payload.data.data);
      totalPage = res.payload.data.total;
      console.log(res.payload.data.data);
    });

  const { data, error, isLoading } = useSWR('listAccountClient', fetchData, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

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

  const handleName = useDebounce('name');
  const handleEmID = useDebounce('EmId');
  const handleAddress = useDebounce('address');
  const handlePhone = useDebounce('phone');
  const handleStatus = useDebounce('status');

  const [sort_Id, set_Sort_Id] = useState('id');
  const [sort_Order, set_Sort_Order] = useState('asc');

  const sortFunction = (f: string) => {
    if (f === 'id') {
      if (sort_Id === 'id') {
        set_Sort_Order(sort_Order === 'asc' ? 'desc' : 'asc');
      } else {
        set_Sort_Id('id');
        set_Sort_Order('asc');
      }
    }
    const sorted = [...listEmployees].sort((a, b) => {
      const multi = sort_Order === 'asc' ? 1 : -1;
      return multi * (a['id'] - b['id']);
    });
    setListEmployees(sorted);
  };

  // const {
  //   dataRes: inforEmployees,
  //   totalPage: totalPage,
  //   itemPerPage: itemPerPage,
  // } = getEmployee(page || 1, query);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
            <table className="employeeTable w-100">
              <thead>
                <tr>
                  <th scope="col" onClick={() => sortFunction('id')}>
                    ID {sort_Id === 'id' && (sort_Order === 'desc' ? <FaArrowUp /> : <FaArrowDown />)}
                  </th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Địa điểm làm việc</th>
                  <th scope="col">Chức vụ</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
                {showFilter && (
                  <tr className="filter">
                    <th scope="col">
                      <input onChange={(e) => handleEmID(e.target.value)} placeholder="Lọc theo ID" />
                    </th>
                    <th scope="col">
                      <input onChange={(e) => handleName(e.target.value)} placeholder="Lọc theo tên" />
                    </th>
                    {/* <th scope="col">
                      <select onChange={(e) => handleAddress(e.target.value)}>
                        <option value="">Chọn tỉnh/ thành phố</option>
                        {provinceData.map((province) => (
                          <option key={province.provinceIDnceID} value={province.provinceID}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </th>
                    <th scope="col">
                      <select onChange={(e) => handleStatus(e.target.value)}>
                        <option value="">Chọn trạng thái</option>
                        {Object.keys(employeeStatus).map((statusKey) => (
                          <option key={statusKey} value={statusKey}>
                            {employeeStatus[statusKey].name}
                          </option>
                        ))}
                      </select>
                    </th> */}
                    <th scope="col">
                      <input placeholder="Lọc theo sdt" onChange={(e) => handlePhone(e.target.value)} />
                    </th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                )}
              </thead>
              <tbody className="table-group-divider">
                {listEmployees.map((employee) => {
                  // const statusInfo = employeeStatus[employee?.status] || {};
                  // const badgeColor = statusInfo.color || "secondary";
                  const badgeColor = 'secondary';

                  return (
                    <tr key={employee?.id}>
                      <td>{employee?.id}</td>
                      <td>{employee.name || 'name'}</td>
                      <td>{employee?.work_plate?.name || ''}</td>
                      <td>
                        <span className={`badge rounded-pill bg-${badgeColor} p-2`}>{employee?.role.name}</span>
                      </td>
                      <td>{employee?.email || 'Không có'}</td>
                      <td className="d-flex justify-content-center gap-1">
                        <EmployeeDetail id={employee?.id} />
                        <EmployeeDelete id={employee?.id} onRefresh={() => setRefresh(true)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination totalPage={totalPage} />
    </div>
  );
}
