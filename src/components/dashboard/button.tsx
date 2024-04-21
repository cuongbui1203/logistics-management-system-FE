'use client';

import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaRegEye } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { LuPackagePlus } from 'react-icons/lu';

export function CreateEmployee() {
  const route = useRouter();
  return (
    <Button
      onClick={() => {
        route.push('/dashboard/employee/create');
      }}
      className="btnCreate"
    >
      <FiUserPlus size={'2em'} />
      Tạo nhân viên
    </Button>
  );
}

export function CreateTransaction() {
  const route = useRouter();
  return (
    <Button
      onClick={() => {
        route.push('/dashboard/transaction/create');
      }}
      className="btnCreate"
    >
      {/* <LuPackagePlus size={'2em'} /> */}
      Tạo điểm giao dịch
    </Button>
  );
}

export function CreateTransshipment() {
  const route = useRouter();
  return (
    <Button
      onClick={() => {
        route.push('/dashboard/transshipment/create');
      }}
      className="btnCreate"
    >
      {/* <LuPackagePlus size={'2em'} /> */}
      Tạo điểm trung chuyển
    </Button>
  );
}

export function CreateOrder() {
  const route = useRouter();
  return (
    <Button
      onClick={() => {
        route.push('/dashboard/ordered/create');
      }}
      className="btnCreate"
    >
      <LuPackagePlus size={'2em'} />
      Tạo đơn hàng
    </Button>
  );
}
export function EmployeeDetail({ id }: { id: number }) {
  const route = useRouter();

  return (
    <button
      onClick={() => {
        route.push(`/dashboard/employee/${id}/detail`);
      }}
      className="btn btn-outline-warning"
    >
      <FaRegEye />
    </button>
  );
}

export function OrderDetail({ id, page }: any) {
  const route = useRouter();

  return (
    <button
      onClick={() => {
        route.push(`/dashboard/ordered/${id}/detail?page=${page}`);
      }}
      className="btn btn-outline-warning"
    >
      <FaRegEye />
    </button>
  );
}
