import { AddressListResType } from './../schema/addressApi.schema';
import http from '@/lib/http';

export const addressApiRequest = {
  getProvince: () => http.get<AddressListResType>('api/address/provinces'),
  getDistrict: (provinceId: string) =>
    http.get<AddressListResType>(`api/address/districts?code=${provinceId}`, {
      cache: 'force-cache',
    }),
  getWard: (districtId: string) =>
    http.get<AddressListResType>(`api/address/wards?code=${districtId}`, {
      cache: 'force-cache',
    }),
};
