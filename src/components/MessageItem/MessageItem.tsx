import { FC, lazy } from "react";

const MessageAttachedFilesAndImages = lazy(
  () => import("../MessageAttachedFilesAndImages/MessageAttachedFilesAndImages")
);
import useChatStore from "@/zustand/store";
import useMakeReadMsg from "@/hooks/useMakeReadMsg";
import formatTime from "@/utils/formatTime";
import { IMessageItemProps } from "@/interfaces/IMessageItemProps";

const MessageItem: FC<IMessageItemProps> = ({ msg }) => {
  const currentUserUID = useChatStore((state) => state.currentUser.uid);

  useMakeReadMsg(msg); // делает при монтировании чата прочитаные мои сообщения

  const myUID = currentUserUID === msg.data().senderUserID;

  return (
    <div
      className={`relative flex w-full items-end xl:w-8/12 ${
        myUID ? "justify-end" : "justify-start"
      }`}
    >
      <div
        // className={`flex flex-col py-2 px-4 rounded-xl ${
        className={`flex flex-col py-2 px-4 rounded-xl w-auto ${
          msg.data().file?.length === 1 ? "max-w-md" : "max-w-sm"
        }  ${
          myUID
            ? "bg-emerald-400 dark:bg-cyan-600 rounded-br-none"
            : "bg-zinc-100 dark:bg-green-600 rounded-bl-none"
        } shadow-secondaryShadow`}
      >
        {/* message files */}
        {msg.data().file?.length && <MessageAttachedFilesAndImages msg={msg} />}
        {/* message text */}
        <p className="w-full break-all text-black dark:text-white">
          {msg.data().message}
        </p>
        {/* date + read/unread */}
        <div className="w-full flex justify-end items-center gap-2">
          <p className="text-zinc-600 dark:text-white">
            {msg.data().date && formatTime(msg.data().date.toDate().toString())}
          </p>
          {/* read/unread */}
          <p>
            {msg.data().isRead ? (
              <svg
                width={24}
                height={24}
                className="fill-zinc-800 dark:fill-white"
              >
                <use href={"/sprite.svg" + "#icon-double-check"} />
              </svg>
            ) : (
              <svg
                width={24}
                height={24}
                className="fill-zinc-800 dark:fill-white"
              >
                <use href={"/sprite.svg" + "#icon-single-check"} />
              </svg>
            )}
          </p>
        </div>
      </div>
      {/* triangle */}
      <svg
        className={`absolute ${
          myUID
            ? "-right-3.5 fill-emerald-400 dark:fill-cyan-600"
            : "-left-1.5 fill-zinc-100 dark:fill-green-600"
        }`}
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        {myUID ? (
          <path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"></path>
        ) : (
          <path
            d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
            filter="url(#messageAppendix)"
          ></path>
        )}
      </svg>
    </div>
  );
};

export default MessageItem;
