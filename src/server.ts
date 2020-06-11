// @ts-ignore 
const express = require('express');
const app = express();

console.log("running");

app.get('/hey', (req: any, res: any) => res.send('ho!'));

app.listen(8080);
