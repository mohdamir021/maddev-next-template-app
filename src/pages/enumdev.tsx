import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Webcam from "react-webcam";

const EnumDevices = () => {
  const [devices, setDevices] = useState<any>([]);

  const handleDevices = useCallback(
    (mediaDevices: any) => {
      setDevices(mediaDevices.filter(({ kind }: any) => kind === "videoinput"));
    },
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <Box>
      {devices?.map((device: any, key: any) => (
        <div key={key}>
          <Webcam
            audio={false}
            videoConstraints={{ deviceId: device.deviceId }}
          />
          {device.label || `Device ${key + 1}`}
        </div>
      ))}
    </Box>
  );
};

export default EnumDevices;
