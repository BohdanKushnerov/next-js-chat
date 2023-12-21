import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { db } from "@/myfirebase/config";
import useChatStore from "@/zustand/store";
import handleSelectChat from "@/utils/handleSelectChat";
import { ChatListItemType } from "@/types/ChatListItemType";
import { CurrentChatInfo } from "@/types/CurrentChatInfo";

interface IUseIsRedirectToCurrentChat {
  (currentUserUID: string | null): void;
}

const useIsRedirectToCurrentChat: IUseIsRedirectToCurrentChat = (
  currentUserUID
) => {
  const router = useRouter();

  const updateCurrentChatInfo = useChatStore(
    (state) => state.updateCurrentChatInfo
  );
  // isRedirectToCurrentChat
  useEffect(() => {
    async function isRedirectToCurrentChat(
      currentUserUID: string | null,
      handleSelectChat: (
        chat: ChatListItemType,
        updateCurrentChatInfo: (chat: ChatListItemType) => void
      ) => void,
      updateCurrentChatInfo: (chat: CurrentChatInfo) => void
    ) {
      const combinedUsersChatUID = localStorage.getItem("currentChatId");

      if (combinedUsersChatUID && currentUserUID) {
        const res = await getDoc(doc(db, "userChats", currentUserUID));

        const chatItem: ChatListItemType = [
          combinedUsersChatUID,
          {
            lastMessage: res.data()?.[combinedUsersChatUID].lastMessage,
            senderUserID: res.data()?.[combinedUsersChatUID].senderUserID,
            userUID: res.data()?.[combinedUsersChatUID].userUID,
          },
        ];

        handleSelectChat(chatItem, updateCurrentChatInfo);
        router.push(combinedUsersChatUID);
      }
    }

    isRedirectToCurrentChat(
      currentUserUID,
      handleSelectChat,
      updateCurrentChatInfo
    );
  }, [currentUserUID, router, updateCurrentChatInfo]);
};

export default useIsRedirectToCurrentChat;
