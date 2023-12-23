import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatLayout from "./chatLayout";
import "./globals.css";
import MainChatLoader from "@/components/MainChatLoader/MainChatLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My private next-js-chat",
  description: "Generated by create next app for me",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatLayout>{children}</ChatLayout>
        <ToastContainer />
        <MainChatLoader />
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
