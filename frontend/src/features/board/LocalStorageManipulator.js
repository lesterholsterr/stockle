class LocalStorageManipulator {
  #shareResults;

  constructor() {
    const currentDate = new Date();
    const now = currentDate.getTime();
    if (this.getResetTime() !== null && this.getResetTime() - now < 0) {
      this.setGameOver(false);
      localStorage.setItem("share result", JSON.stringify(null));
      localStorage.setItem("board state", JSON.stringify(null));
    }

    const savedShareResults = JSON.parse(localStorage.getItem("share result"));
    this.shareResults = savedShareResults ? savedShareResults : "";
    this.setResetTime();
  }

  setResetTime() {
    const currentDate = new Date();
    const nextResetTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
      0, // hour
      0, // minute
      0, // second
      0 // millisecond
    ).getTime();

    localStorage.setItem("reset", JSON.stringify({ nextResetTime }));
  }

  getResetTime() {
    const resetTime = localStorage.getItem("reset");
    return resetTime
      ? JSON.parse(localStorage.getItem("reset")).nextResetTime
      : null;
  }

  setUserGuess(results, currAttempt) {
    var boardState = JSON.parse(localStorage.getItem("board state"));
    if (boardState == null) {
      if (currAttempt !== 0) {
        throw new Error(
          "Unexpected discrepancy between local storage and currAttempt"
        );
      }
      localStorage.setItem("board state", JSON.stringify({ 0: results }));
    } else {
      Object.assign(boardState, { [currAttempt]: results });
      localStorage.setItem("board state", JSON.stringify(boardState));
    }
  }

  setShareResult(results) {
    const shareResultRow =
      results[1].charAt(results[1].length - 1) +
      results[2].charAt(results[2].length - 2) +
      results[3].charAt(results[3].length - 2) +
      results[4].charAt(results[4].length - 2) +
      results[5].charAt(results[5].length - 2) +
      "\n";
    this.shareResults += shareResultRow;
    localStorage.setItem("share result", JSON.stringify(this.shareResults));
  }

  setGameOver(gameOver) {
    localStorage.setItem("game over", JSON.stringify(gameOver));
  }

  getGameOver() {
    const gameOver = JSON.parse(localStorage.getItem("game over"));
    return gameOver !== null ? gameOver : false;
  }

  setMode(mode) {
    localStorage.setItem("mode", JSON.stringify(mode));
  }

  getMode() {
    const mode = JSON.parse(localStorage.getItem("mode"));
    return mode !== null ? mode : "light";
  }
}

export { LocalStorageManipulator };
