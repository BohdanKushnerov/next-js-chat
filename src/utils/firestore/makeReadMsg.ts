import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/myfirebase/config";

export const makeReadMsg = async (chatUID: string, id: string) => {
  if (chatUID === null) {
    return;
  }

  updateDoc(doc(db, "chats", chatUID, "messages", `${id}`), {
    ["isRead"]: true,
  });
};
