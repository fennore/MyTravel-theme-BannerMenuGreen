/**
 * @todo, a lot, maybe find some library or something, time to start working with vue? xD
 * Let's set some rules:
 * App.Events are for simple basic 1 on 1 events between element and action.
 * Click unique specific element => do unique action
 * This is not supposed to be used to work for a list of elements performing a similar action (yet)
 * Some restriction apply to events themselves:
 * - Touch works with single touch only and there are callbacks for up, down, left and right
 * - mouse button events (click, mouseup, mousedown) only work on main mouse button (usually left click)
 * For more complex events you can still use window.addEventListener and window.removeEventlistener
 */
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
  // For button events only act on main button, shortcircuit otherwise;
  if(!(typeof e.button === 'undefined' || e.button === null) && e.button !== 0) {
    return;
  }
  for(var k = 0; this.eventList[e.type] && k < this.eventList[e.type].length; k++) {
    var event = this.eventList[e.type][k];
    event.original = e;
    // Events on target
    if(event.element && event.element === target) {
      (event.cb)(event);
    }
    // Keybind events
    if(!event.element && event.code && event.code === code) {
      (event.cb)(event);
    }
    // Touch
    if(e.type === 'touchmove') {
      this.handleTouchMove(event);
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
 * @param {App.Models.Event} event
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
 * Add a touch event
 * @param {App.Models.Event} event
 * @returns {App.Events}
 */
App.Events.addTouch = function(event) {
  if(!this.eventList['touchmove']) {
    this.eventList['touchmove'] = [event];
    this.addListener('touchmove');
    // Also bind touchstart
    window.addEventListener('touchstart', this.handleTouchStart.bind(this), true);
  } else {
    this.eventList['touchmove'] = [event];
  }
  return this;
};

/**
 * Remove a touch event
 * @param {App.Models.Event} event
 * @returns {App.Events}
 */
App.Events.removeTouch = function() {
  if(this.eventList['touchmove']) {
    this.eventList['touchmove'] = null;
    this.removeListener('touchmove');
    // Also bind touchstart
    window.removeEventListener('touchstart', this.handleTouchStart.bind(this), true);
  }
  return this;
};

/**
 * Remove an event
 * @param {string} type
 * @param {Element} element
 * @param {callback} cb
 * @returns {App.Events}
 */
App.Events.remove = function(event) {
  if(!this.eventList[event.type]) {
    return this;
  }
  for(var k in this.eventList[event.type]){
    var oldEvent = this.eventList[event.type][k];
    if(oldEvent.element === event.element && oldEvent.code === event.code) {
      this.eventList[event.type].splice(k, 1);
    }
  }
  if(this.eventList[event.type].length === 0) {
    this.removeListener(event.type);
  }
  return this;
};

App.Events.handleTouchStart = function(e) {
  var e = e || window.event;
  
  if(e.touches.length === 1) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  }
};

App.Events.handleTouchMove = function(event) {
  // No touchstart happened?
  if ( ! this.xDown || ! this.yDown || event.original.touches.length !== 1) {
      return;
  }

  var xUp = event.original.touches[0].clientX;                                    
  var yUp = event.original.touches[0].clientY;

  var xDiff = this.xDown - xUp;
  var yDiff = this.yDown - yUp;

  if ( (Math.abs(xDiff) > 50 || Math.abs(yDiff) > 50) && Math.abs(xDiff) > Math.abs(yDiff) ) {/*most significant*/
    if ( xDiff > 0  && event.cb.right) {/* right swipe */
      var touchEvent = Object.assign({}, event);
      touchEvent.element = event.element.right;
      (event.cb.right)(touchEvent);
      this.xDown = this.yDown = null;
    }
    else if(event.cb.left) {/* left swipe */
      var touchEvent = Object.assign({}, event);
      touchEvent.element = event.element.left;
      (event.cb.left)(touchEvent);
      this.xDown = this.yDown = null;
    }                       
  }
  else {
    if ( yDiff > 0 && event.cb.up) {/* up swipe */
      var touchEvent = Object.assign({}, event);
      touchEvent.element = event.element.up;
      (event.cb.up)(touchEvent);
      this.xDown = this.yDown = null;
    }
    else if(event.cb.down) { /* down swipe */
      var touchEvent = Object.assign({}, event);
      touchEvent.element = event.element.down;
      (event.cb.down)(touchEvent);
      this.xDown = this.yDown = null;
    }                                                                 
  }
};