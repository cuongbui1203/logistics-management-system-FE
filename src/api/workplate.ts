import http from '@/lib/http';
import { WorkPlateListResType } from '@/schema/workplate';

export const workPlateApiRequest = {
  getWorkPlateClient: () => http.get<WorkPlateListResType>('api/work-plates'),
};
