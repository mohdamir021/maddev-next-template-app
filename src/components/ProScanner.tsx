import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const ProScanner = () => {
  const [result, setResult] = useState<any>(null);
  const [scanner, setScanner] = useState<any>();

  const config = { fps: 5, qrbox: { width: 250, height: 250 } };
  const scanSuccess = (text: any, result: any) => {
    // setResult(text);
    setResult({
      text: text ?? "Not detected",
      decoder: result?.result?.debugData?.decoderName ?? "Not found",
      format: result?.result?.format?.formatName ?? "Not found",
    });
    console.log("1: ", text);
    console.log("2: ", result);
    // play sound on success
    var audio = document.getElementById("success_beep") as HTMLAudioElement;
    audio.play().then().catch();
  };
  const scanError = (error: any) => {
    console.log(error);
  };

  // Client
  useEffect(() => {
    setScanner(new Html5Qrcode("reader"));
  }, []);
  const startScan = () => {
    scanner.start(
      { facingMode: "environment" },
      config,
      scanSuccess,
      scanError
    );
  };
  const stopScan = () => {
    scanner
      .stop()
      .then((ignore: any) => {
        console.log("Successfully close scanner");
      })
      .catch((e: any) => {
        window.location.reload();
        console.log(e);
      });
  };

  return (
    <Box>
      <h1>ProScanner</h1>
      <Button mx={1} colorScheme="green" onClick={startScan}>
        Start
      </Button>
      <Button mx={1} colorScheme="red" onClick={stopScan}>
        Stop
      </Button>
      <Button mx={1} colorScheme="gray" onClick={() => setResult(null)}>
        Clear
      </Button>
      <br />
      {/* {result !== null ? (
        <div>Success: {result}</div>
      ) : (
        <div id="reader" style={{ width: "600px" }}></div>
      )} */}
      <Box id="reader" boxSize={"full"} maxH={"600px"} maxW={"600px"}></Box>
      {result !== null && (
        <Card bgColor={"whitesmoke"} mx={2} my={1} maxW={"600px"}>
          <CardBody>
            <Text my={2} fontWeight={900} fontSize={"large"}>
              Scan Result
            </Text>
            <Flex w={"full"} justifyContent={"space-between"}>
              <Text fontWeight={700} fontSize={"medium"}>
                Text:
              </Text>
              <Text fontWeight={500} fontSize={"medium"}>
                {result?.text}
              </Text>
            </Flex>
            <Flex w={"full"} justifyContent={"space-between"}>
              <Text fontWeight={700} fontSize={"medium"}>
                Format:
              </Text>
              <Text fontWeight={500} fontSize={"medium"}>
                {result?.format}
              </Text>
            </Flex>
            <Flex w={"full"} justifyContent={"space-between"}>
              <Text fontWeight={700} fontSize={"medium"}>
                Decoder:
              </Text>
              <Text fontWeight={500} fontSize={"medium"}>
                {result?.decoder}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      )}
      <audio id="success_beep" src="audio/pixabay-scanner-beep.mp3"></audio>
    </Box>
  );
};

export default ProScanner;
