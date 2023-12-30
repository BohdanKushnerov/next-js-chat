import { FC, memo, useEffect, useState } from "react";

import ChatListItem from "@/components/ChatListItem/ChatListItem";
import useMyUserChatList from "@/hooks/useMyUserChatList";
import useTitleVisibilityChange from "@/hooks/useBrowserTabTitleVisibilityChange";
import { ChatListItemType } from "@/types/ChatListItemType";

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

  useTitleVisibilityChange(countChatUnreadMessages); // смена тайтла вкладки когда вкладка неактивная и есть непрочитанные сообщения

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

  return myUserChatList ? (
    <>
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
