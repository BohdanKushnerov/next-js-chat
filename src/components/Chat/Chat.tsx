import { FC, useState } from "react";

import MessageList from "@/components/MessageList/MessageList";
import SearchMessages from "@/components/SearchMessages/SearchMessages";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatForm from "../ChatForm/ChatForm";
import useChatStore from "@/zustand/store";

const Chat: FC = () => {
  const [isShowSearchMessages, setIsShowSearchMessages] = useState(false);

  const { chatUID } = useChatStore((state) => state.currentChatInfo);

  console.log("screen --> Chat");

  return (
    <>
    {/* <h2 className="text-white">qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</h2> */}
      <div className="relative h-full w-screen xl:flex xl:flex-col xl:items-center bg-transparent overflow-hidden">
        {chatUID ? (
          <>
            <ChatHeader setIsShowSearchMessages={setIsShowSearchMessages} />

            <MessageList />

            <ChatForm />
          </>
        ) : (
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-700 rounded-xl text-center text-white font-black">
            Select or search user who you would to start messaging
          </h2>
        )}
      </div>
      {isShowSearchMessages && (
        <div className="absolute top-0 right-0 z-10 md:static md:z-0 w-2/3 md:w-2/4 p-2 h-full border-l border-zinc-800 bg-gray-200 dark:bg-myBlackBcg">
          <SearchMessages setIsShowSearchMessages={setIsShowSearchMessages} />
        </div>
      )}
    </>
  );
};

export default Chat;
