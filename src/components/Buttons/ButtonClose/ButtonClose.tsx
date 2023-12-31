import { FC } from "react";

import { IButtonCloseProps } from "@/interfaces/IButtonCloseProps";

const ButtonClose: FC<IButtonCloseProps> = ({ handleClickButtonClose }) => {
  return (
    <>
      <button
        className="absolute top-2 left-2 w-8 h-8 flex justify-center items-center border-2 border-zinc-600 dark:border-white rounded-full transition-all duration-300 hover:shadow-mainShadow cursor-pointer"
        onClick={handleClickButtonClose}
      >
        <svg width={16} height={16} className="fill-zinc-600 dark:fill-white">
          <use href={"/sprite.svg" + "#icon-cross-close"} />
        </svg>
      </button>
    </>
  );
};

export default ButtonClose;
