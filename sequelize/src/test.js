class UserRoom {
  constructor() {
    this.players = [];
    for (let i = 1; i < 7; i++) {
      this.players.push({ id: null, nick: null, score: null });
    }
  }

  get userId() {
    const playersId = this.players.map((player) => player.id);

    return playersId;
  }

  set userId(data) {
    const { id, nick, score } = data;
    this.players.forEach((player, index) => {
      if (player.id === null && index + 1 === id) {
        player.id = id;
        player.nick = nick;
        player.score = score;
      }
    });
  }
}

const room = new UserRoom();
console.log(room.userId); // [null * 6]
room.userId = { id: 1, nick: "dongwoo", score: "69" };
console.log(room.userId); // [1, null * 5]
