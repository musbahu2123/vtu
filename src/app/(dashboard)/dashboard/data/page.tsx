"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CheckCircle,
  Info,
  Wifi,
  CreditCard,
  Wallet,
  Phone,
  TrendingUp,
} from "lucide-react"; // Added TrendingUp for "Best Data Prices"

export default function DataPage() {
  // State for selected network
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  // State for phone number
  const [phoneNumber, setPhoneNumber] = useState("");
  // State for selected data plan
  const [selectedDataPlan, setSelectedDataPlan] = useState<{
    size: string;
    price: number;
    duration: string;
  } | null>(null);
  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet"
  );

  // Dummy user wallet balance (will come from AuthContext or API)
  const userWalletBalance = 25000; // N25,000

  // Network options with placeholder colors (same as airtime)
  const networks = [
    { name: "MTN", color: "bg-yellow-400", textColor: "text-yellow-800" },
    { name: "Glo", color: "bg-green-500", textColor: "text-green-900" },
    { name: "Airtel", color: "bg-red-500", textColor: "text-red-900" },
    { name: "9mobile", color: "bg-green-300", textColor: "text-green-800" },
  ];

  // Dummy data plans (these would typically be fetched based on selectedNetwork from a backend API)
  const dataPlans = [
    { size: "1GB", price: 350, duration: "30 Days", popular: false },
    { size: "2GB", price: 700, duration: "30 Days", popular: true },
    { size: "3GB", price: 1000, duration: "30 Days", popular: false },
    { size: "5GB", price: 1500, duration: "30 Days", popular: false },
    { size: "10GB", price: 2500, duration: "30 Days", popular: false },
  ];

  // Calculate purchase summary dynamically
  const purchaseSummary = {
    network: selectedNetwork || "Not selected",
    phoneNumber: phoneNumber || "Not entered",
    dataPlan: selectedDataPlan ? selectedDataPlan.size : "Not selected",
    duration: selectedDataPlan ? selectedDataPlan.duration : "N/A",
    amount: selectedDataPlan ? selectedDataPlan.price : 0,
    fee: 0, // Assuming no fee for now
  };
  purchaseSummary.total = purchaseSummary.amount + purchaseSummary.fee;

  const handleBuyData = () => {
    // Implement actual data purchase logic here
    console.log("Buying Data:", {
      network: selectedNetwork,
      phoneNumber,
      dataPlan: selectedDataPlan,
      paymentMethod,
    });
    alert("Data bundle purchase simulated! Check console for details."); // Use a custom modal in production
  };

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Buy Data Bundle
        </h1>
        <div className="flex items-center text-[var(--color-secondary)]">
          <TrendingUp className="h-5 w-5 mr-2" />
          <span>Best Data Prices</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Purchase Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Select Network */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Select Network
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {networks.map((network) => (
                <Button
                  key={network.name}
                  variant="outline"
                  className={`flex flex-col items-center justify-center p-4 h-auto rounded-lg border-2
                    ${
                      selectedNetwork === network.name
                        ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => setSelectedNetwork(network.name)}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${network.color} mb-2`}
                  ></div>{" "}
                  {/* Placeholder for network logo */}
                  <span
                    className={`font-semibold text-sm ${network.textColor}`}
                  >
                    {network.name}
                  </span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Phone Number */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Phone Number
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div>
                <Label htmlFor="phoneNumber" className="sr-only">
                  Enter phone number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Select Data Plan */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Select Data Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {dataPlans.map((plan) => (
                <Button
                  key={`${plan.size}-${plan.price}`}
                  variant="outline"
                  className={`flex flex-col items-start p-4 h-auto rounded-lg border-2 relative
                    ${
                      selectedDataPlan?.size === plan.size &&
                      selectedDataPlan?.price === plan.price
                        ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => setSelectedDataPlan(plan)}
                >
                  {plan.popular && (
                    <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      Popular
                    </span>
                  )}
                  <span className="text-lg font-semibold text-[var(--color-dark-text)]">
                    {plan.size}
                  </span>
                  <span className="text-sm text-[var(--color-primary)]">
                    ₦{plan.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" /> {plan.duration}
                  </span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Payment Method (re-used from Airtime) */}
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
        </div>

        {/* Right Column: Purchase Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 rounded-xl shadow-md sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Purchase Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Network:</span>
                <span className="font-semibold">{purchaseSummary.network}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone Number:</span>
                <span className="font-semibold">
                  {purchaseSummary.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Data Plan:</span>
                <span className="font-semibold">
                  {purchaseSummary.dataPlan}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold">
                  {purchaseSummary.duration}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">
                  ₦{purchaseSummary.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b pb-3 border-gray-100">
                <span>Fee:</span>
                <span className="font-semibold text-green-600">
                  ₦{purchaseSummary.fee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-3 text-xl font-bold text-[var(--color-dark-text)]">
                <span>Total:</span>
                <span>₦{purchaseSummary.total.toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 text-lg font-semibold rounded-md shadow-md mt-6"
                onClick={handleBuyData}
                disabled={!selectedNetwork || !phoneNumber || !selectedDataPlan} // Disable if fields are not filled
              >
                Buy Data Bundle
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Added Clock icon for data plan duration
import { Clock } from "lucide-react";
