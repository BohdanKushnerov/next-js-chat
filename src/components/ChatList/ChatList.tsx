import { FC } from "react";

import ChatListItem from "@/components/ChatListItem/ChatListItem";
import useMyUserChatList from "@/hooks/useMyUserChatList";
import { ChatListItemType } from "@/types/ChatListItemType";

const ChatList: FC = () => {
  const myUserChatList = useMyUserChatList(); // загрузка списка моих чатов

  console.log("screen --> ChatList");

  return myUserChatList ? (
    <ul className="p-0 m-0">
      {myUserChatList.map((chatInfo: ChatListItemType) => (
        <ChatListItem key={chatInfo[0]} chatInfo={chatInfo} />
      ))}
    </ul>
  ) : null;
};

export default ChatList;
