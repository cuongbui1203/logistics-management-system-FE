'use client';

import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaRegEye } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { LuPackagePlus } from 'react-icons/lu';
import { AiOutlineUserDelete } from 'react-icons/ai';
import accountApiRequest from '@/api/account';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useAppContext } from '@/app/app-provider';

export function SearchOrder() {
  const route = useRouter();
  let orderID: string = '';
  const handleSearch = () => {
    if (orderID.trim() !== '') {
      console.log('orderID', orderID);
      // router.push(`/customer/LockupOrders?query=${orderID}`);
    }
  };
  return (
    <InputGroup>
      <Form.Control
        type="text"
        id="inputCode"
        name="code"
        formMethod="get"
        placeholder="Nhập mã bưu gửi"
        className="rounded-pill"
        onChange={(e) => (orderID = e.target.value)}
      />
      <Button className="rounded-pill mx-2" onClick={handleSearch}>
        🔍
      </Button>
    </InputGroup>
  );
}

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

export function ButtonDetail({ url }: { url: string }) {
  const route = useRouter();

  return (
    <button
      onClick={() => {
        route.push(url);
      }}
      className="btn btn-outline-warning"
    >
      <FaRegEye />
    </button>
  );
}

export function EmployeeDelete({ id, refresh }: { id: number; refresh: () => void }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await accountApiRequest.deleteAccount(id).then((res) => {
        toast.success('Xóa nhân viên thành công');

        refresh();
        setShow(false);
      });
    } catch (error) {
      toast.error('Xóa nhân viên thất bại');
    }
  };

  const disabled = useAppContext().user?.id === id ? true : false;

  return (
    <>
      {disabled ? (
        <button className="btn btn-outline-danger " disabled>
          <AiOutlineUserDelete />
        </button>
      ) : (
        <button className="btn btn-outline-danger" onClick={handleShow}>
          <AiOutlineUserDelete />
        </button>
      )}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa nhân viên này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
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
