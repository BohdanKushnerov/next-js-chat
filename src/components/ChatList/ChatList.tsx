import { FC, useEffect, useRef, useState } from "react";

import ChatListItem from "@/components/ChatListItem/ChatListItem";
import useMyUserChatList from "@/hooks/useMyUserChatList";
import { ChatListItemType } from "@/types/ChatListItemType";

interface UnreadMessages {
  [key: string]: number;
}

const ChatList: FC = () => {
  const [chatUnreadMessages, setChatUnreadMessages] = useState<UnreadMessages>(
    {}
  );
  const [countChatUnreadMessages, setCountChatUnreadMessages] =
    useState<number>(0);
  const [docHidden, setDocHidden] = useState<boolean>(document.hidden);
  const changeTitleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  console.log("changeTitleIntervalRef.current", changeTitleIntervalRef.current);
  console.log("docHidden", docHidden);
  console.log("countChatUnreadMessages", countChatUnreadMessages);

  const myUserChatList = useMyUserChatList(); // загрузка списка моих чатов

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
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const countChatUnreadMessages = Object.values(chatUnreadMessages).reduce(
      (acc, count) => (acc += count),
      0
    );

    setCountChatUnreadMessages(countChatUnreadMessages);
  }, [chatUnreadMessages]);

  useEffect(() => {
    const changeChatTitle = () => {
      const chatOriginalTitle = "My Private Next.js Chat";

      console.log(
        "countChatUnreadMessages in useEffect",
        countChatUnreadMessages
      );

      if (docHidden) {
        // Вкладка стала неактивной
        if (countChatUnreadMessages) {
          const changeTitleInterval = () => {
            if (document.title === "My Private Next.js Chat") {
              document.title =
                countChatUnreadMessages === 1
                  ? `(${countChatUnreadMessages}) непрочитанное сообщение!`
                  : `(${countChatUnreadMessages}) непрочитанных сообщения!`;
            } else {
              document.title = "My Private Next.js Chat";
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
        // else {
        // document.title = chatOriginalTitle;
        // }
      } else {
        // Вкладка стала активной
        if (changeTitleIntervalRef.current) {
          console.log(
            "clearInterval1111111111111111111111=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
          );
          clearInterval(changeTitleIntervalRef.current);
          changeTitleIntervalRef.current = null;
        }

        document.title = chatOriginalTitle;
      }
    };

    changeChatTitle();

    // Очищаем слушатель при размонтировании компонента
    return () => {
      if (changeTitleIntervalRef.current && !docHidden) {
        console.log(
          "clearInterval222222222222222222=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
        );
        clearInterval(changeTitleIntervalRef.current);
        changeTitleIntervalRef.current = null;
      }
    };
  }, [countChatUnreadMessages, docHidden]);

  // console.log("screen --> ChatList");

  return myUserChatList ? (
    <ul className="p-0 m-0">
      {myUserChatList.map((chatInfo: ChatListItemType) => (
        <ChatListItem
          key={chatInfo[0]}
          chatInfo={chatInfo}
          setChatUnreadMessages={setChatUnreadMessages}
        />
      ))}
    </ul>
  ) : null;
};

export default ChatList;
