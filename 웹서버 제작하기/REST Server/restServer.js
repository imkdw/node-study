const { checkPrime } = require("crypto");
const http = require("http");
const fs = require("fs").promises;

const textHtml = "text/html; charset=utf-8;";
const textPlain = "text/plain; charset=utf-8;";

const users = {}; // 유저 정보를 기록하기 위한 객체

http
  .createServer(async (req, res) => {
    try {
      console.log(req.method, req.url);
      // get 메서드로 요청시
      if (req.method === "GET") {
        // get 메서드의 url이 / 일때
        if (req.url === "/") {
          const data = await fs.readFile("./restFront.html");
          res.writeHead(200, { "Content-type": textHtml });
          return res.end(data);
          // ge 메서드의 url이 /about 일때
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html");
          res.writeHead(200, { "Content-type": textHtml });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, { "Content-tpye": textPlain });
          return res.end(JSON.stringify(users));
        }

        // get메서드의 url이 /, /about 모두 아닐때
        try {
          const data = await fs.readFile(`./${req.url}`);
          return res.end(data);
        } catch (err) {
          console.error(err); // 404 not found 에러
        }

        res.writeHead(404);
        return res.end("404 NOT FOUND");
        // req 메서드가 post 일때
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          req.on("data", (data) => (body += data));

          return req.on("end", () => {
            console.log(`POST 본문 : ${body}`);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;

            res.write(201);
            res.end("등록성공");
            console.log(res.wir);
          });
        }
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-type": textPlain });
      res.end(err.message);
    }
  })
  .listen(8080, () => console.log("8080포트에서 서버 대기중"));
