import { Inter } from "next/font/google";


import AuthGuard from "@/components/AuthGuard";
import { ToastList } from "@/components/Toaster";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <AuthGuard>{children}</AuthGuard>
        <ToastList></ToastList>
    </>
  );
}
