"use client";

type LoginState = {
  success?: boolean;
  user?: User;
  error?: string;
};

import {
  createContext,
  useActionState,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContextType, Role, User } from "../types";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  //useActionState for login
  const [loginState, loginAction, isLoginPending] = useActionState(
    async (
      _previousState: LoginState,
      formData: FormData,
    ): Promise<LoginState> => {
      const email = formData.get("email");
      const password = formData.get("password");

      if (typeof email !== "string" || typeof password !== "string") {
        return {
          success: false,
          error: "Invalid email or password",
        };
      }
      try {
        const data = await apiClient.login(email, password);
        if (!data || !data.user) {
          return { error: "Invalid credentials" };
        }
        setUser(data.user);
        return { success: true, user: data.user };
      } catch (error) {
        console.error("Error:", error);
        return {
          error: error instanceof Error ? error.message : "Login failed",
        };
      }
    },
    {
      success: undefined,
      user: undefined,
      error: undefined,
    } as LoginState,
  );

  const logOut = async () => {
    try {
      await apiClient.logout();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  const hasPermission = (requiredRole: Role): boolean => {
    if (!user) return false;
    const roleHierarchy = {
      [Role.GUEST]: 0,
      [Role.USER]: 1,
      [Role.MANAGER]: 2,
      [Role.ADMIN]: 3,
    };
    return (
      roleHierarchy[user.role as Role] >= roleHierarchy[requiredRole as Role]
    );
  };

  //load user on component mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await apiClient.getCurrentUser();
        setUser(userData as User | null);
      } catch (error) {
        setUser(null);
        console.error("Failed to load user: ", error);
      } finally {
        setIsLoadingUser(false);
      }
    };
    loadUser();
  }, []);

  const value = useMemo(
    () => ({
      login: loginAction,
      loginState,
      isLoginPending,
      logOut,
      hasPermission,
      user,
      isLoadingUser,
    }),
    [
      user,
      loginAction,
      loginState,
      isLoginPending,
      isLoadingUser,
      logOut,
      hasPermission,
    ],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
