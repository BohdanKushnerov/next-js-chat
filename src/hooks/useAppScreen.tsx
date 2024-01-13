import { useEffect } from "react";

import { IUseAppScreen } from "@/interfaces/hooks/IUseAppScreen";

const useAppScreen: IUseAppScreen = (pathname, setScreen) => {
  useEffect(() => {
    if (window.innerWidth <= 768) {
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
