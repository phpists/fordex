import { Box, Paper, Stack, Typography, styled } from '@mui/material';

import { CenteredHeaderLogoPageLayout } from 'widgets/layouts/centered-header-logo-page-layout';
import { SignInForm } from 'features/auth/sign-in';

const FormContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 10,
  padding: theme.spacing(2),
  width: 'min(100%, 450px)',
  [theme.breakpoints.down('md')]: {
    boxShadow: 'none',
  },
}));

export function SignInPage() {
  return (
    <CenteredHeaderLogoPageLayout
      pageContentSx={(theme) => ({
        overflow: 'auto',
        [theme.breakpoints.between('sm', 'md')]: {
          padding: `${theme.spacing(8)} ${theme.spacing(2)}`,
        },
        [theme.breakpoints.down('sm')]: {
          background: 'white',
        },
      })}
    >
      <Stack margin="auto" gap={4} width="100%">
        <FormContainer sx={{ margin: '0 auto' }}>
          <Box mb={2}>
            <Typography variant="h5" fontWeight="bold">
              Als bestehender Kunde anmelden
            </Typography>
            <Typography variant="body2" color="secondary.light">
              Bitte melden Sie sich an, um einen Transportauftrag zu erstellen.
              Falls Sie keine Anmeldedaten haben, wenden Sie sich bitte direkt
              an das Transportunternehmen, um diese zu erhalten.
            </Typography>
          </Box>
          <SignInForm onForgotPasswordClick={() => null} />
        </FormContainer>
        {/* <FormContainer>
          <Box mb={2}>
            <Typography variant="h5" fontWeight="bold">
              Neue Kunde
            </Typography>
            <Typography variant="body2" color="secondary.light">
              Wenn Sie ein neuer Kunde sind oder noch keine Zugangsdaten haben,
              verwenden Sie bitte dieses Formular.
            </Typography>
          </Box>
          <Button fullWidth variant="contained">
            Zu Transport Auftrag
          </Button>
        </FormContainer> */}
      </Stack>
    </CenteredHeaderLogoPageLayout>
  );
}
