/**
 * Returns a promise that resolves after a given amount of time
 * @param {number} ms - The amount of milliseconds to sleep
 * @returns {Promise<void>}
 */
export async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}
