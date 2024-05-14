import dayjs from 'dayjs';
import { useEffect } from 'react';
import { z } from 'zod';
import { useFormContext, useWatch } from 'react-hook-form';
import { inRange } from 'lodash-es';

import { addressDTOSchema } from 'shared/api/address-api';
import { postAddressSchema } from 'entities/address';

const MAX_DATE_TO_YEAR_DIFFERENCE = 2;

const handleGetInitDate = () =>
  new Date()?.getHours() > 15
    ? dayjs().add(1, 'day')?.toISOString()
    : dayjs()?.toISOString();

const datesValidator = (
  [dateFromISO, dateToISO]: [string, string],
  ctx: z.RefinementCtx
) => {
  try {
    const parsedDateFrom = dayjs(dateFromISO);
    const parsedDateTo = dayjs(dateToISO);
    const currentDate = dayjs();

    if (parsedDateTo.diff(parsedDateFrom) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        path: ['addressFrom.date', 'addressTo.date'],
        minimum: 0,
        inclusive: true,
        type: 'string',
      });
    }

    if (parsedDateFrom.year() !== currentDate.year()) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['addressFrom.date'],
      });
    }

    if (
      !inRange(
        parsedDateTo.year(),
        currentDate.year(),
        currentDate.year() + MAX_DATE_TO_YEAR_DIFFERENCE
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        path: ['addressTo.date'],
      });
    }
  } catch {
    return;
  }
};

export const addressDetailsSchema = z.object({
  userName: z.string().min(1).trim(),
  country: addressDTOSchema,
  city: postAddressSchema.or(z.string().min(1)),
  street: z.string().trim().optional(),
  date: z.string().datetime().min(1).trim(),
  timeFrom: z.union([z.string(), z.string().datetime()]),
  timeTo: z.union([z.string(), z.string().datetime()]),
  phoneNumber: z.string().trim().optional(),
});

export const transportationDetailsFormValidationSchema = z
  .object({
    addressFrom: addressDetailsSchema,
    addressTo: addressDetailsSchema,
    details: z.string().optional(),
    customerReference: z.string().optional(),
  })
  .superRefine(({ addressFrom, addressTo }, ctx) =>
    datesValidator([addressFrom.date, addressTo.date], ctx)
  );

export const DEFAULT_TRANSPORTATION_DETAILS_FORM_VALUES: TransportationDetailsFormValues =
  {
    addressFrom: {
      city: '',
      country: {
        label: 'CH',
        value: 'KEY#756',
      },
      date: handleGetInitDate(),
      timeFrom: '',
      timeTo: '',
      userName: '',
      phoneNumber: '',
      street: '',
    },
    addressTo: {
      city: '',
      country: {
        label: 'CH',
        value: 'KEY#756',
      },
      date: handleGetInitDate(),
      timeFrom: '',
      timeTo: '',
      userName: '',
      phoneNumber: '',
      street: '',
    },
  };

export type AddressDetailsFormField = z.infer<typeof addressDetailsSchema>;
export type TransportationDetailsFormValues = z.infer<
  typeof transportationDetailsFormValidationSchema
>;

export function useTransportationDetailsFormContext() {
  const form = useFormContext<TransportationDetailsFormValues>();

  useWatchDateRange();
  useWatchTimeRanges('addressFrom');
  useWatchTimeRanges('addressTo');

  return form;
}

/**
 * Checks the correct date range
 * between addressFrom.date and addressTo.date
 * and updates it, to fix range
 */
function useWatchDateRange() {
  const { control, getValues } =
    useFormContext<TransportationDetailsFormValues>();

  const [dateFrom, dateTo] = useWatch({
    control,
    name: ['addressFrom.date', 'addressTo.date'],
  });

  useEffect(() => {
    try {
      if (dayjs(getValues('addressTo.date')).diff(dateFrom) < 0) {
        // resetField('addressTo.date');
      }
    } catch {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom]);

  useEffect(() => {
    try {
      if (dayjs(dateTo).diff(getValues('addressFrom.date')) < 0) {
        // resetField('addressFrom.date');
      }
    } catch {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTo]);
}

/**
 * Checks the correct time range in specific
 * address details ('from' or 'to')
 * and updates it, to fix range
 * @param addressDirection Address direction 'from' or 'to'
 */
function useWatchTimeRanges(addressDirection: 'addressFrom' | 'addressTo') {
  const { control, getValues, setValue } =
    useFormContext<TransportationDetailsFormValues>();

  const [watchTimeFrom, watchTimeTo] = useWatch({
    control,
    name: [`${addressDirection}.timeFrom`, `${addressDirection}.timeTo`],
  });

  useEffect(() => {
    try {
      const timeTo = getValues(`${addressDirection}.timeTo`);
      if (dayjs(watchTimeFrom).isAfter(timeTo)) {
        setValue(`${addressDirection}.timeTo`, watchTimeFrom);
      }
    } catch {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTimeFrom]);

  useEffect(() => {
    try {
      const timeFrom = getValues(`${addressDirection}.timeFrom`);
      if (dayjs(watchTimeTo).isBefore(timeFrom)) {
        setValue(`${addressDirection}.timeFrom`, watchTimeTo);
      }
    } catch {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTimeTo]);
}
