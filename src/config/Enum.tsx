import { MdOutlineDashboard } from 'react-icons/md';
import { IoPeopleOutline } from 'react-icons/io5';
import { LuPackage2 } from 'react-icons/lu';
import { RiRoadMapLine } from 'react-icons/ri';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';

export const UserRole = {
  Admin: 'Admin',
  User: 'User',
  Driver: 'Driver',
  Employee: 'Employee',
  Manager: 'Manager',
};

export const RoleId = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' },
  { id: 3, name: 'Driver' },
  { id: 4, name: 'Employee' },
  { id: 5, name: 'Manager' },
];

export const Role = {
  Admin: {
    id: 1,
    name: 'Quản trị viên',
    tabs: ['dashboard', 'manageTransshipment', 'manageTransactions', 'manageEmployees', 'manageOrders', 'createOrder'],
    left: ['manageOrders', 'createOrder'],
  },
  Manager: {
    id: 5,
    name: 'Quản lí',
    tabs: ['dashboard', 'manageEmployees', 'manageOrders', 'createOrder'],
    left: ['manageEmployees', 'manageTransshipment', 'manageTransactions'],
  },
  Driver: {
    id: 3,
    name: 'Tài xế',
    left: ['manageTransshipment', 'manageTransactions', 'createOrder'],
    tabs: ['dashboard', 'manageOrders', 'manageEmployees'],
  },
  Employee: {
    id: 4,
    name: 'Nhân viên',
    tabs: ['dashboard', 'manageOrders', 'createOrder'],
    left: ['manageTransshipment', 'manageTransactions', 'manageEmployees'],
  },
  User: {
    id: 2,
    name: 'Người dùng',
    left: ['manageTransshipment', 'manageTransactions', 'createOrder'],
    tabs: ['dashboard', 'manageOrders', 'manageEmployees'],
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
  manageOrders: {
    url: '/dashboard/ordered',
    name: 'Đơn hàng',
    icon: <LuPackage2 size={'2em'} />,
  },
  manageTransshipment: {
    url: '/dashboard/transshipment',
    name: 'Điểm trung chuyển',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
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
    icon: <RiRoadMapLine size={'2em'} />,
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
  createEmployee: {
    url: '/dashboard/employee/create',
    name: 'Tạo tài khoản nhân viên',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  createOrder: {
    url: '/dashboard/ordered/create',
    name: 'Tạo đơn hàng',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  detailEmployee: {
    url: '/dashboard/employee/[id]/detail',
    name: 'Thông tin nhân viên',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  detailOrder: {
    url: '/dashboard/ordered/[id]/detail',
    name: 'Chi tiết đơn hàng',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
};

export const WorkPlateEnumType = {
  Warehouse: 1,
  Transaction: 2,
  Transshipment: 3,
};

export const orderStatus = {
  forwarded: {
    name: 'forwarded',
    now: 'Đã vận chuyển',
    next: [
      {
        code: 'customer_sent',
        name: 'Xác nhận người nhận đã nhận được hàng',
      },
      {
        code: 'customer_returned',
        name: 'Xác nhận hàng bị hoàn trả',
      },
    ],
    color: 'success',
  },
  arriving: {
    name: 'arriving',
    now: 'Đang vận chuyển đến',
    next: {
      name: 'Xác nhận đã đến',
      code: 'on_stock',
    },
    color: 'warning',
  },
  on_stock: {
    name: 'on_stock',
    now: 'Trong kho',
    next: {
      name: 'Xác nhận chuyển tiếp',
      code: 'forwarded',
    },
    color: 'danger',
  },
  customer_sent: {
    name: 'customer_sent',
    now: 'Người nhận đã nhận được hàng',
    next: null,
    color: 'primary',
  },
  customer_returned: {
    name: 'customer_returned',
    now: 'Hàng bị hoàn trả',
    next: null,
    color: 'dark',
  },
};
