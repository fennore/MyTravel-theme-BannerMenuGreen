App.Events.eventList = {};

/**
 * 
 * @param {Event} e
 * @returns {undefined}
 */
App.Events.eventsListener = function(e) {
  var e = e || window.event;
  var target = e.target;
  var code = e.keyCode || e.which;
  for(var k = 0; k < this.eventList[e.type].length; k++){
    var event = this.eventList[e.type][k];
    event.original = e;
    // Events on target
    if(event.element && event.element === target) {
      (event.cb)(event);
    }
    // Keybind events
    if(!event.element && event.code === code) {
      (event.cb)(event);
    }
  }
};

/**
 * Add an event Listener
 * @param {string} type
 * @returns {App.Events}
 */
App.Events.addListener = function(type) {
  window.addEventListener(type, this.eventsListener.bind(this), true);
  return this;
};

/**
 * Remove an event Listener
 * @param {string} type
 * @returns {App.Events}
 */
App.Events.removeListener = function(type) {
  window.removeEventListener(type, this.eventsListener.bind(this), true);
  return this;
};

/**
 * Add an event
 * @param {type} event
 * @returns {App.Events}
 */
App.Events.add = function(event) {
  if(!this.eventList[event.type]) {
    this.eventList[event.type] = [];
    this.addListener(event.type);
  } else {
    // No duplicate elements for same event type
    for(var k in this.eventList[event.type]){
      var oldEvent = this.eventList[event.type][k];
      if(event.element && oldEvent.element === event.element || event.code && event.code === oldEvent.code) {
        return this;
      }
    }
  }
  this.eventList[event.type].push(event);
  return this;
};

/**
 * Remove an event
 * @param {string} type
 * @param {Element} element
 * @param {callback} cb
 * @returns {App.Events}
 */
App.Events.remove = function(type, element, cb) {
  if(!this.eventList[type]) {
    return this;
  }
  for(var k in this.eventList[type]){
    var event = this.eventList[type][k];
    if(event.element === element && event.cb === cb) {
      this.eventList[type].splice(k, 1);
    }
  }
  if(this.eventList[type].length === 0) {
    this.removeListener(type);
  }
  return this;
};
