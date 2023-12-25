import { FC } from "react";
import Image from "next/image";

import MessageFileItem from "@/components/MessageFileItem/MessageFileItem";
import rgbDataURLForImageBlur from "@/utils/rgbDataURLForImageBlur";
import { IMessageAttachedFilesAndImages } from "@/interfaces/IMessageAttachedFilesAndImages";

const MessageAttachedFilesAndImages: FC<IMessageAttachedFilesAndImages> = ({
  msg,
}) => {
  return (
    <div
    // className={`flex flex-wrap sm:justify-center md:justify-normal gap-0.5 ${
      className={`flex flex-wrap justify-center gap-0.5 ${
        msg.data().file?.length === 1 ? "max-w-md" : "max-w-xs"
      }`}
    >
      {msg.data().file.map(
        (
          file: {
            url: string;
            name: string;
            type: string;
            // уже есть ширина и высота на сервере
            // width?: number;
            // height?: number;
          },
          index: number
        ) => {
          if (
            file.type === "image/png" ||
            file.type === "image/jpeg" ||
            file.type === "image/webp"
          ) {
            if (msg.data().file.length === 1) {
              return (
                <Image
                  key={index}
                  src={file.url}
                  alt={file.type}
                  width={448}
                  height={448}
                  style={{
                    // width: 448,
                    // height: "auto",
                    maxHeight: 400,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                  placeholder="blur"
                  blurDataURL={rgbDataURLForImageBlur(191, 193, 186)}
                  loading="lazy"
                />
              );
            } else {
              return (
                <Image
                  key={index}
                  src={file.url}
                  alt={file.type}
                  width={index === 0 ? 320 : 159}
                  height={index === 0 ? 320 : 159}
                  style={{
                    // width: index === 0 ? 320 : 159,
                    // height: "auto",
                    // maxHeight: index === 0 ? 320 : 159,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                  placeholder="blur"
                  blurDataURL={rgbDataURLForImageBlur(191, 193, 186)}
                  loading="lazy"
                />
              );
            }
          } else {
            return <MessageFileItem key={index} file={file} />;
          }
        }
      )}
    </div>
  );
};

export default MessageAttachedFilesAndImages;
