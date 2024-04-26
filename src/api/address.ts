import { AddressListResType } from './../schema/addressApi.schema';
import http from '@/lib/http';

export const addressApiRequest = {
  getProvince: () => http.get<AddressListResType>('api/address/provinces'),
  getProvinceClient: () => http.get<AddressListResType>('api/address/provinces'),
  getDistrictClient: (provinceId: string) => http.get<AddressListResType>(`api/address/districts?code=${provinceId}`),
  getWardClient: (districtId: string) => http.get<AddressListResType>(`api/address/wards?code=${districtId}`),
};
