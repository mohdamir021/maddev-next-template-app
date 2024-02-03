import React, { useEffect, useState } from "react";
import { Box, Img, Input, Text } from "@chakra-ui/react";
import Resizer from "react-image-file-resizer";

// DataURL / Base64
function dataURItoBlob(dataURI: any, filename: any, callback?: any) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI?.split(",")[0].split(":")[1].split(";")[0];
  console.log(mimeString);
  console.log(filename);

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const bb = new Blob([ab], { type: mimeString });
  // const file = new File([bb], filename, { type: mimeString });
  // console.log("Blob-SS", bb);
  // console.log("File-SS", file);
  return bb;
}

// React Component
export default function ImageUploader() {
  const resizeFile = async (file: any, convertTo: "base64" | "blob") =>
    await new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1150,
        1150,
        file?.type ?? "jpeg",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        convertTo
      );
    });

  const [imgUrl, setImgUrl] = useState<any>(null);
  const [imgUrlCompressed, setImgUrlCompressed] = useState<any>(null);

  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl]);

  return (
    <Box>
      <Text>Select image:</Text>
      <Input
        placeholder="Upload an image"
        type="file"
        accept="image/jpeg, image/png"
        multiple
        onChange={(e) => {
          if (
            e.target.files !== null &&
            e.target.files !== undefined &&
            e.target.files.length > 0
          ) {
            const url = window.URL.createObjectURL(e.target?.files[0]);
            const filename = e.target.files[0].name;
            setImgUrl(url);
            resizeFile(e.target.files[0], "blob")
              .then((file: any) => {
                setImgUrlCompressed(window.URL.createObjectURL(file));
                dataURItoBlob(file, filename);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }}
      />
      <Text>Raw Image</Text>
      <Img src={imgUrl} maxW={"70%"} />
      <Text>Compressed Image</Text>
      <Img src={imgUrlCompressed} maxW={"70%"} />
    </Box>
  );
}
