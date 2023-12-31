import { FC } from "react";
import { useRouter } from "next/navigation";

import ChatHeaderOponentInfo from "../ChatHeaderOponentInfo/ChatHeaderOponentInfo";
import ButtonArrow from "../Buttons/ButtonArrow/ButtonArrow";
import useChatStore from "@/zustand/store";
import useResizeWindow from "@/hooks/useResizeWindow";
import { IChatHeaderProps } from "@/interfaces/IChatHeaderProps";

const ChatHeader: FC<IChatHeaderProps> = ({ setIsShowSearchMessages }) => {
  const router = useRouter();

  const resetCurrentChatInfo = useChatStore(
    (state) => state.resetCurrentChatInfo
  );

  const isMobileScreen = useResizeWindow();

  // console.log("screen --> ChatHeader");

  const handleClickShowSearchMessages = () => {
    setIsShowSearchMessages(true);
  };

  const handleClickNavigateToSidebarScreen = () => {
    resetCurrentChatInfo();
    router.push("/");
  };

  return (
    <div className="absolute top-0 left-0 z-10 flex gap-4 items-center w-full h-14 px-6 bg-gray-200 dark:bg-myBlackBcg shadow-bottomShadow">
      {isMobileScreen && (
        <ButtonArrow
          handleClickButtonArrow={handleClickNavigateToSidebarScreen}
        />
      )}

      <ChatHeaderOponentInfo />

      <button
        className="ml-auto flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 rounded-full"
        onClick={handleClickShowSearchMessages}
        aria-label="Search messages"
      >
        <svg
          className="fill-zinc-600 dark:fill-zinc-400"
          width={24}
          height={24}
        >
          <use href={"/sprite.svg" + "#icon-search"} />
        </svg>
      </button>
    </div>
  );
};

export default ChatHeader;
