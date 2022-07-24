"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.set("port", process.env.PORT || 5000);
/** 미들웨어 정의 */
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.locals.idCount = 1;
app.locals.users = {};
app.locals.tweets = {};
app.get("/users", function (req, res) {
    var users = app.locals.users;
    res.send(users);
    return;
});
app.get("/tweets", function (req, res) {
    var tweets = app.locals.tweets;
    res.send(tweets);
    return;
});
app.post("/sign-up", function (req, res) {
    var newUser = req.body;
    newUser["id"] = app.locals.idCount;
    newUser["follow"] = [];
    app.locals.users[app.locals.idCount] = newUser;
    app.locals.idCount += 1;
    app.locals.tweets[newUser["id"]] = [];
    res.send("".concat(newUser["id"], "\uBC88 \uD68C\uC6D0 ").concat(newUser["name"], "\uB2D8 \uACC4\uC815\uC0DD\uC131 \uC644\uB8CC"));
});
app.post("/tweet", function (req, res) {
    var payload = req.body;
    var userId = payload["id"];
    var tweet = payload["tweet"];
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
        tweet: tweet
    });
    res.send("".concat(app.locals.users[userId].name, "\uB2D8 \uD2B8\uC717 \uC791\uC131\uC644\uB8CC"));
});
app.post("/follow", function (req, res) {
    var payload = req.body;
    var userId = payload["id"];
    var userIdToFollow = payload["follow"];
    var userList = Object.keys(app.locals.users);
    if (!userList.includes(userId) || !userList.includes(userIdToFollow)) {
        res.status(400).send("사용자가 존재하지 않습니다.");
        return;
    }
    var user = app.locals.users[userId];
    if (user.follow.includes(userIdToFollow)) {
        res.status(400).send("이미 팔로우 되어있는 아이디 입니다.");
        return;
    }
    user.follow.push(userIdToFollow);
    res.send("".concat(app.locals.users[userId].name, "\uB2D8 \uACC4\uC815\uC5D0 ").concat(app.locals.users[userIdToFollow].name, "\uB2D8\uC774 \uD314\uB85C\uC6B0 \uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
});
app.post("/unfollow", function (req, res) {
    var payload = req.body;
    var userId = payload["id"];
    var userIdToUnfollow = payload["unfollow"];
    var userList = Object.keys(app.locals.users);
    if (!userList.includes(userId)) {
        res.status(400).send("사용자가 존재하지 않습니다.");
        return;
    }
    if (!userList.includes(userIdToUnfollow)) {
        res.status(400).send("언팔로우할 사용자가 존재하지 않습니다.");
        return;
    }
    var user = app.locals.users[userId];
    var userFollowList = user.follow;
    if (!userFollowList.includes(userIdToUnfollow)) {
        res.status(400).send("팔로우가 되어있지 않은 유저입니다.");
        return;
    }
    var unfollowUserIndex = userFollowList.indexOf(userIdToUnfollow);
    app.locals.users[userId].follow = userFollowList.filter(function (userId) { return userId !== userIdToUnfollow; });
    res.send("".concat(user.name, "\uB2D8 \uACC4\uC815\uC5D0\uC11C ").concat(app.locals.users[userIdToUnfollow].name, "\uB2D8\uC774 \uC5B8\uD314\uB85C\uC6B0 \uB418\uC5C8\uC2B5\uB2C8\uB2E4."));
});
app.get("/timeline/:userId", function (req, res) {
    var userId = req.params.userId;
    var follows = app.locals.users[userId].follow;
    var timeline = [];
    follows.forEach(function (follow) {
        if (Object.keys(app.locals.tweets).includes(follow)) {
            var tweets = app.locals.tweets[follow];
            tweets.forEach(function (tweet) {
                timeline.push(tweet);
            });
        }
    });
    res.send(timeline);
});
app.listen(app.get("port"), function () {
    console.log("Server Running : PORT : ".concat(app.get("port")));
});
//# sourceMappingURL=app.js.map