import React, { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import FileInput from "@/components/Inputs/FileInput/FileInput";
import Emoji from "@/components/Emoji/Emoji";
import RecordingAudio from "../RecordingAudio/RecordingAudio";
import useChatStore from "@/zustand/store";
import useBeforeUnloadToStopTyping from "@/hooks/useBeforeUnloadToStopTyping";
import useTyping from "@/hooks/useTyping";
import useEditingMessage from "@/hooks/useEditingMessage";
import useClearMessagesOnChatChange from "@/hooks/useClearMessagesOnChatChange";
import handleUpdateEditMessage from "@/utils/handleUpdateEditMessage";
import handleSendMessage from "@/utils/handleSendMessage";
import "@i18n";

const ChatForm: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const message = useChatStore((state) => state.message);
  const setMessage = useChatStore((state) => state.setMessage);
  const currentUserUID = useChatStore((state) => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore((state) => state.currentChatInfo);
  const editingMessageInfo = useChatStore((state) => state.editingMessageInfo);
  const resetEditingMessage = useChatStore(
    (state) => state.resetEditingMessage
  );

  useEditingMessage(editingMessageInfo, setMessage); // юзеффект изменения месседжа
  useClearMessagesOnChatChange(chatUID, setMessage); //  чистит при смене юзера сообщение
  useBeforeUnloadToStopTyping(); // еффект beforeunload чтобы прекратить состояние печати
  useTyping(message); // запуск таймаута при печатании + сброс при смене чата

  // console.log("screen --> ChatForm");

  const handleCancelEditingMessage = () => {
    resetEditingMessage();
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleManageSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") {
      return;
    }

    if (editingMessageInfo) {
      handleUpdateEditMessage(
        editingMessageInfo,
        chatUID,
        message,
        currentUserUID,
        userUID,
        t
      );
      resetEditingMessage();
    } else {
      handleSendMessage(message, chatUID, currentUserUID, userUID);
      setMessage("");
    }
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 z-10 w-full h-24 flex flex-col items-center">
        <div className="relative flex flex-col justify-center w-full h-full shadow-whiteTopShadow xl:w-8/12">
          {editingMessageInfo && (
            <div className="relative flex items-center gap-3 ml-3 mr-16 px-10 rounded-3xl bg-mySeacrhBcg">
              <svg width={20} height={20}>
                <use href={"/sprite.svg" + "#icon-pencil"} fill="#FFFFFF" />
              </svg>
              <div>
                <p className="flex text-violet-500">Edit message</p>
                <p className="text-white">
                  {editingMessageInfo.selectedMessage.data().message ||
                    t("ChatForm.EmptyMessage")}
                </p>
              </div>
              <button onClick={handleCancelEditingMessage}>
                <svg
                  className="absolute top-3.5 right-4"
                  width={20}
                  height={20}
                >
                  <use
                    href={"/sprite.svg" + "#icon-cross-close"}
                    fill="#FFFFFF"
                  />
                </svg>
              </button>
            </div>
          )}
          <form
            className="flex justify-center items-center gap-2 px-3"
            onSubmit={handleManageSendMessage}
          >
            <input
              autoFocus={true}
              className="w-full h-10 py-1 pl-10 pr-14 rounded-3xl bg-zinc-300 dark:bg-mySeacrhBcg text-black dark:text-white placeholder:text-zinc-900 placeholder:dark:text-zinc-400 border-2 border-transparent outline-none focus:border-solid focus:dark:border-cyan-500"
              type="text"
              placeholder={t("ChatForm.ChatInputPlaceholder")}
              ref={inputRef}
              value={message}
              onChange={handleChangeMessage}
            />
            {message ? (
              <button
                className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
                type="submit"
              >
                <svg
                  width={24}
                  height={24}
                  className="fill-zinc-200 dark:fill-zinc-400"
                >
                  <use href={"/sprite.svg" + "#icon-send-message"} />
                </svg>
              </button>
            ) : (
              <RecordingAudio />
            )}
          </form>
          <FileInput />
          <Emoji />
        </div>
      </div>
    </>
  );
};

export default ChatForm;
