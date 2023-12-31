import { FC, memo, useEffect, useState } from "react";

import ChatListItem from "@/components/ChatListItem/ChatListItem";
import useMyUserChatList from "@/hooks/useMyUserChatList";
import useCountChatUnreadMessages from "@/hooks/useCountChatUnreadMessages";
import useTitleVisibilityChange from "@/hooks/useBrowserTabTitleVisibilityChange";
import { IUnreadMessages } from "@/interfaces/IUnreadMessages";
import { ChatListItemType } from "@/types/ChatListItemType";

const ChatList: FC = memo(() => {
  const [chatUnreadMessages, setChatUnreadMessages] = useState<IUnreadMessages>(
    {}
  );

  // console.log("screen --> ChatList");

  const myUserChatList = useMyUserChatList(); // загрузка списка моих чатов

  const countChatUnreadMessages =
    useCountChatUnreadMessages(chatUnreadMessages); // дает количество непрочитаных сообщений вцелом
  useTitleVisibilityChange(countChatUnreadMessages); // смена тайтла вкладки когда вкладка неактивная и есть непрочитанные сообщения

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
