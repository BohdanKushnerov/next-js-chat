import { useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';

import useChatStore from '@/zustand/store';
import { makeReadMsg } from '@/utils/firestore/makeReadMsg';

const useMakeReadMsg = (msg: DocumentData) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useEffect(() => {
    if (
      msg.data().senderUserID !== currentUserUID &&
      !msg.data().isRead &&
      chatUID
    ) {
      makeReadMsg(chatUID, msg.id);
    }
  }, [chatUID, currentUserUID, msg]);
};

export default useMakeReadMsg;
