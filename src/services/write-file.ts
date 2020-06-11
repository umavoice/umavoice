const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req: any, file: any, cb: any) {
    cb(null, "./build/src/uploads/");
  },
  filename: function(req: any, file: any, cb: any) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage: storage });
