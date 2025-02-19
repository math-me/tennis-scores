class Player {
  #name;
  #currentGamePoints;
  #gamesWon;

  constructor(name) {
    this.#name = name;
    this.#currentGamePoints = 0;
    this.#gamesWon = 0;
  }

  awardPoint() {
    this.#currentGamePoints++;
  }

  awardGame() {
    this.#gamesWon++;
  }

  resetForNextGame() {
    this.#currentGamePoints = 0;
  }

  getName() {
    return this.#name;
  }

  getCurrentGamePoints() {
    return this.#currentGamePoints;
  }

  getGamesWon() {
    return this.#gamesWon;
  }
}

module.exports = Player;
