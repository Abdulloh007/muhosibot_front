import { Inter } from "next/font/google";


import AuthGuard from "@/components/AuthGuard";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <AuthGuard>{children}</AuthGuard>
        
    </>
  );
}
