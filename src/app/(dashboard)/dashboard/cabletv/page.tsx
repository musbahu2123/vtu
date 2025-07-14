"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tv,
  Search,
  CheckCircle,
  Info,
  Wallet,
  CreditCard,
  Loader2,
  Calendar,
  User,
  Signal,
} from "lucide-react"; // Icons

export default function CableTvPage() {
  // State for selected TV provider
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  // State for smart card number input
  const [smartCardNumberInput, setSmartCardNumberInput] = useState("");
  // State for validated smart card details
  const [validatedSmartCard, setValidatedSmartCard] = useState<{
    customerName: string;
    status: string;
    currentPackage: string;
    expiryDate: string;
  } | null>(null);
  const [isSmartCardValidating, setIsSmartCardValidating] = useState(false);
  const [smartCardValidationError, setSmartCardValidationError] = useState<
    string | null
  >(null);
  // State for selected package
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    price: number;
    channels: string;
    duration: string;
    popular?: boolean;
  } | null>(null);
  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet"
  );

  // Dummy user wallet balance (will come from AuthContext or API)
  const userWalletBalance = 25000; // N25,000

  // TV Provider options
  const tvProviders = [
    { name: "DSTV", icon: Tv },
    { name: "GOTV", icon: Tv },
    { name: "Startimes", icon: Tv },
  ];

  // Dummy packages (these would typically be fetched based on selectedProvider from a backend API)
  const packages: {
    [key: string]: {
      name: string;
      price: number;
      channels: string;
      duration: string;
      popular?: boolean;
    }[];
  } = {
    DSTV: [
      {
        name: "DSTV Padi",
        price: 2500,
        channels: "40+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "DSTV Yanga",
        price: 3500,
        channels: "60+ Channels",
        duration: "1 Month",
        popular: true,
      },
      {
        name: "DSTV Confam",
        price: 6200,
        channels: "80+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "DSTV Compact",
        price: 9000,
        channels: "100+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "DSTV Compact Plus",
        price: 14000,
        channels: "130+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "DSTV Premium",
        price: 21000,
        channels: "150+ Channels",
        duration: "1 Month",
        popular: false,
      },
    ],
    GOTV: [
      {
        name: "GOTV Lite",
        price: 410,
        channels: "15+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "GOTV Jinja",
        price: 1900,
        channels: "35+ Channels",
        duration: "1 Month",
        popular: true,
      },
      {
        name: "GOTV Jolli",
        price: 2800,
        channels: "50+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "GOTV Max",
        price: 4150,
        channels: "70+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "GOTV Supa",
        price: 6200,
        channels: "90+ Channels",
        duration: "1 Month",
        popular: false,
      },
    ],
    Startimes: [
      {
        name: "Startimes Nova",
        price: 900,
        channels: "20+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "Startimes Basic",
        price: 1700,
        channels: "40+ Channels",
        duration: "1 Month",
        popular: true,
      },
      {
        name: "Startimes Classic",
        price: 2500,
        channels: "60+ Channels",
        duration: "1 Month",
        popular: false,
      },
      {
        name: "Startimes Smart",
        price: 3800,
        channels: "80+ Channels",
        duration: "1 Month",
        popular: false,
      },
    ],
  };

  // Simulate smart card validation API call
  const handleValidateSmartCard = async () => {
    if (!selectedProvider || !smartCardNumberInput.trim()) {
      setSmartCardValidationError(
        "Please select a TV provider and enter a smart card number."
      );
      setValidatedSmartCard(null);
      return;
    }

    setIsSmartCardValidating(true);
    setSmartCardValidationError(null);
    setValidatedSmartCard(null); // Clear previous validation results

    try {
      // Simulate API call to validate smart card number
      // API NOT FOUND: This would be a fetch to your backend API
      const response = await new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (
            smartCardNumberInput === "1234567890" &&
            selectedProvider === "GOTV"
          ) {
            resolve({
              ok: true,
              data: {
                customerName: "John Doe",
                status: "Active",
                currentPackage: "GOTV Yanga",
                expiryDate: "2024-12-31",
              },
            });
          } else if (
            smartCardNumberInput === "0987654321" &&
            selectedProvider === "DSTV"
          ) {
            resolve({
              ok: true,
              data: {
                customerName: "Jane Smith",
                status: "Active",
                currentPackage: "DSTV Premium",
                expiryDate: "2025-01-15",
              },
            });
          } else {
            reject(
              new Error(
                "Smart card number not found or invalid for selected provider."
              )
            );
          }
        }, 1500); // Simulate network delay
      });

      if (response.ok) {
        setValidatedSmartCard(response.data);
      } else {
        setSmartCardValidationError(
          response.message || "An unknown error occurred during validation."
        );
      }
    } catch (error: any) {
      console.error("Smart card validation error:", error);
      setSmartCardValidationError(
        error.message || "Failed to validate smart card. Please try again."
      );
    } finally {
      setIsSmartCardValidating(false);
    }
  };

  // Calculate subscription summary dynamically
  const amount = selectedPackage ? selectedPackage.price : 0;
  const serviceFee = 0; // Assuming no fee for now
  const total = amount + serviceFee;

  const handleSubscribe = () => {
    if (
      !selectedProvider ||
      !validatedSmartCard ||
      !selectedPackage ||
      amount === 0
    ) {
      alert(
        "Please fill all required fields, validate smart card, and select a package."
      );
      return;
    }
    // Implement actual subscription logic here
    console.log("Subscribing to Cable TV:", {
      provider: selectedProvider,
      smartCardNumber: smartCardNumberInput,
      customer: validatedSmartCard,
      package: selectedPackage,
      amount: amount,
      paymentMethod,
    });
    alert(
      `Subscription to ${
        selectedPackage.name
      } for ₦${amount.toLocaleString()} simulated!`
    );
    // API NOT FOUND: This is where the actual subscription API call would go
  };

  // Conditional rendering flags
  const showSmartCardInfo = selectedProvider !== null;
  const showPackageSelection = validatedSmartCard !== null;
  const showPaymentMethod = selectedPackage !== null;

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Cable TV Subscription
        </h1>
        <div className="flex items-center text-[var(--color-secondary)]">
          <Info className="h-5 w-5 mr-2" />
          <span>All Providers</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Subscription Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Select TV Provider */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Select TV Provider
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {tvProviders.map((provider) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  className={`flex flex-col items-center justify-center p-4 h-auto rounded-lg border-2
                    ${
                      selectedProvider === provider.name
                        ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => {
                    setSelectedProvider(provider.name);
                    setSmartCardNumberInput("");
                    setValidatedSmartCard(null); // Reset validation on provider change
                    setSmartCardValidationError(null);
                    setSelectedPackage(null); // Reset package
                  }}
                >
                  <provider.icon className="h-8 w-8 text-gray-600 mb-2" />
                  <span className="font-semibold text-sm text-[var(--color-dark-text)]">
                    {provider.name}
                  </span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Smart Card Information (Conditional) */}
          {showSmartCardInfo && (
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                  Smart Card Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div>
                  <Label htmlFor="smartCardNumber" className="sr-only">
                    Smart Card Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="smartCardNumber"
                      type="text"
                      placeholder="Enter your smart card number"
                      value={smartCardNumberInput}
                      onChange={(e) => {
                        setSmartCardNumberInput(e.target.value);
                        setValidatedSmartCard(null); // Clear validation on input change
                        setSmartCardValidationError(null);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={handleValidateSmartCard}
                      disabled={
                        isSmartCardValidating || !smartCardNumberInput.trim()
                      }
                    >
                      {isSmartCardValidating ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Search className="h-5 w-5 text-gray-500" />
                      )}
                    </Button>
                  </div>
                  {smartCardValidationError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" />{" "}
                      {smartCardValidationError}
                    </p>
                  )}
                </div>

                {/* Smart Card Validated Display */}
                {validatedSmartCard && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg space-y-2">
                    <p className="font-semibold flex items-center text-lg">
                      <CheckCircle className="h-5 w-5 mr-2" /> Smart Card
                      Validated
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <span>Customer Name:</span>{" "}
                      <span className="font-medium flex items-center">
                        <User className="h-4 w-4 mr-1" />{" "}
                        {validatedSmartCard.customerName}
                      </span>
                      <span>Status:</span>{" "}
                      <span className="font-medium flex items-center">
                        <Info className="h-4 w-4 mr-1" />{" "}
                        {validatedSmartCard.status}
                      </span>
                      <span>Current Package:</span>{" "}
                      <span className="font-medium flex items-center">
                        <Signal className="h-4 w-4 mr-1" />{" "}
                        {validatedSmartCard.currentPackage}
                      </span>
                      <span>Expiry Date:</span>{" "}
                      <span className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />{" "}
                        {validatedSmartCard.expiryDate}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Select Package (Conditional) */}
          {showPackageSelection &&
            selectedProvider &&
            packages[selectedProvider] && (
              <Card className="p-6 rounded-xl shadow-md">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                    Select Package
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {packages[selectedProvider].map((pkg) => (
                    <Button
                      key={pkg.name}
                      variant="outline"
                      className={`flex flex-col items-start p-4 h-auto rounded-lg border-2 relative
                      ${
                        selectedPackage?.name === pkg.name
                          ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      {pkg.popular && (
                        <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                          Popular
                        </span>
                      )}
                      <span className="text-lg font-semibold text-[var(--color-dark-text)]">
                        {pkg.name}
                      </span>
                      <span className="text-sm text-[var(--color-primary)]">
                        ₦{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center mt-1">
                        <Tv className="h-3 w-3 mr-1" /> {pkg.channels}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {pkg.duration}
                      </span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}

          {/* Payment Method (Conditional) */}
          {showPaymentMethod && (
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value: "wallet" | "card") =>
                    setPaymentMethod(value)
                  }
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <Label
                      htmlFor="wallet"
                      className="flex items-center space-x-3 cursor-pointer text-base text-gray-800"
                    >
                      <RadioGroupItem
                        value="wallet"
                        id="wallet"
                        className="h-5 w-5"
                      />
                      <Wallet className="h-6 w-6 text-gray-600" />
                      <span>Wallet Balance</span>
                      <span className="text-gray-500 text-sm">
                        ₦{userWalletBalance.toLocaleString()} available
                      </span>
                    </Label>
                    {paymentMethod === "wallet" && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <Label
                      htmlFor="card"
                      className="flex items-center space-x-3 cursor-pointer text-base text-gray-800"
                    >
                      <RadioGroupItem
                        value="card"
                        id="card"
                        className="h-5 w-5"
                      />
                      <CreditCard className="h-6 w-6 text-gray-600" />
                      <span>Pay with Card (Paystack)</span>
                      <span className="text-gray-500 text-sm">
                        Debit/Credit Card, Bank transfer
                      </span>
                    </Label>
                    {paymentMethod === "card" && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Subscription Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 rounded-xl shadow-md sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Subscription Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Provider:</span>
                <span className="font-semibold">
                  {selectedProvider || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Smart Card:</span>
                <span className="font-semibold">
                  {smartCardNumberInput || "Not entered"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-semibold">
                  {validatedSmartCard
                    ? validatedSmartCard.customerName
                    : "Not validated"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Package:</span>
                <span className="font-semibold">
                  {selectedPackage?.name || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold">
                  {selectedPackage?.duration || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">
                  ₦{amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b pb-3 border-gray-100">
                <span>Service Fee:</span>
                <span className="font-semibold text-green-600">
                  ₦{serviceFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-3 text-xl font-bold text-[var(--color-dark-text)]">
                <span>Total:</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 text-lg font-semibold rounded-md shadow-md mt-6"
                onClick={handleSubscribe}
                disabled={
                  !selectedProvider ||
                  !validatedSmartCard ||
                  !selectedPackage ||
                  amount === 0
                }
              >
                Subscribe Now
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                API NOT FOUND: Actual subscription logic would be here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Added XCircle for error display
import { XCircle } from "lucide-react";
