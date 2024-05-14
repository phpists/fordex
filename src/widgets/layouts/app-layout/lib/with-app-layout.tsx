import { ComponentType } from 'react';
import { AppLayout, AppLayoutProps } from '../ui/layout';

export function withAppLayout(
  Component: ComponentType,
  appLayoutProps: Omit<AppLayoutProps, 'children'>
) {
  return function AppLayoutWrapper() {
    return (
      <AppLayout {...appLayoutProps}>
        <Component />
      </AppLayout>
    );
  };
}
