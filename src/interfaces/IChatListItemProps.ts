import { ChatListItemType } from "@/types/ChatListItemType";
import { Dispatch, SetStateAction } from "react";

interface UnreadMessages {
  [key: string]: number;
}

export interface IChatListItemProps {
  chatInfo: ChatListItemType;
  setChatUnreadMessages: Dispatch<SetStateAction<UnreadMessages>>;
}
