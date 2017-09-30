App.Components.TimelineCarrousel = function() {
  this.carrouselElement = document.getElementById('timeline-slide');
  this.focusElement;
  this.template = '';
};

App.Components.TimelineCarrousel.prototype.getFocusElement = function() {
  
}

App.Components.TimelineCarrousel.prototype.setFocus = function(key) {
  this.focusElement = this.carrouselElement.children[key];
}

App.Components.TimelineCarrousel.prototype.render = function() {
  
}

App.Components.TimelineCarrousel.prototype.update = function(timelineList) {
  this.lazyLoad();
}