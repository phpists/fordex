import { LocationType } from './location-type';

export const colorByLocationType: Record<LocationType, string> = {
  [LocationType.From]: '#56CCF233',
  [LocationType.To]: '#6FCF9733',
};
