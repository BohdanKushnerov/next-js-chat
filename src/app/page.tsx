"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import MainChatLoader from "@/components/MainChatLoader/MainChatLoader";
import { auth } from "@/myfirebase/config";
import useChatStore from "@/zustand/store";
import ChatPage from "./[chatID]/page";

const Home = () => {
  const router = useRouter();
  const isLoggedIn = useChatStore((state) => state.isLoggedIn);
  const updateCurrentUser = useChatStore((state) => state.updateCurrentUser);

  console.log("updateCurrentUser", updateCurrentUser);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, []);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        updateCurrentUser(authUser);
        // router.push()
      } else {
        updateCurrentUser(null);
        router.push('auth')
      }
    });

    return () => unsub();
  }, [router, updateCurrentUser]);

  return (
    <>
      <main>
        {isLoggedIn && <ChatPage />}
        <MainChatLoader />
      </main>
    </>
  );
};

export default Home;
