import { useEffect, useRef, useState } from "react";

import changeFaviconBrowserTab from "@/utils/changeFaviconBrowserTab";
import { IUseBrowserTabTitleVisibilityChange } from "@/interfaces/hooks/IUseBrowserTabTitleVisibilityChange";
import { useTranslation } from "react-i18next";

const useBrowserTabTitleVisibilityChange: IUseBrowserTabTitleVisibilityChange =
  (countChatUnreadMessages) => {
    const [docHidden, setDocHidden] = useState(false);

    const changeTitleIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const { t } = useTranslation("translation", {
      keyPrefix: "ChatListUnreadMsg",
    });

    useEffect(() => {
      const handleVisibilityChange = () => {
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
      const startChangeChatTitle = () => {
        const chatOriginalTitle = "My Private Next.js Chat";

        if (docHidden) {
          // Вкладка стала неактивной
          if (countChatUnreadMessages) {
            const changeTitleInterval = () => {
              if (document.title === chatOriginalTitle) {
                document.title =
                  countChatUnreadMessages === 1
                    ? `(${countChatUnreadMessages}) ${t("UnreadMessage")}`
                    : `(${countChatUnreadMessages}) ${t("UnreadMessages")}`;

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

          changeFaviconBrowserTab("/favicon.ico");

          if (changeTitleIntervalRef.current) {
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
          clearInterval(changeTitleIntervalRef.current);
          changeTitleIntervalRef.current = null;
        }
      };
    }, [countChatUnreadMessages, docHidden]);
  };

export default useBrowserTabTitleVisibilityChange;
