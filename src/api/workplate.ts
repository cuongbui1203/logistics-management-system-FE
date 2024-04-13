import http from '@/lib/http';
import { WorkPlateListResType } from '@/schema/workplate.schema';

export const workPlateApiRequest = {
  getWorkPlateClient: () => http.get<WorkPlateListResType>('api/work-plates'),
  getWorkPlate: (token: string) => http.get<WorkPlateListResType>(`api/work-plates`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
};
