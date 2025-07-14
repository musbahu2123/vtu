"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Smartphone,
  Wifi,
  Lightbulb,
  Tv,
  QrCode,
  Gift,
  Wallet,
  TrendingUp,
  Settings,
  LogOut,
  UserCircle,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  DollarSign,
  Repeat,
  Percent,
  Users,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Import SheetHeader, SheetTitle, SheetDescription
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("dashboard");
  const { user, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-bg)]">
        <p className="text-[var(--color-dark-text)]">Loading dashboard...</p>
      </div>
    );
  }

  const displayUser = user || {
    fullName: "Guest",
    email: "guest@example.com",
    balance: "₦0.00",
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Buy Airtime", href: "/dashboard/airtime", icon: Smartphone },
    { name: "Buy Data", href: "/dashboard/data", icon: Wifi },
    { name: "Electricity", href: "/dashboard/electricity", icon: Lightbulb },
    { name: "Cable TV", href: "/dashboard/cabletv", icon: Tv },
    { name: "E-PINs", href: "/dashboard/epins", icon: QrCode },
    { name: "Gift Money", href: "/dashboard/giftmoney", icon: Gift },
    { name: "Fund Wallet", href: "/dashboard/fundwallet", icon: Wallet },
    { name: "Withdraw", href: "/dashboard/withdraw", icon: TrendingUp },
    { name: "Transactions", href: "/dashboard/transactions", icon: Repeat },
  ];

  const settingsLinks = [
    { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
    { name: "Create PIN", href: "/dashboard/create-pin", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const renderNavLinks = (links: typeof navLinks | typeof settingsLinks) => (
    <ul className="space-y-1">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            onClick={() => {
              setActiveLink(link.name.toLowerCase().replace(/\s/g, ""));
              setIsSidebarOpen(false);
            }}
            className={`flex items-center p-3 rounded-lg text-sm font-medium transition-colors duration-200
              ${
                activeLink === link.name.toLowerCase().replace(/\s/g, "")
                  ? "bg-[var(--color-primary)] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary)]"
              }`}
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex min-h-screen bg-[var(--color-light-bg)]">
      {/* Mobile Sidebar Trigger */}
      <div className="md:hidden fixed top-0 left-0 z-40 p-4">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open sidebar">
              <Menu className="h-6 w-6 text-[var(--color-dark-text)]" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] sm:w-[300px] p-0 flex flex-col bg-white"
          >
            {/* Added SheetHeader, SheetTitle, SheetDescription */}
            <SheetHeader className="absolute top-0 left-0 w-full p-0">
              {" "}
              {/* Positioned absolutely to avoid affecting existing layout */}
              <SheetTitle className="sr-only">
                Dashboard Navigation
              </SheetTitle>{" "}
              {/* Visually hidden title */}
              <SheetDescription className="sr-only">
                Main navigation for the MUSBAHDEV dashboard.
              </SheetDescription>{" "}
              {/* Visually hidden description */}
            </SheetHeader>

            <div className="p-6 border-b flex items-center justify-between">
              <Link
                href="/dashboard"
                className="text-2xl font-bold text-[var(--color-primary)]"
                onClick={() => setIsSidebarOpen(false)}
              >
                MUSBAHDEV
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              {/* User Profile in Sidebar */}
              <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src="https://placehold.co/40x40/00A86B/ffffff?text=EX"
                    alt="User Avatar"
                  />
                  <AvatarFallback>
                    {displayUser.fullName?.charAt(0) ||
                      displayUser.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-800">
                    {displayUser.fullName || "User"}
                  </p>
                  <p className="text-sm text-gray-600">{displayUser.email}</p>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full mt-1 inline-block">
                    User
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                    Menu
                  </h3>
                  {renderNavLinks(navLinks)}
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
                    Settings
                  </h3>
                  {renderNavLinks(settingsLinks)}
                </div>
                <li>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={logout}
                  >
                    <Link href="#">
                      <LogOut className="h-5 w-5 mr-3" /> Sign Out
                    </Link>
                  </Button>
                </li>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-[var(--color-primary)]"
          >
            MUSBAHDEV
          </Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src="https://placehold.co/40x40/00A86B/ffffff?text=EX"
              alt="User Avatar"
            />
            <AvatarFallback>
              {displayUser.fullName?.charAt(0) || displayUser.email.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-800">
              {displayUser.fullName || "User"}
            </p>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full mt-1 inline-block">
              User
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
              Menu
            </h3>
            {renderNavLinks(navLinks)}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
              Settings
            </h3>
            {renderNavLinks(settingsLinks)}
          </div>
        </nav>

        {/* Sign Out Button */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={logout}
          >
            <Link href="#">
              <LogOut className="h-5 w-5 mr-3" /> Sign Out
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm p-4 md:p-6 flex items-center justify-between z-30">
          <div className="flex items-center flex-grow mr-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700 font-semibold">
              <Wallet className="h-5 w-5 mr-2 text-[var(--color-primary)]" />
              <span>{displayUser.balance || "₦0.00"}</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6 text-gray-700" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </Button>
            <Avatar className="h-9 w-9 border-2 border-[var(--color-primary)]">
              <AvatarImage
                src="https://placehold.co/36x36/00A86B/ffffff?text=U"
                alt="Profile"
              />
              <AvatarFallback>
                {displayUser.fullName?.charAt(0) || displayUser.email.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content (children prop) */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
