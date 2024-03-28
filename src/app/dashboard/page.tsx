'use client';
import Overview from '@/components/dashboard/overview';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Role } from '@/types/Enum';
import Statistic from '@/components/dashboard/statistic';

export default function Dashboard() {
  return (
    <motion.div layout>
      <Row>
        <Col xs={12}>
          <Statistic />
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
