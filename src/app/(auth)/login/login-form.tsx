'use client';
import { LuLock } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import style from '@/css/login.module.css';
import Link from 'next/link';
import { Container, Row, Col, Image, Form, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AuthBody, LoginBody, LoginBodyType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import authApiRequest from '@/api/auth';
import { useRouter } from 'next/navigation';
import { ADMIN_LOGIN_REDIRECT, USER_LOGIN_REDIRECT } from '@/routes';

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await authApiRequest.login(values);

      const data = result.payload.data;
      const authBody = AuthBody.parse({
        token: data.token,
        csrf_token: data.csrf_token,
        role: data.user.role.name,
      });
      await authApiRequest.auth(authBody);
      if (data.user.role.name === 'User' || data.user.role.name === 'Driver') {
        router.push(USER_LOGIN_REDIRECT);
        return;
      }
      router.push(ADMIN_LOGIN_REDIRECT);
    } catch (error) {
      setError('root', {
        message: errors.root?.message,
      });
    }
  }
  return (
    <Container fluid className={style.container}>
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={12} lg={6} xl={5} className={style.image}>
          <Image src="/login.png" fluid alt="Sample image" className="w-100 h-100" />
        </Col>
        <Col md={12} lg={6} xl={4} offset-xl-1="true">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="text-center text-light">
              <h3>ĐĂNG NHẬP</h3>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="form3Example3" className="text-light">
                  Tài khoản
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <FaRegUser />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Tài khoản"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    {...register('username')}
                  />
                </InputGroup>
              </Form.Group>
              {errors.username && <Form.Text className="text-danger">{errors.username.message}</Form.Text>}
            </Row>

            <Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="form3Example4" className="text-light">
                  Mật khẩu
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">
                    <LuLock />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Mật khẩu"
                    aria-label="Password"
                    type="password"
                    aria-describedby="basic-addon1"
                    required
                    {...register('password')}
                  />
                </InputGroup>
              </Form.Group>
              {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
            </Row>

            <Row>
              <Col>
                <Form.Check type="checkbox" id="form2Example3" label="Ghi nhớ" className="text-light" />
              </Col>

              <Col className="d-flex justify-content-end">
                <Link href="/" className="text-light">
                  Quay lại trang chủ
                </Link>
              </Col>
            </Row>

            <Row className="m-1">
              <Button variant="primary" size="lg" className="login-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
              </Button>
              {errors.root && <Form.Text className="text-danger">{errors.root.message}</Form.Text>}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
