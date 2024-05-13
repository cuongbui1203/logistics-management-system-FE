'use client';

import { LuLock } from 'react-icons/lu';
import { Row, Form, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ResetPasswordReq, ResetPasswordReqType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import authApiRequest from '@/api/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { handleErrorApi } from '@/lib/utils';
import { FaRegUser } from 'react-icons/fa6';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordReqType>({
    resolver: zodResolver(ResetPasswordReq),
  });

  const searchParams = useSearchParams();

  async function onSubmit(values: ResetPasswordReqType) {
    values.token = searchParams.get('token') || '';
    console.log(values);

    try {
      const result = await authApiRequest.resetPassword(values);

      if (result.payload.success) {
        toast.success('Reset mật khẩu thành công');
        router.push('/login');
      }
    } catch (error: any) {
      handleErrorApi({ error, setError, message: 'Reset mật khẩu thất bại!' });
    }
  }

  function onError(err: any) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Row className="text-center text-light">
        <h3>Reset Mật Khẩu</h3>
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
      <Row>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" className="text-light">
            Mật khẩu mới
          </Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <LuLock />
            </InputGroup.Text>
            <Form.Control
              id="password"
              placeholder="Mật khẩu"
              aria-label="Password"
              type="password"
              aria-describedby="basic-addon1"
              required
              {...register('password')}
            />
          </InputGroup>
          {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password" className="text-light">
            Xác nhận mật khẩu mới
          </Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <LuLock />
            </InputGroup.Text>
            <Form.Control
              id="password_confirmation"
              placeholder="Xác nhận mật khẩu"
              aria-label="Confirm Password"
              type="password"
              aria-describedby="basic-addon1"
              required
              {...register('password_confirmation')}
            />
          </InputGroup>
          {errors.password_confirmation && (
            <Form.Text className="text-danger">{errors.password_confirmation.message}</Form.Text>
          )}
        </Form.Group>
      </Row>
      <Row className="m-1">
        <Button variant="primary" size="lg" className="login-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Reset Mật Khẩu'}
        </Button>
        {errors.root && <Form.Text className="text-danger">{errors.root.message}</Form.Text>}
      </Row>
    </Form>
  );
}
