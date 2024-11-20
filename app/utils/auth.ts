import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const COOKIE_NAME = "token";

export const setAuthToken = (token: string) => {
  const CookieOptions: CookieOptions = {
    expires: 1,
    secure: true,
    sameSite: "none",
    path: "/",
  };

  Cookies.set(COOKIE_NAME, token, CookieOptions);
};

export const removeAuthTokens = () => {
  Cookies.remove(COOKIE_NAME, { path: "/" });
};
