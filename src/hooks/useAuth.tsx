import { useState, useEffect, createContext, useContext } from "react";

interface AuthContextData {
  userKey: string;
  setUserKey: React.Dispatch<React.SetStateAction<string>>;
}

type Props = {
  children?: React.ReactNode
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userKey, setUserKey] = useState<string>("7e6e2e5db244131a8974e1dd8d6726b5");

  return (
    <AuthContext.Provider
      value={{ userKey, setUserKey }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

