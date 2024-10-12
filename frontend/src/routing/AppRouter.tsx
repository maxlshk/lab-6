import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import ErrorPage from '../pages/ErrorPage';
import Dashboard from '../pages/Dashboard';
import LoginPage, { action as loginAction } from '../pages/LoginPage';
import { ROUTER_KEYS } from '../keys';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: ROUTER_KEYS.ALL_MATCH,
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: ROUTER_KEYS.LOGIN,
          element: <LoginPage />,
          action: loginAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
