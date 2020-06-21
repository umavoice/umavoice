import { upload } from "./services/write-file";
// import Utils from "./services/utils";
import { wavConverter } from "./services/wav-conversor";
import { startDeepSpeech } from "./services/deepspeech";

// @ts-ignore 
const express = require('express');
const app = express();

console.log("running");

app.get('/hey', (req: any, res: any) => res.send('ho!'));

app.post(
  "/api",
  upload.single("audioData"),
  async (req: any, res: any) => {
    const fileName = req.file.filename;
    const filePath = __dirname + '/src/uploads/' + fileName;
    const newFilePath = filePath.replace(".webm", ".wav");
    const conversionSuccefull = await wavConverter(fileName, filePath, newFilePath);

    if(conversionSuccefull) {
      startDeepSpeech(newFilePath);
    }
    // const utils = new Utils();
    // utils.deleteFile(filename);
  }
);

app.listen(8080);
