'use client';

import authApiRequest from '@/api/auth';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import style from '@/css/header.module.css';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/app-provider';

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function Username() {
  const router = useRouter();
  const { user, setUser } = useAppContext();
  const [profile, setProfile] = useState(false);
  const profileRef = useRef(null);

  const closeProfile = () => {
    if (profile) {
      setProfile(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      router.push('/login');
    } catch (error) {
      console.log(error);
      // authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
      //   router.push(`/login?redirectFrom=${pathname}`);
      // });
    } finally {
      setUser(null);
      router.refresh();
      localStorage.removeItem('token');
    }
  };

  return (
    <Col xs="auto" className={style.avatarContainer}>
      <motion.nav layout initial={false} animate={profile ? 'open' : 'closed'}>
        <Container
          ref={profileRef}
          onClick={() => {
            setProfile(!profile);
          }}
        >
          <Row className={`${style.usernameContainer}`}>
            <Col xs="auto" className={style.userName}>
              {user?.name || 'User'}
            </Col>
            <Col xs="auto">
              <FaUserCircle size={'2em'} />
            </Col>
          </Row>
        </Container>
        <motion.ul
          className={style.listInfor}
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                // type: 'spring',
                bounce: 0,
                duration: 0.5,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
              display: 'inline',
            },
            closed: {
              clipPath: 'inset(10% 5% 90% 5% round 10px)',
              transition: {
                // type: 'spring',
                bounce: 0,
                duration: 0.2,
                display: 'inline',
              },
              display: 'none',
            },
          }}
          style={{ pointerEvents: profile ? 'auto' : 'none' }}
        >
          <motion.li
            className={style.accList}
            variants={itemVariants}
            onClick={(e) => {
              closeProfile();
              router.push('/dashboard/information');
            }}
          >
            Thông tin cá nhân
          </motion.li>
          <motion.li className={style.accList} variants={itemVariants} onClick={handleLogout}>
            Đăng xuất
          </motion.li>
        </motion.ul>
      </motion.nav>
    </Col>
  );
}
