import { CreateTransportationOrderForm } from 'widgets/create-order-request-form';
import { CenteredHeaderLogoPageLayout } from 'widgets/layouts/centered-header-logo-page-layout';

export const NewTransportationOrderPage = () => {
  return (
    <CenteredHeaderLogoPageLayout>
      <CreateTransportationOrderForm
        onCancelClick={() => null}
        onSuccess={() => null}
        sx={(theme) => ({
          margin: 'auto',
          maxHeight: 670,
          maxWidth: 1000,
          [theme.breakpoints.down('md')]: {
            borderRadius: 0,
            flexGrow: 1,
            height: 0,
            maxHeight: 'unset',
          },
        })}
      />
    </CenteredHeaderLogoPageLayout>
  );
};
