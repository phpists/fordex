import { Stack, TextField } from '@mui/material';

export function FillSmsCodeForm() {
  return (
    <Stack alignItems="center">
      <Stack maxWidth="300px" width="100%">
        <TextField
          fullWidth
          label="SMS-Code"
          placeholder="000000"
          name="smsCode"
          autoComplete="off"
        />
      </Stack>
    </Stack>
  );
}
