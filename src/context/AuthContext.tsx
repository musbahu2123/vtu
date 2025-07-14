"use client"; // This context will be used by client components

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// Define the shape of our user data
interface User {
  id: string;
  email: string;
  fullName: string;
  // Add other user properties as needed (e.g., balance, roles)
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean; // To indicate if auth state is being loaded
}

// Create the context with a default null value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as loading
  const router = useRouter();

  // On component mount, try to load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("MUSBAHDEV_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem("MUSBAHDEV_user"); // Clear corrupted data
      }
    }
    setIsLoading(false); // Finished loading auth state
  }, []);

  // Function to handle user login
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("MUSBAHDEV_user", JSON.stringify(userData));
    // Optionally, navigate to dashboard here if not already handled by login form
    // router.push('/dashboard');
  };

  // Function to handle user logout
  const logout = async () => {
    setIsLoading(true); // Indicate loading during logout process
    try {
      // Call your backend logout API (if you have one to invalidate tokens)
      await fetch("/api/auth/logout", { method: "POST" });
      console.log("Logged out successfully from backend.");
    } catch (error) {
      console.error("Error during backend logout:", error);
      // Continue with frontend logout even if backend fails
    } finally {
      setUser(null);
      localStorage.removeItem("MUSBAHDEV_user");
      setIsLoading(false);
      router.push("/login"); // Redirect to login page after logout
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
