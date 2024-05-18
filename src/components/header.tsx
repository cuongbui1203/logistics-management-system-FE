'use client';

import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaTruckFast } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import envConfig from '@/envConfig';
import { useAppContext } from '@/app/app-provider';
import style from '@/css/header.module.css';
import Username from './common/username';

export function Header() {
  const router = useRouter();
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
              router.push('/');
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
                    router.push('/customer/lookup-order');
                  }}
                >
                  Tra cứu đơn hàng
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    router.push('/customer/lookup-transaction');
                  }}
                >
                  Tra cứu bưu cục
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {user ? (
              <Username />
            ) : (
              <Nav>
                <Link href="/login" className="btn btn-primary" style={{ marginRight: '10px' }}>
                  Đăng nhập
                </Link>
                <Link href="/register" className="btn btn-primary">
                  Đăng kí
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
