import express from "express";
import StatController from "../controller/stat";

const StatRouter = express.Router();

StatRouter.post("/item-level", StatController.postItemLevel);

export default StatRouter;
