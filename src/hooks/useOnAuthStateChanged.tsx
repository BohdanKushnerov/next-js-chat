import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/myfirebase/config";
import useChatStore from "@/zustand/store";

const useOnAuthStateChanged = () => {
  const router = useRouter();

  const updateCurrentUser = useChatStore((state) => state.updateCurrentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser && authUser.displayName) {
        console.log("authUser", authUser);
        updateCurrentUser(authUser);
      } else {
        updateCurrentUser(null);
        router.push("/auth");
      }
    });

    return () => unsub();
  }, [router, updateCurrentUser]);
};

export default useOnAuthStateChanged;
