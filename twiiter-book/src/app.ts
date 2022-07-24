import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connection from "./db";

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 5000);

/** 미들웨어 정의 */
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.locals.idCount = 1;
app.locals.users = {};
app.locals.tweets = {};
app.locals.database = connection;

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

app.post("/sign-up", (req, res) => {
  const newUser = req.body;
  newUser["id"] = app.locals.idCount;
  newUser["follow"] = [];
  app.locals.users[app.locals.idCount] = newUser;
  app.locals.idCount += 1;
  app.locals.tweets[newUser["id"]] = [];
  res.send(`${newUser["id"]}번 회원 ${newUser["name"]}님 계정생성 완료`);
});

app.post("/tweet", (req, res) => {
  const payload = req.body;
  const userId = payload["id"];
  const tweet = payload["tweet"];

  if (!Object.keys(app.locals.users).includes(userId)) {
    res.status(400).send("사용자가 존재하지 않습니다.");
    return;
  }

  if (tweet.length > 300) {
    res.status(400).send("300자를 초과했습니다.");
    return;
  }

  app.locals.tweets[userId].push({
    id: userId,
    tweet: tweet,
  });

  res.send(`${app.locals.users[userId].name}님 트윗 작성완료`);
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

app.get("/timeline/:userId", (req, res) => {
  const userId = req.params.userId;
  const follows = app.locals.users[userId].follow;
  const timeline = [];
  follows.forEach((follow) => {
    if (Object.keys(app.locals.tweets).includes(follow)) {
      const tweets = app.locals.tweets[follow];
      tweets.forEach((tweet) => {
        timeline.push(tweet);
      });
    }
  });

  res.send(timeline);
});

app.listen(app.get("port"), () => {
  console.log(`Server Running : PORT : ${app.get("port")}`);
});
