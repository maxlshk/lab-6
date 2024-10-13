import { STORAGE_KEYS } from '../keys';

export const getAccessToken = () =>
  localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
export const setAccessToken = (token: string) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  setTimeout(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }, 1000 * 60 * 14);
};

export const getRefreshToken = () =>
  localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
export const setRefreshToken = (token: string) =>
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);

export const clearTokens = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};
