class GameState {
  static diceLimit = []
  static allStatsLimit = []
  static mvpLimit = []
  static myDiceLimit = []

  /**
   * @param {any[]} arr
   */
  set myDiceLimit(arr) { GameState.myDiceLimit = arr }
  get myDiceLimit() { return GameState.myDiceLimit }

  /**
   * @param {any[]} arr
   */
  set diceLimit(arr) { GameState.diceLimit = arr }
  get diceLimit() { return GameState.diceLimit }

  /**
   * @param {any[]} arr
   */
  set allStatsLimit(arr) { GameState.allStatsLimit = arr }
  get allStatsLimit() { return GameState.allStatsLimit }

  /**
   * @param {any[]} arr
   */
  set mvpLimit(arr) { GameState.mvpLimit = arr }
  get mvpLimit() { return GameState.mvpLimit }
}

export default GameState
