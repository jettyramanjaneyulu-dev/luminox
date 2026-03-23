import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased bg-black">
        <Header />
        {children}  
        <Footer />
      </body>
    </html>
  );
}