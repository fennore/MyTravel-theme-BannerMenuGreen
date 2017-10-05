App.Timers.timerBag = {};
/**
 * Add a timer
 * @param {string} key
 * @param {callback} cb
 * @param {Number} timeOut
 * @returns {undefined}
 */
App.Timers.add = function(key, cb, timeOut) {
  App.Timers.reset(key);
  this.timerBag[key] = setTimeout(cb, timeOut);
  return this;
};

/**
 * Reset a timer
 * @param {string} key
 * @returns {App.Timers}
 */
App.Timers.reset = function(key) {
  if(this.timerBag[key]) {
    clearTimeout(this.timerBag[key]);
    this.timerBag[key] = null;
  }
  return this;
};

/**
 * Reset all timers
 * @param {type} event
 * @returns {App.Timers}
 */
App.Timers.resetAll = function() {
  for(var key in this.timerBag) {
    this.reset(key);
  }
  return this;
};