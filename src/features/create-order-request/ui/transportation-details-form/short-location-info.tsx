import { Box, Typography, styled } from '@mui/material';
import { useWatch } from 'react-hook-form';

import { createSxStyles } from 'shared/utils';

import { colorByLocationType } from '../../lib/colors';
import { LocationType } from '../../lib/location-type';
import { useTransportationDetailsFormContext } from '../../model/use-transportation-details-form';
import { useMemo } from 'react';

interface ShortLocationInfoProps {
  type: LocationType;
}

const LocationBox = styled(Box)<ShortLocationInfoProps>(({ theme, type }) => ({
  background: colorByLocationType[type],
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  flexGrow: 1,
  maxWidth: 340,
  minWidth: 260,
  [theme.breakpoints.down('md')]: {
    maxWidth: 'unset',
  },
  ':after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    width: 15,
    height: 15,
    borderWidth: 3,
    borderColor: 'white',
    borderStyle: 'solid',
    borderRadius: '50%',
    [theme.breakpoints.between('sm', 'md')]: {
      display: 'none',
    },
  },
}));

const dotStyles = createSxStyles({
  [LocationType.From]: (theme) => ({
    ':after': {
      right: 0,
      transform: 'translateX(50%) translateY(-50%)',
      background: colorByLocationType[LocationType.From],
      [theme.breakpoints.down('sm')]: {
        right: 'initial',
        left: 0,
        transform: 'translateX(-50%) translateY(-50%)',
      },
    },
  }),
  [LocationType.To]: {
    marginLeft: 'auto',
    ':after': {
      left: 0,
      transform: 'translateX(-50%) translateY(-50%)',
      background: colorByLocationType[LocationType.To],
    },
  },
});

const locationTypeText = {
  [LocationType.From]: 'Ladeort',
  [LocationType.To]: 'Abladeort',
} as const;

const locationTypeFormKey = {
  [LocationType.From]: 'addressFrom',
  [LocationType.To]: 'addressTo',
} as const;

export function ShortLocationInfo({ type }: ShortLocationInfoProps) {
  const { control } = useTransportationDetailsFormContext();
  const [country, city] = useWatch({
    control,
    name: [
      `${locationTypeFormKey[type]}.country`,
      `${locationTypeFormKey[type]}.city`,
    ],
  });

  const displayCity = useMemo(() => {
    if (typeof city === 'string') {
      return city;
    }
    return city?.zipPostName;
  }, [city]);

  return (
    <>
      {country?.label && displayCity ? (
        <LocationBox type={type} sx={dotStyles[type]}>
          <Box
            sx={{
              minWidth: 80,
            }}
          >
            <Typography lineHeight={1}>{locationTypeText[type]}:</Typography>
          </Box>
          <Box flexGrow={1} alignSelf="center" overflow="hidden">
            <Typography
              lineHeight={1}
              variant="body1"
              fontWeight="bold"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {country?.label && displayCity
                ? `${country.label} ${displayCity}`
                : ''}
            </Typography>
          </Box>
        </LocationBox>
      ) : (
        <div />
      )}
    </>
  );
}
