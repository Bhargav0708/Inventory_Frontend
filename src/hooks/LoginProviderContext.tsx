import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AuthContext } from "./LoginCreateContext";
import Cookies from "js-cookie";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setAuthToken] = useState<string | null>(
    (Cookies.get("login_token") as string) || null
  );

  useEffect(() => {
    const token = Cookies.get("login_token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const logout = () => {
    Cookies.remove("login_token");
    setAuthToken(null);
    window.location.href = "/auth/login";
  };
  const value = useMemo(() => {
    return { token, setAuthToken, logout };
  }, [token, setAuthToken, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context is not Defined");
  }
  return context;
}
