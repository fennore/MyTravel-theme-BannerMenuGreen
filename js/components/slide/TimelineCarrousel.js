App.Components.TimelineCarrousel = function() {
  this.id = 'timeline-slide';
  this.carrouselElement = document.getElementById(this.id);
  this.focusElement;
  this.parent;
  this.template = '<div class="timeline-slide-wrapper"><div id="' + this.id + '" class="no-smooth"></div></div>';
  this.transformType = 'translateX';
  this.transformBound = null;
};

App.Components.TimelineCarrousel.prototype.getElement = function() {
  return this.carrouselElement;
};

/**
 * Set the parent of the carrousel, this should be the Slide Component
 * @param {App.Components.Slide} parent
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.setParent = function(parent) {
  this.parent = parent;
  return this;
};

App.Components.TimelineCarrousel.prototype.getFocusElement = function() {
  return this.focusElement;
};

/**
 * 
 */
App.Components.TimelineCarrousel.prototype.updateTransformBound = function() {
  App.Timers.add('slidewidthonresize', (function() {
    this.transformBound = this.carrouselElement.parentNode.offsetWidth;
  }).bind(this), 150);
};

/**
 * 
 * @returns {App.Components.TimelineCarrousel.prototype.carrouselElement.children.offsetLeft}
 */
App.Components.TimelineCarrousel.prototype.getTransformValue = function() {
  return this.carrouselElement.children[this.parent.moveRoot].offsetLeft;
};

/**
 * 
 * @param {type} elm
 * @returns {Number}
 */
App.Components.TimelineCarrousel.prototype.transformCheckNext = function(elm) {
  return elm.offsetLeft - this.parent.transformValue + elm.offsetWidth > this.transformBound;
};

/**
 * 
 * @param {type} elm
 * @returns {Boolean}
 */
App.Components.TimelineCarrousel.prototype.transformCheckPrev = function(elm) {
  return (elm.offsetLeft - this.parent.transformValue)*-1 > this.transformBound;
};

/**
 * Set focus on carrousel item at given position
 * @param {Number} key Current position of item within carrousel
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.setFocus = function() {
  this.focusElement = this.carrouselElement.children[this.parent.currentItem];
  return this;
};

/**
 * 
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.doClearTransition = function() {
  addClass(this.carrouselElement, 'no-smooth');
  return this;
};

/**
 * 
 * @returns {App.Components.TimelineCarrousel.prototype}
 */
App.Components.TimelineCarrousel.prototype.render = function() {
  if(!this.carrouselElement || !document.body.contains(this.carrouselElement)) {
    // wrapper
    App.page.getElement().insertAdjacentHTML('afterbegin', this.template);
    this.carrouselElement = document.getElementById(this.id);
  }
  // Set transformBound
  this.transformBound = this.carrouselElement.parentNode.offsetWidth;
  // Event
  App.Events.add(new App.Models.Event('resize', window, this.updateTransformBound.bind(this)));
  App.Events.add(new App.Models.Event('mousemove', this.carrouselElement, this.extend.bind(this)));
  App.Events.add(new App.Models.Event('transitionend', this.carrouselElement, this.doClearTransition.bind(this)));
  return this;
};

/**
 * 
 * @param {type} timelineList
 * @returns {undefined}
 */
App.Components.TimelineCarrousel.prototype.update = function() {
  this.setFocus();
  this.lazyLoad();
  return this;
};

/**
 * 
 * @param {type} retract
 * @returns {undefined}
 */
App.Components.TimelineCarrousel.prototype.retract = function() {
  addClass(this.carrouselElement.parentNode, App.cssClasses.menuRetract);
};

App.Components.TimelineCarrousel.prototype.extend = function() {
  rmClass(this.carrouselElement.parentNode, App.cssClasses.menuRetract);
};

/**
 * 
 * @returns {undefined}
 */
App.Components.TimelineCarrousel.prototype.lazyLoad = function() {
  var l = this.parent.dataList.length;
  var buffer = 2;
  var diffL = this.parent.currentItem - this.parent.movePrev;
  var diffR = this.parent.moveNext - this.parent.currentItem;
  var diff = Math.max(diffL, diffR);
  var start = Math.max(this.parent.movePrev - diff - buffer, 0);
  var end = Math.min(this.parent.moveNext + diff + buffer, l - 1);
  if(this.moveNext <= this.currentItem && end < l - 1) {
    end = l - 1;
  }
  var src = '';
  for(var i = start; i <= end; ++i) {
    src = App.basePath + '/img/' + this.parent.dataList[i].path + '/thumbnail';
    this.carrouselElement.children[i].querySelector('img').src = src;
  }
  return this;
};
