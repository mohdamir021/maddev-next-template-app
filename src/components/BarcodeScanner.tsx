import { Button } from "@chakra-ui/react";
import { error } from "console";
import React, { useEffect, useRef, useState } from "react";

const BarcodeScanner = () => {
  // const video = useRef(null);
  const myCanvas = useRef(null);
  const [barcode, setBarcode] = useState<any>(null);
  const [camStream, setCamStream] = useState<any>(null);
  const [msg, setMsg] = useState<any>("");

  const closeCam = () => {
    if (camStream !== null) {
      const tracks = camStream.getTracks();
      tracks.forEach((track: any) => track.stop());
    }
  };

  const permission = () => {
    navigator.permissions
      .query({ name: "camera" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          setMsg("camera access granted");
          openCam();
        } else {
          setMsg("camera access not granted");
        }
      })
      .catch((e: any) => {
        setMsg(e.toString());
      });
  };

  const openCam = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 800, height: 500, facingMode: "environment" },
      })
      .then((stream) => {
        setCamStream(stream);
        var video = document.querySelector("video");
        video!.srcObject! = stream;
        video!.play();

        const ctx = myCanvas!.current!.getContext("2d");

        // create new detector
        const barcodeDetector = new window.BarcodeDetector({
          formats: ["code_39", "codabar", "ean_13"],
        });

        setInterval(() => {
          myCanvas!.current!.width = video?.videoWidth!;
          myCanvas!.current!.height = video?.videoHeight!;
          ctx.drawImage(video, 0, 0, video?.videoWidth, video?.videoHeight);

          // Detect barcode
          barcodeDetector
            .detect(myCanvas.current)
            .then(([data]: any) => {
              if (
                data !== null &&
                data !== undefined &&
                data?.rawValue !== null
              ) {
                setBarcode(String(data.rawValue));
              }
            })
            .catch((error: any) => setMsg(error.toString()));
          //end
        }, 100);
      })
      .catch((error) => setMsg(error.toString()));
  };

  return (
    <>
      <Button onClick={permission}>Open Cam</Button>
      <Button onClick={closeCam}>Close</Button>
      <video autoPlay muted hidden />
      <canvas ref={myCanvas} />
      {barcode !== null && <div>Barcode Detected: {barcode}</div>}
      <div>Message : {msg}</div>
    </>
  );
};

export default BarcodeScanner;
