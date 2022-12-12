// в процессе..
// import DBC from "./DBC.js"

class GameState {
  // лимиты на кол-во сообщений от/для бота
  static diceLimit = []
  static allStatsLimit = []
  static mvpLimit = []
  static myDiceLimit = []

  // авторизованные чаты
  static allowedChats = []

  // обновляем список авторизованных чатов
  // в процессе..
  // static updateAllowedChats = async () => {}

  // поскольку к классу нет обращений извне,
  // то и доступы тоже не нужны
  // /**
  //  * @param {any[]} arr
  //  */
  // set myDiceLimit(arr) { GameState.myDiceLimit = arr }
  // get myDiceLimit() { return GameState.myDiceLimit }

  // /**
  //  * @param {any[]} arr
  //  */
  // set diceLimit(arr) { GameState.diceLimit = arr }
  // get diceLimit() { return GameState.diceLimit }

  // /**
  //  * @param {any[]} arr
  //  */
  // set allStatsLimit(arr) { GameState.allStatsLimit = arr }
  // get allStatsLimit() { return GameState.allStatsLimit }

  // /**
  //  * @param {any[]} arr
  //  */
  // set mvpLimit(arr) { GameState.mvpLimit = arr }
  // get mvpLimit() { return GameState.mvpLimit }

  // автоудаление дайсов после достижения лимита
  static cleanDice = async (obj, func) => {
    if (GameState.diceLimit.length >= 7) {
      try { 
        await func(GameState.diceLimit[0].message_id) 
      } catch (err) {
        console.log(err) 
        // console.log(`code: ${err.response.error_code}, desc: ${err.response.description}`) 
      }
      GameState.diceLimit.shift()
      GameState.diceLimit.push(obj)
    } else {
      GameState.diceLimit.push(obj)
    }
    return
  }

  // автоудаление сообщений бота о стате игрока
  // общий счетчик, надо вынести отдельно для каждого игрока
  static cleanMyDice = async (obj, func) => {
    if (GameState.myDiceLimit.length >= 30) {
      try {
        await func(GameState.myDiceLimit[0].message_id)
      } catch (err) {
        console.log(`code: ${err.response.error_code}, desc: ${err.response.description}`)
      }
      GameState.myDiceLimit.shift()
      GameState.myDiceLimit.push(obj)
    } else {
      GameState.myDiceLimit.push(obj)
    }
    return
  }

  // автоудаление сообщений бота с таблицой стат
  static cleanAllStatsLimit = async (obj, func) => {
    if (GameState.allStatsLimit.length >= 4) {
      try {
        await func(GameState.allStatsLimit[0].message_id)
      } catch (err) {
        console.log(`code: ${err.response.error_code}, desc: ${err.response.description}`)
      }
      GameState.allStatsLimit.shift()
      GameState.allStatsLimit.push(obj)
    } else {
      GameState.allStatsLimit.push(obj)
    }
    return
  }

  // автоудаление сообщений бота о MVP игроке
  static cleanMVPLimit = async (obj, func) => {
    if (GameState.mvpLimit.length >= 4) {
      try {
        await func(GameState.mvpLimit[0].message_id)
      } catch (err) {
        console.log(`code: ${err.response.error_code}, desc: ${err.response.description}`)
      }
      GameState.mvpLimit.shift()
      GameState.mvpLimit.push(obj)
    } else {
      GameState.mvpLimit.push(obj)
    }
    return
  }
}

export default GameState
