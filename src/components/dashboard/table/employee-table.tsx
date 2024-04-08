'use client';
import accountApiRequest from '@/api/account';
import { EmployeeDetail } from '@/components/dashboard/button';
import Pagination from '@/components/dashboard/pagination';
import { AccountList } from '@/schema/account.schema';
import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import '@/css/dashboard/customTable.css';
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
  let totalPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await accountApiRequest.listAccountClient().then((res) => {
          setListEmployees(res.payload.data.data);
          totalPage = res.payload.data.total;
          console.log(res.payload.data.data);
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

  const handleName = debounce('name');
  const handleEmID = debounce('EmId');
  const handleAddress = debounce('address');
  const handlePhone = debounce('phone');
  const handleStatus = debounce('status');

  // const {
  //   dataRes: inforEmployees,
  //   totalPage: totalPage,
  //   itemPerPage: itemPerPage,
  // } = getEmployee(page || 1, query);

  if (listEmployees.length == 0) return <p>Loading...</p>;

  return (
    <div>
      <div className="mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive ">
            <table className="employeeTable w-100">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Mã nhân viên</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Chức vụ</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
                {showFilter && (
                  <tr className="filter">
                    <th scope="col"></th>
                    <th scope="col">
                      <input onChange={(e) => handleEmID(e.target.value)} placeholder="Lọc theo mã nhân viên" />
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
                  </tr>
                )}
              </thead>
              <tbody className="table-group-divider">
                {listEmployees.map((employee, index) => {
                  // const statusInfo = employeeStatus[employee?.status] || {};
                  // const badgeColor = statusInfo.color || "secondary";
                  const badgeColor = 'secondary';

                  return (
                    <tr key={employee?.id}>
                      <td>{index + 1}</td>
                      <td>{employee?.id}</td>
                      <td>{employee.name || 'name'}</td>
                      <td>{employee?.work_plate?.name || ''}</td>
                      <td>
                        <span className={`badge rounded-pill bg-${badgeColor} p-2`}>{employee?.role.name}</span>
                      </td>
                      <td>{employee?.email || 'Không có'}</td>
                      <td className="d-flex justify-content-center">
                        <EmployeeDetail id={employee?.id} />
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
