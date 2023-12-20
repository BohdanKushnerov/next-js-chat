import { useEffect } from "react";

import useChatStore from "@/zustand/store";
import { updateTypingIsFalse } from "@/utils/firestore/updateTypingIsFalse";

const useBeforeUnloadToStopTyping = () => {
  const currentUserUID = useChatStore((state) => state.currentUser.uid);
  const { chatUID } = useChatStore((state) => state.currentChatInfo);
  // еффект beforeunload чтобы прекратить состояние печати
  useEffect(() => {
    const handleWindowBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";

      if (chatUID && currentUserUID) {
        await updateTypingIsFalse(chatUID, currentUserUID);
      }
    };

    window.addEventListener("beforeunload", handleWindowBeforeUnload);

    return () => {
      const handleWindowUnmountBeforeUnload = async () => {
        if (chatUID && currentUserUID) {
          await updateTypingIsFalse(chatUID, currentUserUID);
        }
        window.removeEventListener("beforeunload", handleWindowBeforeUnload);
      };

      handleWindowUnmountBeforeUnload();
    };
  }, [chatUID, currentUserUID]);
};

export default useBeforeUnloadToStopTyping;
