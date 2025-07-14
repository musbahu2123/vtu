"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Zap,
  Search,
  CheckCircle,
  Info,
  Wallet,
  CreditCard,
  Clock,
  XCircle,
  DollarSign,
  Loader2,
} from "lucide-react"; // Icons

export default function ElectricityPage() {
  const [selectedDisco, setSelectedDisco] = useState<string | null>(null);
  const [meterNumberInput, setMeterNumberInput] = useState("");
  const [validatedCustomer, setValidatedCustomer] = useState<{
    name: string;
    address: string;
    meterType: string;
    tariff: string;
  } | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet"
  );
  const [isMeterValidating, setIsMeterValidating] = useState(false);
  const [meterValidationError, setMeterValidationError] = useState<
    string | null
  >(null);

  const userWalletBalance = 25000;

  const discos = [
    { name: "Eko Electricity (EKEDC)", value: "EKEDC" },
    { name: "Ikeja Electric (IKEDC)", value: "IKEDC" },
    { name: "Kaduna Electric (KAEDC)", value: "KAEDC" },
    { name: "Port Harcourt Electric (PHED)", value: "PHED" },
    { name: "Abuja Electric (AEDC)", value: "AEDC" },
    { name: "Enugu Electric (EEDC)", value: "EEDC" },
    { name: "Jos Electric (JEDC)", value: "JEDC" },
    { name: "Kano Electric (KEDC)", value: "KEDC" },
  ];

  const amountOptions = [1000, 2000, 3000, 5000, 10000, 20000];
  const MIN_AMOUNT = 100;
  const MAX_AMOUNT = 100000;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };

  const handleValidateMeter = async () => {
    if (!selectedDisco || !meterNumberInput.trim()) {
      setMeterValidationError(
        "Please select a DISCO and enter a meter number."
      );
      setValidatedCustomer(null);
      return;
    }

    setIsMeterValidating(true);
    setMeterValidationError(null);
    setValidatedCustomer(null);

    try {
      const response = await new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (meterNumberInput === "1234567890" && selectedDisco === "EKEDC") {
            resolve({
              ok: true,
              data: {
                customerName: "John Doe",
                address: "123 Lagos Street, Victoria Island",
                meterType: "Prepaid",
                tariff: "R2 - Residential",
              },
            });
          } else if (
            meterNumberInput === "9876543210" &&
            selectedDisco === "KEDC"
          ) {
            resolve({
              ok: true,
              data: {
                customerName: "Jane Smith",
                address: "45 Kaduna Road, Kano",
                meterType: "Postpaid",
                tariff: "C1 - Commercial",
              },
            });
          } else {
            // Reject with an actual Error object
            reject(
              new Error("Meter number not found or invalid for selected DISCO.")
            );
          }
        }, 1500);
      });

      if (response.ok) {
        setValidatedCustomer(response.data);
      } else {
        setMeterValidationError(
          response.message || "An unknown error occurred during validation."
        );
      }
    } catch (error: any) {
      console.error("Meter validation error:", error);
      setMeterValidationError(
        error.message || "Failed to validate meter. Please try again."
      );
    } finally {
      setIsMeterValidating(false);
    }
  };

  const parsedAmount =
    selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  const displayAmount = isNaN(parsedAmount) ? 0 : parsedAmount;
  const serviceFee = 0;
  const total = displayAmount + serviceFee;

  const recentPayments = [
    {
      disco: "EKEDC",
      meter: "123***789",
      amount: 3000,
      status: "Completed",
      icon: Zap,
    },
    {
      disco: "IKEDC",
      meter: "987***654",
      amount: 5000,
      status: "Completed",
      icon: Zap,
    },
    {
      disco: "AEDC",
      meter: "456***123",
      amount: 2000,
      status: "Completed",
      icon: Zap,
    },
  ];

  const handlePayBill = () => {
    if (
      !selectedDisco ||
      !validatedCustomer ||
      displayAmount < MIN_AMOUNT ||
      displayAmount > MAX_AMOUNT ||
      isNaN(displayAmount) ||
      displayAmount === 0
    ) {
      alert("Please fill all required fields and validate meter information.");
      return;
    }
    console.log("Paying Electricity Bill:", {
      disco: selectedDisco,
      meterNumber: meterNumberInput,
      customer: validatedCustomer,
      amount: displayAmount,
      paymentMethod,
    });
    alert(
      `Electricity bill payment of ₦${displayAmount.toLocaleString()} to ${
        validatedCustomer.name
      } simulated!`
    );
  };

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Pay Electricity Bill
        </h1>
        <div className="flex items-center text-[var(--color-secondary)]">
          <Zap className="h-5 w-5 mr-2" />
          <span>All DISCOs Supported</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Select Electricity Company (DISCO) */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Select Electricity Company (DISCO)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Select
                value={selectedDisco || ""}
                onValueChange={setSelectedDisco}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your electricity company" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {" "}
                  {/* Added position="popper" here */}
                  {discos.map((disco) => (
                    <SelectItem key={disco.value} value={disco.value}>
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-gray-500" />{" "}
                        {disco.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Meter Information */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Meter Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div>
                <Label htmlFor="meterNumber" className="sr-only">
                  Meter Number
                </Label>
                <div className="relative">
                  <Input
                    id="meterNumber"
                    type="text"
                    placeholder="Enter your meter number"
                    value={meterNumberInput}
                    onChange={(e) => {
                      setMeterNumberInput(e.target.value);
                      setValidatedCustomer(null);
                      setMeterValidationError(null);
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={handleValidateMeter}
                    disabled={
                      isMeterValidating ||
                      !selectedDisco ||
                      !meterNumberInput.trim()
                    }
                  >
                    {isMeterValidating ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
                {meterValidationError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <XCircle className="h-4 w-4 mr-1" /> {meterValidationError}
                  </p>
                )}
              </div>

              {/* Meter Validated Display */}
              {validatedCustomer && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg space-y-2">
                  <p className="font-semibold flex items-center text-lg">
                    <CheckCircle className="h-5 w-5 mr-2" /> Meter Validated
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <span>Customer Name:</span>{" "}
                    <span className="font-medium">
                      {validatedCustomer.name}
                    </span>
                    <span>Address:</span>{" "}
                    <span className="font-medium">
                      {validatedCustomer.address}
                    </span>
                    <span>Meter Type:</span>{" "}
                    <span className="font-medium">
                      {validatedCustomer.meterType}
                    </span>
                    <span>Tariff:</span>{" "}
                    <span className="font-medium">
                      {validatedCustomer.tariff}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Select Amount */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Select Amount
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {amountOptions.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className={`py-3 text-lg font-semibold rounded-md border-2
                      ${
                        selectedAmount === amount
                          ? "border-[var(--color-primary)] bg-green-50 text-green-800"
                          : "border-gray-300 hover:bg-gray-100"
                      }
                    `}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                  >
                    ₦{amount.toLocaleString()}
                  </Button>
                ))}
              </div>
              <div>
                <Label
                  htmlFor="customAmount"
                  className="text-sm font-medium text-gray-700"
                >
                  Or enter custom amount
                </Label>
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="e.g., 2000"
                  value={customAmount}
                  onChange={handleAmountChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Info className="h-3 w-3 mr-1" /> Minimum: ₦
                  {MIN_AMOUNT.toLocaleString()}, Maximum: ₦
                  {MAX_AMOUNT.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method (re-used) */}
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

        {/* Right Column: Payment Summary & Recent Payments */}
        <div className="lg:col-span-1 space-y-6">
          {/* Payment Summary */}
          <Card className="p-6 rounded-xl shadow-md sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>DISCO:</span>
                <span className="font-semibold">
                  {selectedDisco || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Meter Number:</span>
                <span className="font-semibold">
                  {meterNumberInput || "Not entered"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-semibold">
                  {validatedCustomer ? validatedCustomer.name : "Not validated"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">
                  ₦{displayAmount.toLocaleString()}
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
                onClick={handlePayBill}
                disabled={
                  !selectedDisco ||
                  !validatedCustomer ||
                  displayAmount < MIN_AMOUNT ||
                  displayAmount > MAX_AMOUNT ||
                  isNaN(displayAmount) ||
                  displayAmount === 0
                }
              >
                <Zap className="h-5 w-5 mr-2" /> Pay Bill
              </Button>
            </CardContent>
          </Card>

          {/* Recent Payments */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Recent Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {recentPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      <payment.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-dark-text)]">
                        {payment.disco}
                      </p>
                      <p className="text-sm text-gray-500">{payment.meter}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--color-dark-text)]">
                      ₦{payment.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {recentPayments.length === 0 && (
                <p className="text-center text-gray-500">
                  No recent payments found.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
