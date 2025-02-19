const Player = require("./player.js");

class Match {
  #name1;
  #name2;
  #pointsWonBy;

  constructor(name1, name2) {
    this.#name1 = name1;
    this.#name2 = name2;
    this.#pointsWonBy = [];
  }

  pointWonBy(playerName) {
    let playerNumber = 1;
    if (playerName == this.#name2) {
      playerNumber = 2;
    }

    this.#pointsWonBy.push(playerNumber);
  }

  score() {
    const player1 = new Player(this.#name1);
    const player2 = new Player(this.#name2);

    this.#pointsWonBy.forEach((nextPointWonBy) => {
      if (nextPointWonBy == 1) {
        player1.awardPoint();
        if (this.#hasPlayerWonGame(player1, player2)) {
          player1.awardGame();
          player1.resetForNextGame();
          player2.resetForNextGame();
        }
      }

      if (nextPointWonBy == 2) {
        player2.awardPoint();
        if (this.#hasPlayerWonGame(player2, player1)) {
          player2.awardGame();
          player1.resetForNextGame();
          player2.resetForNextGame();
        }
      }
    });

    if (this.#hasPlayerWonSet(player1, player2)) {
      return `Set won by ${player1.getName()}`;
    }

    if (this.#hasPlayerWonSet(player2, player1)) {
      return `Set won by ${player2.getName()}`;
    }

    return `${player1.getGamesWon()}-${player2.getGamesWon()}${this.#formatGameScore(player1, player2)}`;
  }

  #hasPlayerWonGame(player, opponent) {
    return (
      player.getCurrentGamePoints() >= 4 &&
      player.getCurrentGamePoints() - opponent.getCurrentGamePoints() >= 2
    );
  }

  #hasPlayerWonSet(player, opponent) {
    const playerWonWithoutTieBreak =
      player.getGamesWon() >= 6 &&
      player.getGamesWon() - opponent.getGamesWon() >= 2;
    const playerWonWithTieBreak =
      player.getGamesWon() >= 7 &&
      player.getGamesWon() - opponent.getGamesWon() >= 1;
    return playerWonWithoutTieBreak || playerWonWithTieBreak;
  }

  #formatGameScore(player1, player2) {
    if (
      player1.getCurrentGamePoints() == 0 &&
      player2.getCurrentGamePoints() == 0
    ) {
      return ""; // game just started, no points, blank score
    }

    if (player1.getGamesWon() == 6 && player2.getGamesWon() == 6) {
      // tie break game, simply return points accumulated...
      return `, ${player1.getCurrentGamePoints()}-${player2.getCurrentGamePoints()}`;
    }

    if (
      player1.getCurrentGamePoints() == 3 &&
      player2.getCurrentGamePoints() == 3
    ) {
      return ", Deuce";
    }

    if (
      player1.getCurrentGamePoints() <= 3 &&
      player2.getCurrentGamePoints() <= 3
    ) {
      // both players yet to reach 3 points so just add up the points
      const toScore = (points) => Math.min(points * 15, 40);
      return `, ${toScore(player1.getCurrentGamePoints())}-${toScore(player2.getCurrentGamePoints())}`;
    }

    if (player1.getCurrentGamePoints() - player2.getCurrentGamePoints() > 0) {
      return `, Advantage ${player1.getName()}`;
    }

    if (player2.getCurrentGamePoints() - player1.getCurrentGamePoints() > 0) {
      return `, Advantage ${player2.getName()}`;
    }

    if (
      player1.getCurrentGamePoints() > 3 &&
      player2.getCurrentGamePoints() > 3
    ) {
      return ", Deuce";
    }

    // should never get here, throw clear error just in case
    throw Error(
      `unexpected game score [pointsPlayer1=${player1.getCurrentGamePoints()}] [pointsPlayer2=${player2.getCurrentGamePoints()}]`,
    );
  }
}

module.exports = { Match };
