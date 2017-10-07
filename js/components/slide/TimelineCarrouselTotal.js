App.Components.TimelineCarrouselTotal = function() {
  this.id = 'slide-total-edit';
  this.totalElement = document.getElementById(this.id);
  this.template = '<div class="slide-total"><span id="' + this.id + '"></span></div>';
  this.parent;
};

/**
 * Get the component root DOMElement
 * @returns {App.Components.TimelineCarrouselTotal.totalElement.parentNode}
 */
App.Components.TimelineCarrouselTotal.prototype.getElement = function() {
  return this.totalElement.parentNode;
};

/**
 * Set parent TimelineCarrousel Component.
 * @param {App.Components.TimelineCarrousel} parent
 * @returns {App.Components.TimelineCarrouselTotal}
 */
App.Components.TimelineCarrouselTotal.prototype.setParent = function(parent) {
  this.parent = parent;
  return this;
};

App.Components.TimelineCarrouselTotal.prototype.render = function() {
  if(!this.totalElement || !document.body.contains(this.totalElement)) {
    // wrapper
    this.parent.getElement().insertAdjacentHTML('afterbegin', this.template);
    this.totalElement = document.getElementById(this.id);
  }
  // Event
  // @todo make it editable and do switch on change
  return this;
};

App.Components.TimelineCarrouselTotal.prototype.build = function() {
  this.totalElement.insertAdjacentHTML('afterend', ' of ' + this.parent.parent.total);
};

App.Components.TimelineCarrouselTotal.prototype.update = function() {
  this.totalElement.textContent = this.parent.parent.init + this.parent.parent.currentItem + 1;
};

