/**
 * @returns {App.Components.TimelinePager}
 */
App.Components.TimelinePager = function() {
  this.id = 'pager-buttons';
  this.pagerElement = document.getElementById(this.id);
  this.template = '<div id="' + this.id + '"></div>';
  this.templateButton = '<button></button>';
  this.parent;
  this.previousPagerSize;
  this.pagerCurrent = 0;
};

/**
 * The component root DOM element
 * @returns {DOMElement}
 */
App.Components.TimelinePager.prototype.getElement = function() {
  return this.pagerElement;
};

/**
 * Set parent Component, usually this should be a Slide Component
 * @param {App.Components.Slide} parent
 * @returns {App.Components.TimelinePager}
 */
App.Components.TimelinePager.prototype.setParent = function(parent) {
  this.parent = parent;
  return this;
};

/**
 * Event handler for clicked pager button.
 * @param {Event} event
 */
App.Components.TimelinePager.prototype.switchToItem = function(event) {
  var target = event.target;
  if(target.tagName === 'BUTTON' && target.parentNode.id === this.id) {
    this.parent.switchToItem(this.parent.init + this.parent.moveRoot + getIndex(target));
  }
};

App.Components.TimelinePager.prototype.render = function() {
  if(!this.pagerElement || !document.body.contains(this.pagerElement)) {
    App.page.getElement().insertAdjacentHTML('beforeend', this.template);
    this.pagerElement = document.getElementById(this.id);
  }
  // Pager bound event
  window.removeEventListener('click', this.switchToItem.bind(this));
  window.addEventListener('click', this.switchToItem.bind(this));
};

App.Components.TimelinePager.prototype.update = function() {
  var newCount = this.parent.moveNext - this.parent.moveRoot;
  if(newCount <= 0) {
    newCount = this.parent.dataList.length - this.parent.moveRoot;
  }
  var check = Math.abs(newCount - (this.previousPagerSize || 0));
  for (var i = 0; i < check; i++) {
    if(newCount < this.previousPagerSize) {
      this.pagerElement.removeChild(this.pagerElement.children[this.previousPagerSize - (1 + i)]);
    }
    else {
      this.pagerElement.insertAdjacentHTML('beforeend', this.templateButton);
    }
  }
  this.previousPagerSize = newCount;
};

App.Components.TimelinePager.prototype.setCurrent = function() {
  rmClass(this.pagerElement.children[this.pagerCurrent], 'pager-active');
  addClass(this.pagerElement.children[this.parent.currentItem - this.parent.moveRoot], 'pager-active');
  this.pagerCurrent = this.parent.currentItem - this.parent.moveRoot;
};
