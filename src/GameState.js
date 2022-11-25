class GameState {
  static diceLimit = []

  set diceLimit(arr) { GameState.diceLimit = arr}
  get diceLimit() { return GameState.diceLimit }
}

export default GameState
