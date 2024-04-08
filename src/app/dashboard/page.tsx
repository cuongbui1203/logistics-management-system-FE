'use client';
import Overview from '@/components/dashboard/main/overview';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Statistic from '@/components/dashboard/main/statistic';
import EmployeeTable from '@/components/dashboard/table/employee-table';
import StatisticPoint from '@/components/dashboard/main/statistic-point';
import { useAppContext } from '@/app/app-provider';
import StatisticGoodsPoint from '@/components/dashboard/main/statisticGoodsPoint';
import StatisticTransPoint from '@/components/dashboard/main/statisticTransPoint';
import OrderTable from '@/components/dashboard/table/order-table';

const roleComponents = {
  Admin: [
    <Col xs={12} md={4}>
      <Overview />
    </Col>,
    <Col xs={12} md={4}>
      <StatisticGoodsPoint />
    </Col>,
    <Col xs={12} md={4}>
      <StatisticTransPoint />
    </Col>,
    <Col xs={12}>
      <EmployeeTable showFilter={false} />
    </Col>,
  ],
  Manager: [
    <Col xs={12} md={4}>
      <Overview />
    </Col>,
    // <Col xs={12} md={4}>
    //   <StatisticPoint />
    // </Col>,
    <Col xs={12}>
      <EmployeeTable showFilter={false} />
    </Col>,
  ],
  Employee: [
    // <Col xs={12} md={4}>
    //   <StatisticPoint />
    // </Col>,
    // <Col xs={12}>
    //   <OrderTable showFilter={false} />
    // </Col>,
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
