"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Phone,
  Mail,
  Wallet,
  DollarSign,
  Banknote,
  Lock,
  Key,
  Eye,
  EyeOff,
  Download,
  Repeat,
  LifeBuoy,
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  CreditCard, // Added CreditCard here
} from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // To fetch user data

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth(); // Get user data from AuthContext

  // State for user profile data (initially from AuthContext or dummy)
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "Loading...",
    phoneNumber: user?.phoneNumber || "Loading...",
    email: user?.email || "Loading...",
    walletBalance: user?.balance || "₦0.00",
    rewardTokens: "0", // Dummy
    accountStatus: "Inactive", // Dummy
    memberSince: "N/A", // Dummy
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Simulate fetching user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (authLoading) return; // Wait for auth to load

      setIsLoadingProfile(true);
      setProfileError(null);
      try {
        // API NOT FOUND: This would be a fetch call to your backend API to get detailed user profile
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

        // Use actual user data from AuthContext if available, otherwise dummy
        setProfileData({
          fullName: user?.fullName || "Musbahu Aminu Bala",
          phoneNumber: user?.phoneNumber || "09064973974",
          email: user?.email || "gamroff9@gmail.com",
          walletBalance: user?.balance || "₦25,000",
          rewardTokens: "500", // Dummy value
          accountStatus: "Active", // Dummy value
          memberSince: "Jan 2024", // Dummy value
        });
      } catch (err: any) {
        setProfileError(
          "API NOT FOUND: Failed to load profile data. " +
            (err.message || "Please check backend connection.")
        );
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user, authLoading]); // Re-fetch if user or authLoading state changes

  const handleEditProfile = () => {
    alert("API NOT FOUND: Edit Profile functionality coming soon!");
  };

  const handleAddBankDetails = () => {
    alert("API NOT FOUND: Add Bank Details functionality coming soon!");
  };

  const handleChangeTransactionPIN = () => {
    // This would ideally navigate to the /dashboard/create-pin page
    alert(
      "API NOT FOUND: Change Transaction PIN functionality coming soon! (Navigates to Create PIN)"
    );
    // Example: router.push('/dashboard/create-pin');
  };

  const handleChangePassword = () => {
    alert("API NOT FOUND: Change Password functionality coming soon!");
  };

  const handleDownloadStatement = () => {
    alert("API NOT FOUND: Download Statement functionality coming soon!");
  };

  const handleTransactionHistory = () => {
    alert(
      "API NOT FOUND: Transaction History functionality coming soon! (Navigates to Transactions page)"
    );
    // Example: router.push('/dashboard/transactions');
  };

  const handleContactSupport = () => {
    alert("API NOT FOUND: Contact Support functionality coming soon!");
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-[var(--color-light-bg)]">
        <Loader2 className="h-10 w-10 animate-spin text-[var(--color-primary)]" />
        <p className="ml-3 text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[var(--color-light-bg)] text-red-500">
        <XCircle className="h-12 w-12 mb-4" />
        <p className="text-xl font-semibold">Error Loading Profile</p>
        <p className="text-center mt-2">{profileError}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Profile Settings
        </h1>
        <span className="text-gray-600 text-lg">User</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Info, Bank Details, Security Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4 flex flex-row justify-between items-center">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
                <User className="h-6 w-6 mr-2 text-[var(--color-primary)]" />{" "}
                Personal Information
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditProfile}
                className="text-[var(--color-primary)] hover:bg-gray-100"
              >
                <Edit className="h-4 w-4 mr-1" /> Edit Profile (Coming Soon)
              </Button>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Full Name
                </Label>
                <div className="flex items-center mt-1">
                  <User className="h-5 w-5 mr-2 text-gray-600" />
                  <span className="font-semibold">{profileData.fullName}</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  Phone Number
                </Label>
                <div className="flex items-center mt-1">
                  <Phone className="h-5 w-5 mr-2 text-gray-600" />
                  <span className="font-semibold">
                    {profileData.phoneNumber}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2">
                <Label className="text-sm font-medium text-gray-500">
                  Email Address
                </Label>
                <div className="flex items-center mt-1">
                  <Mail className="h-5 w-5 mr-2 text-gray-600" />
                  <span className="font-semibold">{profileData.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4 flex flex-row justify-between items-center">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
                <Banknote className="h-6 w-6 mr-2 text-[var(--color-primary)]" />{" "}
                Bank Details
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditProfile}
                className="text-[var(--color-primary)] hover:bg-gray-100"
              >
                <Edit className="h-4 w-4 mr-1" /> Edit (Coming Soon)
              </Button>
            </CardHeader>
            <CardContent className="p-0 text-gray-700">
              {/* Conditional rendering for bank details */}
              {/* API NOT FOUND: This would check if user has bank details */}
              <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mb-4" />
                <p className="mb-4">No bank details added yet</p>
                <Button
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
                  onClick={handleAddBankDetails}
                >
                  Add Bank Details
                </Button>
              </div>
              {/* Example of how bank details would be displayed if available:
              <div className="space-y-2">
                <p><span className="font-semibold">Bank Name:</span> Access Bank</p>
                <p><span className="font-semibold">Account Number:</span> 0123456789</p>
                <p><span className="font-semibold">Account Name:</span> John Doe</p>
              </div>
              */}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
                <Lock className="h-6 w-6 mr-2 text-[var(--color-primary)]" />{" "}
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">Transaction PIN</p>
                  <p className="text-sm text-gray-600">
                    Secure your transactions with a PIN
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleChangeTransactionPIN}
                  className="text-[var(--color-primary)] hover:bg-gray-100"
                >
                  Change PIN
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">Password</p>
                  <p className="text-sm text-gray-600">
                    Change your account password
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleChangePassword}
                  className="text-[var(--color-primary)] hover:bg-gray-100"
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Account Summary & Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Account Summary */}
          <Card className="p-6 rounded-xl shadow-md sticky top-24">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Account Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-4xl font-extrabold text-[var(--color-primary)]">
                  {profileData.walletBalance}
                </p>
                <p className="text-sm text-gray-600">Wallet Balance</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-4xl font-extrabold text-[var(--color-accent-purple)]">
                  {profileData.rewardTokens}
                </p>
                <p className="text-sm text-gray-600">Reward Tokens</p>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span>Account Status:</span>
                <span
                  className={`font-semibold px-3 py-1 rounded-full text-xs ${
                    profileData.accountStatus === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {profileData.accountStatus}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span>Member Since:</span>
                <span className="font-semibold">{profileData.memberSince}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 rounded-xl shadow-md">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                onClick={handleDownloadStatement}
              >
                <Download className="h-5 w-5 mr-3" /> Download Statement
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                onClick={handleTransactionHistory}
              >
                <Repeat className="h-5 w-5 mr-3" /> Transaction History
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                onClick={handleContactSupport}
              >
                <LifeBuoy className="h-5 w-5 mr-3" /> Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
