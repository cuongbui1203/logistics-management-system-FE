import accountApiRequest from '@/api/account';
import { EmployeeDetail } from '@/components/dashboard/button';
import Pagination from '@/components/dashboard/pagination';
import { AccountList } from '@/schema/account.schema';
import React, { useEffect, useState } from 'react';
import '@/css/employee/customTable.css';

export default function EmployeeTable({ page, query, showFilter }: any) {
  const [listEmployees, setListEmployees] = useState<AccountList>([]);
  const [isLoading, setLoading] = useState(true);
  let totalPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await accountApiRequest.listAccountClient().then((res) => {
          setListEmployees(res.payload.data.data);
          totalPage = res.payload.data.total;
          setLoading(false);
          console.log(res.payload.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!listEmployees) return <p>No profile data</p>;

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
                {/* {showFilter && (
                  <tr className="filter">
                    <th scope="col"></th>
                    <th scope="col">
                      <input onChange={(e) => handleEmID(e.target.value)} placeholder="Lọc theo mã nhân viên" />
                    </th>
                    <th scope="col">
                      <input onChange={(e) => handleName(e.target.value)} placeholder="Lọc theo tên" />
                    </th>
                    <th scope="col">
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
                    </th>
                    <th scope="col">
                      <input placeholder="Lọc theo sdt" onChange={(e) => handlePhone(e.target.value)} />
                    </th>
                    <th scope="col"></th>
                  </tr>
                )} */}
              </thead>
              <tbody className="table-group-divider">
                {listEmployees.map((employee, index) => {
                  // const statusInfo = employeeStatus[employee?.status] || {};
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
