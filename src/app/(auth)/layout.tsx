// This layout applies to all routes within the (auth) group (e.g., /login, /signup)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // You can add common layout elements for auth pages here,
    // such as a specific background, a small logo, etc.
    // For now, it's a simple wrapper.
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-light-bg)]">
      {children}
    </div>
  );
}
