import { FC, useRef } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Transition } from "react-transition-group";

import useChatStore from "@/zustand/store";
import useStartTransition from "@/hooks/useStartTransition";

const EmojiPickerWindow: FC = () => {
  const nodeRefEmoji = useRef(null);

  const setMessage = useChatStore((state) => state.setMessage);

  const startTransition = useStartTransition();

  const handleSelectEmoji = (emojiData: EmojiClickData) => {
    setMessage((prevState: string) => prevState + emojiData.emoji);
  };

  return (
    <Transition
      nodeRef={nodeRefEmoji}
      in={startTransition}
      timeout={100}
      unmountOnExit
    >
      {(state) => (
        <div
          ref={nodeRefEmoji}
          className={`absolute bottom-12 left-0
            transform origin-bottom-left transition-transform 
            ${state === "exited" ? "hidden" : ""} 
                ${
                  state === "entered"
                    ? "scale-100 opacity-100"
                    : "translate-x-4 translate-y-10 scale-0 opacity-50"
                }`}
        >
          <EmojiPicker
            height={400}
            onEmojiClick={handleSelectEmoji}
            searchDisabled
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}
    </Transition>
  );
};

export default EmojiPickerWindow;
