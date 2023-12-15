"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import { auth, database, db } from "@/myfirebase/config";
import { AppScreenType } from "@/types/AppScreenType";
import { ChatListItemType } from "@/types/ChatListItemType";
import { CurrentChatInfo } from "@/types/CurrentChatInfo";
import handleSelectChat from "@/utils/handleSelectChat";
import useChatStore from "@/zustand/store";
import { onDisconnect, ref, set } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const [windowHeight, setWindowHeight] = useState(() => window.innerHeight);
  const [screen, setScreen] = useState<AppScreenType>(() => {
    if (window.innerWidth <= 640) {
      return window.location.pathname === "/react-web-messenger"
        ? "Sidebar"
        : "Chat";
    } else {
      return "FullScreen";
    }
  });

  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentUserUID = useChatStore((state) => state.currentUser.uid);
  const updateCurrentChatInfo = useChatStore(
    (state) => state.updateCurrentChatInfo
  );
  const isLoggedIn = useChatStore((state) => state.isLoggedIn);
  const updateCurrentUser = useChatStore((state) => state.updateCurrentUser);

  console.log("screen --> =====Layout-Layout=====");
  console.log("screen ============== AppScreenType", screen);

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

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        updateCurrentUser(authUser);
      } else {
        updateCurrentUser(null);
        router.push("/auth");
      }
    });

    return () => unsub();
  }, [router, updateCurrentUser]);

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

  // resize window
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);

      if (window.innerWidth <= 640) {
        setScreen(pathname === "/" ? "Sidebar" : "Chat");
      } else {
        setScreen("FullScreen");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

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

  // isRedirectToCurrentChat
  useEffect(() => {
    async function isRedirectToCurrentChat(
      currentUserUID: string | null,
      handleSelectChat: (
        chat: ChatListItemType,
        updateCurrentChatInfo: (chat: ChatListItemType) => void
      ) => void,
      updateCurrentChatInfo: (chat: CurrentChatInfo) => void
    ) {
      const combinedUsersChatUID = localStorage.getItem("currentChatId");

      if (combinedUsersChatUID && currentUserUID) {
        const res = await getDoc(doc(db, "userChats", currentUserUID));

        const chatItem: ChatListItemType = [
          combinedUsersChatUID,
          {
            lastMessage: res.data()?.[combinedUsersChatUID].lastMessage,
            senderUserID: res.data()?.[combinedUsersChatUID].senderUserID,
            userUID: res.data()?.[combinedUsersChatUID].userUID,
          },
        ];

        handleSelectChat(chatItem, updateCurrentChatInfo);
        // navigate(combinedUsersChatUID);
        router.push(combinedUsersChatUID);
      }
    }

    isRedirectToCurrentChat(
      currentUserUID,
      handleSelectChat,
      updateCurrentChatInfo
    );
  }, [currentUserUID, router, updateCurrentChatInfo]);

  // update online/offline status in realtime database
  useEffect(() => {
    if (currentUserUID) {
      const dbRef = ref(database, "status/" + currentUserUID);

      // Устанавливаем онлайн-статус при входе
      set(dbRef, true);

      // Устанавливаем обработчик отключения
      const disconnectRef = onDisconnect(dbRef);

      // Устанавливаем офлайн-статус при отключении
      disconnectRef.set(false);

      return () => {
        // Очищаем обработчик отключения при размонтировании компонента
        disconnectRef.cancel();
        // Устанавливаем офлайн-статус при размонтировании компонента
        set(dbRef, false);
      };
    }
  }, [currentUserUID]);

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
                    Select or search user who you would to start messaging
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
