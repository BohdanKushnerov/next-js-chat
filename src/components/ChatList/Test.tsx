import { FC, memo, useEffect, useRef, useState } from "react";

interface ITestProps {
  countChatUnreadMessages: number;
}

const Test: FC<ITestProps> = memo(({ countChatUnreadMessages }) => {
  console.log("Test=================================>>>>>>>>>>>>>>>>");
  console.log("countChatUnreadMessages", countChatUnreadMessages);

  const changeTitleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const useEffectTriggered = useRef(false); // Додаємо useRef для слідкування викликів useEffect

  const changeFavicon = (newFaviconPath: string) => {
    const link =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");

    const linkElement = link as HTMLLinkElement;
    linkElement.type = "image/ico";
    linkElement.rel = "icon";
    // link.as = "style";
    linkElement.href = newFaviconPath;

    document.head.appendChild(link);
  };

  useEffect(() => {
    console.log("сработал useEffect");

    console.log(countChatUnreadMessages, document.hidden === false);

    // if (countChatUnreadMessages && document.hidden === false) {
    const changeChatTitle = () => {
      console.log("вызов changeChatTitle");
      console.log(
        "changeTitleIntervalRef.current",
        changeTitleIntervalRef.current
      );

      const chatOriginalTitle = "My Private Next.js Chat";

      if (document.hidden === false) {
        // Вкладка стала неактивной
        if (countChatUnreadMessages) {
          const changeTitleInterval = () => {
            useEffectTriggered.current = true;

            console.log("interval go");
            console.log(
              "changeTitleIntervalRef.current",
              changeTitleIntervalRef.current
            );

            if (document.title === chatOriginalTitle) {
              document.title =
                countChatUnreadMessages === 1
                // true
                  ? `(${countChatUnreadMessages}) непрочитанное сообщение!`
                  : `(${countChatUnreadMessages}) непрочитанных сообщения!`;

              changeFavicon("/faviconMessage.ico");
            } else {
              document.title = chatOriginalTitle;

              changeFavicon("/favicon.ico");
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
        changeFavicon("/favicon.ico");

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

    console.log("useEffectTriggered.current", useEffectTriggered.current);

    useEffectTriggered.current === false && changeChatTitle();

    // Очищаем слушатель при размонтировании компонента

    return () => {
      if (changeTitleIntervalRef.current) {
        console.log(
          "clearInterval222222222222222222=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        clearInterval(changeTitleIntervalRef.current);
        changeTitleIntervalRef.current = null;
        // useEffectTriggered.current = false;
      }
    };
  }, [countChatUnreadMessages]);

  return null;
});

Test.displayName = "Test";

export default Test;
