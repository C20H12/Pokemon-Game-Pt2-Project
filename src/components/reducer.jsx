/**
 * A function to handle the complex state actions that the Reducer offers, including attack and defence
 * @param {Object} state - the current full stats of the pokemon, mutable
 * @param {Object} action - the object containing instructions of what action to perform
 * @param {string} action.type - the type of action
 * @param {Object} action.payload - the object containing values for the action
 * @param {number} action.payload.id - the target pokemon's id
 * @param {number} action.payload.amount - the amount of damage target pokemon recieves
 * @returns {Object} - the new, modified stats of the pokemon
 * @throws - An error if the developer inputs an incorrect action type
 */
export const reducerFn = (state, action) => {
  switch (action.type) {
    case "ATTACK":
      return {
        ...state,
        enemys: state.enemys.map(elem => {
          if (elem.id == action.payload.id) {
            return { ...elem, hp: elem.hp - action.payload.amount };
          } else {
            return { ...elem, hp: elem.hp };
          }
        }),
      };

    case "MISSED":
      console.log(111);

    default:
      throw new Error("shit, wrong action type");
  }
};
