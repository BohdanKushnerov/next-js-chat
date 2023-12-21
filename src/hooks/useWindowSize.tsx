import { useEffect, useState } from "react";

import { AppScreenType } from "@/types/AppScreenType";

interface IUseWindowSize {
  (pathname: string, setScreen: React.Dispatch<AppScreenType>): number;
}

const useWindowSize: IUseWindowSize = (pathname, setScreen) => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (!windowHeight) {
      setWindowHeight(window.innerHeight);
    }

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
  }, [pathname, setScreen, windowHeight]);

  return windowHeight;
};

export default useWindowSize;
