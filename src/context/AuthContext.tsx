"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// Define the User interface to match data expected from your MongoDB backend
interface User {
  uid: string; // Unique ID for the user from your database
  email: string;
  fullName: string;
  balance: string; // Assuming balance is stored as a string like "₦25,000"
  phoneNumber: string | null; // Can be null if not always provided
  // Add any other user properties your MongoDB schema returns (e.g., createdAt, lastLogin)
}

// Define the AuthContextType
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  // The login function now accepts the full User object from the backend
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Tracks if auth state is still loading
  const router = useRouter();

  // Load user from localStorage on component mount
  useEffect(() => {
    const loadUser = () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const parsedUser: User = JSON.parse(storedUser);
          // Basic validation to ensure it matches our User interface
          if (parsedUser.uid && parsedUser.email && parsedUser.fullName) {
            setUser(parsedUser);
          } else {
            console.warn("Stored user data incomplete, clearing localStorage.");
            localStorage.removeItem("currentUser");
          }
        } catch (e) {
          console.error("Failed to parse stored user data:", e);
          localStorage.removeItem("currentUser");
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // This login function now just sets the user data received from the backend
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    router.push("/dashboard"); // Redirect to dashboard on successful login
  };

  const logout = () => {
    setIsLoading(true); // Set loading state for logout
    setUser(null);
    localStorage.removeItem("currentUser");
    router.push("/login"); // Redirect to login page on logout
    setIsLoading(false); // Reset loading state after logout
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
