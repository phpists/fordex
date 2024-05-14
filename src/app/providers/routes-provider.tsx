import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import { SignInPage } from 'pages/sign-in';
import { ActiveOrdersPage } from 'pages/transportation-orders';
import { RequestOrdersPage } from 'pages/transportation-offers';
import { useTransportationOrderStore } from 'widgets/create-order-request-form';
import { useAddressesStore } from 'entities/address';
import { ROUTE_PATHS } from 'shared/config';

import { ProtectedRoute } from '../components/protected-route';
import { GuestRoute } from '../components/guest-route';
import { AuthProvider } from './auth-provider';
import { AppLayout } from 'widgets/layouts/app-layout';

const handleAuthExpiration = () => {
  useTransportationOrderStore.getState().reset();
  useAddressesStore.getState().resetState();
};

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.SIGN_IN.route,
    element: (
      <GuestRoute>
        <SignInPage />
      </GuestRoute>
    ),
  },
  // {
  //   path: ROUTE_PATHS.TRANSPORTATION_ORDERS.NEW_ORDER.fullPath,
  //   element: (
  //     <AuthProvider onAuthExpiration={handleAuthExpiration}>
  //       <ProtectedRoute>
  //         <NewTransportationOrderPage />
  //       </ProtectedRoute>
  //     </AuthProvider>
  //   ),
  // },
  {
    path: '/',
    element: (
      <AuthProvider onAuthExpiration={handleAuthExpiration}>
        <ProtectedRoute>
          <AppLayout>
            <Outlet />
          </AppLayout>
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <Navigate to={ROUTE_PATHS.TRANSPORTATION_ORDERS.ROOT.fullPath} />
        ),
      },
      {
        path: ROUTE_PATHS.TRANSPORTATION_ORDERS.ROOT.route,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ActiveOrdersPage />,
          },
          {
            path: ROUTE_PATHS.TRANSPORTATION_ORDERS.IN_REVIEW.route,
            element: <RequestOrdersPage />,
          },
        ],
      },
    ],
  },
]);

export function RoutesProvider() {
  return <RouterProvider router={router} />;
}
