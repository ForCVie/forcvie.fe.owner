import { ACCESS_TOKEN } from "@/constants/common.const";

export const setToken = (token: string) => {
  if (!token) {
    return;
  }

  document.cookie = `${ACCESS_TOKEN}=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
};

export const getToken = (): string | null => {
  const cookies = document.cookie.split("; ");
console.log(cookies)
  const cookie = cookies.find(
    (item) => item.startsWith(`${ACCESS_TOKEN}=`)
  );

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(
    cookie.substring(`${ACCESS_TOKEN}=`.length)
  );
};

export const removeToken = () => {
  document.cookie = `${ACCESS_TOKEN}=; Max-Age=0; path=/; SameSite=Lax`;
};
