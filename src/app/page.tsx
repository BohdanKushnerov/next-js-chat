"use client";

import { useEffect } from "react";
// import { useRouter } from "next/navigation";

import Auth from "@/components/Auth/Auth";
import { auth } from "@/myfirebase/config";
import useChatStore from "@/zustand/store";
import MainChatLoader from "@/components/MainChatLoader/MainChatLoader";
import ChatPage from "./[id]/page";

const Home = () => {
  // const router = useRouter();
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
      } else {
        updateCurrentUser(null);
      }
    });

    return () => unsub();
  }, [updateCurrentUser]);

  return (
    <>
      <main>
        {updateCurrentUser ? <ChatPage /> : <Auth />}

        <MainChatLoader />
        {/* <div id="modal-root"></div> */}
      </main>
    </>
  );
};

export default Home;
