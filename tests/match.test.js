const { Match } = require("../src/match.js");

const namePlayer1 = "player 1";
const namePlayer2 = "player 2";

const awardGameToPlayer = (match, playerName) => {
  match.pointWonBy(playerName); // 15-0
  match.pointWonBy(playerName); // 30-0
  match.pointWonBy(playerName); // 40-0
  match.pointWonBy(playerName); // game won
};

test("should record list of points of each player when two points each", () => {
  const match = new Match(namePlayer1, namePlayer2);
  match.pointWonBy(namePlayer1);
  match.pointWonBy(namePlayer2);

  const got = match.points;
  expect(got).toStrictEqual([1, 2]);
});

test("should record list of points of each player when many points each", () => {
  const match = new Match(namePlayer1, namePlayer2);
  match.pointWonBy(namePlayer1);
  match.pointWonBy(namePlayer2);
  match.pointWonBy(namePlayer1);
  match.pointWonBy(namePlayer2);
  match.pointWonBy(namePlayer2);

  const got = match.points;
  expect(got).toStrictEqual([1, 2, 1, 2, 2]);
});

test("should display scores after first two points", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);

  // when
  match.pointWonBy(namePlayer1);
  match.pointWonBy(namePlayer2);

  // then
  const got = match.score();
  expect(got).toBe("0-0, 15-15");
});

test("should display scores when game 1 at 40-15", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);

  // when
  match.pointWonBy(namePlayer1); // 15-0
  match.pointWonBy(namePlayer2); // 15-15
  match.pointWonBy(namePlayer1); // 30-15
  match.pointWonBy(namePlayer1); // 40-15

  // then
  const got = match.score();
  expect(got).toBe("0-0, 40-15");
});

test("should display scores when game 1 at deuce", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);

  // when
  match.pointWonBy(namePlayer1); // 15-0
  match.pointWonBy(namePlayer2); // 15-15
  match.pointWonBy(namePlayer1); // 30-15
  match.pointWonBy(namePlayer1); // 40-15
  match.pointWonBy(namePlayer2); // 40-30
  match.pointWonBy(namePlayer2); // 40-40

  // then
  const got = match.score();
  expect(got).toBe("0-0, Deuce");
});

test("should display scores when game 1 returns to deuce", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);

  // when
  match.pointWonBy(namePlayer1); // 15-0
  match.pointWonBy(namePlayer2); // 15-15
  match.pointWonBy(namePlayer1); // 30-15
  match.pointWonBy(namePlayer1); // 40-15
  match.pointWonBy(namePlayer2); // 40-30
  match.pointWonBy(namePlayer2); // 40-40 deuce
  match.pointWonBy(namePlayer1); // advantage 1
  match.pointWonBy(namePlayer2); // deuce again

  // then
  const got = match.score();
  expect(got).toBe("0-0, Deuce");
});

test("should display scores when game 1 advantage player 1", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);

  // when
  match.pointWonBy(namePlayer1); // 15-0
  match.pointWonBy(namePlayer2); // 15-15
  match.pointWonBy(namePlayer1); // 30-15
  match.pointWonBy(namePlayer1); // 40-15
  match.pointWonBy(namePlayer2); // 40-30
  match.pointWonBy(namePlayer2); // 40-40
  match.pointWonBy(namePlayer1); // advantage 1

  // then
  const got = match.score();
  expect(got).toBe("0-0, Advantage player 1");
});

test("should display scores when game 1 won by player 1", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);

  // when
  match.pointWonBy(namePlayer1); // 15-0
  match.pointWonBy(namePlayer2); // 15-15
  match.pointWonBy(namePlayer1); // 30-15
  match.pointWonBy(namePlayer1); // 40-15
  match.pointWonBy(namePlayer2); // 40-30
  match.pointWonBy(namePlayer2); // 40-40
  match.pointWonBy(namePlayer1); // advantage 1
  match.pointWonBy(namePlayer1); // game to 1

  // then
  const got = match.score();
  expect(got).toBe("1-0");
});

test("should display scores after first two points of game 2", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1);

  // when
  match.pointWonBy(namePlayer1);
  match.pointWonBy(namePlayer2);

  // then
  const got = match.score();
  expect(got).toBe("1-0, 15-15");
});

test("should display scores when game 2 at 40-15", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1);

  // when
  match.pointWonBy(namePlayer1); // 15-0
  match.pointWonBy(namePlayer2); // 15-15
  match.pointWonBy(namePlayer1); // 30-15
  match.pointWonBy(namePlayer1); // 40-15

  // then
  const got = match.score();
  expect(got).toBe("1-0, 40-15");
});

test("should display scores when game 2 at deuce", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1);

  // when
  match.pointWonBy(namePlayer1); // 15-0
  match.pointWonBy(namePlayer2); // 15-15
  match.pointWonBy(namePlayer1); // 30-15
  match.pointWonBy(namePlayer1); // 40-15
  match.pointWonBy(namePlayer2); // 40-30
  match.pointWonBy(namePlayer2); // 40-40

  // then
  const got = match.score();
  expect(got).toBe("1-0, Deuce");
});

test("should display scores when game 2 advantage player 1", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1);

  // when
  match.pointWonBy(namePlayer1); // 15-0
  match.pointWonBy(namePlayer2); // 15-15
  match.pointWonBy(namePlayer1); // 30-15
  match.pointWonBy(namePlayer1); // 40-15
  match.pointWonBy(namePlayer2); // 40-30
  match.pointWonBy(namePlayer2); // 40-40
  match.pointWonBy(namePlayer1); // advantage 1

  // then
  const got = match.score();
  expect(got).toBe("1-0, Advantage player 1");
});

test("should display scores when game 2 won by player 1", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1);

  // when
  awardGameToPlayer(match, namePlayer1);

  // then
  const got = match.score();
  expect(got).toBe("2-0");
});

test("should display scores when game 2 won by player 2", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer2);

  // when
  awardGameToPlayer(match, namePlayer2);

  // then
  const got = match.score();
  expect(got).toBe("0-2");
});

test("should display scores when set won by player 1", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1); // 1-0
  awardGameToPlayer(match, namePlayer2); // 1-1
  awardGameToPlayer(match, namePlayer1); // 2-1
  awardGameToPlayer(match, namePlayer2); // 2-2
  awardGameToPlayer(match, namePlayer1); // 3-2
  awardGameToPlayer(match, namePlayer2); // 3-3
  awardGameToPlayer(match, namePlayer1); // 4-3
  awardGameToPlayer(match, namePlayer2); // 4-4
  awardGameToPlayer(match, namePlayer1); // 5-4

  // when
  awardGameToPlayer(match, namePlayer1); // 6-4

  // then
  const got = match.score();
  expect(got).toBe("Set won by player 1");
});

test("should display scores when set won by player 2", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1); // 1-0
  awardGameToPlayer(match, namePlayer2); // 1-1
  awardGameToPlayer(match, namePlayer1); // 2-1
  awardGameToPlayer(match, namePlayer2); // 2-2
  awardGameToPlayer(match, namePlayer1); // 3-2
  awardGameToPlayer(match, namePlayer2); // 3-3
  awardGameToPlayer(match, namePlayer1); // 4-3
  awardGameToPlayer(match, namePlayer2); // 4-4
  awardGameToPlayer(match, namePlayer2); // 4-5

  // when
  awardGameToPlayer(match, namePlayer2); // 4-6

  // then
  const got = match.score();
  expect(got).toBe("Set won by player 2");
});

test("should display scores when set won by player 1 with 7-5", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1); // 1-0
  awardGameToPlayer(match, namePlayer2); // 1-1
  awardGameToPlayer(match, namePlayer1); // 2-1
  awardGameToPlayer(match, namePlayer2); // 2-2
  awardGameToPlayer(match, namePlayer1); // 3-2
  awardGameToPlayer(match, namePlayer2); // 3-3
  awardGameToPlayer(match, namePlayer1); // 4-3
  awardGameToPlayer(match, namePlayer2); // 4-4
  awardGameToPlayer(match, namePlayer2); // 4-5
  awardGameToPlayer(match, namePlayer1); // 5-5
  awardGameToPlayer(match, namePlayer1); // 6-5

  // when
  awardGameToPlayer(match, namePlayer1); // 7-5

  // then
  const got = match.score();
  expect(got).toBe("Set won by player 1");
});

test("should display scores when set won by player 1 with tie break 7-6", () => {
  // given
  const match = new Match(namePlayer1, namePlayer2);
  awardGameToPlayer(match, namePlayer1); // 1-0
  awardGameToPlayer(match, namePlayer2); // 1-1
  awardGameToPlayer(match, namePlayer1); // 2-1
  awardGameToPlayer(match, namePlayer2); // 2-2
  awardGameToPlayer(match, namePlayer1); // 3-2
  awardGameToPlayer(match, namePlayer2); // 3-3
  awardGameToPlayer(match, namePlayer1); // 4-3
  awardGameToPlayer(match, namePlayer2); // 4-4
  awardGameToPlayer(match, namePlayer2); // 4-5
  awardGameToPlayer(match, namePlayer1); // 5-5
  awardGameToPlayer(match, namePlayer1); // 6-5
  awardGameToPlayer(match, namePlayer2); // 6-6

  // when
  match.pointWonBy(namePlayer1); // 1-0
  match.pointWonBy(namePlayer2); // 1-1
  match.pointWonBy(namePlayer1); // 2-1
  match.pointWonBy(namePlayer2); // 2-2
  match.pointWonBy(namePlayer1); // 3-2
  match.pointWonBy(namePlayer2); // 3-3
  match.pointWonBy(namePlayer1); // 4-3
  match.pointWonBy(namePlayer2); // 4-4
  match.pointWonBy(namePlayer1); // 5-4
  match.pointWonBy(namePlayer2); // 5-5
  match.pointWonBy(namePlayer1); // 6-5
  match.pointWonBy(namePlayer1); // 7-5 game and set

  // then
  const got = match.score();
  expect(got).toBe("Set won by player 1");
});
