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
    let gamesPlayer1 = 0;
    let gamesPlayer2 = 0;

    let pointsPlayer1 = 0;
    let pointsPlayer2 = 0;

    this.points.forEach((nextPoint) => {
      if (nextPoint == 1) {
        pointsPlayer1++;
        if (this.hasPlayerWonGame(pointsPlayer1, pointsPlayer2)) {
          gamesPlayer1++;
          pointsPlayer1 = 0;
          pointsPlayer2 = 0;
        }
      }

      if (nextPoint == 2) {
        pointsPlayer2++;
        if (this.hasPlayerWonGame(pointsPlayer2, pointsPlayer1)) {
          gamesPlayer2++;
          pointsPlayer1 = 0;
          pointsPlayer2 = 0;
        }
      }
    });

    if (this.hasPlayerWonSet(gamesPlayer1, gamesPlayer2)) {
      return `Set won by ${this.name1}`;
    }

    if (this.hasPlayerWonSet(gamesPlayer2, gamesPlayer1)) {
      return `Set won by ${this.name2}`;
    }

    return `${gamesPlayer1}-${gamesPlayer2}${this.formatGameScore(pointsPlayer1, pointsPlayer2)}`;
  }

  hasPlayerWonGame(playerPoints, opponentPoints) {
    return playerPoints >= 4 && playerPoints - opponentPoints >= 2;
  }

  hasPlayerWonSet(gamesPlayer, gamesOpponent) {
    return gamesPlayer >= 6 && gamesPlayer - gamesOpponent >= 2;
  }

  formatGameScore(pointsPlayer1, pointsPlayer2) {
    if (pointsPlayer1 == 0 && pointsPlayer2 == 0) {
      return ""; // game just started, no points, blank score
    }

    if (pointsPlayer1 == 3 && pointsPlayer2 == 3) {
      return ", Deuce";
    }

    if (pointsPlayer1 <= 3 && pointsPlayer2 <= 3) {
      // both players yet to reach 3 points so just add up the points
      const toScore = (points) => Math.min(points * 15, 40);
      return `, ${toScore(pointsPlayer1)}-${toScore(pointsPlayer2)}`;
    }

    if (pointsPlayer1 - pointsPlayer2 > 0) {
      return `, Advantage ${this.name1}`;
    }

    if (pointsPlayer2 - pointsPlayer1 > 0) {
      return `, Advantage ${this.name2}`;
    }

    if (pointsPlayer1 > 3 && pointsPlayer2 > 3) {
      return ", Deuce";
    }

    // should never get here, throw clear error just in case
    throw Error(
      `unexpected game score [pointsPlayer1=${pointsPlayer1}] [pointsPlayer2=${pointsPlayer2}]`,
    );
  }
}

module.exports = { Match };
