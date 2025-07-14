"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Banknote,
  Wallet,
  CreditCard,
  CheckCircle,
  Info,
  TrendingUp,
  Loader2,
  Search, // Added Search here
} from "lucide-react";

export default function WithdrawPage() {
  // State for selected withdrawal type
  const [withdrawalType, setWithdrawalType] = useState<"tokens" | "bank">(
    "tokens"
  );
  // State for amount
  const [amount, setAmount] = useState("");
  // State for bank details (if withdrawalType is 'bank')
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState<string | null>(null);
  const [isAccountValidating, setIsAccountValidating] = useState(false);
  const [accountValidationError, setAccountValidationError] = useState<
    string | null
  >(null);
  // State for payment method (if withdrawalType is 'bank')
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet"
  );

  // Dummy user balances
  const userWalletBalance = 25000; // N25,000
  const userRewardTokens = 500; // 500 tokens

  // Dummy bank list
  const banks = [
    { name: "Access Bank", value: "Access Bank" },
    { name: "Zenith Bank", value: "Zenith Bank" },
    { name: "GTBank", value: "GTBank" },
    { name: "UBA", value: "UBA" },
    { name: "First Bank", value: "First Bank" },
  ];

  // Withdrawal fees (dummy)
  const tokenConversionRate = 1; // 1 token = 1 NGN
  const bankTransferFee = 50; // N50 flat fee for bank transfers

  // Calculate withdrawal summary dynamically
  const parsedAmount = parseFloat(amount);
  const displayAmount = isNaN(parsedAmount) ? 0 : parsedAmount;

  let fee = 0;
  let typeDisplay = "";
  let youWillReceive = 0;

  if (withdrawalType === "tokens") {
    typeDisplay = "Tokens to Wallet";
    fee = 0; // No fee for token conversion
    youWillReceive = displayAmount * tokenConversionRate;
  } else {
    // 'bank'
    typeDisplay = "Wallet to Bank Account";
    fee = bankTransferFee;
    youWillReceive = displayAmount - fee;
  }

  const total = displayAmount + fee; // Total amount to be deducted from source

  // Simulate account number validation
  const handleValidateAccount = async () => {
    if (!selectedBank || !accountNumber.trim()) {
      setAccountValidationError(
        "Please select a bank and enter an account number."
      );
      setAccountName(null);
      return;
    }

    setIsAccountValidating(true);
    setAccountValidationError(null);
    setAccountName(null);

    try {
      // Simulate API call to validate account number
      // API NOT FOUND: This would be a call to your backend to verify account details
      const response = await new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (
            accountNumber === "1234567890" &&
            selectedBank === "Access Bank"
          ) {
            resolve({ ok: true, data: { accountName: "Musbahu Aminu Bala" } });
          } else if (
            accountNumber === "0987654321" &&
            selectedBank === "Zenith Bank"
          ) {
            resolve({ ok: true, data: { accountName: "Fatima Abubakar" } });
          } else {
            reject(
              new Error(
                "Account number not found or invalid for selected bank."
              )
            );
          }
        }, 1500); // Simulate network delay
      });

      if (response.ok) {
        setAccountName(response.data.accountName);
      } else {
        setAccountValidationError(
          response.message || "An unknown error occurred during validation."
        );
      }
    } catch (error: any) {
      console.error("Account validation error:", error);
      setAccountValidationError(
        error.message || "Failed to validate account. Please try again."
      );
    } finally {
      setIsAccountValidating(false);
    }
  };

  const handleWithdraw = () => {
    if (displayAmount <= 0 || isNaN(displayAmount)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (withdrawalType === "tokens") {
      if (displayAmount > userRewardTokens) {
        alert("Insufficient reward tokens.");
        return;
      }
      console.log("Converting Tokens:", {
        amount: displayAmount,
        youWillReceive,
      });
      alert(
        `Converting ${displayAmount} tokens to ₦${youWillReceive.toLocaleString()} simulated!`
      );
    } else {
      // 'bank'
      if (!selectedBank || !accountNumber || !accountName) {
        alert("Please fill in all bank details and validate the account.");
        return;
      }
      if (displayAmount > userWalletBalance) {
        alert("Insufficient wallet balance.");
        return;
      }
      console.log("Withdrawing to Bank:", {
        amount: displayAmount,
        bank: selectedBank,
        accountNumber,
        accountName,
        paymentMethod,
        youWillReceive,
      });
      alert(
        `Withdrawal of ₦${youWillReceive.toLocaleString()} to ${accountName} (${selectedBank}) simulated!`
      );
    }
    // API NOT FOUND: This is where the actual withdrawal API call would go
  };

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Withdraw Funds
        </h1>
        <div className="flex items-center text-[var(--color-secondary)]">
          <TrendingUp className="h-5 w-5 mr-2" />
          <span>Instant Withdrawals</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Withdrawal Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Select Withdrawal Type */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Select Withdrawal Type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <RadioGroup
                value={withdrawalType}
                onValueChange={(value: "tokens" | "bank") => {
                  setWithdrawalType(value);
                  // Reset related fields when type changes
                  setAmount("");
                  setSelectedBank(null);
                  setAccountNumber("");
                  setAccountName(null);
                  setAccountValidationError(null);
                }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <Label
                    htmlFor="tokens"
                    className="flex items-center space-x-3 cursor-pointer text-base text-gray-800"
                  >
                    <RadioGroupItem
                      value="tokens"
                      id="tokens"
                      className="h-5 w-5"
                    />
                    <DollarSign className="h-6 w-6 text-gray-600" />
                    <span>Reward Tokens to Wallet</span>
                    <span className="text-gray-500 text-sm">
                      Convert tokens to wallet balance (1:1 ratio)
                    </span>
                  </Label>
                  <span className="font-semibold text-[var(--color-primary)]">
                    {userRewardTokens.toLocaleString()} tokens
                  </span>
                  {withdrawalType === "tokens" && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <Label
                    htmlFor="bank"
                    className="flex items-center space-x-3 cursor-pointer text-base text-gray-800"
                  >
                    <RadioGroupItem
                      value="bank"
                      id="bank"
                      className="h-5 w-5"
                    />
                    <Banknote className="h-6 w-6 text-gray-600" />
                    <span>Wallet to Bank Account</span>
                    <span className="text-gray-500 text-sm">
                      Transfer money to your registered bank account
                    </span>
                  </Label>
                  <span className="font-semibold text-[var(--color-primary)]">
                    ₦{userWalletBalance.toLocaleString()}
                  </span>
                  {withdrawalType === "bank" && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Enter Amount */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Enter Amount
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
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
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
            </CardContent>
          </Card>

          {/* Bank Details (Conditional) */}
          {withdrawalType === "bank" && (
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                  Bank Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div>
                  <Label
                    htmlFor="bankName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Bank Name
                  </Label>
                  <Select
                    value={selectedBank || ""}
                    onValueChange={setSelectedBank}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {banks.map((bank) => (
                        <SelectItem key={bank.value} value={bank.value}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="accountNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Account Number
                  </Label>
                  <div className="relative">
                    <Input
                      id="accountNumber"
                      type="text"
                      placeholder="Enter account number"
                      value={accountNumber}
                      onChange={(e) => {
                        setAccountNumber(e.target.value);
                        setAccountName(null); // Clear validated name on input change
                        setAccountValidationError(null);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm pr-10 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={handleValidateAccount}
                      disabled={
                        isAccountValidating ||
                        !selectedBank ||
                        !accountNumber.trim()
                      }
                    >
                      {isAccountValidating ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Search className="h-5 w-5 text-gray-500" />
                      )}
                    </Button>
                  </div>
                  {accountValidationError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <Info className="h-4 w-4 mr-1" /> {accountValidationError}
                    </p>
                  )}
                </div>
                {accountName && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Account Name
                    </Label>
                    <Input
                      value={accountName}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 cursor-not-allowed"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Method (Conditional for Bank Withdrawal) */}
          {withdrawalType === "bank" && (
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
                  {/* Card payment for withdrawal is unusual, but kept for design consistency if needed */}
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
                      <span>
                        Pay with Card (Unusual for withdrawal, but included for
                        design)
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

        {/* Right Column: Withdrawal Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 rounded-xl shadow-md sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Withdrawal Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="font-semibold">{typeDisplay}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">
                  ₦{displayAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fee:</span>
                <span className="font-semibold text-red-500">
                  ₦{fee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-b pb-3 border-gray-100">
                <span>You'll receive:</span>
                <span className="font-semibold text-green-600">
                  ₦{youWillReceive.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-3 text-xl font-bold text-[var(--color-dark-text)]">
                <span>Total:</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 text-lg font-semibold rounded-md shadow-md mt-6"
                onClick={handleWithdraw}
                disabled={
                  displayAmount <= 0 ||
                  isNaN(displayAmount) ||
                  (withdrawalType === "tokens" &&
                    displayAmount > userRewardTokens) ||
                  (withdrawalType === "bank" &&
                    (!selectedBank ||
                      !accountNumber ||
                      !accountName ||
                      displayAmount > userWalletBalance))
                }
              >
                {withdrawalType === "tokens"
                  ? "Convert Tokens"
                  : "Withdraw Funds"}
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                API NOT FOUND: Actual withdrawal/conversion logic would be here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
