import express from "express";
import multer from "multer";

const app = express();
app.set("port", 5000);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer({ storage }).single("image"));

app.post("/images", (req, res, next) => {
  console.log(req.file);
});

app.listen(app.get("port"), () => {
  console.log("port:", app.get("port"));
});
