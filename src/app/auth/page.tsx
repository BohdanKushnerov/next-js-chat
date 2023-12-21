"use clients";

import MainChatLoader from "@/components/MainChatLoader/MainChatLoader";
import { FC, Suspense, lazy } from "react";

const Auth = lazy(() => import("@/components/Auth/Auth"));

const AuthPage: FC = () => {
  return (
    <>
      <Suspense>
        <Auth />
      </Suspense>
      <MainChatLoader />
    </>
  );
};

export default AuthPage;
