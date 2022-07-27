import express from "express";
import UserService from "../service/userService";

const userRouter = express.Router();

userRouter.post("/follow", async (req, res) => {
  const payload = req.body;

  try {
    const followRecord = await UserService.addFollow(
      payload.id,
      payload.follow
    );
    console.log(followRecord);
    res.send("팔로우 성공");
  } catch (err) {
    console.error(err);
    res.status(400).send("DB Error");
  }
});

export default userRouter;
