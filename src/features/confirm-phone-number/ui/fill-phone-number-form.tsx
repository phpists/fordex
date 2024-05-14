import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';

export function FillPhoneNumberForm() {
  return (
    <Stack alignItems="center">
      <Stack maxWidth="400px" gap={3}>
        <TextField
          type="phone"
          label="Handynummer"
          placeholder="+41792511522"
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Ich habe die Nutzungsbedingungen gelesen und bin mit ihnen einverstanden. Ich habe die Datenschutzerklärung zur Kenntnis genommen."
        />
      </Stack>
    </Stack>
  );
}
