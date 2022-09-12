import { Server } from "socket.io";
let io;

export const socketIO = {
  /** 소켓 초기화 */
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    return io;
  },
  /** 소켓 불러오기 */
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }

    return io;
  },
};
