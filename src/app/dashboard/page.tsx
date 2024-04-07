'use client';
import Overview from '@/components/dashboard/overview';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Statistic from '@/components/dashboard/statistic';
import EmployeeTable from '@/components/dashboard/table/employee-table';
import StatisticPoint from '@/components/dashboard/main/statistic-point';
import { useAppContext } from '@/app/app-provider';

const roleComponents = {
  Admin: [
    <Col xs={12} md={4}>
      <Overview />
    </Col>,
    <Col xs={12} md={4}>
      <StatisticPoint />
    </Col>,
    <Col xs={12}>
      <EmployeeTable showFilter={false} />
    </Col>,
  ],
  Manager: [
    <Col xs={12} md={4}>
      <Overview />
    </Col>,
    <Col xs={12} md={4}>
      <StatisticPoint />
    </Col>,
    <Col xs={12}>
      <EmployeeTable showFilter={false} />
    </Col>,
  ],
  Employee: [
    <Col xs={12} md={4}>
      <StatisticPoint />
    </Col>,
    <Col xs={12}>
      <EmployeeTable showFilter={false} />
    </Col>,
  ],
};

export default function Dashboard() {
  const { user } = useAppContext();
  const role = user?.role.name;

  if (role === 'User' || role === 'Driver') {
    return <div>Không có quyền truy cập</div>;
  }

  const userRole = role as keyof typeof roleComponents;

  return (
    <motion.div layout>
      <Row>
        <Col xs={12}>
          <Statistic />
        </Col>
      </Row>

      <Row>
        {roleComponents[userRole].map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </Row>
    </motion.div>
  );
}
