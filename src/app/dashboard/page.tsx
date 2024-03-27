'use client';
import Overview from '@/components/dashboard/overview';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Role } from '@/types/Enum';
import { Statistic } from '@/components/dashboard/statistic';

export default function Dashboard() {
  const user = useCurrentUser();
  if (!user) return null;
  const role = Role[user.role_id];
  console.log(typeof role);

  return (
    <motion.div layout>
      <Row>
        <Col xs={12}>
          <Statistic userRole={role} />
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
