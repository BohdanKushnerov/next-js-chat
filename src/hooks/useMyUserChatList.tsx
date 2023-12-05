import { useEffect, useState } from 'react'
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';

import { auth, db } from '@/myfirebase/config';
import useChatStore from '@/zustand/store';

const useMyUserChatList = () => {
  const [myUserChatList, setMyUserChatList] = useState<DocumentData | []>([]);

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  // const { uid } = useChatStore(state => state.currentUser);

  // console.log("myUserChatList", myUserChatList);
  // console.log("chatUID in useMyUserChatList", chatUID);
  // console.log("uid", uid);
  // юзефект для загрузки списка моих чатов
  useEffect(() => {
    // if (!auth?.currentUser?.uid || !uid) return;
    if (!auth?.currentUser?.uid) return;
    // ==========================================
    // if (auth.currentUser?.uid) {
      const unsubMyUserChats = onSnapshot(
        doc(db, "userChats", auth?.currentUser?.uid),
        (doc) => {
          const data = doc.data();
          if (data) {
            // после uodate last message из-за асинхронщины сначала date: null приходит, а потом аж date: _Timestamp поэтому чтобы не пригал список 2 раза делаем проверку на null
            // if (chatUID && !data?.[chatUID].date) {
            //   return;
            // }

            const entries = Object.entries(data).sort(
              (a, b) => b[1].date - a[1].date
            );

            // console.log("data", data);

            setMyUserChatList(entries);
          }
        }
      );
    // }

    return () => {
      unsubMyUserChats();
    };
  }, []);

  return myUserChatList;
};
export default useMyUserChatList;
