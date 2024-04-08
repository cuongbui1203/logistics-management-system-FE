'use client';

import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaTruckFast } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import envConfig from '@/envConfig';
import style from '@/css/header.module.css';
import { useAppContext } from '@/app/app-provider';

export function Header() {
  const route = useRouter();
  const [navBar, setNavBar] = useState(false);
  const company = envConfig.NEXT_PUBLIC_COMPANY_NAME || 'Next.js App';
  const { user } = useAppContext();

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  return (
    <header>
      <Navbar expand="lg" fixed="top" className={`${style.headerContainer} ${navBar ? style.active : ''}`}>
        <Container>
          <Navbar.Brand
            onClick={() => {
              route.push('/');
            }}
          >
            <FaTruckFast size={'3rem'} />
            {company}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className={`${style.navbarToggle}`}>
            <Nav className="me-auto">
              <Link href="/" className="nav-link">
                Trang chủ
              </Link>
              <NavDropdown title="Tra cứu" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    route.push('/customer/LockupOrders');
                  }}
                >
                  Tra cứu bưu gửi
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    route.push('/customer/LockupTransaction');
                  }}
                >
                  Tra cứu bưu cục
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    route.push('/customer/EstimateCost');
                  }}
                >
                  Ước tính chi phí
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Dịch vụ" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    route.push('/customer/service/doc');
                  }}
                >
                  Vận chuyển tài liệu
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    route.push('/customer/service/goods');
                  }}
                >
                  Vận chuyển hàng hóa
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    route.push('/customer/service/care');
                  }}
                >
                  Vận chuyển đảm bảo
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {user ? (
              <Link href="/account" className="btn btn-light">
                {user.name}
              </Link>
            ) : (
              <Link href="/login" className="btn btn-primary">
                Đăng nhập
              </Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
