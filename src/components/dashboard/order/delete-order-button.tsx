import { orderApiRequest } from '@/api/order';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

export function OrderDeleteButton({ id, refresh }: { id: number; refresh: () => void }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await orderApiRequest.deleteOrder(id).then((res) => {
        refresh();
        setShow(false);
      });
    } catch (error) {
      toast.error('Xóa đơn hàng thất bại');
    }
  };

  return (
    <>
      <button className="btn btn-outline-danger" onClick={handleShow}>
        <AiFillDelete />
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa đơn hàng này không?</Modal.Body>
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
