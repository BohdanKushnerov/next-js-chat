import { FC } from "react";

import { ISearch } from "@/interfaces/ISearch";
// import sprite from '@assets/sprite.svg';
// import sprite from '/sprite.svg';

const Search: FC<ISearch> = ({ value, handleChange, placeholderText }) => {
  return (
    <div className="relative w-full">
      <input
        autoFocus={true}
        className="py-2 px-10 h-10 w-full rounded-3xl bg-zinc-500 dark:bg-mySeacrhBcg text-white outline-none border-2 border-transparent focus:border-solid focus:border-cyan-500"
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={handleChange}
      />

      <svg
        className="absolute top-2 left-2 fill-zinc-600 dark:fill-zinc-400"
        width={24}
        height={24}
      >
        <use href={"/sprite.svg" + "#icon-search"} />
      </svg>
    </div>
  );
};

export default Search;
