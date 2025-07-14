"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wallet,
  DollarSign,
  Repeat,
  TrendingUp,
  Users,
  Smartphone,
  Wifi,
  Lightbulb,
  Tv,
  QrCode,
  Gift,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
  PlusCircle,
  Hand,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // Import useAuth hook

export default function DashboardPage() {
  const { user } = useAuth(); // Get user from AuthContext

  // Use user data from context, or fallback for display
  const displayUser = user || { fullName: "User", balance: "₦0.00" };

  // Dummy data for stats cards
  const stats = [
    {
      title: "Total Spent",
      value: "₦45,200",
      icon: DollarSign,
      color: "text-[var(--color-primary)]",
    },
    {
      title: "Transactions",
      value: "127",
      icon: Repeat,
      color: "text-[var(--color-secondary)]",
    },
    {
      title: "This Month",
      value: "₦12,500",
      icon: TrendingUp,
      color: "text-[var(--color-accent-purple)]",
    },
    {
      title: "Referrals",
      value: "8",
      icon: Users,
      color: "text-[var(--color-accent-orange)]",
    },
  ];

  // Dummy data for quick actions
  const quickActions = [
    {
      name: "Buy Airtime",
      description: "All networks",
      icon: Smartphone,
      href: "/dashboard/airtime",
    },
    {
      name: "Buy Data",
      description: "Best prices",
      icon: Wifi,
      href: "/dashboard/data",
    },
    {
      name: "Electricity",
      description: "All DISCOs",
      icon: Lightbulb,
      href: "/dashboard/electricity",
    },
    {
      name: "Cable TV",
      description: "DSTV, GOTV",
      icon: Tv,
      href: "/dashboard/cabletv",
    },
    {
      name: "E-PINs",
      description: "WAEC, NECO",
      icon: QrCode,
      href: "/dashboard/epins",
    },
    {
      name: "Gift Money",
      description: "Send to friends",
      icon: Gift,
      href: "/dashboard/giftmoney",
    },
  ];

  // Dummy data for recent transactions
  const recentTransactions = [
    {
      type: "Airtime",
      details: "MTN • 2 mins ago",
      amount: "₦500",
      status: "Completed",
      icon: Smartphone,
      statusColor: "text-green-600",
    },
    {
      type: "Data Bundle",
      details: "Glo • 1 hour ago",
      amount: "₦1,200",
      status: "Completed",
      icon: Wifi,
      statusColor: "text-green-600",
    },
    {
      type: "Electricity",
      details: "EKEDC • 3 hours ago",
      amount: "₦3,000",
      status: "Completed",
      icon: Lightbulb,
      statusColor: "text-green-600",
    },
    {
      type: "Cable TV",
      details: "DSTV • 1 day ago",
      amount: "₦9,000",
      status: "Completed",
      icon: Tv,
      statusColor: "text-green-600",
    },
  ];

  // Dummy data for fund wallet options
  const fundOptions = ["1,000", "2,000", "5,000", "10,000"];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 md:p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {displayUser.fullName?.split(" ")[0] || "User"}!{" "}
            <Hand className="inline-block h-8 w-8 ml-2" />
          </h2>
          <p className="text-lg opacity-90">
            Manage your digital services with ease
          </p>
        </div>
        <div className="mt-6 md:mt-0 md:text-right">
          <p className="text-xl md:text-2xl font-semibold opacity-90">
            Wallet Balance
          </p>
          <p className="text-3xl md:text-4xl font-extrabold mb-4">
            {displayUser.balance || "₦0.00"}
          </p>{" "}
          {/* Display user balance */}
          <Button
            asChild
            className="bg-white text-purple-700 hover:bg-gray-100 rounded-full px-6 py-3 text-lg font-semibold"
          >
            <Link href="/dashboard/fundwallet">Fund Wallet</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="p-5 rounded-xl shadow-md flex items-center justify-between transform hover:scale-105 transition duration-300"
          >
            <CardContent className="p-0 flex flex-col">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-[var(--color-dark-text)] mt-1">
                {stat.value}
              </p>
            </CardContent>
            <div className={`${stat.color} text-4xl`}>
              <stat.icon className="h-10 w-10" />
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Fund Wallet Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2 p-6 rounded-xl shadow-md">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                href={action.href}
                key={action.name}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200 group"
              >
                <div className="bg-white p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <action.icon className="h-8 w-8 text-[var(--color-primary)] group-hover:text-[var(--color-primary-dark)]" />
                </div>
                <p className="mt-3 font-semibold text-[var(--color-dark-text)] text-sm">
                  {action.name}
                </p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Fund Your Wallet */}
        <Card className="p-6 rounded-xl shadow-md">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
              Fund Your Wallet
            </CardTitle>
            <p className="text-sm text-gray-600">
              Add money to your wallet to enjoy seamless transactions
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {fundOptions.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  className="py-3 text-lg font-semibold border-gray-300 hover:bg-gray-100"
                >
                  ₦{amount}
                </Button>
              ))}
            </div>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white py-3 text-lg font-semibold rounded-md shadow-md"
            >
              <Link href="/dashboard/fundwallet">
                <PlusCircle className="h-5 w-5 mr-2" /> Fund Wallet
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6 rounded-xl shadow-md">
        <CardHeader className="p-0 pb-4 flex flex-row justify-between items-center">
          <CardTitle className="text-xl font-bold text-[var(--color-dark-text)]">
            Recent Transactions
          </CardTitle>
          <Link
            href="/dashboard/transactions"
            className="text-[var(--color-primary)] hover:underline flex items-center text-sm font-medium"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          {recentTransactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b last:border-b-0 border-gray-100"
            >
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <transaction.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-dark-text)]">
                    {transaction.type}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.details}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[var(--color-dark-text)]">
                  ₦{transaction.amount}
                </p>
                <p
                  className={`text-sm ${transaction.statusColor} flex items-center justify-end`}
                >
                  {transaction.status === "Completed" && (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  )}
                  {transaction.status === "Pending" && (
                    <Clock className="h-4 w-4 mr-1" />
                  )}
                  {transaction.status === "Failed" && (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
