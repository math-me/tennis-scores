const { Match } = require("../src/match.js");

const namePlayer1 = "player 1";
const namePlayer2 = "player 2";

test("should record list of points of each player when two points each", () => {
  const match = new Match(namePlayer1, namePlayer2);
  match.pointWonBy(namePlayer1);
  match.pointWonBy(namePlayer2);

  const got = match.points;
  expect(got).toStrictEqual([1, 2]);
});
