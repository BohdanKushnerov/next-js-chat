import { useEffect, useRef } from "react";

import useChatStore from "@/zustand/store";
import { updateTypingIsTrue } from "@/utils/firestore/updateTypingIsTrue";
import { updateTypingIsFalse } from "@/utils/firestore/updateTypingIsFalse";
import { IUseTyping } from "@/interfaces/hooks/IUseTyping";

const useTyping: IUseTyping = (message) => {
  const myTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentUserUID = useChatStore((state) => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore((state) => state.currentChatInfo);

  // запуск таймаута при печатании
  useEffect(() => {
    if (chatUID && currentUserUID && message) {
      if (myTypingTimeoutRef.current === null) {
        // console.log('START TYPING');
        updateTypingIsTrue(chatUID, currentUserUID);
      }

      const newTypingTimeout = setTimeout(() => {
        // console.log('new');
        updateTypingIsFalse(chatUID, currentUserUID);
        myTypingTimeoutRef.current = null;
      }, 3000);

      if (myTypingTimeoutRef.current) {
        // console.log('clear', myTypingTimeoutRef.current);
        clearTimeout(myTypingTimeoutRef.current);
      }

      myTypingTimeoutRef.current = newTypingTimeout;
    }
  }, [chatUID, currentUserUID, message, myTypingTimeoutRef, userUID]);

  // очистка таймаута при смене чата
  useEffect(() => {
    return () => {
      if (myTypingTimeoutRef.current) {
        // console.log('cleanup', myTypingTimeoutRef.current);
        clearTimeout(myTypingTimeoutRef.current);
        myTypingTimeoutRef.current = null;
      }
    };
  }, [chatUID, myTypingTimeoutRef]);
};

export default useTyping;
