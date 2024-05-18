import accountApiRequest from '@/api/account';
import useSWR from 'swr';
import { EMPLOYEE_PAGE_SIZE, WORK_PLATE_PAGE_SIZE } from '@/config/constant';
import { workPlateApiRequest } from '@/api/workplate';
import { orderApiRequest } from '@/api/order';

// Custom hook, just use on client side
// first argument is the key not url, second is the function to fetch data

const fetchEmployee = (page: number) =>
  accountApiRequest.listAccountClient(page).then((res) => {
    return res.payload.data;
  });

export const useEmployee = (page: number) => {
  return useSWR(['api/users', EMPLOYEE_PAGE_SIZE, page], () => fetchEmployee(page), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

const fetchWP = (page: number, type: number) =>
  workPlateApiRequest.getWorkPlateClient(page, type).then((res) => {
    return res.payload.data;
  });

export const useWorkPlate = (page: number, type: number) => {
  return useSWR(['api/work-plates', WORK_PLATE_PAGE_SIZE, page, type], () => fetchWP(page, type), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};

const fetchOrder = (status: number, page: number) =>
  orderApiRequest.getListOrder(status, page).then((res) => {
    return res.payload.data;
  });

export const useOrder = (status: number, page: number) => {
  return useSWR(['api/orders', status, page], () => fetchOrder(status, page), {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });
};

export const fetchOrderDetail = (id: string) =>
  orderApiRequest.getOrderDetail(id).then((res) => {
    return res.payload.data;
  });

export const useOrderDetail = (id: string) => {
  return useSWR(['api/orders', id], () => fetchOrderDetail(id), {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });
};
