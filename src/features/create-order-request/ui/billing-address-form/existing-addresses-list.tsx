import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Radio,
} from '@mui/material';
import { useController } from 'react-hook-form';
import { Fragment } from 'react';

import { useBillingAddressFormContext } from '../../model/use-billing-address-form';

const TEST_BILLING_ADDRESSES = [
  {
    address: 'Direct Mail Company, Basel Fenchackerweg 1 4704 Niederbipp',
    id: 0,
  },
  {
    address: 'Direct Mail Company, Basel Fenchackerweg 1 4705 Niederbipp',
    id: 1,
  },
  {
    address: 'Direct Mail Company, Basel Fenchackerweg 1 4706 Niederbipp',
    id: 2,
  },
];

export function ExistingAddressesList() {
  const { control, getFieldState, formState } = useBillingAddressFormContext();

  const existingAddressController = useController({
    control,
    name: 'address.selectedAddress',
  });

  const handleAddressChange = (
    value: (typeof TEST_BILLING_ADDRESSES)[number]
  ) => {
    existingAddressController.field.onChange(value.address);
  };

  const { invalid } = getFieldState('address', formState);

  return (
    <List
      dense
      subheader={
        <ListSubheader
          component="div"
          sx={{
            color: invalid ? 'error.main' : 'initial',
          }}
        >
          Aktuelle Adressen
        </ListSubheader>
      }
    >
      {TEST_BILLING_ADDRESSES.map((item, i, arr) => (
        <Fragment key={item.id}>
          <ListItem disablePadding>
            <ListItemButton dense onClick={() => handleAddressChange(item)}>
              <ListItemIcon>
                <Radio
                  edge="start"
                  name={existingAddressController.field.name}
                  value={item.id}
                  checked={
                    item.address === existingAddressController.field.value
                  }
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-label': item.address,
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item.address} />
            </ListItemButton>
          </ListItem>
          {i !== arr.length - 1 && <Divider variant="inset" component="li" />}
        </Fragment>
      ))}
    </List>
  );
}
