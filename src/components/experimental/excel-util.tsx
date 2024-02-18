import ExcelJS from "exceljs";
import SampleData from "@/store/json/data-with-image.json";

//
export const useExcelJS = () => {
  // Initialization
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Sheet Midnight");

  sheet.properties.defaultRowHeight = 80;

  // Header Setup - Style
  // sheet.getRow(1).border = {
  //   top: { style: "thick", color: { argb: "FFFF0000" } },
  //   left: { style: "thick", color: { argb: "000000FF" } },
  //   bottom: { style: "thick", color: { argb: "F08080" } },
  //   right: { style: "thick", color: { argb: "FF00FF00" } },
  // };

  // sheet.getRow(1).fill = {
  //   type: "pattern",
  //   pattern: "darkVertical",
  //   fgColor: { argb: "FFFF00" },
  // };

  // sheet.getRow(1).font = {
  //   name: "Comic Sans MS",
  //   family: 4,
  //   size: 16,
  //   bold: true,
  // };

  // Header Setup - Column value
  sheet.columns = [
    {
      header: "Name",
      key: "name",
      width: 30,
    },
    {
      header: "Age",
      key: "age",
      width: 15,
    },
    {
      header: "Waifu",
      key: "waifu",
      width: 20,
    },
  ];

  // Populating Data - Add rows - normal data only
  // SampleData?.map((data) => {
  //   sheet.addRow({
  //     name: data?.Name,
  //     age: data?.Age,
  //   });
  //   return null;
  // });

  // Image - use different approach
  const promise = Promise.all(
    SampleData?.map(async (data, index) => {
      const rowNumber = index + 1;

      sheet.addRow({
        name: data?.Name,
        age: data?.Age,
      });

      const result = await toDataURL(data?.Waifu); // img url -> base64 data
      const splited = data?.Waifu.split(".");
      const extName = splited[splited.length - 1]; // extension

      const imageId2 = workbook?.addImage({
        base64: result?.base64Url,
        extension: extName,
      });

      /**
       * Then, we will create the imageId2 object, by base64 image string and the image extension.
       * And, in the next step, we pass it to the sheet.addImage() method with the “tl” key(column and row)
       * and “ext” key(to define the height and width).
       */
      sheet.addImage(imageId2, {
        tl: { col: 2, row: rowNumber + 0.2 },
        ext: { width: 100, height: 100 },
      });
      sheet.addImage(imageId2, {
        tl: { col: 2 + 1, row: rowNumber + 0.2 },
        ext: { width: 100, height: 100 },
      });

      sheet.mergeCells(
        "C" + String(rowNumber + 1) + ":D" + String(rowNumber + 1) // By number, not index
      );

      return null;
    })
  );

  // After the data has been populated can be manipulated here
  promise
    .then(() => {
      // const priceCol = sheet.getColumn(5);

      // // iterate over all current cells in this column
      // priceCol.eachCell((cell) => {
      //   const cellValue = Number(sheet.getCell(cell?.address).value) ?? 0;
      //   // add a condition to set styling
      //   if (cellValue > 50 && cellValue < 1000) {
      //     sheet.getCell(cell?.address).fill = {
      //       type: "pattern",
      //       pattern: "solid",
      //       fgColor: { argb: "FF0000" },
      //     };
      //   }
      // });
      // Styling
      sheet.getRow(1).eachCell((cell) => {
        sheet.getCell(cell?.address).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF0000" },
        };
        sheet.getCell(cell?.address).border = {
          top: { style: "medium", color: { argb: "21231D" } },
          left: { style: "medium", color: { argb: "21231D" } },
          bottom: { style: "medium", color: { argb: "21231D" } },
          right: { style: "medium", color: { argb: "21231D" } },
        };
        sheet.getCell(cell?.address).fill = {
          type: "pattern",
          pattern: "darkVertical",
          fgColor: { argb: "FFFF00" },
        };
        sheet.getCell(cell?.address).font = {
          name: "Comic Sans MS",
          family: 4,
          size: 16,
          bold: true,
        };
      });

      // Final - Export excel file
      sheet.columns[3].width = 20;
      sheet.mergeCells("C1:D1");
      workbook.xlsx
        .writeBuffer()
        .then(function (data) {
          const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = "download.xlsx";
          anchor.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((e) => {});
    })
    .catch((e) => {});

  // Export / Download the excel file
  const exampleMenthod = () => {
    workbook.xlsx
      .writeBuffer()
      .then(function (data) {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "download.xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((e) => {});
  };
};

// Outside method
const toDataURL = async (url: any) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.readAsDataURL(xhr.response);
      reader.onloadend = function () {
        resolve({ base64Url: reader.result });
      };
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Access-Control-Allow-Headers", "*");
    // supported in new browsers...do JSONP based stuff in older browsers...figure out how
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
  });

  return await promise;
};
