import http from '@/lib/http';
import { WorkPlateListResType } from '@/schema/workplate.schema';

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
};
