"use client";

import localDatabase from "@/lib/localDatabase";
import {
  signIn,
  signOut,
  useSession,
  type SignInResponse,
} from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

const refreshInterval = 600_000;

export type UserPropertiesContext = {
  id: string;
  name?: string | null;
  email?: string | null;
  verified?: boolean;
  cacheTime: number;
};

const UserContext = createContext<{
  user: UserPropertiesContext | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
  login: (props: {
    cpf: string;
    password: string;
    redirectUrl?: string;
  }) => Promise<SignInResponse | undefined | void>;
}>({
  user: null,
  loading: true,
  fetchUser: async () => {},
  logout: () => {},
  login: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: sessionData, status: sessionStatus } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserPropertiesContext | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    if (sessionStatus === "authenticated" && sessionData?.user) {
      const cachedUser: UserPropertiesContext = {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name,
        verified: sessionData.user.verified,
        cacheTime: Date.now(),
      };
      localDatabase.set("user", cachedUser);
      setUser(cachedUser);
      setLoading(false);
    } else if (sessionStatus === "unauthenticated") {
      localDatabase.remove("user");
      setUser(null);
      setLoading(false);
    }
  }, [sessionData, sessionStatus]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    function handleFocus() {
      const cachedUser = localDatabase.get("user") as UserPropertiesContext;
      if (cachedUser) {
        setUser(cachedUser);
        if (Date.now() - cachedUser.cacheTime > refreshInterval) fetchUser();
      }
    }
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchUser]);

  const logout = useCallback(() => {
    localDatabase.remove("user");
    localDatabase.remove("wallets");
    localDatabase.remove("currentWallet");

    setUser(null);

    signOut({ redirect: false });
  }, []);

  const login = useCallback(
    async (
      props: { cpf: string; password: string; redirectUrl?: string },
      onError?: (error: string) => void
    ) => {
      const res = await signIn("credentials", {
        redirect: false,
        cpf: props.cpf,
        password: props.password,
      });
      if (res?.error) onError?.(res.error);
      else if (props.redirectUrl) router.push(props.redirectUrl);
      return res;
    },
    [router]
  );

  return (
    <UserContext.Provider value={{ user, loading, fetchUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
