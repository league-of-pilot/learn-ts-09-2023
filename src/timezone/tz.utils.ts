import fs from "fs";

// Convert the object to JSON format
export const convertJsonData = (data: Object) => JSON.stringify(data, null, 2);

export const genFileName = () => {
  const currentDate = new Date().getTime();
  const fileName = `${currentDate}.result.json`;

  // __dirname return path where js is built
  // how to get path where ts is written
  // We use path.resolve() to obtain the absolute path.
  return fileName;
};

export const saveFile = (filePath: string, data: string) => {
  // Write the JSON data to the file
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("⚠️ Error writing to file:", err);
    } else {
      console.log("✅ Data has been written to", filePath);
    }
  });
};

export const quickSave = (data: object) => {
  const fileName = genFileName();
  saveFile(fileName, convertJsonData(data));
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
