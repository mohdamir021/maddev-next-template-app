import React, { useEffect, useState } from "react";
import { Box, Img, Input, Text } from "@chakra-ui/react";
import Resizer from "react-image-file-resizer";

// Guide
// Resizer.imageFileResizer(
//   base64String, // Input base64-encoded image string
//   width, // Desired width of the output image
//   height, // Desired height of the output image
//   mimeType, // Desired output image format (e.g., 'image/jpeg' or 'image/png')
//   quality, // Compression quality (0 to 100, higher values mean better quality)
//   rotate, // Rotate the image by a certain degree (0 means no rotation)
//   callback, // Callback function to handle the resulting blob
//   outputType // Output type ('blob' for a Blob object, 'base64' for a base64-encoded string)
// );

export interface ImageFileOptions {
  width: number | any;
  height: number | any;
  mimeType: string | any;
  quality: number | any;
}

// Image Resize Method
export const resizeFile = async (
  file: any,
  convertTo: "base64" | "blob",
  options?: ImageFileOptions
) =>
  await new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      options?.width ?? 1150,
      options?.height ?? 1150,
      options?.mimeType ?? file?.type ?? "jpeg",
      options?.quality ?? 100,
      0,
      (uri) => {
        resolve(uri);
      },
      convertTo
    );
  });

// React Component
export default function ImageCustomUploader() {
  const [imgUrl, setImgUrl] = useState<any>(null);
  const [imgUrlCompressed, setImgUrlCompressed] = useState<any>(null);

  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl]);

  // Image Resize until certain size
  const handleImageResize = (file: any, options?: ImageFileOptions) => {
    const filename = file?.name ?? "";
    const fileType = file?.type ?? "image/jpeg";
    options = options ?? {
      height: 1250,
      width: 1250,
      mimeType: fileType,
      quality: 100,
    };
    resizeFile(file, "blob", options)
      .then((file: any) => {
        const newFile = new File([file], filename, { type: fileType });
        if (convertBytes(newFile?.size ?? 0).megabytes > 1) {
          handleImageResize(newFile, {
            width: options?.width - 100,
            height: options?.height - 100,
            mimeType: options?.mimeType,
            quality: options?.quality - 10,
          });
        } else {
          setImgUrlCompressed(window.URL.createObjectURL(file));
          console.log(newFile);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
            setImgUrl(window.URL.createObjectURL(e.target.files[0]));
            handleImageResize(e.target.files[0]);
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

// File Size Conversion
function convertBytes(bytes: any) {
  const kilobyte = bytes / 1024;
  const megabyte = kilobyte / 1024;
  const gigabyte = megabyte / 1024;

  return {
    bytes: Number(bytes),
    kilobytes: Number(kilobyte.toFixed(2)),
    megabytes: Number(megabyte.toFixed(2)),
    gigabytes: Number(gigabyte.toFixed(2)),
  };
}

// DataURL / Base64
export function dataURItoFile(dataURI: any, filename: any, callback?: any) {
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
  const file = new File([bb], filename, { type: mimeString });
  // console.log("Blob-SS", bb);
  // console.log("File-SS", file);
  // return bb;
  return file;
}
