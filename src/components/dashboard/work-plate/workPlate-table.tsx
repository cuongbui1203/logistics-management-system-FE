'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../pagination';
import '@/css/dashboard/customTable.css';
import { ButtonDetail, WorkPlateDelete } from '@/components/button';
import { useWorkPlate } from '@/lib/custom-hook';
import { useState } from 'react';
import { WORK_PLATE_PAGE_SIZE } from '@/config/constant';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { LuArrowUpDown } from 'react-icons/lu';
import { useDebouncedCallback } from 'use-debounce';
import { AddressDetailSchemaType, WorkPlateSchemaType } from '@/schema/common.schema';
import Spinning from '@/components/common/spinning';

interface WorkPlateTableProps {
  page: any;
  type: number;
  listProvince: AddressDetailSchemaType[];
}

export default function WorkPlateTable({ page, type, listProvince }: WorkPlateTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [sortId, setSortId] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  const { data, error, isLoading, mutate } = useWorkPlate(page, type);

  const url = type === 2 ? '/dashboard/transaction' : '/dashboard/transshipment';

  if (searchParams.get('created')) {
    mutate();
  }

  const total = data?.total || 1;
  const totalPage = Math.floor(total / WORK_PLATE_PAGE_SIZE) + (total % WORK_PLATE_PAGE_SIZE === 0 ? 0 : 1);

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

  const handleID = useDebounce('id');
  const handleName = useDebounce('name');
  const handleManager = useDebounce('manager');
  const handleAddress = useDebounce('address');

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('name');
    params.delete('id');
    params.delete('manager');
    params.delete('address');
    replace(`${pathname}?${params.toString()}`);
  };

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <Spinning />;

  let filerListWP: WorkPlateSchemaType[] = data?.data || [];

  const queryName = searchParams.get('name');
  const queryId = searchParams.get('id');
  const queryAddress = searchParams.get('address');
  const queryManager = searchParams.get('manager');

  if (queryName) {
    filerListWP = filerListWP.filter((workPlate) => workPlate.name.toLowerCase().includes(queryName.toLowerCase()));
  }

  if (queryId) {
    filerListWP = filerListWP.filter((workPlate) => workPlate.id === parseInt(queryId));
  }

  if (queryAddress) {
    filerListWP = filerListWP.filter((workPlate) => workPlate.address.provinceCode === queryAddress);
  }

  if (queryManager) {
    filerListWP = filerListWP.filter((workPlate) =>
      workPlate.manager?.name.toLowerCase().includes(queryManager.toLowerCase())
    );
  }

  if (sortId) {
    filerListWP = [...filerListWP].sort((a, b) => {
      const multi = sortOrder === 'asc' ? 1 : -1;
      return multi * (a['id'] - b['id']);
    });
  }

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
                <tr className="filter">
                  <th scope="col">
                    <input value={queryId || ''} onChange={(e) => handleID(e.target.value)} placeholder="Lọc theo ID" />
                  </th>
                  <th scope="col">
                    <input
                      value={queryName || ''}
                      onChange={(e) => handleName(e.target.value)}
                      placeholder="Lọc theo tên điểm"
                    />
                  </th>
                  <th scope="col">
                    <input
                      value={queryManager || ''}
                      onChange={(e) => handleManager(e.target.value)}
                      placeholder="Lọc theo tên trưởng điểm"
                    />
                  </th>
                  <th scope="col" className="col-sm-6">
                    <select
                      onChange={(e) => handleAddress(e.target.value)}
                      value={queryAddress || '0'}
                      className="w-100"
                    >
                      <option value="0" disabled>
                        Chọn địa chỉ
                      </option>
                      {listProvince?.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col">
                    <button type="button" className="btn btn-secondary" onClick={handleClearFilter}>
                      Clear all
                    </button>
                  </th>
                </tr>
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
                      <ButtonDetail url={`${url}/${workPlate?.id}/detail?fromPage=${page}`} />
                      <WorkPlateDelete id={workPlate?.id} refresh={mutate} type={type} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {filerListWP.length > 0 ? <div className="mt-2">Tổng số điểm: {total}</div> : <div>Không có điểm nào.</div>}
      <Pagination totalPage={totalPage} />
    </div>
  );
}
