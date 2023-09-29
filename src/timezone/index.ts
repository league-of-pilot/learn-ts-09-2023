import { tzOrigin } from "./tzOrigin";
import soft, { DisplayFormat } from "timezone-soft";
import fs from "fs";

// Convert the object to JSON format
const convertJsonData = (data: Object) => JSON.stringify(data, null, 2);

type ExtendSoft = DisplayFormat & {
  name?: string;
  long?: string;
  standard: {
    abbr: string;
    offset: number;
  };
};

const genFileName = () => {
  const currentDate = new Date().getTime();
  const fileName = `${currentDate}.json`;
  return fileName;
};

const saveFile = (filePath: string, data: string) => {
  // Write the JSON data to the file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data has been written to", filePath);
    }
  });
};

export const convertTz = () => {
  //   for (let i = 0; i < tzOrigin.length; i++) {
  //     const tz = tzOrigin[i];
  const result = [] as any;

  for (let tz of tzOrigin) {
    const timeSoft = soft(tz.value)[0] as ExtendSoft;

    if (!timeSoft) {
      console.log("🚀 undefined", tz);
    } else {
      const {
        name,
        long: text,
        standard: { abbr, offset },
      } = timeSoft;

      if (!name || !text || !abbr || !offset) {
        console.log("🚀 index L40-timeSoft", timeSoft);
      }

      const objConvert = {
        name: name ?? "✨ name",
        abbr,
        offset: offset ?? 0,
        text: text ?? "✨ name",
      };
      result.push(objConvert);
    }
  }
  const fileName = genFileName();
  saveFile(fileName, convertJsonData(result));
};
