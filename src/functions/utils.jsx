/**
 * Function that gets a random integer between 2 numbers, inclusive
 * @param {number} min - the minimum in the number range
 * @param {number} max - the maximum in the number range
 * @returns {number} - a random integer number
 */
export function randint(min, max) {
  return Math.floor(
    Math.random() * (Math.ceil(max) - Math.floor(min) + 1) + Math.ceil(min)
  );
}

/**
 * Function that finds a pokemon's full stats from an id
 * @param {Object} statsObj - full stats object of all pokemons
 * @param {number} id - the id of the pokemon want to be selected
 * @param {boolean} isEnemy - is the pokemon looking for an enemy?
 * @returns {Object} - a pokemon's full stats object
 */
export function getPokemonById(statsObj, id, isEnemy = false) {
  if (isEnemy) return statsObj.enemys.filter(enem => enem.id === id)[0];
  return statsObj.players.filter(player => player.id === id)[0];
}

/**
 * Function that gets a boolean by a percentage chance
 * @param {number} percent - a percentage number betweeen 1 - 100
 * @returns {boolean} - a true/false selected based on the percentage
 */
export function chanceToBoolean(percent) {
  return Math.random() * 100 <= percent;
}

/**
 * Function to use inside an async block that can pause the execution for a set amount of seconds
 * @param {number} s - number of seconds to wait before next execution
 * @returns {Promise<any>} - a promise that resolves after s seconds
 */
export function delaySeconds(s) {
  return new Promise(resolve => setTimeout(resolve, s*1000));
}