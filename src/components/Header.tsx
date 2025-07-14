"use client"; // This component needs client-side interactivity for the mobile menu

import { useState } from "react";
import Link from "next/link"; // Use Next.js Link for client-side navigation
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Shadcn Sheet for mobile menu
import { Menu, X } from "lucide-react"; // Lucide icons

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-12 fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-primary)]"
        >
          MUSBAHDEV
        </Link>

        {/* Mobile Menu Toggle (Hamburger Icon) */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[250px] sm:w-[300px] flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <Link
                  href="/"
                  className="text-2xl font-bold text-[var(--color-primary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  MUSBAHDEV
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="flex flex-col space-y-4">
                <li>
                  <Link
                    href="#home"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-[var(--color-primary)] font-medium transition duration-300 py-2"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-[var(--color-primary)] font-medium transition duration-300 py-2"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-[var(--color-primary)] font-medium transition duration-300 py-2"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-[var(--color-primary)] font-medium transition duration-300 py-2"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Button
                    asChild
                    className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)]"
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button
                    asChild
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                  >
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <Link
              href="#home"
              className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition duration-300"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-gray-700 hover:text-[var(--color-primary)] font-medium transition duration-300"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Button
              asChild
              className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] rounded-full px-6 py-2"
            >
              <Link href="/login">Login</Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-full px-6 py-2"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
