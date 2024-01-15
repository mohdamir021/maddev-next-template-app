import { error } from "console";
import React, { useEffect, useRef, useState } from "react";

const BarcodeScanner = () => {
  const video = useRef(null);
  const myCanvas = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 800, height: 500 } })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();

        const ctx = myCanvas.current.getContext("2d");
        setInterval(() => {
          myCanvas.current.width = video.current.videoWidth;
          myCanvas.current.height = video.current.videoHeight;
          ctx.drawImage(
            video.current,
            0,
            0,
            video.current.videoWidth,
            video.current.videoHeight
          );
        }, 100);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <video ref={video} autoPlay muted hidden />
      <canvas ref={myCanvas} />
    </>
  );
};

export default BarcodeScanner;
