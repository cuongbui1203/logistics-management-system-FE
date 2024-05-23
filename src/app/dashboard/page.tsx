'use client';

import Profit from '@/components/dashboard/statistic/profit';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Statistic from '@/components/dashboard/statistic/statistic';
import EmployeeTable from '@/components/dashboard/employee/employee-table';
import { useAppContext } from '@/app/app-provider';
import StatisticTransshipment from '@/components/dashboard/statistic/statisticTransshipment';
import StatisticTransaction from '@/components/dashboard/statistic/statisticTransaction';
import { OrderTableType, UserRole, WorkPlateEnumType } from '@/config/Enum';
import OrderTable from '@/components/dashboard/order/order-table';

const roleComponents = {
  Admin: [
    // <Col xs={12} md={4} key="1">
    //   {/* <Profit /> */}
    // </Col>,
    // <Col xs={12} md={4} key="2">
    //   <StatisticTransshipment />
    // </Col>,
    // <Col xs={12} md={4} key="3">
    //   <StatisticTransaction />
    // </Col>,
    <Col xs={12} key="4">
      <EmployeeTable showFilter={false} />
    </Col>,
  ],
  Manager: [
    <Col xs={12} md={4} key="2">
      <StatisticTransshipment />
    </Col>,
    <Col xs={12} md={4} key="3">
      <StatisticTransaction />
    </Col>,
    <Col xs={12} key="4">
      <EmployeeTable showFilter={false} />
    </Col>,
  ],
  Employee: [
    // <Col xs={12} md={4}>
    //   <StatisticPoint />
    // </Col>,
    <Col xs={12} key={'123'}>
      <OrderTable type={OrderTableType.Waiting} showFilter={false} />
    </Col>,
  ],
};

export default function Dashboard() {
  const { user } = useAppContext();
  const role = user?.role.name;

  if (role === UserRole.User || !role) {
    return <div>Không có quyền truy cập</div>;
  }

  const userRole = role as keyof typeof roleComponents;

  return (
    <div>
      {user?.role.name === UserRole.Admin ? (
        <Row>
          <Col xs={12}>
            <h2>Chào mừng quản trị viên {user.name}</h2>
          </Col>
        </Row>
      ) : user?.work_plate?.type_id === WorkPlateEnumType.Transshipment ? (
        <h2>Điểm trung chuyển {user?.work_plate?.name}</h2>
      ) : (
        <h2>Điểm giao dịch {user?.work_plate?.name}</h2>
      )}

      <Row>
        <Col xs={12}>
          <Statistic role={role} />
        </Col>
      </Row>

      <Row>
        {roleComponents[userRole]?.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
      </Row>
    </div>
  );
}
