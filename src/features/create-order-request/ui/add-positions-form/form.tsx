import { useCallback, useEffect, useRef } from 'react';
import { usePrevious, useUpdateEffect } from 'react-use';
import { Box, Fab, List, Stack, Typography, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useAddPositionsFormContext } from '../../model/use-add-positions-form';

import { PositionInfo, PositionInfoRef } from './position-info';
import { snackbar } from 'shared/modules/snackbar';

const AddPositionFAB = styled(Fab)(() => ({
  marginTop: 'auto',
  alignSelf: 'center',
  minHeight: 40,
  boxShadow: 'none',
  '&:active': {
    boxShadow: 'none',
  },
}));

const PositionList = styled(List)({
  flexGrow: 1,
});

export function AddPositionsForm() {
  const positionInfoRefs = useRef<PositionInfoRef[]>([]);
  const {
    addProduct,
    productsFieldArray: { fields, remove },
  } = useAddPositionsFormContext();
  const previousPositionsLength = usePrevious(fields.length);

  const addPositionInfoToRef = (ref: PositionInfoRef, index: number) => {
    positionInfoRefs.current[index] = ref;
  };

  useEffect(() => {
    positionInfoRefs.current = positionInfoRefs.current.slice(0, fields.length);
  }, [fields.length]);

  // Detect adding position
  useUpdateEffect(() => {
    if (
      previousPositionsLength &&
      fields.length - previousPositionsLength === 1
    ) {
      positionInfoRefs.current[fields.length - 1].scrollTo();
    }
  }, [fields.length]);

  const handleAddPositionClick = useCallback(() => {
    if (fields.length < 10) {
      positionInfoRefs.current.forEach((position) => position.hideForm());
      addProduct();
    } else {
      snackbar.show({
        message: 'Die maximale Anzahl beträgt 10',
        type: 'error',
        canClose: true,
        autoHideDuration: 2000,
      });
    }
  }, [addProduct, fields.length]);

  return (
    <Stack height="100%" gap={{ xs: 1, md: 2 }}>
      {fields.length > 0 && (
        <PositionList dense>
          {fields.map((field, i) => (
            <PositionInfo
              ref={(ref) => ref && addPositionInfoToRef(ref, i)}
              onRemoveClick={remove}
              index={i}
              key={field.id}
              isLastItem={i === fields.length - 1}
            />
          ))}
        </PositionList>
      )}
      {fields.length === 0 && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Typography fontWeight="bold" color="error">
            Positionen sind erforderlich
          </Typography>
        </Box>
      )}
      <AddPositionFAB
        size="small"
        variant="extended"
        onClick={handleAddPositionClick}
      >
        <AddIcon sx={{ mr: 1 }} />
        Hinzufügen
      </AddPositionFAB>
    </Stack>
  );
}
