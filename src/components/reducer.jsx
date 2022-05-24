/**
 * A function to handle the complex state actions that the Reducer offers, including attack and defence
 * @param {Object} state - the current full stats of the pokemon, mutable
 * @param {Object} action - the object containing instructions of what action to perform
 * @param {string} action.type - the type of action
 * @param {Object} action.payload - the object containing values for the action
 * @param {number} action.payload.targetId - the target pokemon's id
 * @param {number} action.payload.attackerId - the attacker pokemon's id
 * @returns {Object} - the new, modified stats of the pokemon
 * @throws - An error if the developer inputs an incorrect action type
 */
export const reducerFn = (state, action) => {
  switch (action.type) {
    case "ATTACK":
      const attackAmount = state.players.filter(player => player.id == action.payload.attackerId);
      console.log(attackAmount)
      return {
        players: state.players.map(elem => {
          if (elem.id == action.payload.attackerId) {
            return { ...elem, eg: elem.eg - 10 };
          } else {
            return { ...elem};
          }
        }),
        enemys: state.enemys.map(elem => {
          if (elem.id == action.payload.targetId) {
            return { ...elem, hp: elem.hp - 1 };
          } else {
            return { ...elem};
          }
        })
      };

    case "MISSED":
      console.log(111);

    default:
      throw new Error("shit, wrong action type");
  }
};


/**
 * Function that gets a random integer between 2 numbers, inclusive
 * @param {number} min - the minimum in the number range
 * @param {number} max - the maximum in the number range
 * @returns {number} - a random integer number
 */
function randint(min, max) {
  return Math.floor(
    Math.random() * (Math.ceil(max) - Math.floor(min) + 1) + Math.ceil(min)
  );
}
