import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";

export const metadata = {
  title: "Hospital Management System",
  description: "Hospital management client built with Next.js and shadcn/ui",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
