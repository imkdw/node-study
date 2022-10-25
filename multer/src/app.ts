import express from "express";
// import fileUpload from "express-fileupload";
import multer from "multer";
import morgan from "morgan";
import { v4 } from "uuid";
import cors from "cors";

const app = express();
app.set("port", 5000);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, v4() + "-" + file.originalname);
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(multer({ storage }).array("image"));

app.post("/images", (req, res, next) => {
  console.log(req.files);
  res.json("Hello");
});

app.listen(app.get("port"), () => {
  console.log("port:", app.get("port"));
});
