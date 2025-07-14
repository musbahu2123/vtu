"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"; // Added Loader2 for loading state
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: authLogin, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Local loading state for form submission

  useEffect(() => {
    if (searchParams.get("signupSuccess") === "true") {
      setSuccessMessage("Account created successfully! Please log in.");
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("signupSuccess");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
    if (errors[id]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
    setGeneralError("");
    setSuccessMessage("");
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      rememberMe: checked,
    }));
    setGeneralError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGeneralError("");
    setSuccessMessage("");

    if (!validateForm()) {
      setGeneralError("Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);

    try {
      // This is the actual fetch call to your backend API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login Success:", data);
        // Assuming your API returns a 'user' object that matches the AuthContext's User interface
        // e.g., data = { message: "Logged in", user: { uid: "...", email: "...", fullName: "...", balance: "..." } }
        if (data.user) {
          authLogin(data.user); // Pass the entire user object to authLogin
        } else {
          setGeneralError(
            "Login successful, but user data missing from response."
          );
        }
        // Redirection to /dashboard is now handled by authLogin internally
      } else {
        setGeneralError(
          data.message || "Invalid email or password. Please try again."
        );
        console.error("Login Error:", data);
      }
    } catch (error: any) {
      console.error("Network or unexpected error during login:", error);
      setGeneralError(
        "Could not connect to the server. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-bg)]">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />{" "}
        {/* Added Loader2 */}
        <p className="ml-3 text-[var(--color-dark-text)]">
          Loading authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-bg)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg">
        <CardHeader className="text-center p-0 pb-6">
          <CardTitle className="text-3xl font-extrabold text-[var(--color-dark-text)]">
            Sign in to your account
          </CardTitle>
          <p className="mt-2 text-sm text-[var(--color-gray-text)]">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              create a new account
            </Link>
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {successMessage && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center"
                role="alert"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="block sm:inline">{successMessage}</span>
              </div>
            )}
            {generalError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center"
                role="alert"
              >
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="block sm:inline">{generalError}</span>
              </div>
            )}
            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={handleCheckboxChange}
                  className="h-4 w-4 text-[var(--color-primary)] rounded border-gray-300"
                />
                <Label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing
                    In...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
