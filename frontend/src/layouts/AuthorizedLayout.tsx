import { Outlet, redirect } from 'react-router-dom';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../utils/auth';
import { ROUTER_KEYS } from '../keys';
import Navbar from '../components/Navbar';

function AuthorizedLayout() {
  return (
    <div className="w-full min-h-screen bg-white/30">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AuthorizedLayout;

async function loader() {
  const accesToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (!accesToken) {
    if (!refreshToken) {
      console.log('no tokens');
      return redirect(`/${ROUTER_KEYS.LOGIN}`);
    } else {
      console.log('trying to refresh access token');
      const baseurl = import.meta.env.VITE_API_URL as string;
      const response = await fetch(`${baseurl}/user/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const responseData = await response.json();
      if (response.status === 401) {
        return redirect(`/${ROUTER_KEYS.LOGIN}`);
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        responseData;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
    }
  }

  return null;
}

AuthorizedLayout.loader = loader;
