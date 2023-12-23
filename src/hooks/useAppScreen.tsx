import React, { useEffect } from "react";

import { AppScreenType } from "@/types/AppScreenType";

interface IUseAppScreen {
  (
    pathname: string,
    setScreen: React.Dispatch<React.SetStateAction<AppScreenType>>
  ): void;
}

const useAppScreen: IUseAppScreen = (pathname, setScreen) => {
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
  }, [pathname, setScreen]);
};

export default useAppScreen;
