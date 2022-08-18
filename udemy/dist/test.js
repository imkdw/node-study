function getIndexOfRoomInfo() {
    var roomInfo = [
        [1, 2],
        [3, 4],
        [5, 6],
    ];
    var socketId = 3;
    var roomIndex = roomInfo.findIndex(function (room) { return room[0] === socketId; });
    console.log(roomIndex);
}
//# sourceMappingURL=test.js.map