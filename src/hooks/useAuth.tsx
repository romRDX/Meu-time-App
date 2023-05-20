import { useState, useEffect, createContext, useContext } from "react";

interface BookingsContextData {
  userKey: string;
  setUserKey: React.Dispatch<React.SetStateAction<string>>;
}

type Props = {
  children?: React.ReactNode
};

const BookingsContext = createContext<BookingsContextData>({} as BookingsContextData);

export const UsersAPIProvider: React.FC<Props> = ({ children }) => {
  const [userKey, setUserKey] = useState<string>("");

  return (
    <BookingsContext.Provider
      value={{ userKey, setUserKey }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export function useUsers(): BookingsContextData {
  const context = useContext(BookingsContext);

  return context;
}

