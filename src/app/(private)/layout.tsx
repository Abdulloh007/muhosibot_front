import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../StoreProvider";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <AuthGuard></AuthGuard>
      </main>
    </>
  );
}
