import { FC, memo, useEffect, useState } from "react";

import ChatListItem from "@/components/ChatListItem/ChatListItem";
import useMyUserChatList from "@/hooks/useMyUserChatList";
import { ChatListItemType } from "@/types/ChatListItemType";
import Test from "./Test";

interface IUnreadMessages {
  [key: string]: number;
}

const ChatList: FC = memo(() => {
  const [chatUnreadMessages, setChatUnreadMessages] = useState<IUnreadMessages>(
    {}
  );

  const [countChatUnreadMessages, setCountChatUnreadMessages] =
    useState<number>(0);

  console.log("screen --> ChatList");

  const myUserChatList = useMyUserChatList(); // загрузка списка моих чатов

  useEffect(() => {
    const count = Object.values(chatUnreadMessages).reduce(
      (acc, count) => (acc += count),
      0
    );

    if (count === countChatUnreadMessages) {
      return;
    } else {
      setCountChatUnreadMessages(count);
    }
  }, [chatUnreadMessages, countChatUnreadMessages]);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     console.log("запуск handleVisibilityChange");
  //     if (document.hidden) {
  //       // setDocHidden(true);
  //       setDocHidden(false);
  //     } else {
  //       // setDocHidden(false);
  //       setDocHidden(true);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  return myUserChatList ? (
    <>
      <Test
        countChatUnreadMessages={countChatUnreadMessages}
      />
      <ul className="p-0 m-0">
        {myUserChatList.map((chatInfo: ChatListItemType) => (
          <ChatListItem
            key={chatInfo[0]}
            chatInfo={chatInfo}
            setChatUnreadMessages={setChatUnreadMessages}
          />
        ))}
      </ul>
    </>
  ) : null;
});

ChatList.displayName = "ChatList";

export default ChatList;
