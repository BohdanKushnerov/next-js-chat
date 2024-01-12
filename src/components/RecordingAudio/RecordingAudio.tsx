import { FC, useRef, useState } from "react";

import useChatStore from "@/zustand/store";
import handleSendAudio from "@/utils/handleSendAudio";

function draw(canvas, analyser, dataArray) {
  const canvasCtx = canvas.getContext("2d");

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  canvasCtx.beginPath();

  const sliceWidth = (WIDTH * 1.0) / dataArray.length;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * HEIGHT) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  console.log(x)

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();

  requestAnimationFrame(() => draw(canvas, analyser, dataArray));
}

const RecordingAudio: FC = () => {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const canvasRef = useRef(null);

  const currentUserUID = useChatStore((state) => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore((state) => state.currentChatInfo);

  const mimeType = "audio/webm";

  const startRecording = async () => {
    const streamData = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    if (streamData) {
      setRecordingStatus("recording");
      const media = new MediaRecorder(streamData, { mimeType: mimeType });
      mediaRecorder.current = media;
      mediaRecorder.current.start();
      let localAudioChunks: Blob[] = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);

      //==============
      const audioContext = new (window.AudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(streamData);

      source.connect(analyser);
      // analyser.connect(audioContext.destination);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const canvas = canvasRef.current;

      draw(canvas, analyser, dataArray);
      //==============
    }
  };

  const stopRecording = () => {
    setRecordingStatus("inactive");
    if (mediaRecorder.current) {
      console.log("mediaRecorder.current", mediaRecorder.current);
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });

        if (chatUID && userUID && currentUserUID) {
          handleSendAudio(audioBlob, chatUID, userUID, currentUserUID);
        }

        const tracks = mediaRecorder.current?.stream.getTracks();
        tracks?.forEach((track) => track.stop());
        setAudioChunks([]);
      };
    }
  };

  return (
    <>
      <canvas ref={canvasRef} width={600} height={100}></canvas>
      {recordingStatus === "inactive" && (
        <button
          className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
          type="button"
          onClick={startRecording}
        >
          <svg
            width={24}
            height={24}
            className="fill-zinc-200 dark:fill-zinc-400"
          >
            <use href={"/sprite.svg" + "#icon-mic"} />
          </svg>
        </button>
      )}
      {recordingStatus === "recording" && (
        <button
          className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
          type="button"
          onClick={stopRecording}
        >
          <svg
            width={24}
            height={24}
            className="fill-zinc-200 dark:fill-zinc-400"
          >
            <use href={"/sprite.svg" + "#icon-stop"} />
          </svg>
        </button>
      )}
    </>
  );
};

export default RecordingAudio;
