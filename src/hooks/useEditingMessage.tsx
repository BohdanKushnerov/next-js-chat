import { DocumentData } from "firebase/firestore";
import { useEffect } from "react";

interface IUseEditingMessage {
  (
    editingMessageInfo: {
      selectedMessage: DocumentData;
      isLastMessage: boolean;
    } | null,
    setMessage: (msg: string | ((prev: string) => string)) => void
  ): void;
}

const useEditingMessage: IUseEditingMessage = (
  editingMessageInfo,
  setMessage
) => {
  // юзеффект изменения месседжа
  useEffect(() => {
    if (editingMessageInfo) {
      const msg = editingMessageInfo.selectedMessage.data().message;
      setMessage(msg);
    }
  }, [editingMessageInfo, setMessage]);
};

export default useEditingMessage;
