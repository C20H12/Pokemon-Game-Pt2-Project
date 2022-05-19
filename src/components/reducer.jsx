export const reducerFn = (state, action) => {
  console.log(state);
  if (action.type === "ATTACK") {
    return {
      ...state,
      enemys: state.enemys.map(elem => {
        if (elem.id == action.payload.id){
          return {...elem, hp: elem.hp - action.payload.amount}
        } else {
          return {...elem, hp: elem.hp - 1}
        }
      })
    }
  }

  throw new Error("shit, wrong action type");
}
