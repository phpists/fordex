import { CityModel, CountryModel } from './types';

export function transformCitiesMap(
  countries: CountryModel[],
  cities: CityModel[]
) {
  return countries.reduce(
    (acc, country) => ({
      ...acc,
      [country.value]: cities,
    }),
    {} as Record<CountryModel['value'], CityModel[]>
  );
}
