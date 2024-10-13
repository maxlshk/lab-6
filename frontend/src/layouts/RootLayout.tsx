import { Outlet, redirect } from 'react-router-dom';
import Background from '../components/Background';
import { ROUTER_KEYS } from '../keys';
import { getRefreshToken } from '../utils/auth';

function RootLayout() {
  return (
    <>
      <div className="flex flex-1">
        <Outlet />
      </div>
      <Background />
    </>
  );
}

export default RootLayout;

async function loader() {
  if (getRefreshToken()) {
    return redirect(ROUTER_KEYS.DASHBOARD);
  } else {
    return redirect(ROUTER_KEYS.LOGIN);
  }
}

RootLayout.loader = loader;
