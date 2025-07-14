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
} from "@/components/ui/select"; // For payment method dropdown
import {
  Wallet,
  DollarSign,
  Lock,
  CheckCircle,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronDown,
  PlusCircle,
} from "lucide-react"; // Icons
import { useAuth } from "@/context/AuthContext"; // To get user's current balance

export default function FundWalletPage() {
  const { user } = useAuth(); // Get user from AuthContext for balance
  const userWalletBalance = user?.balance
    ? parseFloat(user.balance.replace(/[^0-9.]/g, ""))
    : 0;

  // State for the amount to fund
  const [amount, setAmount] = useState<string>("");
  // State for selected quick amount
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(
    null
  );
  // State for payment method (dropdown value)
  const [paymentGateway, setPaymentGateway] = useState<string>("paystack"); // Default to Paystack

  // Quick amount options
  const quickAmountOptions = [1000, 2000, 5000, 10000, 20000, 50000];
  const MIN_AMOUNT = 100;
  const MAX_AMOUNT = 500000;

  // Effect to sync amount input with quick amount selection
  useEffect(() => {
    if (selectedQuickAmount !== null) {
      setAmount(selectedQuickAmount.toString());
    }
  }, [selectedQuickAmount]);

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or numbers
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setSelectedQuickAmount(null); // Deselect quick amount if custom is entered
    }
  };

  // Calculate payment summary dynamically
  const parsedAmount = parseFloat(amount);
  const displayAmount = isNaN(parsedAmount) ? 0 : parsedAmount;
  const fee = 0; // Assuming no fee for now, or calculate based on payment gateway
  const total = displayAmount + fee;

  const handleFundWallet = () => {
    if (
      displayAmount < MIN_AMOUNT ||
      displayAmount > MAX_AMOUNT ||
      isNaN(displayAmount) ||
      displayAmount === 0
    ) {
      alert(
        `Please enter an amount between ₦${MIN_AMOUNT.toLocaleString()} and ₦${MAX_AMOUNT.toLocaleString()}.`
      );
      return;
    }
    // Implement actual fund wallet logic here (e.g., initiate Paystack transaction)
    console.log("Funding Wallet:", {
      amount: displayAmount,
      paymentGateway,
    });
    alert(
      `Funding Wallet with ₦${displayAmount.toLocaleString()} via ${paymentGateway} simulated! Check console for details.`
    );
  };

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Fund Wallet
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Add Money Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
                <Wallet className="h-6 w-6 mr-2 text-[var(--color-primary)]" />{" "}
                Add Money to Wallet
              </CardTitle>
              <p className="text-sm text-gray-600">
                Choose amount and payment method to fund your wallet
              </p>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              {/* Amount Input */}
              <div>
                <Label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700"
                >
                  Amount (₦)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  min={MIN_AMOUNT}
                  max={MAX_AMOUNT}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum: ₦{MIN_AMOUNT.toLocaleString()}, Maximum: ₦
                  {MAX_AMOUNT.toLocaleString()}
                </p>
              </div>

              {/* Quick Amount Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Quick Amount Selection
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3">
                  {quickAmountOptions.map((qAmount) => (
                    <Button
                      key={qAmount}
                      variant="outline"
                      className={`py-3 text-lg font-semibold rounded-md border-2
                        ${
                          selectedQuickAmount === qAmount
                            ? "border-[var(--color-primary)] bg-green-50 text-green-800"
                            : "border-gray-300 hover:bg-gray-100"
                        }
                      `}
                      onClick={() => setSelectedQuickAmount(qAmount)}
                    >
                      ₦{qAmount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payment Method Dropdown */}
              <div>
                <Label
                  htmlFor="paymentMethod"
                  className="text-sm font-medium text-gray-700"
                >
                  Payment Method
                </Label>
                <Select
                  value={paymentGateway}
                  onValueChange={setPaymentGateway}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paystack">
                      Paystack (Card, Bank Transfer, USSD)
                    </SelectItem>
                    {/* Add other payment gateways here if needed */}
                    {/* <SelectItem value="flutterwave">Flutterwave</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="font-semibold text-[var(--color-dark-text)] mb-2">
                  Payment Summary
                </p>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Amount:</span>
                  <span className="font-semibold">
                    ₦{displayAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-700 border-b pb-2 border-gray-100">
                  <span>Fee:</span>
                  <span className="font-semibold text-green-600">
                    ₦{fee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold text-[var(--color-dark-text)]">
                  <span>Total:</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 text-lg font-semibold rounded-md shadow-md mt-6"
                onClick={handleFundWallet}
                disabled={
                  displayAmount < MIN_AMOUNT ||
                  displayAmount > MAX_AMOUNT ||
                  isNaN(displayAmount) ||
                  displayAmount === 0
                }
              >
                <PlusCircle className="h-5 w-5 mr-2" /> Fund Wallet - ₦
                {total.toLocaleString()}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Current Balance & Secure Payment Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Balance */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-4xl font-extrabold text-[var(--color-primary)] mb-2">
                ₦{userWalletBalance.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Available balance</p>
            </CardContent>
          </Card>

          {/* Secure Payment */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
                <Lock className="h-6 w-6 mr-2 text-[var(--color-secondary)]" />{" "}
                Secure Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2 text-gray-700">
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> 256-bit
                SSL encryption
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> PCI DSS
                compliant
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Instant
                wallet credit
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
                <Banknote className="h-6 w-6 mr-2 text-[var(--color-primary)]" />{" "}
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2 text-gray-700">
              <div className="flex items-center text-sm">
                <CreditCard className="h-4 w-4 mr-2 text-gray-500" />{" "}
                Debit/Credit Cards (Visa, Mastercard)
              </div>
              <div className="flex items-center text-sm">
                <Banknote className="h-4 w-4 mr-2 text-gray-500" /> Bank
                Transfer
              </div>
              <div className="flex items-center text-sm">
                <Smartphone className="h-4 w-4 mr-2 text-gray-500" /> USSD
                (*737#)
              </div>
              <div className="flex items-center text-sm">
                <Wallet className="h-4 w-4 mr-2 text-gray-500" /> Mobile Money
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
