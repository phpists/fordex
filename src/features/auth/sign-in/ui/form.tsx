import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';
import { useToggle } from 'react-use';
import { Controller } from 'react-hook-form';

import { useAuthorizeSessionMutation, useSessionStore } from 'entities/session';
import { Grid } from 'shared/components/Grid';
import { snackbar } from 'shared/modules/snackbar';

import { FormValues, useSignInForm } from '../model/use-sign-in-form';
import { getIconPassword } from '../lib/get-icon-password';

interface SignInFormProps {
  onForgotPasswordClick: () => void;
  sx?: SxProps<Theme>;
}

export function SignInForm({ sx }: SignInFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useSignInForm();
  const [showPassword, togglePassword] = useToggle(false);
  const { setCredentials } = useSessionStore();
  const { mutateAsync } = useAuthorizeSessionMutation({
    onError: () => {
      snackbar.show({
        type: 'error',
        message: 'Bei der Autorisierung ist ein Fehler aufgetreten',
        autoHideDuration: 3000,
        canClose: true,
      });
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { data: authCredentials } = await mutateAsync({
        username: data.username,
        password: data.password,
      });
      setCredentials(authCredentials, data.remember);
    } catch {
      // eslint-disable-next-line no-console
      console.error('something went wrong');
    }
  };

  return (
    <Stack gap={3} sx={sx} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2}>
        <TextField
          fullWidth
          label="Benutzername"
          variant="filled"
          error={!!errors.username}
          {...register('username')}
        />
        <TextField
          fullWidth
          variant="filled"
          label="Passwort"
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {getIconPassword(showPassword)}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password')}
        />
      </Stack>
      <Grid container alignItems="center">
        <Grid xs={12} sm={6}>
          <FormControlLabel
            label="Angemeldet bleiben"
            control={
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.currentTarget.checked)}
                  />
                )}
              />
            }
          />
        </Grid>
        {/* <Grid xs={12} sm={6}>
          <Link
            display="block"
            width="100%"
            sx={(theme) => ({
              [theme.breakpoints.up('sm')]: {
                textAlign: 'end',
              },
              [theme.breakpoints.down('sm')]: {
                textAlign: 'start',
              },
            })}
            href="#"
            underline="hover"
            onClick={onForgotPasswordClick}
          >
            Passwort vergessen?
          </Link>
        </Grid> */}
      </Grid>
      <Button
        disabled={isSubmitting || !isValid}
        variant="contained"
        type="submit"
        endIcon={isSubmitting ? <CircularProgress size={18} /> : null}
      >
        Anmelden
      </Button>
    </Stack>
  );
}
