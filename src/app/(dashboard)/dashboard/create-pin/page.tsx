"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Lock,
  Loader2,
  Shield,
  Eye,
  EyeOff,
  Lightbulb,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function CreatePinPage() {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePin = async () => {
    setMessage(null);
    setIsLoading(true);

    if (pin.length !== 4 || confirmPin.length !== 4) {
      setMessage({ type: "error", text: "PIN must be exactly 4 digits." });
      setIsLoading(false);
      return;
    }
    if (pin !== confirmPin) {
      setMessage({ type: "error", text: "PINs do not match." });
      setIsLoading(false);
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      setMessage({ type: "error", text: "PIN must contain only digits." });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call to create/update PIN
      // API NOT FOUND: This would be a fetch call to your backend API
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Example success/failure based on some condition (e.g., actual API response)
      const apiSuccess = true; // Replace with actual API call result

      if (apiSuccess) {
        setMessage({
          type: "success",
          text: "Transaction PIN created successfully!",
        });
        setPin("");
        setConfirmPin("");
      } else {
        setMessage({
          type: "error",
          text: "API NOT FOUND: Failed to create PIN. Please try again.",
        });
      }
    } catch (err: any) {
      console.error("Create PIN error:", err);
      setMessage({
        type: "error",
        text:
          "API NOT FOUND: An error occurred while creating PIN. " +
          (err.message || ""),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Create Transaction PIN
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Create PIN Form */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4 text-center">
              <Shield className="h-16 w-16 mx-auto text-[var(--color-primary)] mb-4" />
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Secure Your Account
              </CardTitle>
              <p className="text-sm text-gray-600">
                Your PIN will be required for all transactions to ensure
                security
              </p>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div>
                <Label
                  htmlFor="pin"
                  className="text-sm font-medium text-gray-700"
                >
                  Create PIN
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    placeholder="Enter 4-digit PIN"
                    value={pin}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 4 && /^\d*$/.test(value)) {
                        // Allow only digits, max 4
                        setPin(value);
                      }
                    }}
                    maxLength={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="confirmPin"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm PIN
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPin"
                    type={showConfirmPin ? "text" : "password"}
                    placeholder="Confirm 4-digit PIN"
                    value={confirmPin}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 4 && /^\d*$/.test(value)) {
                        // Allow only digits, max 4
                        setConfirmPin(value);
                      }
                    }}
                    maxLength={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                  >
                    {showConfirmPin ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md flex items-center ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>
              )}

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 text-lg font-semibold rounded-md shadow-md mt-6"
                onClick={handleCreatePin}
                disabled={
                  isLoading ||
                  pin.length !== 4 ||
                  confirmPin.length !== 4 ||
                  pin !== confirmPin
                }
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : null}
                Create PIN
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                API NOT FOUND: Actual PIN creation logic would be here.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Security Tips */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 rounded-xl shadow-md sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-[var(--color-secondary)]" />{" "}
                Security Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-gray-700">
              <div className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                <span>Use a unique 4-digit combination.</span>
              </div>
              <div className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                <span>
                  Don't use obvious numbers like 1234 or your birth year.
                </span>
              </div>
              <div className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                <span>Keep your PIN confidential.</span>
              </div>
              <div className="flex items-start text-sm">
                <CheckCircle className="h-4 w-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                <span>You can change your PIN anytime in settings.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
