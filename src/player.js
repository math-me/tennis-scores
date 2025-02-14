class Player {
  constructor(name) {
    this.name = name;
    this.currentGamePoints = 0;
    this.gamesWon = 0;
  }

  awardPoint() {
    this.currentGamePoints++;
  }

  awardGame() {
    this.gamesWon++;
  }

  resetForNextGame() {
    this.currentGamePoints = 0;
  }
}

module.exports = Player;
