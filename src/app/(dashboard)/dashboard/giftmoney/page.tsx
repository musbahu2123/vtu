"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Gift,
  DollarSign,
  Smartphone,
  Wifi,
  Heart,
  Wallet,
  CreditCard,
  CheckCircle,
  Info,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function GiftMoneyPage() {
  // State for selected gift type
  const [selectedGiftType, setSelectedGiftType] = useState<
    "money" | "airtime" | "data" | null
  >(null);
  // State for recipient information
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  // State for selected amount (predefined or custom)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  // State for personal message
  const [personalMessage, setPersonalMessage] = useState("");
  const MAX_MESSAGE_LENGTH = 60;
  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet"
  );

  // Dummy user wallet balance (will come from AuthContext or API)
  const userWalletBalance = 25000; // N25,000

  // Gift type options - Added 'as const' here
  const giftTypes = [
    {
      name: "Gift Money",
      type: "money",
      description: "Send money directly",
      icon: DollarSign,
    },
    {
      name: "Gift Airtime",
      type: "airtime",
      description: "Send airtime credit",
      icon: Smartphone,
    },
    {
      name: "Gift Data",
      type: "data",
      description: "Send data bundles",
      icon: Wifi,
    },
  ] as const; // <--- Added 'as const' here

  // Amount options
  const amountOptions = [500, 1000, 2000, 5000, 10000, 20000];
  const MIN_AMOUNT = 100; // Example minimum
  const MAX_AMOUNT = 50000; // Example maximum

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null); // Clear predefined amount if custom is entered
    }
  };

  // Calculate gift summary dynamically
  const parsedAmount =
    selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  const displayAmount = isNaN(parsedAmount) ? 0 : parsedAmount;
  const serviceFee = 0; // Assuming no fee for now
  const total = displayAmount + serviceFee;

  // Recent gifts dummy data
  const recentGifts = [
    {
      type: "Money Gift",
      recipient: "John Doe",
      amount: 1000,
      icon: DollarSign,
    },
    {
      type: "Airtime Gift",
      recipient: "Jane Smith",
      amount: 500,
      icon: Smartphone,
    },
    { type: "Data Gift", recipient: "Alice Brown", amount: 2000, icon: Wifi },
  ];

  const handleSendGift = () => {
    if (
      !selectedGiftType ||
      !recipientPhoneNumber.trim() ||
      displayAmount < MIN_AMOUNT ||
      displayAmount > MAX_AMOUNT ||
      isNaN(displayAmount) ||
      displayAmount === 0
    ) {
      alert(
        "Please fill all required fields (Gift Type, Recipient Phone, Amount)."
      );
      return;
    }

    // Implement actual send gift logic here
    console.log("Sending Gift:", {
      giftType: selectedGiftType,
      recipientPhoneNumber,
      recipientName,
      amount: displayAmount,
      personalMessage,
      paymentMethod,
    });
    alert(
      `Gift of ₦${displayAmount.toLocaleString()} (${selectedGiftType}) to ${recipientPhoneNumber} simulated!`
    );
  };

  // Conditional rendering flags
  const showRecipientInfo = selectedGiftType !== null;
  const showAmountSection =
    showRecipientInfo && recipientPhoneNumber.trim().length >= 10; // Basic phone number validation
  const showMessageAndPayment =
    showAmountSection &&
    (selectedAmount !== null || (customAmount && parseFloat(customAmount) > 0));

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Send Gift
        </h1>
        <div className="flex items-center text-[var(--color-secondary)]">
          <Heart className="h-5 w-5 mr-2" />
          <span>Spread the Love</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Send Gift Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Select Gift Type */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Select Gift Type
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {giftTypes.map((type) => (
                <Button
                  key={type.type}
                  variant="outline"
                  className={`flex flex-col items-center justify-center p-4 h-auto rounded-lg border-2
                    ${
                      selectedGiftType === type.type
                        ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => {
                    setSelectedGiftType(type.type); // This is now correctly typed
                    // Reset subsequent fields when gift type changes
                    setRecipientPhoneNumber("");
                    setRecipientName("");
                    setSelectedAmount(null);
                    setCustomAmount("");
                    setPersonalMessage("");
                  }}
                >
                  <type.icon className="h-8 w-8 text-gray-600 mb-2" />
                  <span className="font-semibold text-sm text-[var(--color-dark-text)]">
                    {type.name}
                  </span>
                  <span className="text-xs text-gray-500 text-center">
                    {type.description}
                  </span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recipient Information (Conditional) */}
          {showRecipientInfo && (
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                  Recipient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div>
                  <Label
                    htmlFor="recipientPhone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Recipient Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="recipientPhone"
                    type="tel"
                    placeholder="e.g., 08012345678"
                    value={recipientPhoneNumber}
                    onChange={(e) => setRecipientPhoneNumber(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="recipientName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Recipient Name (Optional)
                  </Label>
                  <Input
                    id="recipientName"
                    type="text"
                    placeholder="Enter recipient's name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Select Amount (Conditional) */}
          {showAmountSection && (
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                  Select Amount
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
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
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={handleAmountChange}
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
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
          )}

          {/* Personal Message (Optional) (Conditional) */}
          {showMessageAndPayment && (
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                  Personal Message (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Textarea
                  placeholder="Write a sweet message for your loved one..."
                  value={personalMessage}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                      setPersonalMessage(e.target.value);
                    }
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <p className="text-xs text-gray-500 text-right mt-1">
                  {personalMessage.length}/{MAX_MESSAGE_LENGTH} characters
                </p>
              </CardContent>
            </Card>
          )}

          {/* Payment Method (Conditional) */}
          {showMessageAndPayment && (
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

        {/* Right Column: Gift Summary & Recent Gifts */}
        <div className="lg:col-span-1 space-y-6">
          {/* Gift Summary */}
          <Card className="p-6 rounded-xl shadow-md sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Gift Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3 text-gray-700">
              {/* Initial state: Sending love through digital gifts */}
              {!selectedGiftType && (
                <div className="flex flex-col items-center justify-center text-center py-4 text-gray-500">
                  <Heart className="h-12 w-12 text-pink-400 mb-2" />
                  <p>Sending love through digital gifts</p>
                </div>
              )}

              {/* Dynamic summary when gift type is selected */}
              {selectedGiftType && (
                <>
                  <div className="flex justify-between">
                    <span>Gift Type:</span>
                    <span className="font-semibold capitalize">
                      {selectedGiftType
                        .replace("money", "Money")
                        .replace("airtime", "Airtime")
                        .replace("data", "Data")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recipient:</span>
                    <span className="font-semibold">
                      {recipientName || recipientPhoneNumber || "Not entered"}
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
                </>
              )}

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 text-lg font-semibold rounded-md shadow-md mt-6"
                onClick={handleSendGift}
                disabled={
                  !selectedGiftType ||
                  !recipientPhoneNumber.trim() ||
                  displayAmount < MIN_AMOUNT ||
                  displayAmount > MAX_AMOUNT ||
                  isNaN(displayAmount) ||
                  displayAmount === 0
                }
              >
                <Gift className="h-5 w-5 mr-2" /> Send Gift
              </Button>
            </CardContent>
          </Card>

          {/* Recent Gifts */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Recent Gifts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {recentGifts.map((gift, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-full mr-3">
                      <gift.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--color-dark-text)]">
                        {gift.type}
                      </p>
                      <p className="text-sm text-gray-500">{gift.recipient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--color-dark-text)]">
                      ₦{gift.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {recentGifts.length === 0 && (
                <p className="text-center text-gray-500">
                  No recent gifts found.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
