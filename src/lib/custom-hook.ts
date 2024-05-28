import accountApiRequest from '@/api/account';
import useSWR from 'swr';
import { EMPLOYEE_PAGE_SIZE, WORK_PLATE_PAGE_SIZE } from '@/config/constant';
import { workPlateApiRequest } from '@/api/workplate';
import { orderApiRequest } from '@/api/order';
import { OrderStatusEnum, OrderTableType } from '@/config/Enum';
import { statisticApiRequest } from '@/api/statistic';

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

const fetchOrder = (statuses: number[], page: number) =>
  orderApiRequest.getListOrder(statuses, page).then((res) => {
    return res.payload.data;
  });

export const useOrder = (type: OrderTableType, page: number) => {
  const statuses: number[] = [];
  switch (type) {
    case OrderTableType.Waiting:
      statuses.push(OrderStatusEnum.CREATE);
      statuses.push(OrderStatusEnum.AT_TRANSACTION_POINT);
      statuses.push(OrderStatusEnum.AT_TRANSPORT_POINT);
      break;
    case OrderTableType.Receiving:
      statuses.push(OrderStatusEnum.LEAVE_TRANSACTION_POINT);
      statuses.push(OrderStatusEnum.LEAVE_TRANSPORT_POINT);
      break;
    case OrderTableType.Leave:
      statuses.push(OrderStatusEnum.TO_THE_TRANSACTION_POINT);
      statuses.push(OrderStatusEnum.TO_THE_TRANSPORT_POINT);
      break;
    case OrderTableType.History:
      statuses.push(OrderStatusEnum.DONE);
      // statuses.push(OrderStatusEnum.Cancel);
      break;
    default:
      break;
  }
  return useSWR(['api/orders', type, page], () => fetchOrder(statuses, page), {
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

export const fetchStatisticOrder = () =>
  statisticApiRequest.getTotalOrder().then((res) => {
    return res.payload.data.total;
  });

export const useStatisticOrder = () => {
  return useSWR('api/statistical/orders', fetchStatisticOrder, {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });
};

export const fetchStatisticEmployee = () =>
  statisticApiRequest.getTotalEmployee().then((res) => {
    return res.payload.data.total;
  });

export const useStatisticEmployee = () => {
  return useSWR('api/statistical/employees', fetchStatisticEmployee, {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });
};

export const fetchStatisticWP = (type: number) =>
  statisticApiRequest.getTotalWorkPlate(type).then((res) => {
    return res.payload.data.total;
  });

export const useStatisticWP = (type: number) => {
  return useSWR(['api/statistical/work-plates', type], () => fetchStatisticWP(type), {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });
};
