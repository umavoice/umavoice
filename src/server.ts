import { upload } from "./services/write-file";
// import Utils from "./services/utils";
import { wavConverter } from "./services/wav-conversor";
import { getDeepSpeechResult } from "./services/deepspeech";

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
    const conversionSuccefull = await wavConverter(filePath, newFilePath);

    let result;
    if(conversionSuccefull) {
       result = await getDeepSpeechResult(newFilePath);
    }
    // const utils = new Utils();
    // utils.deleteFile(filename);

    res.send(result);
    console.log(result);
  }
);

app.listen(8080);
