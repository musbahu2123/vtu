"use client"; // This layout must be a client component if it uses client hooks or renders client components.

import { Suspense } from "react"; // Import Suspense

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap the children (which includes your LoginPage) with Suspense
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-bg)]">
          <p className="text-[var(--color-dark-text)]">
            Loading authentication page...
          </p>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
