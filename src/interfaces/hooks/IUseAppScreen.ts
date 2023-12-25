import { AppScreenType } from "@/types/AppScreenType";

export interface IUseAppScreen {
  (
    pathname: string,
    setScreen: React.Dispatch<React.SetStateAction<AppScreenType>>
  ): void;
}
