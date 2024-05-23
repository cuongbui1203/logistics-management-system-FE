'use client';

import { ButtonDetail, EmployeeDelete } from '@/components/button';
import Pagination from '@/components/dashboard/pagination';
import { AccountList } from '@/schema/auth.schema';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import '@/css/dashboard/customTable.css';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import Loading from '@/components/loading';
import { LuArrowUpDown } from 'react-icons/lu';
import { EMPLOYEE_PAGE_SIZE } from '@/config/constant';
import { useEmployee } from '@/lib/custom-hook';
import { RoleId } from '@/config/Enum';
import Spinning from '@/components/common/spinning';

interface EmployeeTableProps {
  showFilter?: boolean;
}

export default function EmployeeTable({ showFilter }: EmployeeTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [sortId, setSortId] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  const page = Number(searchParams.get('page') || 1);

  const { data, error, isLoading, mutate } = useEmployee(page);

  if (searchParams.get('created')) {
    mutate();
  }

  const total = data?.total || 1;
  const totalPage = Math.floor(total / EMPLOYEE_PAGE_SIZE) + (total % EMPLOYEE_PAGE_SIZE === 0 ? 0 : 1);

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

  const handleName = useDebounce('name');
  const handleID = useDebounce('id');
  const handleAddress = useDebounce('address');
  const handleRole = useDebounce('role');

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('name');
    params.delete('id');
    params.delete('address');
    params.delete('role');
    replace(`${pathname}?${params.toString()}`);
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Spinning />;

  let filerListEmployees: AccountList = data?.data || [];

  const queryName = searchParams.get('name');
  const queryId = searchParams.get('id');
  const queryAddress = searchParams.get('address');
  const queryRole = searchParams.get('role');

  if (queryName) {
    filerListEmployees = filerListEmployees.filter((employee) => {
      return employee.name.toLowerCase().includes(queryName.toLowerCase());
    });
  }

  if (queryId) {
    filerListEmployees = filerListEmployees.filter((employee) => employee.id === parseInt(queryId));
  }

  if (queryAddress) {
    filerListEmployees = filerListEmployees.filter((employee) => employee.address.province.includes(queryAddress));
  }

  if (queryRole) {
    filerListEmployees = filerListEmployees.filter((employee) => employee.role.id === parseInt(queryRole));
  }

  if (sortId) {
    filerListEmployees = [...filerListEmployees].sort((a, b) => {
      const multi = sortOrder === 'asc' ? 1 : -1;
      return multi * (a['id'] - b['id']);
    });
  }

  return (
    <div>
      <div className="mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 md:pt-0 table-responsive">
            <table className="employeeTable w-100">
              <thead>
                <tr>
                  <th scope="col" onClick={() => sortFunction('id')}>
                    ID {sortId ? sortOrder === 'desc' ? <FaArrowUp /> : <FaArrowDown /> : <LuArrowUpDown />}
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
                      <input
                        value={queryId || ''}
                        onChange={(e) => handleID(e.target.value)}
                        placeholder="Lọc theo ID"
                      />
                    </th>
                    <th scope="col">
                      <input
                        onChange={(e) => handleName(e.target.value)}
                        placeholder="Lọc theo tên"
                        value={queryName || ''}
                      />
                    </th>
                    <th scope="col">
                      <input
                        placeholder="Lọc theo địa chỉ"
                        value={queryAddress || ''}
                        onChange={(e) => handleAddress(e.target.value)}
                      />
                    </th>
                    <th scope="col">
                      <select value={queryRole || 0} onChange={(e) => handleRole(e.target.value)}>
                        <option value={0} disabled>
                          Chọn chức vụ
                        </option>
                        {RoleId.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </th>
                    <th scope="col"></th>
                    <th scope="col">
                      <button type="button" className="btn btn-secondary" onClick={handleClearFilter}>
                        Clear all
                      </button>
                    </th>
                  </tr>
                )}
              </thead>
              <tbody className="table-group-divider">
                {filerListEmployees.map((employee) => {
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
                        <ButtonDetail url={`/dashboard/employee/${employee?.id}/detail?fromPage=${page}`} />
                        <EmployeeDelete id={employee?.id} refresh={mutate} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {filerListEmployees.length > 0 ? (
                <caption className="mt-2">Tổng số nhân viên: {total}</caption>
              ) : (
                <caption>Không có nhân viên nào.</caption>
              )}
            </table>
          </div>
        </div>
      </div>
      <Pagination totalPage={totalPage} />
    </div>
  );
}
