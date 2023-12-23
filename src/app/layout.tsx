// import type { Metadata } from "next";
// import Head from "next/head";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatLayout from "./chatLayout";
import MainChatLoader from "@/components/MainChatLoader/MainChatLoader";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "My Private Next.js Chat",
//   description:
//     "Explore seamless and secure communication with My Private Next.js Chat. Built using the power of Next.js, this chat application offers a modern and responsive user interface. Engage in real-time conversations, share media, and stay connected effortlessly. Your privacy is our priority, backed by the robust security features provided by Next.js. Join the conversation and experience a new level of chatting with My Private Next.js Chat.",

//   // <meta name="google-site-verification" content="ucWXrGWx51u-n4BfgmVdfYxSJ32bvhnYxoqLilRg8Zw" />
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="ucWXrGWx51u-n4BfgmVdfYxSJ32bvhnYxoqLilRg8Zw"
        />
      </Head>
      <body className={inter.className}>
        <ChatLayout>{children}</ChatLayout>
        <ToastContainer />
        <MainChatLoader />
        <div id="modal-root"></div>
      </body>
    </html>
  );
}

{
  /* <link rel="preconnect" href="https://googleapis.com" /> */
}
// <link rel="preconnect" href="https://identitytoolkit.googleapis.com" />
{
  /* <meta
    name="google-site-verification"
    content="ucWXrGWx51u-n4BfgmVdfYxSJ32bvhnYxoqLilRg8Zw"
  /> */
}
