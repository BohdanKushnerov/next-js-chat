import { useEffect, useState } from "react";

import { IUseWindowSize } from "@/interfaces/hooks/IUseWindowSize";

const useWindowSize: IUseWindowSize = (pathname, setScreen) => {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (!windowHeight) {
      setWindowHeight(window.innerHeight);
    }

    const handleResize = () => {
      setWindowHeight(window.innerHeight);

      if (window.innerWidth <= 768) {
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
