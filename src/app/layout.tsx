import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthContext"; // Import AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MUSBAHDEV - Your Digital Services Solution",
  description:
    "MUSBAHDEV connects you with reliable professionals for all your home repair, maintenance, and improvement needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* No Font Awesome needed, as we'll use Lucide React icons */}
      </head>
      <body className="antialiased bg-[var(--color-light-bg)] text-[var(--color-dark-text)]">
        <AuthProvider>
          {" "}
          {/* Wrap children with AuthProvider */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
