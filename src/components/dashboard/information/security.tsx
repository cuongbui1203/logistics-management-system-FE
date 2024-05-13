'use client';

import accountApiRequest from '@/api/account';
import { handleErrorApi } from '@/lib/utils';
import { ChangePasswordReq, ChangePasswordReqType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdOutlinePassword } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

export default function Security() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordReqType>({
    resolver: zodResolver(ChangePasswordReq),
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password_confirmation: '',
    },
  });

  function onError(err: any) {
    console.log(err);
  }

  async function onSubmit(values: ChangePasswordReqType) {
    console.log(values);

    try {
      const result = await accountApiRequest.changePasswordClient(values);

      toast.success('Thay đổi mật khẩu thành công');
    } catch (error: any) {
      handleErrorApi({ error, setError });
    }
  }

  return (
    <div className="formContainer">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Row>
          <h3>Thay đổi mật khẩu</h3>
        </Row>

        <Row className="mt-2">
          <Col md={6}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Mật khẩu cũ</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <MdOutlinePassword />
                </InputGroup.Text>
                <Form.Control type="password" placeholder="Mật khẩu cũ" {...register('old_password')} />
              </InputGroup>
              {errors.old_password && <Form.Text className="text-danger">{errors.old_password.message}</Form.Text>}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={6}>
            <Form.Group controlId="newPassword">
              <Form.Label>Mật khẩu mới</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <MdOutlinePassword />
                </InputGroup.Text>
                <Form.Control type="password" placeholder="Mật khẩu mới" {...register('new_password')} />
              </InputGroup>
              {errors.new_password && <Form.Text className="text-danger">{errors.new_password.message}</Form.Text>}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Xác nhận mật khẩu mới</Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <RiLockPasswordLine />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  {...register('new_password_confirmation')}
                />
              </InputGroup>
              {errors.new_password_confirmation && (
                <Form.Text className="text-danger">{errors.new_password_confirmation.message}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <div className="mt-3 btnContainer d-flex justify-content-center">
          <Button type="submit" className="btn btnCreate" disabled={isSubmitting}>
            {isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
