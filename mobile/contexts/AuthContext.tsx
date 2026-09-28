import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "../types";
import {
  clearStorage,
  getToken,
  getUser,
  saveToken,
  saveUser,
} from "../utils/storage";

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (token: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const storedToken = await getToken();
        const storedUser = await getUser<User>();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        }
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  async function signIn(
    newToken: string,
    newUser: User
  ): Promise<void> {
    await saveToken(newToken);
    await saveUser(newUser);

    setToken(newToken);
    setUser(newUser);
  }

  async function signOut(): Promise<void> {
    await clearStorage();

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}
