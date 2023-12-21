"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Transition } from "react-transition-group";

import Sidebar from "@/components/Sidebar/Sidebar";
import useChatStore from "@/zustand/store";
import useIsRedirectToCurrentChat from "@/hooks/useIsRedirectToCurrentChat";
import useOnAuthStateChanged from "@/hooks/useOnAuthStateChanged";
import useIsOnlineMyStatus from "@/hooks/useIsOnlineMyStatus";
import useWindowSize from "@/hooks/useWindowSize";
import { AppScreenType } from "@/types/AppScreenType";
import "@i18n";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const [screen, setScreen] = useState<AppScreenType>("FullScreen");
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);
  const pathname = usePathname();
  const { t } = useTranslation();

  const currentUserUID = useChatStore((state) => state.currentUser.uid);
  const isLoggedIn = useChatStore((state) => state.isLoggedIn);

  const windowHeight = useWindowSize(pathname, setScreen); // size window + resize window
  useOnAuthStateChanged(); // isAuth
  useIsRedirectToCurrentChat(currentUserUID); // isRedirectToCurrentChat
  useIsOnlineMyStatus(currentUserUID); // update online/offline status in realtime database

  console.log("screen --> AppScreenType", screen);

  useEffect(() => {
    if (!localStorage.theme) {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      localStorage.theme = prefersDarkMode ? "dark" : "light";
    }

    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark"
    );
  }, []);

  // requestPermission
  useEffect(() => {
    const requestPermission = async () => {
      // console.log('Requesting permission...');
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          // console.log('Notification permission granted.');
        }
      } catch (error) {
        console.error("Failed to request notification permission:", error);
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      if (pathname === "/") {
        setScreen("Sidebar");
      } else {
        setScreen("Chat");
      }
    } else {
      setScreen("FullScreen");
    }
  }, [pathname]);

  return (
    <main>
      {/* Auth */}
      {isLoggedIn === false && <>{children}</>}
      {/* Sidebar + Chat */}
      {isLoggedIn && (
        <div
          className={`flex overflow-hidden bg-main-bcg2 bg-no-repeat bg-cover bg-center`}
          style={{
            height: `${windowHeight}px`,
          }}
        >
          <div className="w-full h-full flex sm:hidden">
            <Transition
              nodeRef={nodeRefSidebar}
              in={screen === "Sidebar"}
              timeout={300}
              unmountOnExit
            >
              {(state) => (
                <div
                  ref={nodeRefSidebar}
                  className={`w-full ${
                    state === "exited" ? "hidden" : ""
                  } transform transition-transform ${
                    state === "entered"
                      ? "translate-x-0 scale-100"
                      : "-translate-x-full scale-0"
                  }`}
                >
                  <Sidebar />
                </div>
              )}
            </Transition>
            <Transition
              nodeRef={nodeRefChat}
              in={screen === "Chat"}
              timeout={300}
              unmountOnExit
            >
              {(state) => (
                <div
                  ref={nodeRefChat}
                  className={`w-full transform transition-transform 
                  ${state === "exited" ? "hidden" : ""}
                  ${
                    state === "entered"
                      ? "translate-x-0 scale-100"
                      : "translate-x-full scale-0"
                  }`}
                >
                  {children}
                </div>
              )}
            </Transition>
          </div>
          <div
            className="hidden sm:flex overflow-hidden"
            style={{
              height: `${windowHeight}px`,
            }}
          >
            <>
              <Sidebar />
              {screen === "FullScreen" && pathname === "/" && (
                <div className="relative h-full w-screen xl:flex xl:flex-col xl:items-center bg-transparent overflow-hidden">
                  <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-700 rounded-xl text-center text-white font-black">
                    {t("EmptyChatNofify")}
                  </h2>
                </div>
              )}
              {children}
            </>
          </div>
        </div>
      )}
    </main>
  );
};

export default ChatLayout;
