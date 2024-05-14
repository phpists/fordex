import { Box, styled } from '@mui/material';

import { ArrowDirectionComponent } from 'shared/assets/sprites';

import { ShortLocationInfo } from './short-location-info';
import { LocationType } from '../../lib/location-type';
import { useTransportationDetailsFormContext } from 'features/create-order-request/model/use-transportation-details-form';
import { useWatch } from 'react-hook-form';
import { useMemo } from 'react';

const ArrowDirectionWrapper = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const ShortLogisticsInfoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(1),
    flexWrap: 'wrap',
  },
}));

const locationTypeFormKey = {
  [LocationType.From]: 'addressFrom',
  [LocationType.To]: 'addressTo',
} as const;

export function ShortLogisticsInfoGroup() {
  const { control } = useTransportationDetailsFormContext();
  const [country, city] = useWatch({
    control,
    name: [
      `${locationTypeFormKey[LocationType.From]}.country`,
      `${locationTypeFormKey[LocationType.From]}.city`,
    ],
  });

  const displayCity = useMemo(() => {
    if (typeof city === 'string') {
      return city;
    }
    return city?.zipPostName;
  }, [city]);

  return (
    <ShortLogisticsInfoWrapper>
      <ShortLocationInfo type={LocationType.From} />
      {country?.label && displayCity ? (
        <ArrowDirectionWrapper>
          <ArrowDirectionComponent />
        </ArrowDirectionWrapper>
      ) : null}
      <ShortLocationInfo type={LocationType.To} />
    </ShortLogisticsInfoWrapper>
  );
}
