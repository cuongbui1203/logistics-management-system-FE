'use client';

import { Row, Form, Button, InputGroup, Col } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ForgotPasswordReq, ForgotPasswordReqType } from '@/schema/auth.schema';
import authApiRequest from '@/api/auth';
import { toast } from 'react-toastify';
import { handleErrorApi } from '@/lib/utils';
import { FaRegUser } from 'react-icons/fa6';

export default function ForgotPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordReqType>({
    resolver: zodResolver(ForgotPasswordReq),
  });

  async function onSubmit(values: ForgotPasswordReqType) {
    try {
      const result = await authApiRequest.forgotPassword(values);

      if (result.payload.success) {
        toast.success('Vui lòng kiểm tra email để lấy lại mật khẩu');
      }
    } catch (error: any) {
      handleErrorApi({ error, setError, message: 'Gửi yêu cầu thất bại!' });
    }
  }

  function onError(err: any) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Row className="text-center text-light">
        <h3>Quên mật khẩu</h3>
      </Row>
      <Row>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email" className="text-light">
            Email
          </Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <FaRegUser />
            </InputGroup.Text>
            <Form.Control
              id="email"
              placeholder="Email"
              aria-label="email"
              aria-describedby="basic-addon1"
              {...register('email')}
            />
          </InputGroup>
          {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
        </Form.Group>
      </Row>

      <Row className="m-1">
        <Button variant="primary" size="lg" className="login-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Gửi yêu cầu'}
        </Button>
        {errors.root && <Form.Text className="text-danger">{errors.root.message}</Form.Text>}
      </Row>
    </Form>
  );
}
