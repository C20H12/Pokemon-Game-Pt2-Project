import { getPokemonById, randint } from "./utils.jsx";

/**
 * A function to handle the complex state actions that the Reducer offers, including attack and defence
 * @param {Object} state - the current full stats of the pokemon, mutable
 * @param {Object} action - the object containing instructions of what action to perform
 * @param {string} action.type - the type of action
 * @param {Object} action.payload - the object containing values for the action
 * @param {number} action.payload.attackType - the current attack move that is used
 * @param {number} action.payload.targetId - the target pokemon's id
 * @param {number} action.payload.attackerId - the attacker pokemon's id
 * @param {boolean} action.payload.isEnemyAttacking - is the attack comming from the enemy? if not, it's from the player
 * @returns {Object} - the new, modified stats of the pokemon
 * @throws - An error if the developer inputs an incorrect action type
 */
export const reducerFn = (state, action) => {
  const attackAmount = getPokemonById(
    state,
    action.payload?.attackerId,
    action.payload?.isEnemyAttacking
  )?.attack;

  let egCost, damage;
  if (action.payload?.attackType === 1) {
    egCost = randint(7, 15);
    damage = randint(attackAmount * 0.05, attackAmount * 0.1);
  } else if (action.payload?.attackType === 2) {
    egCost = randint(16, 25);
    damage = randint(attackAmount * 0.1, attackAmount * 0.2);
  } else if (action.payload?.attackType === 3) {
    egCost = randint(26, 35);
    damage = randint(attackAmount * 0.2, attackAmount * 0.3);
  }

  switch (action.type) {
    case "ATTACK":
      console.log("standard attack");

      return processStatsState(
        state,
        egCost,
        damage,
        action.payload.targetId,
        action.payload.attackerId,
        action.payload.isEnemyAttacking,
        damage.toString()
      );

    case "MISSED":
      console.log("missed");

      return processStatsState(
        state,
        egCost,
        0,
        action.payload.targetId,
        action.payload.attackerId,
        action.payload.isEnemyAttacking,
        "MISSED"
      );

    case "ATTACK_SP":
      console.log("1.5x attack");
      const spDamage = ~~(damage * 1.5);

      return processStatsState(
        state,
        egCost,
        spDamage,
        action.payload.targetId,
        action.payload.attackerId,
        action.payload.isEnemyAttacking,
        `CRIT \n${spDamage}`
      );

    case "DEFENDED":
      console.log("resisted");
      const dfDamage = ~~(damage * 0.75);

      return processStatsState(
        state,
        egCost,
        dfDamage,
        action.payload.targetId,
        action.payload.attackerId,
        action.payload.isEnemyAttacking,
        `RESIST \n${dfDamage}`
      );

    case "DEFENDED_SP":
      console.log("damage halved");
      const spdfDamage = ~~(damage * 0.5);

      return processStatsState(
        state,
        egCost,
        spdfDamage,
        action.payload.targetId,
        action.payload.attackerId,
        action.payload.isEnemyAttacking,
        `SHIELDED \n${spdfDamage}`
      );

    case "CLOSE_MODAL":
      return {
        players: state.players.map(elem => {
          return { ...elem, modalContent: "" };
        }),
        enemys: state.enemys.map(elem => {
          return { ...elem, modalContent: "" };
        }),
      };

    case "REFILL":
      return processStatsState(
        state,
        -10,
        0,
        null,
        action.payload.attackerId,
        action.payload.isEnemyAttacking,
        ""
      );

    default:
      throw new Error("shit, wrong action type");
  }
};

/**
 * Function that processes the stat object given details of the operation
 * @param {Object} stateObj - the current full stats of the pokemon, mutable
 * @param {number} eg - the energy cost of this operation
 * @param {number} dmg - the damage the operation will deal to the target
 * @param {number} target - the id of the targeted pokemon
 * @param {number} attacker - the id of the attacker pokemon
 * @param {boolean} isEnemyAttacking - flag to check if the enemy is attacking or the player
 * @param {string} modal - the text to display on the targeting side
 * @returns - the processed full stats of the pokemon
 */
function processStatsState(
  stateObj,
  eg,
  dmg,
  target,
  attacker,
  isEnemyAttacking,
  modal
) {
  let attackingSide, targetSide;
  if (isEnemyAttacking) {
    attackingSide = "enemys";
    targetSide = "players";
  } else {
    attackingSide = "players";
    targetSide = "enemys";
  }

  const processedObj = {
    [attackingSide]: stateObj[attackingSide].map(elem => {
      if (elem.id === attacker) {
        return { ...elem, eg: elem.eg - eg };
      } else {
        return elem;
      }
    }),
    [targetSide]: stateObj[targetSide].map(elem => {
      if (elem.id === target) {
        return {
          ...elem,
          hp: elem.hp - dmg,
          modalContent: modal,
        };
      } else {
        return elem;
      }
    }),
  };
  return processedObj;
}
