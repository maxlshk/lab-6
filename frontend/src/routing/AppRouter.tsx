import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import LoginPage, { action as loginAction } from '../pages/LoginPage';
import { ROUTER_KEYS } from '../keys';
import SignupPage, { action as signupAction } from '../pages/SignupPage';
import AuthorizedLayout from '../layouts/AuthorizedLayout';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: ROUTER_KEYS.ALL_MATCH,
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      children: [
        {
          index: true,
          loader: RootLayout.loader,
        },
        {
          path: ROUTER_KEYS.LOGIN,
          element: <LoginPage />,
          action: loginAction,
        },
        {
          path: ROUTER_KEYS.SIGNUP,
          element: <SignupPage />,
          action: signupAction,
        },
        {
          element: <AuthorizedLayout />,
          loader: AuthorizedLayout.loader,
          children: [
            {
              path: ROUTER_KEYS.DASHBOARD,
              element: <Dashboard />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
