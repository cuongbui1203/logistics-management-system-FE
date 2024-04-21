'use client';

import { LuLock } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import style from '@/css/login.module.css';
import Link from 'next/link';
import { Container, Row, Col, Image, Form, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RegisterBody, RegisterBodyType } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import authApiRequest from '@/api/auth';
import { useRouter } from 'next/navigation';
import { LOGIN_REDIRECT } from '@/routes';
import { toast } from 'react-toastify';
import { handleErrorApi } from '@/lib/utils';
import { useAppContext } from '@/app/app-provider';

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
  });

  const { setUser } = useAppContext();

  async function onSubmit(values: RegisterBodyType) {
    console.log(values);
    try {
      const result = await authApiRequest.register(values);
      toast.success('Đăng kí thành công');
      router.push(LOGIN_REDIRECT);
    } catch (error: any) {
      handleErrorApi({ error, setError });
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
                {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
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
        </Col>
      </Row>
    </Container>
  );
}
