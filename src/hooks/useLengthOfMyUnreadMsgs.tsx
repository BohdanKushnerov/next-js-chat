import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/myfirebase/config";
import useChatStore from "@/zustand/store";
import { ChatListItemType } from "@/types/ChatListItemType";

const useLengthOfMyUnreadMsgs = (chatInfo: ChatListItemType) => {
  const [lengthOfMyUnreadMsgs, setLengthOfMyUnreadMsgs] = useState<number>(0);

  const { uid } = useChatStore((state) => state.currentUser);

  useEffect(() => {
    const queryParams = query(
      collection(db, `chats/${chatInfo[0]}/messages`),
      where("isRead", "==", false),
      where("senderUserID", "!=", uid)
    );
    const unsubMyUnreadMsgs = onSnapshot(queryParams, (querySnapshot) => {
      if (querySnapshot.docs) {
        setLengthOfMyUnreadMsgs(querySnapshot.docs.length);

        querySnapshot.docs.forEach((msg) => {
          console.log("msg.data", msg.data());

          if (msg.data().isShowNotification) {
            new Notification("new Message", {
              body: msg.data().message,
            });

            // Создаем аудиоэлемент
            const audioElement = new Audio("/tap-notification.mp3");

            // Воспроизводим звук
            audioElement.play();
          }

          // console.log("msg.data().id", msg);

          updateDoc(
            doc(db, "chats", chatInfo[0], "messages", `${msg.id}`),
            {
              ["isShowNotification"]: false,
            }
          );
        });

        // new Notification('new Message', {
        //   body: change.doc.data().message,
        // });
      }
    });
    return () => {
      unsubMyUnreadMsgs();
    };
  }, [chatInfo, uid]);

  // where("isShowNotification", "==", true),

  // useEffect(() => {
  //   const queryParams = query(
  //     collection(db, `chats/${chatInfo[0]}/messages`),
  //     where("isRead", "==", false),
  //     where("senderUserID", "!=", uid)
  //   );
  //   const unsubIsShowNotification = onSnapshot(queryParams, (querySnapshot) => {
  //     if (querySnapshot.docs) {
  //       // console.log(querySnapshot.docs);

  //       querySnapshot.docs.forEach((msg) => {
  //         console.log("msg.data", msg.data());

  //         // Создаем аудиоэлемент
  //         const audioElement = new Audio("/tap-notification.mp3");

  //         // Воспроизводим звук
  //         audioElement.play();
  //       });
  //       // setLengthOfMyUnreadMsgs(querySnapshot.docs.length);
  //     }
  //   });
  //   return () => {
  //     unsubIsShowNotification();
  //   };
  // }, [chatInfo, uid]);

  return lengthOfMyUnreadMsgs;
};

export default useLengthOfMyUnreadMsgs;
