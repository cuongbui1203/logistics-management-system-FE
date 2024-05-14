import { WORK_PLATE_PAGE_SIZE } from '@/config/constant';
import http from '@/lib/http';
import {
  WorkPlateDetailResType,
  WorkPlateListResType,
  WorkPlateNewReqType,
  WorkPlateSuggestResType,
} from '@/schema/workplate.schema';

export const workPlateApiRequest = {
  getWorkPlateClient: (page: number, type: number) =>
    http.get<WorkPlateListResType>(`api/work-plates?pageSize=${WORK_PLATE_PAGE_SIZE}&&page=${page}&&type_id=${type}`),
  getWorkPlate: (token: string) =>
    http.get<WorkPlateListResType>(`api/work-plates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getWorkPlateSuggestClient: (address_id: string) =>
    http.get<WorkPlateSuggestResType>(`api/work-plates/suggestion-wp?address_id=${address_id}`),
  createWP: (body: WorkPlateNewReqType) => http.post<WorkPlateListResType>('api/work-plates', body),
  getDetailWorkPlate: (token: string, id: string) =>
    http.get<WorkPlateDetailResType>(`api/work-plates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateWP: (id: number, body: WorkPlateNewReqType) => http.put<WorkPlateListResType>(`api/work-plates/${id}`, body),
  deleteWP: (id: number) => http.delete<WorkPlateListResType>(`api/work-plates/${id}`),
};
