import { tzOrigin } from "./tzOrigin";
import soft, { DisplayFormat } from "timezone-soft";
import fs from "fs";
// import path from "path";

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
  const fileName = `${currentDate}.result.json`;

  // __dirname return path where js is built
  // how to get path where ts is written
  // We use path.resolve() to obtain the absolute path.
  return fileName;
};

const saveFile = (filePath: string, data: string) => {
  // Write the JSON data to the file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("⚠️ Error writing to file:", err);
    } else {
      console.log("✅ Data has been written to", filePath);
    }
  });
};

export const compareName = (stringA, stringB) => {
  // Split the input strings into words
  const wordsA = stringA.split(" ");
  const wordsB = stringB.split(" ");

  // Check if all words in stringB are in stringA
  for (const wordB of wordsB) {
    if (!wordsA.includes(wordB)) {
      return false;
    }
  }

  // If we reach this point, all words in stringB are in stringA
  return true;
};

export const convertTz = () => {
  const result = [] as any;
  let error = 0;
  let objFilter = {} as any;

  for (let i = 0; i < tzOrigin.length; i++) {
    let pushValue;
    const tz = tzOrigin[i];
    // for (let tz of tzOrigin) {
    const searchText = tz.text.split(") ")[1];
    const timeSoft = soft(searchText)[0] as ExtendSoft;

    if (!timeSoft) {
      // console.log("🚀 undefined", tz);
      tz.value = tz.value;
      error++;
      pushValue = tz;
    } else {
      const {
        name: timeSoftName,
        long: text,
        standard: { abbr, offset },
      } = timeSoft;

      if (!timeSoftName || !text || !abbr) {
        console.log("🚀 timeSoft - ", i, timeSoft);
        console.log("🚀 tz - ", i, tz);
      }

      const isUsedOrigin = compareName(tz.value, timeSoftName);
      const finalValue = isUsedOrigin ? tz.value : timeSoftName;

      const objConvert = {
        value: finalValue,
        abbr,
        offset: offset ?? 0,
        text: text ?? "✨ name",
        utc: tz.utc,
      };
      pushValue = objConvert;
    }

    result.push(pushValue);

    const abbr = pushValue.abbr;
    if (!objFilter[abbr]) {
      objFilter[abbr] = 1;
    } else {
      objFilter[abbr]++;
    }
  }

  const filterDup = Object.entries(objFilter).filter(([key, value]) => {
    const num = value as number;
    return num > 1;
  });

  console.log("🚀 index L109-filterDup", filterDup);
  console.log("🚀 index L74-error", error);
  const fileName = genFileName();
  saveFile(fileName, convertJsonData(result));
};
