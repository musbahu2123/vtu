"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BookOpen,
  QrCode,
  Wallet,
  CreditCard,
  CheckCircle,
  Info,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function EPinsPage() {
  const [selectedExamBody, setSelectedExamBody] = useState<string | null>(null);
  const [selectedEPinType, setSelectedEPinType] = useState<{
    name: string;
    price: number;
    popular?: boolean;
  } | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [customQuantity, setCustomQuantity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet"
  );

  const userWalletBalance = 25000;

  const examBodies = [
    {
      name: "WAEC",
      description: "West African Examinations Council",
      icon: BookOpen,
    },
    {
      name: "NECO",
      description: "National Examinations Council",
      icon: BookOpen,
    },
    {
      name: "NABTEB",
      description: "National Business and Technical Examinations Board",
      icon: BookOpen,
    },
    {
      name: "JAMB",
      description: "Joint Admissions and Matriculation Board",
      icon: BookOpen,
    },
  ];

  const ePinTypes: {
    [key: string]: { name: string; price: number; popular?: boolean }[];
  } = {
    WAEC: [
      { name: "WAEC GCE", price: 4000, popular: true },
      { name: "WAEC WASSCE", price: 4500, popular: false },
    ],
    NECO: [
      { name: "NECO SSCE", price: 4000, popular: true },
      { name: "NECO BECE", price: 2500, popular: false },
    ],
    NABTEB: [
      { name: "NABTEB NBC/NTC", price: 3000, popular: false },
      { name: "NABTEB ANBC/ANTC", price: 3500, popular: false },
    ],
    JAMB: [
      { name: "JAMB UTME", price: 5000, popular: true },
      { name: "JAMB DE", price: 4000, popular: false },
    ],
  };

  const quantityOptions = [1, 2, 3, 4, 5, 10];
  const MAX_PINS_PER_TRANSACTION = 50;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      const numValue = parseInt(value);
      if (
        value === "" ||
        (numValue >= 1 && numValue <= MAX_PINS_PER_TRANSACTION)
      ) {
        setCustomQuantity(value);
        setSelectedQuantity(null);
      }
    }
  };

  const currentQuantity =
    selectedQuantity || (customQuantity ? parseInt(customQuantity) : 0);
  const pricePerPin = selectedEPinType ? selectedEPinType.price : 0;
  const serviceFee = 0;
  const totalAmount = currentQuantity * pricePerPin + serviceFee;

  const handleBuyEPins = () => {
    if (
      !selectedExamBody ||
      !selectedEPinType ||
      currentQuantity === 0 ||
      isNaN(currentQuantity)
    ) {
      alert("Please select an Examination Body, E-PIN Type, and Quantity.");
      return;
    }
    if (currentQuantity < 1 || currentQuantity > MAX_PINS_PER_TRANSACTION) {
      alert(`Quantity must be between 1 and ${MAX_PINS_PER_TRANSACTION}.`);
      return;
    }

    console.log("Buying E-PINs:", {
      examBody: selectedExamBody,
      ePinType: selectedEPinType,
      quantity: currentQuantity,
      pricePerPin: pricePerPin,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
    });
    alert(
      `E-PIN purchase simulated! Buying ${currentQuantity} of ${
        selectedEPinType.name
      } for ₦${totalAmount.toLocaleString()}. Check console for details.`
    );
  };

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Buy E-PINs
        </h1>
        <div className="flex items-center text-[var(--color-secondary)]">
          <Info className="h-5 w-5 mr-2" />
          <span>All Exam Bodies</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Purchase Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Select Examination Body */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Select Examination Body
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {" "}
              {/* Changed grid classes here */}
              {examBodies.map((body) => (
                <Button
                  key={body.name}
                  variant="outline"
                  className={`flex flex-col items-center justify-center p-4 h-auto rounded-lg border-2
                    ${
                      selectedExamBody === body.name
                        ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => {
                    setSelectedExamBody(body.name);
                    setSelectedEPinType(null);
                    setSelectedQuantity(null);
                    setCustomQuantity("");
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    {body.icon ? (
                      <body.icon className="h-8 w-8 text-gray-600 mb-2" />
                    ) : (
                      <span className="h-8 w-8 text-gray-600 mb-2 flex items-center justify-center text-xl font-bold">
                        ☐
                      </span>
                    )}
                    <span className="font-semibold text-sm text-[var(--color-dark-text)]">
                      {body.name}
                    </span>
                    <span className="text-xs text-gray-500 text-center">
                      {body.description}
                    </span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Select E-PIN Type (Conditional) */}
          {selectedExamBody && ePinTypes[selectedExamBody] && (
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                  Select E-PIN Type
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {ePinTypes[selectedExamBody].map((type) => (
                  <Button
                    key={type.name}
                    variant="outline"
                    className={`flex items-center justify-between w-full p-4 h-auto rounded-lg border-2 relative
                      ${
                        selectedEPinType?.name === type.name
                          ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]"
                          : "border-gray-200 hover:border-gray-300"
                      }
                    `}
                    onClick={() => setSelectedEPinType(type)}
                  >
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-gray-600 mr-3" />
                      <div>
                        <p className="font-semibold text-base text-[var(--color-dark-text)]">
                          {type.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {type.name.includes("GCE") ||
                          type.name.includes("WASSCE")
                            ? "General Certificate Examination"
                            : "Description"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[var(--color-primary)]">
                        ₦{type.price.toLocaleString()}
                      </span>
                      <p className="text-xs text-gray-500">per PIN</p>
                    </div>
                    {type.popular && (
                      <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                        Popular
                      </span>
                    )}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Select Quantity (Conditional) */}
          {selectedEPinType && (
            <Card className="p-6 rounded-xl shadow-md">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                  Select Quantity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {quantityOptions.map((qty) => (
                    <Button
                      key={qty}
                      variant="outline"
                      className={`py-3 text-lg font-semibold rounded-md border-2
                        ${
                          selectedQuantity === qty
                            ? "border-[var(--color-primary)] bg-green-50 text-green-800"
                            : "border-gray-300 hover:bg-gray-100"
                        }
                      `}
                      onClick={() => {
                        setSelectedQuantity(qty);
                        setCustomQuantity("");
                      }}
                    >
                      {qty}
                    </Button>
                  ))}
                </div>
                <div>
                  <Label
                    htmlFor="customQuantity"
                    className="text-sm font-medium text-gray-700"
                  >
                    Or enter custom quantity
                  </Label>
                  <Input
                    id="customQuantity"
                    type="number"
                    placeholder="e.g., 1"
                    value={customQuantity}
                    onChange={handleQuantityChange}
                    min={1}
                    max={MAX_PINS_PER_TRANSACTION}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum {MAX_PINS_PER_TRANSACTION} PINs per transaction
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Method (Conditional) */}
          {selectedEPinType && (
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
                <span>Exam Body:</span>
                <span className="font-semibold">
                  {selectedExamBody || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>E-PIN Type:</span>
                <span className="font-semibold">
                  {selectedEPinType?.name || "Not selected"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-semibold">{currentQuantity || 1}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per PIN:</span>
                <span className="font-semibold">
                  ₦{pricePerPin.toLocaleString()}
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
                <span>₦{totalAmount.toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 text-lg font-semibold rounded-md shadow-md mt-6"
                onClick={handleBuyEPins}
                disabled={
                  !selectedExamBody ||
                  !selectedEPinType ||
                  currentQuantity === 0 ||
                  isNaN(currentQuantity) ||
                  currentQuantity < 1 ||
                  currentQuantity > MAX_PINS_PER_TRANSACTION
                }
              >
                Buy E-PINs
              </Button>
            </CardContent>
          </Card>

          {/* Most Popular E-PINs (from screenshot) */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-[var(--color-primary)]" />{" "}
                Most Popular
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <p className="font-semibold text-[var(--color-dark-text)]">
                      WAEC GCE
                    </p>
                    <p className="text-sm text-gray-500">
                      General Certificate Examination
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-[var(--color-primary)]">
                  ₦4,000
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-100">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-gray-600" />
                  <div>
                    <p className="font-semibold text-[var(--color-dark-text)]">
                      NECO SSCE
                    </p>
                    <p className="text-sm text-gray-500">High demand</p>
                  </div>
                </div>
                <span className="font-semibold text-[var(--color-primary)]">
                  ₦4,000
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
