/**
 * 
 * @param {string} type Type of event, like click
 * @param {Element} element Element that binds the event if it is a mouse event
 * @param {callback} cb Action to take
 * @param {string} code Keycode if it is a keybind event
 * @returns {App.Models.Event}
 */
App.Models.Event = function(type, element, cb, code) {
  this.type = type;
  this.element = element;
  this.cb = cb;
  this.code = code;
  /**
   * To bind the original browser event
   */
  this.original;
};