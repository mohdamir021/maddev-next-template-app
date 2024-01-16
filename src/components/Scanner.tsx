import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      true
    );

    scanner.render(success, error);

    function success(result: any) {
      scanner.clear();
      setScanResult(result);
    }

    function error(error: any) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h1>QR Scan</h1>
      {scanResult ? (
        <div>Success : {scanResult}</div>
      ) : (
        <div id="reader" style={{ width: "600px" }}></div>
      )}
    </div>
  );
};

export default Scanner;
