import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./globals.css";
import { ToastList } from "@/components/Toaster";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <link
        rel="icon"
        href="./iconMenu/favicon/icon.svg"
        type="image/svg"
        sizes="192x192"
      />

      <body className={`${inter.className}`}>

        <StoreProvider>
          <ToastList></ToastList>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
