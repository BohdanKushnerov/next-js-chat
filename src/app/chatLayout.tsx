"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Transition } from "react-transition-group";

import Sidebar from "@/components/Sidebar/Sidebar";
import useChatStore from "@/zustand/store";
import useIsRedirectToCurrentChat from "@/hooks/useIsRedirectToCurrentChat";
import useOnAuthStateChanged from "@/hooks/useOnAuthStateChanged";
import useIsOnlineMyStatus from "@/hooks/useIsOnlineMyStatus";
import useWindowSize from "@/hooks/useWindowSize";
import useRequestPermission from "@/hooks/useRequestPermission";
import useAppScreen from "@/hooks/useAppScreen";
import useDefaultTheme from "@/hooks/useDefaultTheme";
import useDefaultLanguage from "@/hooks/useDefaultLanguage";
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
  useAppScreen(pathname, setScreen);
  useOnAuthStateChanged(); // isAuth
  useIsRedirectToCurrentChat(currentUserUID); // isRedirectToCurrentChat
  useIsOnlineMyStatus(currentUserUID); // update online/offline status in realtime database
  useRequestPermission(); // requestPermission
  useDefaultTheme(); // check your current theme
  useDefaultLanguage(); // check your current language

  console.log("screen --> AppScreenType", screen);

  return (
    <div>
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
    </div>
  );
};

export default ChatLayout;
