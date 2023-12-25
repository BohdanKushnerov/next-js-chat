import { AppScreenType } from "@/types/AppScreenType";

export interface IUseWindowSize {
  (pathname: string, setScreen: React.Dispatch<AppScreenType>): number;
}
