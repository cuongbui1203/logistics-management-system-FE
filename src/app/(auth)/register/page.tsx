'use client';

import { LuLock } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RegisterBody, RegisterBodyType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import authApiRequest from '@/api/auth';
import { useRouter } from 'next/navigation';
import { LOGIN_REDIRECT } from '@/routes';
import { toast } from 'react-toastify';
import { handleErrorApi } from '@/lib/utils';

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
  });

  async function onSubmit(values: RegisterBodyType) {
    console.log(values);
    try {
      const result = await authApiRequest.register(values);
      toast.success('Đăng kí thành công');
      router.push(LOGIN_REDIRECT);
    } catch (error: any) {
      handleErrorApi({ error, setError, message: 'Đăng kí thất bại!' });
    }
  }
  function onError(err: any) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Row className="text-center text-light">
        <h3>ĐĂNG KÍ</h3>
      </Row>
      <Row>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name" className="text-light">
            Họ và tên
          </Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <FaRegUser />
            </InputGroup.Text>
            <Form.Control
              id="name"
              placeholder="Họ và tên"
              aria-label="Name"
              aria-describedby="basic-addon1"
              {...register('name')}
            />
          </InputGroup>
          {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username" className="text-light">
            Tài khoản
          </Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <FaRegUser />
            </InputGroup.Text>
            <Form.Control
              id="username"
              placeholder="Tài Khoản"
              aria-label="Username"
              aria-describedby="basic-addon1"
              {...register('username')}
            />
          </InputGroup>
          {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username" className="text-light">
            Email
          </Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <FaRegUser />
            </InputGroup.Text>
            <Form.Control
              id="email"
              placeholder="Email"
              aria-label="Email"
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
            Mật khẩu
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
            Xác nhận mật khẩu
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

      <Row>
        <Col className="d-flex justify-content-end">
          <Link href="/login" className="text-light">
            Quay lại đăng nhập
          </Link>
        </Col>
      </Row>

      <Row className="m-1">
        <Button variant="primary" size="lg" className="login-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Đăng kí'}
        </Button>
        {errors.root && <Form.Text className="text-danger">{errors.root.message}</Form.Text>}
      </Row>
    </Form>
  );
}
