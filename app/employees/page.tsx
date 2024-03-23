'use client';
import Overview from '@/components/employee/dashboard/overview';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
export default function AdminPage() {
  const { data } = useSession();
  console.log(data);

  // const userRole = role || 'MANAGER';

  return (
    <motion.div layout>
      <Row>
        <Col xs={12}>
          <h1>Dashboard</h1>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Overview />
        </Col>
      </Row>
    </motion.div>
  );
}
