const Player = require("./player.js");

class Match {
  constructor(name1, name2) {
    this.name1 = name1;
    this.name2 = name2;
    this.pointsWonBy = [];
  }

  pointWonBy(playerName) {
    let playerNumber = 1;
    if (playerName == this.name2) {
      playerNumber = 2;
    }

    this.pointsWonBy.push(playerNumber);
  }

  score() {
    const player1 = new Player(this.name1);
    const player2 = new Player(this.name2);

    this.pointsWonBy.forEach((nextPointWonBy) => {
      if (nextPointWonBy == 1) {
        player1.awardPoint();
        if (this.hasPlayerWonGame(player1, player2)) {
          player1.awardGame();
          player1.resetForNextGame();
          player2.resetForNextGame();
        }
      }

      if (nextPointWonBy == 2) {
        player2.awardPoint();
        if (this.hasPlayerWonGame(player2, player1)) {
          player2.awardGame();
          player1.resetForNextGame();
          player2.resetForNextGame();
        }
      }
    });

    if (this.hasPlayerWonSet(player1, player2)) {
      return `Set won by ${player1.name}`;
    }

    if (this.hasPlayerWonSet(player2, player1)) {
      return `Set won by ${player2.name}`;
    }

    return `${player1.gamesWon}-${player2.gamesWon}${this.formatGameScore(player1, player2)}`;
  }

  hasPlayerWonGame(player, opponent) {
    return (
      player.currentGamePoints >= 4 &&
      player.currentGamePoints - opponent.currentGamePoints >= 2
    );
  }

  hasPlayerWonSet(player, opponent) {
    const playerWonWithoutTieBreak =
      player.gamesWon >= 6 && player.gamesWon - opponent.gamesWon >= 2;
    const playerWonWithTieBreak =
      player.gamesWon >= 7 && player.gamesWon - opponent.gamesWon >= 1;
    return playerWonWithoutTieBreak || playerWonWithTieBreak;
  }

  formatGameScore(player1, player2) {
    if (player1.currentGamePoints == 0 && player2.currentGamePoints == 0) {
      return ""; // game just started, no points, blank score
    }

    if (player1.currentGamePoints == 3 && player2.currentGamePoints == 3) {
      return ", Deuce";
    }

    if (player1.currentGamePoints <= 3 && player2.currentGamePoints <= 3) {
      // both players yet to reach 3 points so just add up the points
      const toScore = (points) => Math.min(points * 15, 40);
      return `, ${toScore(player1.currentGamePoints)}-${toScore(player2.currentGamePoints)}`;
    }

    if (player1.currentGamePoints - player2.currentGamePoints > 0) {
      return `, Advantage ${player1.name}`;
    }

    if (player2.currentGamePoints - player1.currentGamePoints > 0) {
      return `, Advantage ${player2.name}`;
    }

    if (player1.currentGamePoints > 3 && player2.currentGamePoints > 3) {
      return ", Deuce";
    }

    // should never get here, throw clear error just in case
    throw Error(
      `unexpected game score [pointsPlayer1=${player1.currentGamePoints}] [pointsPlayer2=${player2.currentGamePoints}]`,
    );
  }
}

module.exports = { Match };
