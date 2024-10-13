import { redirect } from 'react-router-dom';
import { ROUTER_KEYS } from '../keys';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../utils/auth';

const baseurl = import.meta.env.VITE_API_URL as string;

async function refreshToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return redirect(`/${ROUTER_KEYS.LOGIN}`);
  }

  try {
    const response = await fetch(`${baseurl}/user/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.status === 401) {
      return redirect(`/${ROUTER_KEYS.LOGIN}`);
    }

    const responseData = await response.json();
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      responseData;

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return redirect(`/${ROUTER_KEYS.LOGIN}`);
  }
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  retry: boolean = true
): Promise<Response | null> {
  const accessToken = getAccessToken();

  const fetchOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  };

  console.log(fetchOptions);

  try {
    const response = await fetch(url, fetchOptions);

    if (response.status === 401 && retry) {
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        return fetchWithAuth(url, options, false);
      }
    }

    return response;
  } catch (error) {
    console.error('Error during fetch:', error);
    return null;
  }
}
