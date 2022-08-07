import http from "http";
import { requestHandler as routes } from "./routes";

const server = http.createServer(routes);

server.listen(3000);
