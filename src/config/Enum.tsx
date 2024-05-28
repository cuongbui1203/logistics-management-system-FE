import { MdOutlineDashboard, MdOutlineEmojiTransportation } from 'react-icons/md';
import { IoPeopleOutline } from 'react-icons/io5';
import { LuPackage2, LuPackageCheck, LuPackagePlus } from 'react-icons/lu';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';
import { GoPackageDependencies, GoPackageDependents } from 'react-icons/go';
import { BsBuildingAdd } from 'react-icons/bs';

export const UserRole = {
  Admin: 'Admin',
  User: 'User',
  Driver: 'Driver',
  Employee: 'Employee',
  Manager: 'Manager',
  Shipper: 'Shipper',
};

export const RoleId = [
  { id: 1, name: 'Admin', color: 'primary' },
  // { id: 2, name: 'User' },
  { id: 3, name: 'Driver', color: 'secondary' },
  { id: 4, name: 'Employee', color: 'warning' },
  { id: 5, name: 'Manager', color: 'info' },
  { id: 6, name: 'Shipper', color: 'secondary' },
];

export const Role = {
  Admin: {
    id: 1,
    name: 'Quản trị viên',
    tabs: ['dashboard', 'manageTransshipment', 'manageTransactions', 'manageEmployees'],
  },
  Manager: {
    id: 5,
    name: 'Quản lí',
    tabs: [
      'dashboard',
      'manageEmployees',
      'manageWaitingOrders',
      'manageReceivingOrders',
      'historyOrders',
      'createOrder',
    ],
  },
  Driver: {
    id: 3,
    name: 'Tài xế',
    tabs: ['dashboard', 'leavingOrders'],
  },
  Employee: {
    id: 4,
    name: 'Nhân viên',
    tabs: ['dashboard', 'createOrder', 'manageWaitingOrders', 'manageReceivingOrders', 'historyOrders'],
  },
  Shipper: {
    id: 6,
    name: 'Shipper',
    tabs: ['dashboard', 'manageOrders'],
  },
};

export const Area = [
  {
    id: 1,
    name: 'Tỉnh / Thành phố',
  },
  {
    id: 2,
    name: 'Quận / Huyện',
  },
  {
    id: 3,
    name: 'Phường / Xã',
  },
];

export const listUrl = {
  dashboard: {
    url: '/dashboard',
    name: 'Trang chính',
    icon: <MdOutlineDashboard size={'2em'} />,
  },
  information: {
    url: '/dashboard/information',
    name: 'Thông tin',
    icon: <MdOutlineDashboard size={'2em'} />,
  },
  manageEmployees: {
    url: '/dashboard/employee',
    name: 'Nhân viên',
    icon: <IoPeopleOutline size={'2em'} />,
  },
  detailEmployee: {
    url: '/dashboard/employee/[id]/detail',
    name: 'Thông tin nhân viên',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  createEmployee: {
    url: '/dashboard/employee/create',
    name: 'Tạo tài khoản nhân viên',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  manageTransshipment: {
    url: '/dashboard/transshipment',
    name: 'Điểm trung chuyển',
    icon: <MdOutlineEmojiTransportation size={'2em'} />,
  },
  createTransshipment: {
    url: '/dashboard/transshipment/create',
    name: 'Tạo điểm trung chuyển',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  detailTransshipment: {
    url: '/dashboard/transshipment/[id]/detail',
    name: 'Chi tiết điểm trung chuyển',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  manageTransactions: {
    url: '/dashboard/transaction',
    name: 'Điểm giao dịch',
    icon: <BsBuildingAdd size={'2em'} />,
  },
  createTransaction: {
    url: '/dashboard/transaction/create',
    name: 'Tạo điểm giao dịch',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  detailTransaction: {
    url: '/dashboard/transaction/[id]/detail',
    name: 'Chi tiết điểm giao dịch',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  manageWaitingOrders: {
    url: '/dashboard/ordered/waiting',
    name: 'Hàng chờ gửi',
    icon: <GoPackageDependents size={'2em'} />,
  },
  manageReceivingOrders: {
    url: '/dashboard/ordered/receiving',
    name: 'Hàng chờ nhận',
    icon: <GoPackageDependencies size={'2em'} />,
  },
  historyOrders: {
    url: '/dashboard/ordered/history',
    name: 'Lịch sử đơn hàng',
    icon: <LuPackageCheck size={'2em'} />,
  },
  leavingOrders: {
    url: '/dashboard/ordered/leave',
    name: 'Hàng chờ chuyển đi',
    icon: <GoPackageDependents size={'2em'} />,
  },
  detailOrder: {
    url: '/dashboard/ordered/[id]/detail',
    name: 'Chi tiết đơn hàng',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  manageOrders: {
    url: '/dashboard/ordered',
    name: 'Đơn hàng',
    icon: <LuPackage2 size={'2em'} />,
  },
  createOrder: {
    url: '/dashboard/ordered/create',
    name: 'Tạo đơn hàng',
    icon: <LuPackagePlus size={'2em'} />,
  },
};

export const WorkPlateEnumType = {
  Warehouse: 1,
  Transaction: 2,
  Transshipment: 3,
};

export const OrderStatusEnum = {
  WAIT_F_DELIVERY: 1,
  R_DELIVERY: 2,
  DONE: 3,
  LEAVE_TRANSPORT_POINT: 4,
  AT_TRANSPORT_POINT: 5,
  AT_TRANSACTION_POINT: 13,
  LEAVE_TRANSACTION_POINT: 14,
  SHIPPING: 6,
  TO_THE_TRANSPORT_POINT: 7,
  TO_THE_TRANSACTION_POINT: 8,
  RETURN: 9,
  CREATE: 10,
  COMPLETE: 11,
  FAIL: 12,
};

export const OrderStatus = {
  1: {
    name: 'Chờ gửi',
    color: 'warning',
  },
  2: {
    name: 'Đang vận chuyển',
    color: 'info',
  },
  3: {
    name: 'Hoàn thành',
    color: 'success',
  },
  4: {
    name: 'Rời đi điểm trung chuyển',
    color: 'info',
  },
  5: {
    name: 'Tại điểm trung chuyển',
    color: 'info',
  },
  13: {
    name: 'Tại điểm giao dịch',
    color: 'info',
  },
  14: {
    name: 'Rời đi điểm giao dịch',
    color: 'info',
  },
  6: {
    name: 'Đang vận chuyển',
    color: 'info',
  },
  7: {
    name: 'Đến điểm trung chuyển',
    color: 'info',
  },
  8: {
    name: 'Đến điểm giao dịch',
    color: 'info',
  },
  9: {
    name: 'Hoàn trả',
    color: 'info',
  },
  10: {
    name: 'Tạo mới',
    color: 'primary',
  },
  11: {
    name: 'Hoàn thành',
    color: 'success',
  },
  12: {
    name: 'Thất bại',
    color: 'danger',
  },
};

export const GoodsType = {
  NORMAL: {
    name: 'Bình thường',
    value: 10,
  },
  fragile: {
    name: 'Dễ vỡ',
    value: 9,
  },
  oversized: {
    name: 'Quá khổ',
    value: 11,
  },
  hazardous: {
    name: 'Nguy hiểm',
    value: 12,
  },
};

export enum OrderTableType {
  Waiting = 'waiting',
  Receiving = 'receiving',
  History = 'history',
  Leave = 'leave',
  All = 'all',
}
