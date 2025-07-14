"use client"; // This component needs client-side interactivity

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For redirection after successful signup
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react"; // For error icons

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      acceptTerms: checked,
    }));
    if (errors.acceptTerms) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.acceptTerms;
        return newErrors;
      });
    }
    setGeneralError("");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGeneralError("");

    if (!validateForm()) {
      setGeneralError("Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Sign Up Success:", data);
        router.push("/login?signupSuccess=true");
      } else {
        setGeneralError(
          data.message || "An unexpected error occurred during signup."
        );
        console.error("Sign Up Error:", data);
      }
    } catch (error) {
      console.error("Network or unexpected error during signup:", error);
      setGeneralError(
        "Could not connect to the server. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-bg)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg">
        <CardHeader className="text-center p-0 pb-6">
          <CardTitle className="text-3xl font-extrabold text-[var(--color-dark-text)]">
            Create your account
          </CardTitle>
          <p className="mt-2 text-sm text-[var(--color-gray-text)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              Sign in
            </Link>
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <Label htmlFor="fullName" className="sr-only">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>
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
                autoComplete="new-password"
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
            <div>
              <Label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <Checkbox
                id="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={handleCheckboxChange}
                className={`h-4 w-4 text-[var(--color-primary)] rounded ${
                  errors.acceptTerms ? "border-red-500" : "border-gray-300"
                }`}
              />
              <Label
                htmlFor="acceptTerms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <Link
                  href="#"
                  className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                >
                  Terms and Conditions
                </Link>
              </Label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>
            )}

            <div>
              <Button
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
