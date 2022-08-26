// import express from "express";
// import morgan from "morgan";
// import StatRouter from "./routes/stat";

// const app = express();
// app.set("port", 3000);

// /** Set Middleware */
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// /** Set Router */
// app.use("/stat", StatRouter);

// app.get("/", (req, res) => {
//   res.send("noobzz");
// });

// app.listen(app.get("port"), () => {
//   console.log("Server on", app.get("port"));
// });

let a = 3;
console.log(~a);
