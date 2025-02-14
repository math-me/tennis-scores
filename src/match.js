class Match {
  constructor(name1, name2) {
    this.name1 = name1;
    this.name2 = name2;
    this.points = [];
  }

  pointWonBy(playerName) {
    let playerNumber = 1;
    if (playerName == this.name2) {
      playerNumber = 2;
    }

    this.points.push(playerNumber);
  }

  score() {
    return "TODO";
  }
}

module.exports = { Match };
