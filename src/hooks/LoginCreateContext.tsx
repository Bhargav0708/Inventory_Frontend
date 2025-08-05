import { createContext } from "react";

type AuthContextData = {
  token: string | null;
  // userDetails: {};
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);
