import http from '@/lib/http';
import { WorkPlateDetailResType, WorkPlateListResType, WorkPlateNewReqType } from '@/schema/workplate.schema';

export const workPlateApiRequest = {
  getWorkPlateClient: () => http.get<WorkPlateListResType>('api/work-plates'),
  getWorkPlate: (token: string) =>
    http.get<WorkPlateListResType>(`api/work-plates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getWorkPlateSuggestClient: (address_id: string) =>
    http.get<WorkPlateListResType>(`api/work-plates/suggestion-wp?address_id=${address_id}`),
  createWP: (body: WorkPlateNewReqType) => http.post<WorkPlateListResType>('api/work-plates', body),
  getDetailWorkPlate: (token: string, id: string) =>
    http.get<WorkPlateDetailResType>(`api/work-plates/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateWP: (id: number, body: WorkPlateNewReqType) => http.put<WorkPlateListResType>(`api/work-plates/${id}`, body),
};
