import { DocumentData, doc, updateDoc } from 'firebase/firestore';

import { db } from '@/myfirebase/config';

export const makeReadMsg = async (chatUID: string, msg: DocumentData) => {
  if (chatUID === null) {
    return;
  }

  updateDoc(doc(db, 'chats', chatUID, 'messages', `${msg}`), {
    ['isRead']: true,
  });
};
