'use client';

import { LuLock } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { Row, Form, Button, InputGroup, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AuthBody, LoginBody, LoginBodyType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import authApiRequest from '@/api/auth';
import { useRouter } from 'next/navigation';
import { ADMIN_LOGIN_REDIRECT, USER_LOGIN_REDIRECT } from '@/routes';
import { toast } from 'react-toastify';
import { handleErrorApi } from '@/lib/utils';
import { useAppContext } from '@/app/app-provider';
import { useEffect } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  const { setUser } = useAppContext();

  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await authApiRequest.login(values);

      const data = result.payload.data;
      const authBody = AuthBody.parse({
        token: data.token,
        csrf_token: data.csrf_token,
        id: data.user.id,
      });
      await authApiRequest.auth(authBody);
      // await authApiRequest.getCsrfTokenClient();
      toast.success('Đăng nhập thành công');
      setUser(data.user);
      if (data.user.role.name === 'User') {
        router.push(USER_LOGIN_REDIRECT);
        return;
      }
      router.push(ADMIN_LOGIN_REDIRECT);
      // router.refresh();
    } catch (error: any) {
      handleErrorApi({ error, setError, message: 'Đăng nhập thất bại!' });
    }
  }

  function onError(err: any) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Row className="text-center text-light">
        <h3>ĐĂNG NHẬP</h3>
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
              placeholder="Tài khoản"
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
      <Row className="m-1">
        <Button variant="primary" size="lg" className="login-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
        </Button>
        {errors.root && <Form.Text className="text-danger">{errors.root.message}</Form.Text>}
      </Row>
      <Row></Row>
      <Row className="m-1 text-center">
        <Col>
          <Link href="/forgot-password">Quên mật khẩu?</Link>
        </Col>
        <Col>
          <Link href="/register">Đăng kí tài khoản mới.</Link>
        </Col>
      </Row>
    </Form>
  );
}
