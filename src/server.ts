import { upload } from "./services/write-file";
import Utils from "./services/utils";

// @ts-ignore 
const express = require('express');
const app = express();

console.log("running");

app.get('/hey', (req: any, res: any) => res.send('ho!'));

app.post(
  "/api",
  upload.single("audioData"),
  (req: any, res: any) => {
    const utils = new Utils();
    const filename = req.file.filename;
    const dataString = utils.readFile(filename);

    console.log(dataString);
    // utils.deleteFile(filename);
  }
);

app.listen(8080);
