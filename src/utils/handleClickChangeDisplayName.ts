import { User, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from "@/myfirebase/config";

const handleClickChangeDisplayName = async (
  newDisplayName: string | null | undefined,
  userUID: string | null,
  updateCurrentUser: (user: User) => void
) => {
  if (auth.currentUser && userUID && newDisplayName) {
    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
          if (auth.currentUser) {
            updateCurrentUser(auth.currentUser);
          }
        })
        .catch((error) => {
          console.log("handleClickChangeDisplayName error", error);
        });

      // обновить имя в сторе
      await updateDoc(doc(db, "users", userUID), {
        displayName: newDisplayName,
      });
    } catch (error) {
      console.log("handleClickChangeDisplayName error", error);
    }
  }
};

export default handleClickChangeDisplayName;
