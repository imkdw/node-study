import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./route/authRouter";
import tweetRouter from "./route/tweetRouter";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 5000);

/** 미들웨어 정의 */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** 전역변수 정의 */
app.locals.idCount = 1;
app.locals.users = {};
app.locals.tweets = {};

/** 라우터 정의 */
app.use("/auth", authRouter);
app.use("/tweet", tweetRouter);

app.get("/users", (req, res) => {
  const users = app.locals.users;
  res.send(users);
  return;
});

app.get("/tweets", (req, res) => {
  const tweets = app.locals.tweets;
  res.send(tweets);
  return;
});

app.post("/follow", (req, res) => {
  const payload = req.body;
  const userId = payload["id"];
  const userIdToFollow = payload["follow"];

  const userList = Object.keys(app.locals.users);
  if (!userList.includes(userId) || !userList.includes(userIdToFollow)) {
    res.status(400).send("사용자가 존재하지 않습니다.");
    return;
  }

  const user = app.locals.users[userId];
  if (user.follow.includes(userIdToFollow)) {
    res.status(400).send("이미 팔로우 되어있는 아이디 입니다.");
    return;
  }

  user.follow.push(userIdToFollow);

  res.send(
    `${app.locals.users[userId].name}님 계정에 ${app.locals.users[userIdToFollow].name}님이 팔로우 되었습니다.`
  );
});

app.post("/unfollow", (req, res) => {
  const payload = req.body;
  const userId = payload["id"];
  const userIdToUnfollow = payload["unfollow"];

  const userList = Object.keys(app.locals.users);
  if (!userList.includes(userId)) {
    res.status(400).send("사용자가 존재하지 않습니다.");
    return;
  }

  if (!userList.includes(userIdToUnfollow)) {
    res.status(400).send("언팔로우할 사용자가 존재하지 않습니다.");
    return;
  }

  const user = app.locals.users[userId];

  const userFollowList: number[] = user.follow;
  if (!userFollowList.includes(userIdToUnfollow)) {
    res.status(400).send("팔로우가 되어있지 않은 유저입니다.");
    return;
  }

  const unfollowUserIndex = userFollowList.indexOf(userIdToUnfollow);
  app.locals.users[userId].follow = userFollowList.filter(
    (userId) => userId !== userIdToUnfollow
  );

  res.send(
    `${user.name}님 계정에서 ${app.locals.users[userIdToUnfollow].name}님이 언팔로우 되었습니다.`
  );
});

app.listen(app.get("port"), () => {
  console.log(`Server Running : PORT : ${app.get("port")}`);
});
