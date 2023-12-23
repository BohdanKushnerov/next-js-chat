"use client";

import MainChatLoader from "@/components/MainChatLoader/MainChatLoader";
import useOnAuthStateChanged from "@/hooks/useOnAuthStateChanged";
import { FC, Suspense, lazy } from "react";

const Auth = lazy(() => import("@/components/Auth/Auth"));

const AuthPage: FC = () => {
  useOnAuthStateChanged(); // isAuth
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
