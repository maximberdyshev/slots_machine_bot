class GameState_test {
  static diceLimit = []
  static timerID = null
  static msg = null

  static addDice = (dice, ctx) => {
    // console.log(GameState_test.diceLimit)
    // получаем дайс и ведем счёт (diceLimit)
    if (this.diceLimit.length >= 3) {
      // console.log(dice)
      if (!this.timerID) {
        console.log('!=')
        // console.log(this.timerID)
        this.msg = ctx
        this.setCleaner()
      } else {
        console.log('=')
        // console.log(this.timerID)
        this.diceLimit.push(dice)
      }
    } else {
      this.diceLimit.push(dice)
      return
    }
  }

  static setCleaner = () => {
    console.log('до удаления:')
    console.log(this.diceLimit)
    this.timerID = setTimeout(this.clean, 5000)
  }

  static clean = async () => {
    try {
      await this.msg.deleteMessage(this.diceLimit[0].message_id)
    } catch (err) {
      console.log(err)
    }
    console.log('после удаления')
    console.log(this.diceLimit)
    this.timerID = null
  }
}

export default GameState_test
