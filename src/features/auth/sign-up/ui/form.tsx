import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useId } from 'react';
import { Grid } from 'shared/components/Grid';

export function SignUpForm() {
  const accountTypeRadioGroupId = useId();

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby={accountTypeRadioGroupId}
            name="accountType"
          >
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Privat"
            />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Firma"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid container xs={12}>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            type="email"
            name="email"
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            fullWidth
            label="Passwort"
            variant="standard"
            type="password"
            name="password"
          />
        </Grid>
      </Grid>
      <Grid container xs={12}>
        <Grid xs={4}>
          <TextField
            fullWidth
            label="Name"
            variant="standard"
            placeholder="Enter name"
            name="name"
          />
        </Grid>
        <Grid xs={4}>
          <TextField
            fullWidth
            label="Vorname"
            variant="standard"
            placeholder="Enter vorname"
            name="surname"
          />
        </Grid>
        <Grid xs={4}>
          <TextField
            fullWidth
            label="Geburtsdatum"
            variant="standard"
            placeholder="tt.mm.jjjj"
            name="birthdate"
          />
        </Grid>
      </Grid>
      <Grid container xs={12}>
        <Grid xs={4}>
          <TextField fullWidth label="Staat" variant="standard" />
        </Grid>
        <Grid xs={4}>
          <TextField
            fullWidth
            label="PLZ"
            variant="standard"
            placeholder="Enter PLZ"
            name="plz"
          />
        </Grid>
        <Grid xs={4}>
          <TextField
            fullWidth
            label="Ort"
            variant="standard"
            placeholder="Enter ort"
            name="location"
          />
        </Grid>
      </Grid>
      <Grid container xs={12}>
        <Grid xs={8}>
          <TextField
            fullWidth
            label="Strasse"
            variant="standard"
            placeholder="Enter strasse"
            name="street"
          />
        </Grid>
        <Grid xs={4}>
          <TextField
            fullWidth
            label="Hause"
            variant="standard"
            placeholder="Hause Nr."
            name="house"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
