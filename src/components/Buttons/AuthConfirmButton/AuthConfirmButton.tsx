import { FC } from "react";

import ButtonLoader from "../ButtonLoader/ButtonLoader";
import { IAuthConfirmButton } from "@/interfaces/IAuthConfirmButton";

const AuthConfirmButton: FC<IAuthConfirmButton> = ({ isLoading }) => {
  return (
    <button
      className="w-full p-2 rounded-md bg-myblue text-white font-bold disabled:text-zinc-700"
      id="sign-in-button"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <ButtonLoader /> : "Continue"}
    </button>
  );
};

export default AuthConfirmButton;
