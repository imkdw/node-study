function getIndexOfRoomInfo() {
  const roomInfo = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];

  const socketId = 3;

  const roomIndex = roomInfo.findIndex((room) => room[0] === socketId);
  console.log(roomIndex);
}
