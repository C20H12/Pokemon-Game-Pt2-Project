export const reducerFn = (state, action) => {
  switch (action.type) {
    case "ATTACK":
      return {
        ...state,
        enemys: state.enemys.map(elem => {
          if (elem.id == action.payload.id){
            return {...elem, hp: elem.hp - action.payload.amount}
          } else {
            return {...elem, hp: elem.hp }
          }
        })
      };
      
    case "MISSED":
      console.log(111);
      
    default:
      throw new Error("shit, wrong action type");
  }
}
