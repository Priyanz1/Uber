import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const UserDataContext = createContext({})

export function UserProvider({ children }) {
  const [user, setUser] = useState(
    {
       email:'',
       name:''
    }
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

export function useUser() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

