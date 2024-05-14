import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import {
  getCities,
  getCountries,
  getPostAddresses,
} from 'shared/api/address-api';

import { CityModel, CountryModel, PostAddressModel } from './types';
import { transformCitiesMap } from './transform-cities-map';

export interface AddressesStore {
  /**
   * @deprecated
   */
  cities: Partial<Record<CityModel['value'], CityModel[]>>;
  /**
   * @deprecated
   */
  citiesLoading: boolean;
  postAddresses: PostAddressModel[];
  postAddressesLoading: boolean;
  countries: CountryModel[];
  countriesLoading: boolean;
  /**
   * initialize state with cities & countries
   * @returns Unsubscribe function to stop retrieving cities & countries from the server
   */
  initState: () => () => void;
  resetState: () => void;
}

const STORE_NAME = 'addresses';

export const useAddressesStore = create<AddressesStore>()(
  devtools(
    persist(
      (set, get) => ({
        cities: {},
        postAddresses: [] as PostAddressModel[],
        countries: [] as CountryModel[],
        citiesLoading: false as boolean,
        countriesLoading: false as boolean,
        postAddressesLoading: false as boolean,
        resetState: () =>
          set(
            {
              cities: {},
              countries: [],
              citiesLoading: false,
              countriesLoading: false,
            },
            false,
            'addresses/reset'
          ),
        initState: () => {
          const { cities, countries } = get();
          const abortController = new AbortController();
          const unsubscribe = () => abortController.abort();
          const init = async () => {
            try {
              set(
                {
                  citiesLoading: true,
                  countriesLoading: true,
                  postAddressesLoading: true,
                  postAddresses: [],
                  cities: {},
                  countries: [],
                },
                false,
                'addresses/load-addresses'
              );
              const [countries, cities, postAddresses] = await Promise.all([
                getCountries(abortController.signal).then(
                  (response) => response.data
                ),
                getCities(abortController.signal).then(
                  (response) => response.data
                ),
                getPostAddresses(abortController.signal).then(
                  (response) => response.data
                ),
              ]);
              set(
                {
                  citiesLoading: false,
                  countriesLoading: false,
                  postAddressesLoading: false,
                  postAddresses,
                  cities: transformCitiesMap(countries, cities),
                  countries,
                },
                false,
                'addresses/update-addresses'
              );
            } catch {
              set(
                { citiesLoading: false, countriesLoading: false },
                false,
                'addresses/addresses-not-loaded'
              );
            }
          };

          if (Object.keys(cities).length === 0 || countries.length === 0) {
            init();
          }

          return unsubscribe;
        },
      }),
      {
        name: STORE_NAME,
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: STORE_NAME,
      anonymousActionType: `${STORE_NAME}/anonymous-action`,
    }
  )
);

export const selectCities = ({ cities, citiesLoading }: AddressesStore) => ({
  cities,
  citiesLoading,
});
export const selectCountries = ({
  countries,
  countriesLoading,
}: AddressesStore) => ({
  countries,
  countriesLoading,
});
export const selectPostAddresses = ({
  postAddresses,
  postAddressesLoading,
}: AddressesStore) => ({ postAddresses, postAddressesLoading });
