import { MdOutlineDashboard } from 'react-icons/md';
import { IoPeopleOutline } from 'react-icons/io5';
import { LuPackage2 } from 'react-icons/lu';
import { RiRoadMapLine } from 'react-icons/ri';
import { HiOutlineBuildingOffice } from 'react-icons/hi2';

export const Role = {
  Admin: {
    name: 'Quản trị viên',
    role: 'Admin',
    right: ['homepage', 'manageGoodsPoint', 'manageTransactionPoint', 'manageEmployees'],
    left: ['manageOrders', 'createOrder'],
  },
  Manager: {
    name: 'Nhân viên điểm tập kết',
    role: 'GOODS_POINT_EMPLOYEE',
    left: ['manageEmployees', 'manageGoodsPoint', 'manageTransactionPoint'],
    right: ['homepage', 'manageOrders'],
  },
  Driver: {
    name: 'Quản lí điểm tập kết',
    role: 'GOODS_POINT_HEAD',
    left: ['manageGoodsPoint', 'manageTransactionPoint', 'createOrder'],
    right: ['homepage', 'manageOrders', 'manageEmployees'],
  },
  Employee: {
    name: 'Nhân viên điểm giao dịch',
    role: 'TRANSACTION_POINT_EMPLOYEE',
    left: ['manageGoodsPoint', 'manageTransactionPoint', 'manageEmployees'],
    right: ['homepage', 'manageOrders'],
  },
  User: {
    name: 'Quản lí điểm giao dịch',
    role: 'TRANSACTION_POINT_HEAD',
    left: ['manageGoodsPoint', 'manageTransactionPoint', 'createOrder'],
    right: ['homepage', 'manageOrders', 'manageEmployees'],
  },
};

export const listUrl = {
  homepage: {
    url: '/dashboard',
    name: 'Trang chính',
    icon: <MdOutlineDashboard size={'2em'} />,
  },
  manageEmployees: {
    url: '/dashboard/list_employee',
    name: 'Nhân viên',
    icon: <IoPeopleOutline size={'2em'} />,
  },
  manageOrders: {
    url: '/dashboard/list_ordered',
    name: 'Đơn hàng',
    icon: <LuPackage2 size={'2em'} />,
  },
  manageGoodsPoint: {
    url: '/dashboard/list_workspace',
    name: 'Điểm tập kết',
    icon: <RiRoadMapLine size={'2em'} />,
  },
  manageTransactionPoint: {
    url: '/dashboard/list_transaction',
    name: 'Điểm giao dịch',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  createEmployee: {
    url: '/dashboard/list_employee/create',
    name: 'Tạo tài khoản nhân viên',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  createOrder: {
    url: '/dashboard/list_ordered/create',
    name: 'Tạo đơn hàng',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  detailEmployee: {
    url: '/dashboard/list_employee/[id]/detail',
    name: 'Thông tin nhân viên',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
  detailOrder: {
    url: '/dashboard/list_ordered/[id]/detail',
    name: 'Chi tiết đơn hàng',
    icon: <HiOutlineBuildingOffice size={'2em'} />,
  },
};
