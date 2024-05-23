import http from '@/lib/http';
import { StatisticSchemaType } from '@/schema/common.schema';

export const statisticApiRequest = {
  getTotalEmployee: () => http.get<StatisticSchemaType>('api/statistical/employees'),
  getTotalOrder: () => http.get<StatisticSchemaType>('api/statistical/orders'),
  getTotalWorkPlate: (type: number) => http.get<StatisticSchemaType>(`api/statistical/work_plates?type=${type}`),
};
