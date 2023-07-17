class LocalStorageManipulator {
  #shareResults;

  constructor() {
    const savedShareResults = JSON.parse(localStorage.getItem("share result"));
    this.shareResults = savedShareResults ? savedShareResults : "";
  }

  setNewAttempt(results, currAttempt) {
    var boardState = JSON.parse(localStorage.getItem("board state"));
    if (boardState == null) {
      if (currAttempt !== 1) {
        throw new Error(
          "Unexpected discrepancy between local storage and currAttempt"
        );
      }
      localStorage.setItem("board state", JSON.stringify({ 1: results }));
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

  finaliseShareResult(currAttempt) {}
}

export { LocalStorageManipulator };
