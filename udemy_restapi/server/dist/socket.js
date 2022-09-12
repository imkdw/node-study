"use strict";
exports.__esModule = true;
exports.socketIO = void 0;
var socket_io_1 = require("socket.io");
var io;
exports.socketIO = {
    /** 소켓 초기화 */
    init: function (server) {
        io = new socket_io_1.Server(server, {
            cors: {
                origin: "*"
            }
        });
        return io;
    },
    /** 소켓 불러오기 */
    getIO: function () {
        if (!io) {
            throw new Error("Socket.io not initialized!");
        }
        return io;
    }
};
