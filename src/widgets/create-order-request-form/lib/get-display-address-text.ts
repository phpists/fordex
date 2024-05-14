import { PostAddressModel } from 'entities/address';

export const getDisplayAddressText = (value: string | PostAddressModel) => {
  if (typeof value === 'string') {
    return value;
  }
  return value.zipPostName;
};
