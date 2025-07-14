"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// Define the User interface
interface User {
  uid: string;
  email: string | null;
  fullName: string | null;
  balance: string; // Assuming balance is stored as a string like "₦25,000"
  phoneNumber: string | null; // Added phoneNumber here
  // Add other user properties as needed
}

// Define the AuthContextType
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          uid: parsedUser.uid,
          email: parsedUser.email,
          fullName: parsedUser.fullName,
          balance: parsedUser.balance || "₦0.00",
          phoneNumber: parsedUser.phoneNumber || null, // Ensure phoneNumber is set
        });
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "test@example.com" && password === "password123") {
      const dummyUser: User = {
        uid: "user123",
        email: "test@example.com",
        fullName: "Musbahu Aminu Bala",
        balance: "₦25,000",
        phoneNumber: "09064973974", // Set a dummy phone number here
      };
      setUser(dummyUser);
      localStorage.setItem("currentUser", JSON.stringify(dummyUser));
      router.push("/dashboard");
    } else {
      throw new Error(
        "Invalid email or password. API NOT FOUND: Actual login failed."
      );
    }
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUser(null);
    localStorage.removeItem("currentUser");
    router.push("/login");
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
