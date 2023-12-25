export interface IFileInputModal {
  hiddenFileInput: React.RefObject<HTMLInputElement>;
  setIsModalAddFileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggleModal: () => void;
}