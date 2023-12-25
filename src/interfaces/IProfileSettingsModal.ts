import { RefObject } from "react";

export interface IProfileSettingsModal {
  photoProfileInputRef: RefObject<HTMLInputElement>;
  handleToggleProfilePhotoModal: () => void;
}
