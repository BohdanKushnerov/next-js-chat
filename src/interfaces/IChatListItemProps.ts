import { ChatListItemType } from "@/types/ChatListItemType";
import { Dispatch, SetStateAction } from "react";

interface IUnreadMessages {
  [key: string]: number;
}

export interface IChatListItemProps {
  chatInfo: ChatListItemType;
  setChatUnreadMessages: Dispatch<SetStateAction<IUnreadMessages>>;
  // countChatUnreadMessages: number;
}
