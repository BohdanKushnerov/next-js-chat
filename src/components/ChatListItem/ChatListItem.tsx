import { FC, memo, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import AvatarProfile from "@/components/AvatarProfile/AvatarProfile";
import useChatStore from "@/zustand/store";
import useChatInfo from "@/hooks/useChatInfo";
import useIsOnlineStatus from "@/hooks/useIsOnlineStatus";
import useLengthOfMyUnreadMsgs from "@/hooks/useLengthOfMyUnreadMsgs";
import useIsReadMyLastMessage from "@/hooks/useIsReadMyLastMessage";
import truncateLastMessageString from "@/utils/truncateLastMessageString";
import handleSelectChat from "@/utils/handleSelectChat";
import { IChatListItemProps } from "@/interfaces/IChatListItemProps";
import "@i18n";

const ChatListItem: FC<IChatListItemProps> = memo(
  ({ chatInfo, setChatUnreadMessages }) => {
    const { t } = useTranslation();

    const { uid } = useChatStore((state) => state.currentUser);
    const { chatUID } = useChatStore((state) => state.currentChatInfo);
    const updateCurrentChatInfo = useChatStore(
      (state) => state.updateCurrentChatInfo
    );

    const isOnline = useIsOnlineStatus(chatInfo[1].userUID); // следим за состоянием онлайн/офлайн
    const userInfo = useChatInfo(chatInfo[1].userUID); // обновляет инфо о текущем юзере в списке чата
    const lengthOfMyUnreadMsgs = useLengthOfMyUnreadMsgs(chatInfo); // следим за количеством моих непрочитаных сообщений в ChatItem
    const isReadMyLastMessage = useIsReadMyLastMessage(chatInfo); // прочитаное мое последнее сообщение или нет

    useEffect(() => {
      if (lengthOfMyUnreadMsgs) {
        console.log(lengthOfMyUnreadMsgs);
        console.log("обновление в ChatListItem");
        setChatUnreadMessages((prev) => {
          return {
            ...prev,
            [chatInfo[0]]: lengthOfMyUnreadMsgs,
          };
        });
      }
    }, [chatInfo, setChatUnreadMessages, lengthOfMyUnreadMsgs]);

    // console.log('screen --> ChatListItem');

    const handleManageSelectChat = () => {
      handleSelectChat(chatInfo, updateCurrentChatInfo);
    };

    return (
      <li
        className="block w-full border border-inputChar border-l-transparent border-r-transparent p-2 cursor-pointer"
        onClick={handleManageSelectChat}
      >
        <Link
          className={`flex items-center content-center gap-3 h-72px p-1 rounded-md transition-all duration-300 group ${
            chatUID === chatInfo[0] &&
            "bg-zinc-700 hover:bg-zinc-600 dark:bg-orange-900 hover:dark:bg-orange-800"
          } ${
            chatUID !== chatInfo[0] &&
            "hover:bg-zinc-400 hover:dark:bg-zinc-700"
          } `}
          href={chatInfo[0]}
        >
          <AvatarProfile
            photoURL={userInfo?.photoURL}
            displayName={userInfo?.displayName}
            size="50"
          />
          <div className="w-full">
            <p
              className={`font-bold ${
                chatUID === chatInfo[0]
                  ? "text-white"
                  : "text-zinc-900 dark:text-white"
              }`}
            >
              {userInfo?.displayName}
            </p>
            <p
              className={`${
                chatUID === chatInfo[0]
                  ? "text-white"
                  : "text-zinc-600 dark:text-textSecondary"
              }`}
            >
              {truncateLastMessageString(chatInfo[1].lastMessage, 15)}
            </p>
          </div>

          {lengthOfMyUnreadMsgs > 0 && (
            <p className="flex justify-center items-center p-1 px-3 border border-white text-white rounded-full shadow-mainShadow bg-gray-500">
              {lengthOfMyUnreadMsgs}
            </p>
          )}

          {chatInfo[1].senderUserID === uid &&
            (isReadMyLastMessage ? (
              <svg
                width={48}
                height={48}
                className={`${
                  chatUID === chatInfo[0]
                    ? "fill-white"
                    : "fill-zinc-800 dark:fill-white"
                }`}
              >
                <use
                  href={"/sprite.svg" + "#icon-double-check"}
                  className="shadow-avatarShadow"
                />
              </svg>
            ) : (
              <svg
                width={48}
                height={48}
                className={`${
                  chatUID === chatInfo[0]
                    ? "fill-white"
                    : "fill-zinc-800 dark:fill-white"
                } drop-shadow-2xl`}
              >
                <use
                  href={"/sprite.svg" + "#icon-single-check"}
                  className="drop-shadow-2xl"
                />
              </svg>
            ))}

          <div className={`${isOnline ? "text-green-600" : "text-red-700"}`}>
            {isOnline ? t("Online") : t("Offline")}
          </div>
        </Link>
      </li>
    );
  }
);

ChatListItem.displayName = "ChatListItem";

export default ChatListItem;
