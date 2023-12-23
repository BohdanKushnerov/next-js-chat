import { FC } from "react";
import Avatar from "react-avatar";
import Image from "next/image";

import { IAvatarProfileProps } from "@/interfaces/IAvatarProfileProps";

const AvatarProfile: FC<IAvatarProfileProps> = ({
  photoURL,
  displayName,
  size,
}) => {
  return photoURL && displayName ? (
    <Image
      className="rounded-full shadow-secondaryShadow transition-all duration-150 group-hover:scale-105"
      width={Number(size)}
      height={Number(size)}
      src={photoURL}
      alt={displayName}
    />
  ) : (
    <Avatar
      className="rounded-full shadow-secondaryShadow transition-all duration-150 group-hover:scale-105"
      name={`${displayName}`}
      size={size}
      textSizeRatio={0}
    />
  );
};

export default AvatarProfile;
