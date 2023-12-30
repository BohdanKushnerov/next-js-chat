import { useEffect, useRef, useState } from "react";

import changeFaviconBrowserTab from "@/utils/changeFaviconBrowserTab";
import { IUseBrowserTabTitleVisibilityChange } from "@/interfaces/hooks/IUseBrowserTabTitleVisibilityChange";

const useBrowserTabTitleVisibilityChange: IUseBrowserTabTitleVisibilityChange =
  (countChatUnreadMessages) => {
    console.log("Test=================================>>>>>>>>>>>>>>>>");
    const [docHidden, setDocHidden] = useState(false);

    const changeTitleIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const handleVisibilityChange = () => {
        console.log("запуск handleVisibilityChange");
        if (document.hidden) {
          setDocHidden(true);
        } else {
          setDocHidden(false);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }, []);

    useEffect(() => {
      console.log("сработал useEffect");

      console.log("countChatUnreadMessages", countChatUnreadMessages);

      const startChangeChatTitle = () => {
        console.log("вызов startChangeChatTitle");

        const chatOriginalTitle = "My Private Next.js Chat";

        if (docHidden) {
          // Вкладка стала неактивной
          if (countChatUnreadMessages) {
            const changeTitleInterval = () => {
              console.log("interval go");
              console.log(
                "changeTitleIntervalRef.current",
                changeTitleIntervalRef.current
              );

              if (document.title === chatOriginalTitle) {
                document.title =
                  countChatUnreadMessages === 1
                    ? `(${countChatUnreadMessages}) непрочитанное сообщение!`
                    : `(${countChatUnreadMessages}) непрочитанных сообщения!`;

                changeFaviconBrowserTab("/faviconMessage.ico");
              } else {
                document.title = chatOriginalTitle;

                changeFaviconBrowserTab("/favicon.ico");
              }
            };

            if (changeTitleIntervalRef.current) {
              clearInterval(changeTitleIntervalRef.current);
              changeTitleIntervalRef.current = null;
            }

            changeTitleIntervalRef.current = setInterval(
              changeTitleInterval,
              2000
            );
          }
        } else {
          // Вкладка стала активной
          console.log("вкладка стала активной");

          changeFaviconBrowserTab("/favicon.ico");

          if (changeTitleIntervalRef.current) {
            console.log(
              "clearInterval1111111111111111111111=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
            );
            clearInterval(changeTitleIntervalRef.current);
            changeTitleIntervalRef.current = null;
          }

          document.title = chatOriginalTitle;
        }

        return;
      };

      startChangeChatTitle();

      return () => {
        if (changeTitleIntervalRef.current) {
          console.log(
            "clearInterval222222222222222222=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
          );
          clearInterval(changeTitleIntervalRef.current);
          changeTitleIntervalRef.current = null;
        }
      };
    }, [countChatUnreadMessages, docHidden]);
  };

export default useBrowserTabTitleVisibilityChange;
