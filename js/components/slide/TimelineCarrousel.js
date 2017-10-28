App.Components.TimelineCarrousel = function() {
  this.id = 'timeline-slide';
  this.carrouselElement = document.getElementById(this.id);
  this.focusElement;
  this.parent;
  this.template = '<div class="timeline-slide-wrapper"><div id="' + this.id + '" class="no-smooth"></div></div>';
  this.transformType = 'translateX';
  this.transformBound = null;
  this.total = new App.Components.TimelineCarrouselTotal();
  this.jump = new App.Components.TimelineCarrouselJump();
  this.total.setParent(this);
  this.jump.setParent(this);
};

/**
 * Get the root DOM element for this component.
 * This could be a parent wrapper or the carrousel itself.
 * @returns {DOMElement|undefined}
 */
App.Components.TimelineCarrousel.prototype.getElement = function() {
  if(this.carrouselElement) {
    return this.carrouselElement.parentNode;
  } else {
    return;
  }
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

/**
 * Get the DOM element of the currently focused item.
 * @returns {DOMElement}
 */
App.Components.TimelineCarrousel.prototype.getFocusElement = function() {
  return this.focusElement;
};

/**
 * Set the carrousel view boundary.
 * Usually used as callback for window resize event.
 */
App.Components.TimelineCarrousel.prototype.updateTransformBound = function() {
  App.Timers.add('slidewidthonresize', (function() {
    this.transformBound = this.getElement().offsetWidth;
  }).bind(this), 150);
  return this;
};

/**
 * Carrousel transform value.
 * @returns {Number}
 */
App.Components.TimelineCarrousel.prototype.getTransformValue = function() {
  return this.carrouselElement.children[this.parent.moveRoot].offsetLeft;
};

/**
 * Find the next transform root element.
 * This is the first element that is not completely visible on the forward side.
 * @param {DOMElement} elm
 * @returns {Boolean}
 */
App.Components.TimelineCarrousel.prototype.transformCheckNext = function(elm) {
  return elm.offsetLeft - this.parent.transformValue + elm.offsetWidth > this.transformBound;
};

/**
 * Find the previous transform root element.
 * This is the last element that would be completely visible on the backward side.
 * @param {DOMElement} elm
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
 * Update the carrousel to update without smooth animation.
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.doClearTransition = function() {
  addClass(this.carrouselElement, 'no-smooth');
  return this;
};

/**
 * Event handler for clicked visible carrousel image.
 * @param {Event} event
 */
App.Components.TimelineCarrousel.prototype.switchToItem = function(event) {
  var target = event.target;
  if(!(typeof event.button === 'undefined' || event.button === null) && event.button !== 0) {
    return;
  }
  if(target.tagName === 'IMG' && target.parentNode.parentNode === this.carrouselElement) {
    var newPosition = getIndex(target.parentNode);
    if(newPosition >= this.parent.moveNext && this.parent.moveNext > this.parent.moveRoot) {
      this.parent.parentSwitchCallback(new App.Models.Event('click', this.parent.btnSlideNext.getElement()));
    } else if(newPosition <= this.parent.movePrev) {
      this.parent.parentSwitchCallback(new App.Models.Event('click', this.parent.btnSlidePrev.getElement()));
    } else {
      this.parent.switchToItem(this.parent.init + newPosition);
    }
  }
};

/**
 * Render the carrousel.
 * This adds it to the DOM, creates references to DOM Elements and attaches events.
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.render = function() {
  if(!this.carrouselElement || !document.body.contains(this.carrouselElement)) {
    // wrapper
    App.page.getElement().insertAdjacentHTML('afterbegin', this.template);
    this.carrouselElement = document.getElementById(this.id);
  }
  // Set jump
  this.jump.render();
  // Prepend total
  this.total.render();
  // Set transformBound
  this.transformBound = this.getElement().offsetWidth;
  // Event
  App.Events
    .add(new App.Models.Event('resize', window, this.updateTransformBound.bind(this)))
    .add(new App.Models.Event('mousemove', this.getElement(), this.extend.bind(this)))
    .add(new App.Models.Event('transitionend', this.carrouselElement, this.doClearTransition.bind(this)));
  // Carrousel bound event
  window.removeEventListener('click', this.switchToItem.bind(this));
  window.addEventListener('click', this.switchToItem.bind(this));
  return this;
};
    
/**
 * Build the carrousel content.
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.build = function() {
  this.carrouselElement.insertAdjacentHTML(
    'afterbegin',
    this.parent.dataList.map(App.renderCarrouselItem).join('')
  );
  this.total.build();
  return this;
};

/**
 * Update the carrousel to the new focused Item.
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.update = function() {
  this.setFocus();
  this.total.update();
  App.Timers.add('carrousel-delayed-show', this.extend.bind(this), 1000);
  App.Timers.add('carrousel-delayed-hide', this.retract.bind(this), 2000);
  return this;
};

/**
 * Do whatever needs to be done after update.
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.postTransformUpdate = function() {
  this.lazyLoad();
  return this;
};

/**
 * Prepend items as DOM elements to the carrousel.
 * @param {array} items
 */
App.Components.TimelineCarrousel.prototype.prepend = function(items) {
  this.carrouselElement.insertAdjacentHTML(
    'afterbegin',
    items.map(App.renderCarrouselItem).join('')
  );
  return this
};

/**
 * Append items as DOM elements to the carrousel.
 * @param {array} items
 */
App.Components.TimelineCarrousel.prototype.append = function(items) {
  this.carrouselElement.insertAdjacentHTML(
    'beforeend',
    items.map(App.renderCarrouselItem).join('')
  );
  return this;
};

/**
 * Trim items in carrousel
 * @param {Number} offset
 * @param {Number} diff
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.trim = function(offset, diff) {
  for(var i = 0; i < diff && this.carrouselElement.children[offset]; ++i) {
    this.carrouselElement.removeChild(this.carrouselElement.children[offset]);
  }
  return this;
};

/**
 * Retract the carrousel (hide)
 */
App.Components.TimelineCarrousel.prototype.retract = function() {
  addClass(this.getElement(), App.cssClasses.menuRetract);
  return this;
};

/**
 * Extends the carrousel (show)
 */
App.Components.TimelineCarrousel.prototype.extend = function() {
  rmClass(this.getElement(), App.cssClasses.menuRetract);
  return this;
};

/**
 * Lazyload the thumbnail images in the carrousel.
 * @returns {App.Components.TimelineCarrousel}
 */
App.Components.TimelineCarrousel.prototype.lazyLoad = function() {
  var l = this.parent.dataList.length;
  var buffer = 2;
  var diffL = this.parent.moveRoot - this.parent.movePrev;
  var diffR = this.parent.moveNext - this.parent.moveRoot;
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
