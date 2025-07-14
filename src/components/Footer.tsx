import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark-footer)] text-white py-12 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[var(--color-primary)]">
            MUSBAHDEV
          </h3>
          <p className="text-gray-400 text-sm">
            Your trusted partner for all digital services. Fast, secure, and
            reliable solutions for airtime, data, bills, and more.
          </p>
          <p className="text-gray-400 mt-4 flex items-center">
            <Phone className="mr-2 h-4 w-4" /> +234 800 123 4567
          </p>
          <p className="text-gray-400 flex items-center">
            <Mail className="mr-2 h-4 w-4" /> support@MUSBAHDEV.com
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Buy Airtime
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Data Bundles
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Electricity Bills
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Cable TV
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                E-Pins
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Gift Cards
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="#about"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300 text-2xl"
              aria-label="Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300 text-2xl"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300 text-2xl"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300 text-2xl"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MUSBAHDEV. All rights reserved.
      </div>
    </footer>
  );
}
