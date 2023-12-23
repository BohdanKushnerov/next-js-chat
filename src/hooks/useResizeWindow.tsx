import { useEffect, useState } from "react";

const useResizeWindow = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  // resize window
  useEffect(() => {
    if (!isMobileScreen) {
      setIsMobileScreen(window.innerWidth <= 640);
    }

    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileScreen]);

  return isMobileScreen;
};

export default useResizeWindow;
