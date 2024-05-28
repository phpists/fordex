import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Box, Collapse, Divider, Stack, TextField } from '@mui/material';

import { Grid } from 'shared/components/Grid';

import { useAddPositionsFormContext } from '../../model/use-add-positions-form';
import { PositionListItem } from './position-list-item';
import { PackadgeSelect } from 'entities/address/ui/packadge-select';

interface ProductInfoProps {
  index: number;
  isLastItem: boolean;
  onRemoveClick: (index: number) => void;
}

export interface PositionInfoRef {
  hideForm: () => void;
  scrollTo: () => void;
}

export const PositionInfo = forwardRef<PositionInfoRef, ProductInfoProps>(
  function PositionInfoBase({ index, isLastItem, onRemoveClick }, ref) {
    const stackRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const {
      form: { register, getFieldState },
    } = useAddPositionsFormContext();

    const { invalid: markingInvalid } = getFieldState(
      `positions.${index}.marking`
    );
    const { invalid: descriptionInvalid } = getFieldState(
      `positions.${index}.description`
    );
    const { invalid: boxesQtyInvalid, error: boxesQtyError } = getFieldState(
      `positions.${index}.boxesQty`
    );
    const { invalid: weightInvalid, error: weightError } = getFieldState(
      `positions.${index}.weight`
    );
    const { error: volumeError } = getFieldState(`positions.${index}.volume`);
    const { error: ldmError } = getFieldState(`positions.${index}.ldm`);
    const { error: areaError } = getFieldState(`positions.${index}.area`);
    const { invalid: dangerousGoodsInvalid } = getFieldState(
      `positions.${index}.dangerousGoods`
    );

    const toggle = useCallback(() => setIsExpanded((state) => !state), []);

    useImperativeHandle(ref, () => ({
      hideForm: () => setIsExpanded(false),
      scrollTo: () =>
        stackRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        }),
    }));

    return (
      <>
        <PositionListItem
          index={index}
          isLastItem={isLastItem}
          isExpanded={isExpanded}
          onExpandClick={toggle}
          onRemoveClick={onRemoveClick}
        />
        <Collapse in={isExpanded} timeout="auto" unmountOnExit={false}>
          <Stack ref={stackRef}>
            <Divider />
            <Box
              py={{ xs: 1, sm: 2 }}
              flexDirection={{ sm: 'row', xs: 'column' }}
              display="flex"
              px={1}
              gap={{ xs: 1, sm: 2 }}
            >
              <Stack gap={1} width="100%">
                <TextField
                  {...register(`positions.${index}.marking`)}
                  fullWidth
                  variant="standard"
                  label="Markierung / Ware"
                  error={markingInvalid}
                  inputProps={{ maxLength: 30 }}
                />
                <TextField
                  {...register(`positions.${index}.description`)}
                  fullWidth
                  variant="standard"
                  label="Warenbezeichung"
                  multiline
                  rows={6}
                  error={descriptionInvalid}
                  inputProps={{ maxLength: 140 }}
                />
              </Stack>
              <Grid
                container
                spacing={1}
                maxWidth={{ xs: 'unset', sm: 270, md: 380 }}
              >
                <Grid xs={6}>
                  <TextField
                    {...register(`positions.${index}.boxesQty`, {
                      valueAsNumber: true,
                    })}
                    fullWidth
                    variant="standard"
                    label="Anzahl"
                    type="number"
                    error={boxesQtyInvalid}
                    helperText={boxesQtyError?.message}
                  />
                </Grid>
                <Grid xs={6}>
                  <TextField
                    {...register(`positions.${index}.weight`, {
                      valueAsNumber: true,
                    })}
                    fullWidth
                    variant="standard"
                    label="Gewicht kg."
                    type="number"
                    error={weightInvalid}
                    helperText={weightError?.message}
                  />
                </Grid>
                <Grid xs={12}>
                  <PackadgeSelect
                    formControlProps={{
                      fullWidth: true,
                      variant: 'standard',
                    }}
                    index={index}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    {...register(`positions.${index}.dangerousGoods`)}
                    fullWidth
                    variant="standard"
                    label="Gefahrengut/ADR"
                    error={dangerousGoodsInvalid}
                    inputProps={{ maxLength: 10 }}
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    {...register(`positions.${index}.volume`, {
                      valueAsNumber: true,
                    })}
                    fullWidth
                    variant="standard"
                    label="m3"
                    type="number"
                    error={!!volumeError?.message}
                    helperText={volumeError?.message}
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    {...register(`positions.${index}.ldm`, {
                      valueAsNumber: true,
                    })}
                    fullWidth
                    variant="standard"
                    label="LDM"
                    type="number"
                    error={!!ldmError?.message}
                    helperText={ldmError?.message}
                  />
                </Grid>
                <Grid xs={4}>
                  <TextField
                    {...register(`positions.${index}.area`, {
                      valueAsNumber: true,
                    })}
                    fullWidth
                    variant="standard"
                    label="Fläche m2"
                    type="number"
                    error={!!areaError?.message}
                    helperText={areaError?.message}
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider />
          </Stack>
        </Collapse>
      </>
    );
  }
);
