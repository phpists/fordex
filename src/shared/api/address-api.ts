import { httpClient } from 'shared/utils';
import { z } from 'zod';

export interface AddressDTO_Deprecated {
  value: string;
  label: string;
}

export interface PostAddressDTO {
  id: number;
  zipPostName: string;
  postName: string;
  zip: number;
}

export const addressDTOSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const ADDRESS_API_URLS = {
  getCountries: '/v1/dictionary/address/filter?type=country',
  getCities: '/v1/dictionary/address/filter?type=zipCity',
  getPostAddresses: '/v1/dictionary/address/post/all',
  getPackadges: '/api/packing/all',
};

export function getPostAddresses(signal?: AbortSignal) {
  return httpClient.get<PostAddressDTO[]>(ADDRESS_API_URLS.getPostAddresses, {
    signal,
  });
}

export function getCountries(signal?: AbortSignal) {
  return httpClient.get<AddressDTO_Deprecated[]>(
    ADDRESS_API_URLS.getCountries,
    {
      signal,
    }
  );
}

export function getCities(signal?: AbortSignal) {
  return httpClient.get<AddressDTO_Deprecated[]>(ADDRESS_API_URLS.getCities, {
    signal,
  });
}

export function getPackadges(signal?: AbortSignal) {
  return httpClient.get<AddressDTO_Deprecated[]>(
    ADDRESS_API_URLS.getPackadges,
    {
      signal,
    }
  );
}
