import { FC } from "react";
import { DocumentData } from "firebase/firestore";

import AvatarProfile from "@/components/AvatarProfile/AvatarProfile";
import useChatStore from "@/zustand/store";
import useSearchUsers from "@/hooks/useSearchUsers";
import handleCreateChat from "@/utils/handleCreateChat";
import { useRouter } from "next/navigation";

const SearchChatList: FC = () => {
  const router = useRouter();

  const updateSearchValue = useChatStore((state) => state.updateSearchValue);
  const currentUser = useChatStore((state) => state.currentUser);
  const updateCurrentChatInfo = useChatStore(
    (state) => state.updateCurrentChatInfo
  );

  const { searchChatList, setSearchChatList } = useSearchUsers(); // поиск контактов(юзеров) в поисковой строке

  const handleManageCreateChat = (docData: DocumentData) => {
    handleCreateChat(docData, updateCurrentChatInfo, router);

    setSearchChatList(null);
    updateSearchValue("");
  };

  return searchChatList ? (
      <ul>
        {/* тут список юзеров в поиске */}
        {searchChatList.docs.map((doc) => {
          // console.log('chatList search doc', doc.data());
          // фильтруем себя
          if (doc.data().uid === currentUser.uid) return null;

          const docData: DocumentData = doc.data();

          return (
            <li
              className="flex items-center content-center gap-3 h-72px p-2 cursor-pointer"
              key={doc.id}
              onClick={() => handleManageCreateChat(docData)}
            >
              <AvatarProfile
                photoURL={doc.data()?.photoURL}
                displayName={doc.data()?.displayName}
                size="50"
              />
              <p className="text-zinc-600 dark:text-textSecondary">
                {doc.data().displayName}
              </p>
            </li>
          );
        })}
      </ul>
  ) : null;
};

export default SearchChatList;
