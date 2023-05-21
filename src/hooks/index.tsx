import React from 'react';
import { AuthProvider } from "./useAuth";

type Props = {
  children?: React.ReactNode
};

const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default AppProvider;